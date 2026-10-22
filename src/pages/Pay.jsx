import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import Button from '../components/Button.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { deposits, formatINR, paymentCopy, currency } from '../data/payments.js';
import { getPaymentConfig, payDeposit, describeError } from '../lib/checkout.js';
import { site } from '../data/site.js';

const STEPS = ['Choose', 'Details', 'Pay'];

const emptyCustomer = { name: '', email: '', company: '' };

export default function Pay() {
  useSeo({
    title: 'Reserve a start date',
    description:
      'Pay a project deposit by card, UPI or netbanking. The deposit holds a build slot and is credited against the project total.',
    path: '/pay',
  });

  const [gateway, setGateway] = useState({ status: 'loading', configured: false, mode: 'preview', reason: null });
  const [planId, setPlanId] = useState(deposits[1]?.id ?? deposits[0].id);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState('idle'); // idle | creating | verifying | paid | error | cancelled
  const [message, setMessage] = useState('');
  const [receipt, setReceipt] = useState(null);
  const statusRef = useRef(null);

  useEffect(() => {
    let alive = true;
    getPaymentConfig()
      .then((config) => {
        if (!alive) return;
        setGateway({
          status: 'ready',
          configured: Boolean(config.configured),
          mode: config.mode ?? 'preview',
          reason: config.reason ?? null,
        });
      })
      .catch(() => {
        if (!alive) return;
        setGateway({ status: 'unavailable', configured: false, mode: 'preview', reason: 'api_unreachable' });
      });
    return () => {
      alive = false;
    };
  }, []);

  const plan = useMemo(() => deposits.find((d) => d.id === planId) ?? deposits[0], [planId]);

  // Keep the visible step honest about where the visitor actually is.
  const step = phase === 'paid' ? 3 : customer.name && customer.email ? 2 : 1;

  const canPay =
    gateway.configured &&
    !['creating', 'verifying'].includes(phase) &&
    customer.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customer.email.trim());

  const update = (field) => (event) => {
    setCustomer((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (phase === 'error' || phase === 'cancelled') setPhase('idle');
  };

  const validate = () => {
    const next = {};
    if (customer.name.trim().length < 2) next.name = 'Enter the name the payment should be recorded against.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customer.email.trim())) next.email = 'Enter an email for the receipt.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onPay = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setPhase('creating');
    setMessage('');

    try {
      setPhase('verifying');
      const result = await payDeposit({ planId: plan.id, customer: { ...customer, company: customer.company.trim() } });
      setReceipt(result);
      setPhase('paid');
      setMessage('');
      window.setTimeout(() => statusRef.current?.focus(), 60);
    } catch (error) {
      if (error?.cancelled) {
        setPhase('cancelled');
        setMessage(describeError(error));
        return;
      }
      setPhase('error');
      setMessage(error?.detail ? `${describeError(error)} ${error.detail}` : describeError(error));
    }
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Deposit enquiry — ${plan.name}`,
  )}&body=${encodeURIComponent(
    `Name: ${customer.name || '—'}\nEmail: ${customer.email || '—'}\nCompany: ${customer.company || '—'}\nDeposit: ${plan.name} (${formatINR(plan.amount)})`,
  )}`;

  return (
    <div className="page pay">
      <header className="pay-hero">
        <div className="bg-grid" aria-hidden="true" />
        <span className="pay-hero__glow" aria-hidden="true" />
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Reserve</span>
          </nav>

          <div className="pay-hero__layout">
            <div>
              <span className="eyebrow">Deposit &amp; booking</span>
              <h1 className="pay-hero__title">
                Reserve a start date.
                <br />
                <span className="text-gradient">Pay the deposit.</span>
              </h1>
              <p className="lead">{paymentCopy.lead}</p>
            </div>

            <aside className="pay-trust" aria-label="How payment is handled">
              <div className="pay-trust__row">
                <Icon name="lock" size={15} />
                <div>
                  <b>Card details never touch this site</b>
                  <span>Razorpay hosts the checkout and the card form.</span>
                </div>
              </div>
              <div className="pay-trust__row">
                <Icon name="shield" size={15} />
                <div>
                  <b>Server-verified payments</b>
                  <span>Every payment is checked against a signature and against Razorpay itself.</span>
                </div>
              </div>
              <div className="pay-trust__row">
                <Icon name="globe" size={15} />
                <div>
                  <b>UPI, cards, netbanking</b>
                  <span>INR only. Tax invoices are issued by the studio.</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section className="section section--flush-top pay-body" aria-label="Deposit checkout">
        <div className="shell">
          <GatewayNotice gateway={gateway} />

          <div className="pay-layout">
            <form className="pay-form" onSubmit={onPay} noValidate>
              <ol className="pay-steps" aria-label="Checkout progress">
                {STEPS.map((label, index) => (
                  <li
                    key={label}
                    className={step > index ? 'is-done' : step === index + 1 ? 'is-current' : ''}
                    aria-current={step === index + 1 ? 'step' : undefined}
                  >
                    <span aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ol>

              {phase === 'paid' ? (
                <PaidPanel ref={statusRef} receipt={receipt} plan={plan} />
              ) : (
                <>
                  <section className="pay-block" aria-labelledby="pay-step-1">
                    <h2 className="pay-block__title" id="pay-step-1">
                      <span className="pay-block__num">01</span>
                      What are you paying for?
                    </h2>

                    <div className="pay-plans" role="radiogroup" aria-label="Deposit">
                      {deposits.map((option) => {
                        const selected = option.id === plan.id;
                        return (
                          <label key={option.id} className={`pay-plan${selected ? ' is-on' : ''}`}>
                            <input
                              type="radio"
                              name="plan"
                              value={option.id}
                              checked={selected}
                              onChange={() => setPlanId(option.id)}
                            />
                            <span className="pay-plan__radio" aria-hidden="true" />
                            <span className="pay-plan__body">
                              <span className="pay-plan__top">
                                <b>{option.name}</b>
                                <span className="pay-plan__price">{formatINR(option.amount)}</span>
                              </span>
                              <span className="pay-plan__copy">{option.summary}</span>
                              <span className="pay-plan__meta">{option.turnaround}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </section>

                  <section className="pay-block" aria-labelledby="pay-step-2">
                    <h2 className="pay-block__title" id="pay-step-2">
                      <span className="pay-block__num">02</span>
                      Who is this for?
                    </h2>

                    <div className="pay-fields">
                      <div className={`pay-field${errors.name ? ' is-invalid' : ''}`}>
                        <label htmlFor="pay-name">Full name</label>
                        <input
                          id="pay-name"
                          name="name"
                          autoComplete="name"
                          value={customer.name}
                          onChange={update('name')}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'pay-name-error' : undefined}
                          placeholder="As it should appear on the receipt"
                        />
                        {errors.name && (
                          <p className="pay-field__error" id="pay-name-error">
                            <Icon name="alert" size={12} /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div className={`pay-field${errors.email ? ' is-invalid' : ''}`}>
                        <label htmlFor="pay-email">Email for the receipt</label>
                        <input
                          id="pay-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={customer.email}
                          onChange={update('email')}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'pay-email-error' : undefined}
                          placeholder="you@company.com"
                        />
                        {errors.email && (
                          <p className="pay-field__error" id="pay-email-error">
                            <Icon name="alert" size={12} /> {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="pay-field pay-field--full">
                        <label htmlFor="pay-company">
                          Company <span className="pay-optional">optional</span>
                        </label>
                        <input
                          id="pay-company"
                          name="company"
                          autoComplete="organization"
                          value={customer.company}
                          onChange={update('company')}
                          placeholder="For the invoice header"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="pay-block" aria-labelledby="pay-step-3">
                    <h2 className="pay-block__title" id="pay-step-3">
                      <span className="pay-block__num">03</span>
                      Pay
                    </h2>

                    <div className="pay-pay">
                      <button
                        type="submit"
                        className="btn btn--lg btn--block"
                        disabled={!canPay}
                        aria-describedby="pay-note"
                      >
                        <span className="btn__label">
                          {phase === 'creating' && 'Opening checkout…'}
                          {phase === 'verifying' && 'Verifying payment…'}
                          {!['creating', 'verifying'].includes(phase) && `Pay ${formatINR(plan.amount)}`}
                          {!['creating', 'verifying'].includes(phase) && (
                            <Icon name="lock" size={15} />
                          )}
                        </span>
                      </button>

                      <p className="pay-note" id="pay-note">
                        {gateway.configured
                          ? 'You will be taken to Razorpay’s secure checkout. Nothing is charged until you confirm there.'
                          : 'Payment is disabled until a gateway is connected. You can send the same details by email instead.'}
                      </p>

                      <a className="arrow-link pay-mail" href={mailto}>
                        Email the same details instead
                        <Icon name="arrow-up-right" size={14} />
                      </a>
                    </div>
                  </section>

                  <div className="pay-status" role="status" aria-live="polite" ref={statusRef} tabIndex={-1}>
                    {message && (
                      <p className={`pay-alert${phase === 'error' ? ' pay-alert--bad' : ''}`}>
                        <Icon name={phase === 'error' ? 'alert' : 'info'} size={14} />
                        {message}
                      </p>
                    )}
                    {phase === 'verifying' && (
                      <p className="pay-alert">
                        <Icon name="clock" size={14} />
                        Confirming the payment with Razorpay. Do not close this tab.
                      </p>
                    )}
                  </div>
                </>
              )}
            </form>

            <aside className="pay-summary" aria-label="Order summary">
              <div className="pay-summary__card">
                <span className="pay-summary__label">Order summary</span>
                <div className="pay-summary__row">
                  <span>Deposit</span>
                  <b>{plan.name}</b>
                </div>
                <div className="pay-summary__row">
                  <span>Currency</span>
                  <b>{currency}</b>
                </div>
                <div className="pay-summary__row">
                  <span>Processing</span>
                  <b>Razorpay</b>
                </div>
                <div className="pay-summary__total">
                  <span>Due now</span>
                  <strong>{formatINR(plan.amount)}</strong>
                </div>
                <p className="pay-summary__tax">{paymentCopy.taxes}</p>

                <ul className="pay-summary__includes">
                  {plan.includes.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={12} />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="pay-summary__refund">{paymentCopy.refund}</p>
              </div>

              <div className="pay-summary__help">
                <span className="pay-summary__label">Before you pay</span>
                <p>
                  Deposits reserve a slot. Send the brief first if you are not sure the scope is right —
                  we will tell you honestly whether it is.
                </p>
                <Link className="arrow-link" to="/contact">
                  Send the brief first
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Not ready to pay"
        title="Talk to us before any money moves."
        lead="A deposit is the last step, not the first. If you are still deciding, send the problem and we will reply with scope, cost and whether we are the right studio for it."
        primaryLabel="Start a conversation"
        secondaryLabel="See how we work"
        secondaryTo="/process"
      />
    </div>
  );
}

/* ------------------------------------------------------------- sub-components */

function GatewayNotice({ gateway }) {
  if (gateway.status === 'loading') {
    return (
      <Reveal className="pay-gateway pay-gateway--quiet">
        <Icon name="clock" size={15} />
        <p>Checking the payment gateway…</p>
      </Reveal>
    );
  }

  if (gateway.configured) {
    return (
      <Reveal className={`pay-gateway${gateway.mode === 'test' ? ' pay-gateway--test' : ''}`}>
        <Icon name="shield" size={15} />
        <p>
          <b>{gateway.mode === 'test' ? 'Test mode' : 'Payments are live'}</b>
          {gateway.mode === 'test'
            ? ' — Razorpay test keys are configured. Nothing is charged to a real card.'
            : ' — Razorpay is connected and payments are verified server-side.'}
        </p>
      </Reveal>
    );
  }

  const unreachable = gateway.status === 'unavailable';

  return (
    <Reveal className="pay-gateway pay-gateway--off">
      <Icon name="alert" size={15} />
      <div>
        <p>
          <b>Gateway not connected</b>
          {unreachable
            ? ' — the payment API did not respond, so this page is showing its preview state.'
            : ' — no Razorpay credentials are set on this deployment, so this page cannot take money.'}
        </p>
        <p className="pay-gateway__hint">
          Set <code>RAZORPAY_KEY_ID</code> and <code>RAZORPAY_KEY_SECRET</code> in the environment to
          switch it on. Amounts and server verification are already wired.
        </p>
      </div>
    </Reveal>
  );
}

function PaidPanel({ receipt, plan, ref }) {
  return (
    <div className="pay-paid" tabIndex={-1} ref={ref}>
      <span className="pay-paid__mark" aria-hidden="true">
        <Icon name="check" size={22} />
      </span>
      <h2>Payment verified</h2>
      <p>
        {formatINR(receipt?.amount ?? plan.amount)} received for the {plan.name.toLowerCase()}. A receipt
        is on its way to your inbox.
      </p>

      <dl className="pay-paid__meta">
        <div>
          <dt>Reference</dt>
          <dd>{receipt?.reference ?? '—'}</dd>
        </div>
        <div>
          <dt>Payment ID</dt>
          <dd>{receipt?.paymentId ?? '—'}</dd>
        </div>
        <div>
          <dt>Method</dt>
          <dd>{receipt?.method ?? '—'}</dd>
        </div>
        <div>
          <dt>Mode</dt>
          <dd>{receipt?.mode === 'test' ? 'Test' : 'Live'}</dd>
        </div>
      </dl>

      <p className="pay-paid__note">
        Keep the reference above. A tax invoice is issued from the studio, not by this page.
      </p>

      <div className="btn-row">
        <Button to="/contact">Send the brief</Button>
        <Button to="/process" variant="ghost">
          What happens next
        </Button>
      </div>
    </div>
  );
}
