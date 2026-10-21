import useSeo from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import { principles } from '../data/process.js';
import { capabilities, clientFacingPromises } from '../data/site.js';

const boundaries = [
  'Promise rankings, meeting counts or revenue we cannot control.',
  'Publish invented case studies, borrowed logos or fake testimonials.',
  'Pad a scope to win a bigger invoice.',
  'Take on work we do not have the capacity to deliver properly.',
];

export default function About() {
  useSeo({
    title: 'About',
    description:
      'RYVEXORA is a senior-led technology and digital growth studio. Small team, explicit scope, evidence over adjectives.',
    path: '/about',
  });

  return (
    <div className="page">
      <PageHero
        eyebrow="About the studio"
        title={
          <>
            Small team.{' '}
            <br />
            Senior work.{' '}
            <br />
            <span className="text-gradient">No theatre.</span>
          </>
        }
        lead="RYVEXORA is a technology and digital growth studio. We design and engineer the systems ambitious teams rely on — and we say what we actually think."
        crumbs={[{ label: 'About' }]}
        meta={
          <>
            <span className="chip chip--accent">Mumbai · Working worldwide</span>
            <span className="chip">Senior-led</span>
            <span className="chip">Fixed-scope</span>
          </>
        }
      />

      <section className="section" aria-labelledby="about-intro-heading">
        <div className="shell about-intro">
          <Reveal as="h2" className="about-intro__statement" id="about-intro-heading">
            We would rather build one useful system than present <em>ten beautiful screens.</em>
          </Reveal>
          <div className="about-intro__body">
            <Reveal as="p" delay={0.05}>
              RYVEXORA exists because too many good businesses were paying agencies for process
              instead of outcomes. Long discovery decks, account layers and redesigns with no
              commercial reason behind them.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              We keep the team small and the scope explicit. The people who scope your project are the
              people who design and build it. You talk to engineers, not intermediaries.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              We work across web, AI, automation, search and product engineering because real problems
              rarely arrive one discipline at a time. Sometimes the right answer is a website.
              Sometimes it is a workflow, a data model or a single well-placed automation. We will tell
              you which.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="principles-heading">
        <div className="shell">
          <SectionHead
            eyebrow="Operating principles"
            title={<span id="principles-heading">Six rules we do not bend.</span>}
            lead="They are not values on a wall. They decide what we build, what we charge for and what we turn down."
          />

          <div className="principles-grid">
            {principles.map((principle) => (
              <Reveal className="principle" key={principle.number}>
                <span className="principle__num">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="fit-heading">
        <div className="shell">
          <SectionHead
            eyebrow="Honest fit"
            title={<span id="fit-heading">Clear about what we do — and what we refuse.</span>}
            lead="A studio that says yes to everything is a studio that does nothing particularly well."
          />

          <div className="about-split">
            <Reveal>
              <h2 className="h3">What we are good at</h2>
              <p>
                Senior product thinking, interface design and production engineering — with enough
                growth experience to know when a build will not pay for itself.
              </p>
              <div className="chip-row" style={{ marginTop: 20 }}>
                {capabilities.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="h3">What we will not do</h2>
              <ul className="bullet-list" style={{ marginTop: 4 }}>
                {boundaries.map((item) => (
                  <li key={item}>
                    <Icon name="alert" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--surface section--tight" aria-labelledby="promises-heading">
        <div className="shell">
          <div className="about-split">
            <Reveal>
              <span className="eyebrow">Working together</span>
              <h2 id="promises-heading" style={{ marginTop: 16 }}>
                What you can expect.
              </h2>
              <p>
                Remote-first, async by default, with scheduled calls only when a decision needs one.
                You get a staging link that always reflects the latest build.
              </p>
              <p>
                Code, repositories and infrastructure accounts are set up in your name. If you leave,
                everything leaves with you.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="promise-list">
              {clientFacingPromises.map((promise) => (
                <div className="promise" key={promise}>
                  <Icon name="check" size={16} />
                  <span>{promise}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="A short conversation beats a long proposal."
        lead="Tell us what you are building and what is getting in the way. If we are not the right fit, we will say so and point you somewhere better."
        primaryLabel="Start a project"
        secondaryLabel="See our work"
        secondaryTo="/work"
      />
    </div>
  );
}
