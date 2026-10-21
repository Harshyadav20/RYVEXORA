import useSeo from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import SectionHead from '../components/SectionHead.jsx';
import ProcessRail from '../components/ProcessRail.jsx';
import Accordion from '../components/Accordion.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { faqs, processSteps } from '../data/process.js';

export default function Process() {
  useSeo({
    title: 'Process',
    description:
      'Five stages — Discover, Design, Develop, Deploy and Optimise — each with a defined output. No black boxes, no surprise invoices.',
    path: '/process',
  });

  return (
    <div className="page">
      <PageHero
        eyebrow="How we work"
        title={
          <>
            A process built to{' '}
            <br />
            <span className="text-gradient">remove surprises.</span>
          </>
        }
        lead="Five stages, each with a defined output and a clear decision point. You always know what is being built, what it costs and what happens next."
        crumbs={[{ label: 'Process' }]}
        meta={
          <>
            <span className="chip chip--accent">Fixed scope</span>
            <span className="chip">Weekly written updates</span>
            <span className="chip">Staging link, always current</span>
          </>
        }
      />

      <section className="section" aria-label="Process overview">
        <div className="shell">
          <Reveal>
            <ProcessRail />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface section--flush-top" aria-labelledby="phases-heading">
        <div className="shell">
          <SectionHead
            eyebrow="Stage by stage"
            title={<span id="phases-heading">What actually happens.</span>}
            lead="No document for the sake of a document. Each stage produces something you can review, use or hand to another team."
          />

          {processSteps.map((step) => (
            <Reveal className="phase" key={step.slug}>
              <div className="phase__number">
                {step.number}
                <span>{step.duration}</span>
              </div>
              <div className="phase__main">
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
              <div className="phase__outputs">
                <h3>Outputs</h3>
                <ul>
                  {step.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="process-faq-heading">
        <div className="shell faq-layout">
          <Reveal className="faq-layout__intro">
            <span className="eyebrow">Questions</span>
            <h2 id="process-faq-heading">Before we start.</h2>
            <p>
              If something is not covered here, ask directly. We would rather answer a hard question
              now than discover a mismatch in week five.
            </p>
            <a href="mailto:hello@ryvexora.com" className="arrow-link">
              Email the studio
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Ready when you are."
        lead="Bring the problem, the constraint and the deadline. We will bring an honest plan and a fixed price."
        primaryLabel="Start a project"
        secondaryLabel="See services"
        secondaryTo="/services"
      />
    </div>
  );
}
