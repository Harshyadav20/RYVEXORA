import { sendJson, methodNotAllowed, readJson, rateLimit, clientKey, isEmail, cleanText } from '../server/http.js';
import { createOrder, config } from '../server/razorpay.js';
import { resolveDeposit } from '../server/pricing.js';

/**
 * POST /api/create-order
 * Body: { planId, name, email, company? }
 *
 * Returns only what Checkout needs. The amount is resolved on the server from
 * planId — a client-supplied amount is ignored entirely.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const limit = rateLimit(`order:${clientKey(req)}`, { limit: 10, windowMs: 60_000 });
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return sendJson(res, 429, { error: 'rate_limited', retryAfter: limit.retryAfter });
  }

  let body;
  try {
    body = await readJson(req);
  } catch {
    return sendJson(res, 400, { error: 'invalid_json' });
  }

  const planId = cleanText(body.planId, 40);
  const name = cleanText(body.name, 80);
  const email = cleanText(body.email, 254);
  const company = cleanText(body.company, 120);

  if (!name || name.length < 2) return sendJson(res, 400, { error: 'invalid_name' });
  if (!isEmail(email)) return sendJson(res, 400, { error: 'invalid_email' });

  let deposit;
  try {
    deposit = resolveDeposit(planId);
  } catch {
    return sendJson(res, 400, { error: 'unknown_plan' });
  }

  const { configured, mode, keyId } = config();
  if (!configured) {
    // Honest failure: the page shows setup instructions instead of a pay button.
    return sendJson(res, 503, {
      error: 'gateway_not_configured',
      message: 'No Razorpay credentials are configured on this deployment.',
      deposit,
    });
  }

  // Receipt is derived server-side; it is a reference for reconciliation only.
  const receipt = `ryv_${deposit.id}_${Date.now().toString(36)}`;

  try {
    const order = await createOrder({
      amount: deposit.amount,
      currency: deposit.currency,
      receipt,
      notes: {
        plan: deposit.id,
        planName: deposit.name,
        customerName: name,
        customerEmail: email,
        company,
      },
    });

    return sendJson(res, 201, {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      keyId,
      mode,
      deposit,
    });
  } catch (error) {
    return sendJson(res, error.status ?? 502, {
      error: error.message || 'gateway_error',
      // Never echo the gateway's raw payload in production; it can contain keys.
      detail: process.env.NODE_ENV === 'production' ? undefined : error.detail,
    });
  }
}
