import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { services } from '../data/services.js';
import { budgets, budgetsNote, site } from '../data/site.js';
import { buildBrief, emptyInquiry, validateInquiry } from '../lib/validation.js';
import { mailtoLink } from '../lib/utils.js';

const STORAGE_KEY = 'ryvexora:inquiry-draft';
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export default function ContactForm() {
  const [values, setValues] = useState(emptyInquiry);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef(null);
  const restored = useRef(false);

  // Restore an unfinished draft so a refresh does not lose the brief.
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setValues((current) => ({ ...current, ...parsed, trap: '' }));
        }
      }
    } catch {
      /* storage may be unavailable — the form still works */
    }
  }, []);

  useEffect(() => {
    if (status === 'success') return;
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...values, trap: '' }));
      } catch {
        /* ignore quota / privacy mode errors */
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [values, status]);

  const mailto = useMemo(
    () => mailtoLink(site.email, `Project inquiry — ${values.name || 'New project'}`, buildBrief(values)),
    [values],
  );

  const update = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
    if (status === 'error') setStatus('idle');
  };

  const handleChange = (event) => update(event.target.name, event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Honeypot: real people never fill this hidden field.
    if (values.trap) {
      setStatus('success');
      return;
    }

    const found = validateInquiry(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      window.setTimeout(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      }, 30);
      return;
    }

    if (!ENDPOINT) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    setSubmitError('');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, page: window.location.href, sentAt: new Date().toISOString() }),
      });

      if (!response.ok) throw new Error(`Submission failed with status ${response.status}`);

      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setStatus('success');
    } catch (error) {
      setSubmitError(
        'We could not send the form from the browser. Please use the email button below — your details are saved.',
      );
      setStatus('error');
    }
  };

  const restart = () => {
    setStatus('idle');
    setErrors({});
  };

  if (status === 'success') {
    return (
      <div className="form__success" role="status" aria-live="polite">
        <span className="badge">
          <span className="badge__dot" />
          {ENDPOINT ? 'Message received' : 'Brief prepared'}
        </span>

        <h3>{ENDPOINT ? 'Brief received.' : 'One last step.'}</h3>

        <p>
          {ENDPOINT ? (
            <>
              Thanks{values.name ? `, ${values.name.split(' ')[0]}` : ''}. We will reply to{' '}
              <strong style={{ color: 'var(--text)' }}>{values.email}</strong> within one business day.
            </>
          ) : (
            <>
              This site is not connected to a mail endpoint yet, so open the prepared draft in your
              email app — it already contains your brief. Or write to{' '}
              <a href={`mailto:${site.email}`} style={{ color: 'var(--cyan)' }}>
                {site.email}
              </a>
              .
            </>
          )}
        </p>

        <dl className="definition-list" style={{ width: '100%' }}>
          <div>
            <dt>Service</dt>
            <dd>{values.service}</dd>
          </div>
          <div>
            <dt>Budget</dt>
            <dd>{values.budget}</dd>
          </div>
          <div>
            <dt>Reply to</dt>
            <dd>{values.email}</dd>
          </div>
        </dl>

        <div className="btn-row" style={{ marginTop: 8 }}>
          <Button href={mailto} icon="send">
            {ENDPOINT ? 'Email us instead' : 'Open email draft'}
          </Button>
          <Button variant="ghost" onClick={restart} icon="arrow-right" showIcon={false}>
            Edit details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="contact-form__head">
        <h3>Project inquiry</h3>
        <span>{site.responseTime}</span>
      </div>

      {status === 'error' && (
        <div className="form__status" role="alert">
          <Icon name="alert" size={16} />
          <span>{submitError}</span>
        </div>
      )}

      <div className="form-grid">
        <div className="field">
          <label className="field__label" htmlFor="inq-name">
            Name <span className="field__req">*</span>
          </label>
          <input
            className="input"
            id="inq-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          {errors.name && (
            <span className="field__error" id="err-name">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="inq-email">
            Email <span className="field__req">*</span>
          </label>
          <input
            className="input"
            id="inq-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && (
            <span className="field__error" id="err-email">
              {errors.email}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="inq-company">
            Company <span>optional</span>
          </label>
          <input
            className="input"
            id="inq-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            value={values.company}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="inq-website">
            Website <span>optional</span>
          </label>
          <input
            className="input"
            id="inq-website"
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            value={values.website}
            onChange={handleChange}
            aria-invalid={errors.website ? 'true' : undefined}
            aria-describedby={errors.website ? 'err-website' : undefined}
          />
          {errors.website && (
            <span className="field__error" id="err-website">
              {errors.website}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="inq-service">
            Service needed <span className="field__req">*</span>
          </label>
          <select
            className="select"
            id="inq-service"
            name="service"
            value={values.service}
            onChange={handleChange}
            aria-invalid={errors.service ? 'true' : undefined}
            aria-describedby={errors.service ? 'err-service' : undefined}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option value={service.title} key={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="Multiple services / partnership">Multiple services / partnership</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
          {errors.service && (
            <span className="field__error" id="err-service">
              {errors.service}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="inq-budget">
            Budget range <span className="field__req">*</span>
          </label>
          <select
            className="select"
            id="inq-budget"
            name="budget"
            value={values.budget}
            onChange={handleChange}
            aria-invalid={errors.budget ? 'true' : undefined}
            aria-describedby={errors.budget ? 'err-budget' : undefined}
          >
            <option value="">Select a range</option>
            {budgets.map((budget) => (
              <option value={budget} key={budget}>
                {budget}
              </option>
            ))}
          </select>
          {errors.budget && (
            <span className="field__error" id="err-budget">
              {errors.budget}
            </span>
          )}
          <span className="form__note">{budgetsNote}</span>
        </div>

        <div className="field field--full">
          <label className="field__label" htmlFor="inq-message">
            Project details <span className="field__req">*</span>
          </label>
          <textarea
            className="textarea"
            id="inq-message"
            name="message"
            placeholder="What are you building, what is in the way, and when would you like it live?"
            value={values.message}
            onChange={handleChange}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'err-message' : undefined}
          />
          {errors.message && (
            <span className="field__error" id="err-message">
              {errors.message}
            </span>
          )}
        </div>

        {/* Honeypot — visually hidden, ignored by assistive tech */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="inq-trap">Leave this field empty</label>
          <input
            id="inq-trap"
            name="trap"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.trap}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__foot">
        <Button type="submit" icon={status === 'sending' ? 'clock' : 'arrow-up-right'} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send inquiry'}
        </Button>
        <p className="form__note">
          We use your details only to reply to this inquiry. See the{' '}
          <Link to="/privacy" style={{ color: 'var(--muted)' }}>
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
