/**
 * Client half of the payment flow.
 *
 * Order of operations matters: the server decides the amount, Razorpay
 * collects the payment, the server verifies the signature. The browser never
 * decides that a payment succeeded — it only displays what `/api/verify-payment`
 * returns.
 */

const SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';
let scriptPromise = null;

export function loadRazorpay() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no_window'));
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.Razorpay ? resolve(window.Razorpay) : reject(new Error('checkout_unavailable')));
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('checkout_script_failed'));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    /* non-JSON error page */
  }

  if (!response.ok) {
    const error = new Error(data.error || `http_${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const getPaymentConfig = async () => {
  const response = await fetch('/api/payment-config', { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    const error = new Error('config_unavailable');
    error.status = response.status;
    throw error;
  }
  return response.json();
};

/** Create the order, open Checkout, verify the handshake. Resolves on paid. */
export async function payDeposit({ planId, customer }) {
  const order = await postJson('/api/create-order', { planId, ...customer });

  const Razorpay = await loadRazorpay();

  const result = await new Promise((resolve, reject) => {
    // Once Razorpay has handed back a payment, dismissal is no longer a
    // cancellation — the modal closes *because* it succeeded. Rejecting on
    // ondismiss after this point would tell a paying customer nothing happened.
    let verificationStarted = false;
    let settled = false;

    const fail = (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };

    const checkout = new Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: 'RYVEXORA',
      description: `${order.deposit.name} deposit`,
      image: `${window.location.origin}/icon-192.png`,
      prefill: {
        name: customer.name,
        email: customer.email,
        ...(customer.company ? { company: customer.company } : {}),
      },
      notes: { plan: planId },
      theme: { color: '#246BFD' },
      modal: {
        ondismiss: () => {
          if (verificationStarted) return;
          const cancelled = new Error('cancelled');
          cancelled.cancelled = true;
          fail(cancelled);
        },
        confirm_close: true,
      },
      handler: (response) => {
        verificationStarted = true;
        postJson('/api/verify-payment', {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        })
          .then((verified) => {
            if (settled) return;
            settled = true;
            resolve({ ...verified, order: order.orderId, mode: order.mode });
          })
          .catch(fail);
      },
    });

    checkout.on('payment.failed', (event) => {
      if (verificationStarted) return;
      const failed = new Error('payment_failed');
      failed.detail = event?.error?.description ?? 'The payment was declined.';
      fail(failed);
    });

    checkout.open();
  });

  return result;
}

export const describeError = (error) => {
  const map = {
    gateway_not_configured: 'The payment gateway is not connected on this deployment.',
    rate_limited: 'Too many attempts. Wait a minute and try again.',
    invalid_email: 'That email address does not look right.',
    invalid_name: 'Enter the name the payment should be recorded against.',
    unknown_plan: 'That deposit option no longer exists. Pick another.',
    checkout_script_failed: 'The secure checkout could not load. Check your connection or blockers.',
    checkout_unavailable: 'Checkout did not initialise. Try again, or email us and we will invoice directly.',
    signature_mismatch: 'That payment could not be verified. Nothing has been charged to your card through this site — contact us before retrying.',
    payment_not_captured: 'The payment was authorised but not captured. We will not treat it as paid; contact us.',
    order_mismatch: 'The payment did not match the order. Contact us before retrying.',
    payment_failed: 'The payment did not go through.',
    cancelled: 'Checkout closed. Nothing was charged.',
  };

  return map[error?.message] ?? 'Something went wrong completing the payment. Email us and we will sort it out.';
};
