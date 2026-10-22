import crypto from 'node:crypto';

/**
 * Razorpay integration, server side only.
 *
 * Two secrets are involved and neither may reach the browser:
 *   RAZORPAY_KEY_ID      public-ish (it is shared with Checkout), but read here
 *                        so the client can never substitute its own account
 *   RAZORPAY_KEY_SECRET  never sent anywhere
 *
 * `VITE_*` variables are inlined into the client bundle, so the secret must
 * never carry that prefix.
 */

const API = 'https://api.razorpay.com/v1';

export function config() {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim() ?? '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() ?? '';

  return {
    keyId,
    keySecret,
    configured: Boolean(keyId && keySecret),
    // rzp_test_* is Razorpay's own test mode — surface it, never hide it.
    mode: !keyId ? 'preview' : keyId.startsWith('rzp_test_') ? 'test' : 'live',
  };
}

/**
 * Create an order for a server-decided amount.
 * The caller passes paise from server/pricing.js — never from the request body.
 */
export async function createOrder({ amount, currency = 'INR', receipt, notes = {} }) {
  const { keyId, keySecret } = config();

  if (!keyId || !keySecret) {
    const error = new Error('gateway_not_configured');
    error.status = 503;
    throw error;
  }

  if (!Number.isInteger(amount) || amount < 100) {
    const error = new Error('invalid_amount');
    error.status = 400;
    throw error;
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const response = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, currency, receipt, notes }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    const error = new Error('gateway_error');
    error.status = 502;
    error.detail = detail.slice(0, 400);
    throw error;
  }

  const order = await response.json();

  return {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    status: order.status,
  };
}

/**
 * Verify the checkout handshake.
 *
 * Razorpay signs `${order_id}|${payment_id}` with the key secret. Without this
 * check, a client could claim any payment succeeded by posting invented ids.
 */
export function verifySignature({ orderId, paymentId, signature }) {
  const { keySecret } = config();

  if (!keySecret || !orderId || !paymentId || !signature) return false;

  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(String(signature), 'utf8');

  // Length check first: timingSafeEqual throws on mismatched lengths.
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Payment details are fetched from Razorpay rather than trusted from the client. */
export async function fetchPayment(paymentId) {
  const { keyId, keySecret } = config();
  if (!keyId || !keySecret) {
    const error = new Error('gateway_not_configured');
    error.status = 503;
    throw error;
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  const response = await fetch(`${API}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!response.ok) {
    const error = new Error('gateway_error');
    error.status = 502;
    throw error;
  }

  const payment = await response.json();

  return {
    id: payment.id,
    orderId: payment.order_id,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    method: payment.method,
    email: payment.email,
    createdAt: payment.created_at,
  };
}
