/**
 * Amount lookup — the server's half of the deposit catalog.
 *
 * The browser sends `planId`; this module decides the price. Even if someone
 * forges the request body with `amount: 100`, the number used for the Razorpay
 * order comes from here.
 */
import { deposits, depositById, currency } from '../src/data/payments.js';

export function resolveDeposit(planId) {
  const deposit = depositById(planId);
  if (!deposit) {
    const error = new Error('unknown_plan');
    error.status = 400;
    throw error;
  }

  return {
    id: deposit.id,
    name: deposit.name,
    amount: deposit.amount,
    currency,
  };
}

export function publicCatalog() {
  return deposits.map((deposit) => ({
    id: deposit.id,
    name: deposit.name,
    summary: deposit.summary,
    includes: deposit.includes,
    turnaround: deposit.turnaround,
    amount: deposit.amount,
    currency,
  }));
}
