import { sendJson, methodNotAllowed, readJson, rateLimit, clientKey, cleanText } from '../server/http.js';
import { verifySignature, fetchPayment, config } from '../server/razorpay.js';

/**
 * POST /api/verify-payment
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 *
 * Two independent checks:
 *   1. HMAC signature — proves the handshake came from Razorpay.
 *   2. Payment lookup — proves the payment exists, is captured, and matches the
 *      order. A signed handshake alone does not prove money moved.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const limit = rateLimit(`verify:${clientKey(req)}`, { limit: 20, windowMs: 60_000 });
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

  const orderId = cleanText(body.razorpay_order_id, 64);
  const paymentId = cleanText(body.razorpay_payment_id, 64);
  const signature = cleanText(body.razorpay_signature, 128);

  if (!orderId || !paymentId || !signature) {
    return sendJson(res, 400, { error: 'missing_fields' });
  }

  const { configured } = config();
  if (!configured) {
    return sendJson(res, 503, { error: 'gateway_not_configured' });
  }

  if (!verifySignature({ orderId, paymentId, signature })) {
    return sendJson(res, 400, { error: 'signature_mismatch', verified: false });
  }

  try {
    const payment = await fetchPayment(paymentId);

    if (payment.orderId !== orderId) {
      return sendJson(res, 409, { error: 'order_mismatch', verified: false });
    }

    if (!['captured', 'authorized'].includes(payment.status)) {
      return sendJson(res, 402, {
        error: 'payment_not_captured',
        verified: false,
        status: payment.status,
      });
    }

    return sendJson(res, 200, {
      verified: true,
      paymentId: payment.id,
      orderId: payment.orderId,
      amount: payment.amount,
      currency: payment.currency,
      method: payment.method,
      status: payment.status,
      // Enough to show a receipt; not enough to be a tax invoice.
      reference: `RYV-${payment.id.slice(-10).toUpperCase()}`,
      paidAt: payment.createdAt ? new Date(payment.createdAt * 1000).toISOString() : new Date().toISOString(),
    });
  } catch (error) {
    return sendJson(res, error.status ?? 502, { error: error.message || 'gateway_error' });
  }
}
