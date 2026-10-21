import useSeo from '../hooks/useSeo.js';
import ContactSection from '../components/ContactSection.jsx';
import SectionHead from '../components/SectionHead.jsx';
import Accordion from '../components/Accordion.jsx';
import Reveal from '../components/Reveal.jsx';
import { site } from '../data/site.js';

const nextSteps = [
  {
    number: '01',
    title: 'Tell us what you need',
    body: 'Send the brief with context: the problem, the constraint and the timing. A realistic budget range helps us answer honestly.',
  },
  {
    number: '02',
    title: 'We reply within a business day',
    body: 'You get a real response from the person who would do the work — questions, a recommendation, or an honest note that we are not the right fit.',
  },
  {
    number: '03',
    title: 'Scope, then build',
    body: 'If it is a match, we send a written scope with price and dates. Work starts after a deposit and a kickoff call.',
  },
];

const contactFaqs = [
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, before a detailed brief if you prefer. Send yours or ask for ours. We keep client information confidential regardless.',
  },
  {
    q: 'Can you work alongside our in-house team?',
    a: 'Often. We can lead a workstream, embed for a release, or review architecture before your team commits. We agree boundaries and communication up front.',
  },
  {
    q: 'What if we only have a rough idea?',
    a: 'That is normal. Start with the problem and the outcome you want. If the idea needs shaping, we scope a short paid discovery before a full build.',
  },
  {
    q: 'How do you price projects?',
    a: 'Fixed price after a short discovery. Marketing sites typically start around $3,000–$8,000; product and platform builds typically range from $12,000 to $40,000. You receive a written quote before anything begins.',
  },
  {
    q: 'How quickly can you start?',
    a: `Current availability: ${site.availability.toLowerCase()}. Small builds can usually start within two weeks of a signed scope; larger engagements are scheduled around the team’s capacity.`,
  },
];

export default function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Start a project with RYVEXORA. Tell us what you are building, what is in the way and when you need it live. Replies within one business day.',
    path: '/contact',
  });

  return (
    <div className="page contact-page">
      <h1 className="sr-only">Contact RYVEXORA</h1>
      <ContactSection breadcrumbs />

      <section className="section section--tight" aria-labelledby="next-heading">
        <div className="shell">
          <SectionHead
            eyebrow="What happens next"
            title={<span id="next-heading">Three steps. No mystery.</span>}
            lead="No discovery maze and no automated sales sequence. A person reads your brief and replies."
          />

          <div className="contact-next">
            {nextSteps.map((step, index) => (
              <Reveal className="contact-next__item" key={step.number} delay={index * 0.05}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="contact-faq-heading">
        <div className="shell faq-layout">
          <Reveal className="faq-layout__intro">
            <span className="eyebrow">Before you write</span>
            <h2 id="contact-faq-heading">A few answers up front.</h2>
            <p>
              Prefer email? Write to{' '}
              <a href={`mailto:${site.email}`} style={{ color: 'var(--cyan)' }}>
                {site.email}
              </a>{' '}
              — the same people read it.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion items={contactFaqs} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
