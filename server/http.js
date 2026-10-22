/**
 * Tiny request/response helpers for the serverless endpoints.
 *
 * Written against Node's raw `http` objects rather than a framework, because
 * that is exactly what Vercel's Node runtime hands a function — and it also
 * lets the same handler run under the Vite dev middleware (tools/dev-api.mjs)
 * without a second implementation.
 */

export function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(body);
}

export function methodNotAllowed(res, allowed) {
  res.setHeader('Allow', allowed.join(', '));
  sendJson(res, 405, { error: 'method_not_allowed' });
}

/** Read and parse a JSON body, whatever shape the runtime has already given us. */
export async function readJson(req, limitBytes = 16 * 1024) {
  if (req.body && typeof req.body === 'object') return req.body;

  if (typeof req.body === 'string') {
    if (Buffer.byteLength(req.body) > limitBytes) throw new Error('body_too_large');
    return JSON.parse(req.body || '{}');
  }

  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > limitBytes) throw new Error('body_too_large');
    chunks.push(chunk);
  }

  if (size === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

/**
 * Best-effort fixed-window limiter.
 *
 * Serverless instances are ephemeral and horizontally scaled, so this is a
 * speed bump, not a guarantee: it stops a single warm instance being hammered.
 * Real abuse protection belongs at the edge (Vercel firewall) or at Razorpay.
 */
const buckets = new Map();

export function rateLimit(key, { limit = 12, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now - entry.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return { ok: true, remaining: limit - 1 };
  }

  entry.count += 1;

  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.start + windowMs - now) / 1000) };
  }

  // Keep the map from growing without bound on a long-lived instance.
  if (buckets.size > 5_000) {
    for (const [k, v] of buckets) {
      if (now - v.start > windowMs) buckets.delete(k);
    }
  }

  return { ok: true, remaining: limit - entry.count };
}

export function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : (forwarded || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  return ip;
}

export const isEmail = (value) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) && value.length <= 254;

export const cleanText = (value, max = 120) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '';
