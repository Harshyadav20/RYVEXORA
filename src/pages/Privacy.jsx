import useSeo from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import { site } from '../data/site.js';

export default function Privacy() {
  useSeo({
    title: 'Privacy notice',
    description: 'How RYVEXORA handles the information you share through this website.',
    path: '/privacy',
  });

  return (
    <div className="page">
      <PageHero
        eyebrow="Legal"
        title="Privacy notice."
        lead="A plain-language account of what this website collects, why, and how to have it removed."
        crumbs={[{ label: 'Privacy' }]}
      />

      <section className="section">
        <div className="shell">
          <div className="prose">
            <p className="prose__updated">Last updated · 21 October 2026</p>

            <h2>Who we are</h2>
            <p>
              RYVEXORA is a technology and digital growth studio based in {site.location}. For any
              question about this notice or your data, write to{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>What this site collects</h2>
            <ul>
              <li>
                <strong>Project inquiry details.</strong> The information you enter in the contact
                form: name, email, company, website, selected service, budget range and your message.
              </li>
              <li>
                <strong>A local draft.</strong> While you type, the form saves an unfinished draft in
                your browser&rsquo;s local storage so a refresh does not lose your brief. It stays on
                your device and can be cleared by clearing site data.
              </li>
              <li>
                <strong>Technical logs.</strong> Our hosting provider may record standard request logs
                (IP address, user agent, timestamp) for security and reliability.
              </li>
            </ul>

            <h2>How inquiries are transmitted</h2>
            <p>
              If this site is connected to a form endpoint, the details are sent to that processor and
              then to our inbox. If it is not connected, your inquiry is prepared as an email draft in
              your own mail application — nothing is transmitted until you send it.
            </p>

            <h2>Why we use it</h2>
            <p>
              To read and respond to your inquiry, to scope potential work, and to keep a record of
              conversations with prospective clients. We do not sell your details, rent them to third
              parties, or add you to a marketing list without your explicit consent.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This build does not set advertising cookies and does not load third-party tracking
              scripts. If privacy-respecting analytics are added later, this notice will be updated
              before they go live.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Inquiries are kept for up to twelve months from the last message, then deleted unless we
              are working together or the law requires us to retain them longer.
            </p>

            <h2>Your rights</h2>
            <p>
              Depending on where you live, you may have the right to access, correct, export or delete
              the personal data we hold about you, and to object to certain processing. Email{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within a reasonable
              period, normally within 30 days.
            </p>

            <h2>Security</h2>
            <p>
              Access to inquiry data is limited to the people who need it to reply. We use
              authenticated, encrypted services for email and hosting. No system is perfectly secure,
              so please do not send passwords, payment details or sensitive personal data through the
              form.
            </p>

            <h2>Changes</h2>
            <p>
              If this notice changes materially, the updated version will be published here with a new
              date.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
