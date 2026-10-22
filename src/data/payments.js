/**
 * Deposit catalog — the single source of truth for what can be paid for.
 *
 * The browser never sends an amount. It sends a `id`, and the server looks up
 * the price here. `src/pages/Pay.jsx` imports the same list only to render the
 * options; it never trusts its own copy at checkout time.
 *
 * Amounts are in paise (INR × 100) because that is what Razorpay expects.
 * Stripe-style zero-decimal currencies are not supported on purpose — this
 * gateway is INR-only.
 *
 * !!  These are placeholder rates. Confirm the studio's actual deposit policy
 * !!  and figures before taking live money. Nothing here is a quote.
 */

export const currency = 'INR';

export const deposits = [
  {
    id: 'discovery',
    name: 'Discovery workshop',
    amount: 2500000, // ₹25,000
    summary: 'Half a day with the people who will do the work.',
    includes: [
      'Two working sessions, one document',
      'Scope, risks and a buildable plan',
      'Credited against the project if you proceed',
    ],
    turnaround: 'Held within 10 working days',
  },
  {
    id: 'launch',
    name: 'Site or launch deposit',
    amount: 7500000, // ₹75,000
    summary: 'Reserves a build slot and starts design.',
    includes: [
      'Design and build slot reserved',
      'First design direction within a week',
      'Credited against the project total',
    ],
    turnaround: 'Start date confirmed in writing',
  },
  {
    id: 'product',
    name: 'Product or SaaS deposit',
    amount: 15000000, // ₹1,50,000 (paise)
    summary: 'For multi-sprint product work.',
    includes: [
      'Discovery sprint and architecture',
      'Weekly staging links from week one',
      'Credited against the project total',
    ],
    turnaround: 'Sprint booked after scoping call',
  },
];

/** Whole-rupee value, for copy and for the server's validation messages. */
export const rupees = (paise) => Math.round(paise / 100);

export const formatINR = (paise) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees(paise));

export const depositById = (id) => deposits.find((deposit) => deposit.id === id) ?? null;

export const paymentCopy = {
  title: 'Reserve a start date',
  lead:
    'A deposit holds a build slot and is credited against the project total. Card, UPI and netbanking are handled by Razorpay — no card details touch this site.',
  refund:
    'If the scope turns out to be wrong for us, the deposit is returned in full before work starts. Everything else is confirmed in writing.',
  taxes: 'Prices exclude taxes. Any applicable tax is added on the invoice, not silently at checkout.',
};
