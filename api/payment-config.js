import { sendJson, methodNotAllowed } from '../server/http.js';
import { config } from '../server/razorpay.js';
import { publicCatalog } from '../server/pricing.js';

/**
 * GET /api/payment-config
 *
 * Tells the client whether a gateway is connected, which mode it is in, and
 * what can be bought. Deliberately returns no secret: `keyId` is the only
 * credential that may be public, and only when the gateway is configured.
 */
export default function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const { configured, keyId, mode } = config();

  return sendJson(res, 200, {
    configured,
    mode,
    keyId: configured ? keyId : null,
    currency: 'INR',
    deposits: publicCatalog(),
    // Explicit, so the UI never has to guess why it cannot take money.
    reason: configured ? null : 'missing_credentials',
  });
}
