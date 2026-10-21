import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import useSeo from '../hooks/useSeo.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { setSceneProgress } from '../three/sceneState.js';
import { cn, isWebGLAvailable, prefersReducedMotion } from '../lib/utils.js';
import { services } from '../data/services.js';
import { projects } from '../data/projects.js';
import { capabilities, site } from '../data/site.js';

import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import ServiceVisual from '../components/ServiceVisual.jsx';
import TiltCard from '../components/TiltCard.jsx';
import ProjectPreview from '../components/ProjectPreview.jsx';
import ProcessRail from '../components/ProcessRail.jsx';
import WordSequence from '../components/WordSequence.jsx';
import ContactSection from '../components/ContactSection.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';

const HeroScene = lazy(() => import('../three/HeroScene.jsx'));

const STAGES = [
  {
    number: '01',
    tag: 'Innovation',
    title: 'Start with the actual problem.',
    copy: 'Before a single pixel, we interrogate the brief: what is changing, who it is for, and what would make this worth building at all.',
  },
  {
    number: '02',
    tag: 'Technology',
    title: 'Give it structure.',
    copy: 'Architecture, content model and stack are chosen together, so the system is buildable, maintainable and fast from the first release.',
  },
  {
    number: '03',
    tag: 'Intelligence',
    title: 'Connect the parts.',
    copy: 'Interfaces, data and automation share one source of truth, so work moves without being carried by hand.',
  },
  {
    number: '04',
    tag: 'Growth',
    title: 'Make it compound.',
    copy: 'We measure what changes behaviour and put effort where it compounds — not where it is easiest to look busy.',
  },
];

function detectQuality() {
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = navigator.deviceMemory ?? 8;
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

export default function Home() {
  useSeo({
    title: 'Build Beyond Limits',
    description:
      'RYVEXORA engineers digital experiences, intelligent automation and technology that moves businesses forward — web, AI, SEO, outreach and SaaS.',
    path: '/',
  });

  const reduced = useReducedMotion();
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const [sceneEnabled, setSceneEnabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.innerWidth >= 1000 &&
      !prefersReducedMotion() &&
      isWebGLAvailable(),
  );
  const [quality, setQuality] = useState(() =>
    typeof window === 'undefined' ? 'high' : detectQuality(),
  );

  useEffect(() => {
    const evaluate = () =>
      setSceneEnabled(
        window.innerWidth >= 1000 && !prefersReducedMotion() && isWebGLAvailable(),
      );
    evaluate();
    setQuality(detectQuality());
    window.addEventListener('resize', evaluate);
    return () => window.removeEventListener('resize', evaluate);
  }, [reduced]);

  // Cinematic hero entrance.
  useLayoutEffect(() => {
    if (reduced) return undefined;
    const scope = heroRef.current;
    if (!scope) return undefined;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.05 },
        delay: 0.12,
      });

      timeline
        .from('.hero__badge', { y: 16, autoAlpha: 0, duration: 0.7 })
        .from('.hero__line > span', { yPercent: 118, duration: 1.15, stagger: 0.09 }, '-=0.45')
        .from('.hero__lead', { y: 22, autoAlpha: 0, duration: 0.9 }, '-=0.8')
        .from('.hero__actions .btn', { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, '-=0.7')
        .from('.hero__trust', { y: 14, autoAlpha: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__aside', { y: 20, autoAlpha: 0, duration: 0.8 }, '-=0.9')
        .from('.hero__mobile-orb, .hero-fallback-orb', { autoAlpha: 0, scale: 0.88, duration: 1.4 }, 0.05);
    }, scope);

    return () => context.revert();
  }, [reduced]);

  // Map scroll position across the hero + story onto the 3D object.
  useLayoutEffect(() => {
    if (!sceneEnabled || !stageRef.current) return undefined;
    setSceneProgress(0);
    const trigger = ScrollTrigger.create({
      trigger: stageRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setSceneProgress(self.progress),
    });
    return () => trigger.kill();
  }, [sceneEnabled]);

  // Highlight the stage closest to the viewport centre.
  useLayoutEffect(() => {
    const wrapper = stageRef.current;
    if (!wrapper) return undefined;
    const stages = Array.from(wrapper.querySelectorAll('.story__stage'));
    const triggers = stages.map((stage) =>
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 68%',
        end: 'bottom 32%',
        onToggle: (self) => stage.classList.toggle('is-active', self.isActive),
      }),
    );
    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div className="page">
      <section className="hero-wrap" ref={stageRef}>
        <div className="scene-layer" aria-hidden="true">
          {sceneEnabled && (
            <ErrorBoundary fallback={null}>
              <Suspense fallback={null}>
                <HeroScene quality={quality} />
              </Suspense>
            </ErrorBoundary>
          )}
          <div className="scene-layer__vignette" />
        </div>

        <div className={cn('hero', !sceneEnabled && 'hero--fallback')} ref={heroRef}>
          {!sceneEnabled && (
            <div className="hero-fallback-orb" aria-hidden="true">
              <div className="orb" />
            </div>
          )}

          <div className="shell hero__grid">
            <div className="hero__content">
              <div className="hero__badge">
                <span className="badge">
                  <span className="badge__dot" />
                  Technology &amp; digital growth studio
                </span>
              </div>

              <div className="hero__mobile-orb" aria-hidden="true">
                <div className="orb" />
              </div>

              <h1 className="hero__title" aria-label="Build beyond limits.">
                <span className="hero__line">
                  <span>BUILD</span>
                </span>
                <span className="hero__line">
                  <span>BEYOND</span>
                </span>
                <span className="hero__line">
                  <span>
                    <em>LIMITS.</em>
                  </span>
                </span>
              </h1>

              <p className="hero__lead">
                We engineer digital experiences, intelligent automation, and technology that moves
                businesses forward.
              </p>

              <div className="btn-row hero__actions">
                <Button to="/services">Explore our services</Button>
                <Button to="/contact" variant="ghost" icon="arrow-right">
                  Start a project
                </Button>
              </div>

              <ul className="hero__trust">
                <li>Senior-led delivery</li>
                <li>Fixed-scope pricing</li>
                <li>You own the code</li>
              </ul>
            </div>

            <aside className="hero__aside" aria-label="Studio details">
              <div className="hero__aside-block">
                <span className="hero__aside-label">Studio</span>
                <span className="hero__aside-value">{site.location} · Worldwide</span>
              </div>
              <div className="hero__aside-block">
                <span className="hero__aside-label">Focus</span>
                <span className="hero__aside-value">Web · AI · Growth systems</span>
              </div>
              <div className="hero__aside-block">
                <span className="hero__aside-label">Availability</span>
                <span className="hero__aside-value">{site.availability}</span>
              </div>
              <span className="hero__scroll">
                Scroll to explore
                <span className="hero__scroll-line" />
              </span>
            </aside>
          </div>
        </div>

        <div className="story">
          <div className="shell">
            <div className="story__intro">
              <span className="eyebrow">The RYVEXORA method</span>
              <h2>One idea. Four states. A system that compounds.</h2>
              <p>
                Keep scrolling — the object evolves with you. Each state is a stage of the work:
                understanding, structure, connection, then measurable growth.
              </p>
            </div>

            <div className="story__stages">
              {STAGES.map((stage) => (
                <div className="story__stage" key={stage.number}>
                  <div className="story__stage-inner">
                    <div className="story__stage-head">
                      <span className="story__stage-num">STAGE {stage.number}</span>
                      <span className="story__stage-tag">{stage.tag}</span>
                    </div>
                    <h3>{stage.title}</h3>
                    <p>{stage.copy}</p>
                    <span className="story__cue">
                      <Icon name="sparkle" size={13} />
                      The object is evolving
                    </span>
                    <div className="story__progress" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="capability-strip">
        <div className="marquee">
          <div className="marquee__track">
            {capabilities.map((item) => (
              <span className="marquee__item" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="marquee__track" aria-hidden="true">
            {capabilities.map((item) => (
              <span className="marquee__item" key={`${item}-dup`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="intro-strip" aria-labelledby="intro-heading">
        <div className="shell intro-strip__grid">
          <Reveal as="h2" className="intro-strip__statement" id="intro-heading">
            We build the interface <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>and</em>{' '}
            the machinery behind it.
          </Reveal>
          <div className="intro-strip__body">
            <Reveal as="p" delay={0.05}>
              RYVEXORA is a technology and digital growth studio. We design and engineer websites, AI
              systems, automation and software products for teams that need the work to perform, not
              just launch.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Every engagement is senior-led, fixed-scope and measured against a business outcome.
              No layers of account management, no mystery invoices.
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/process" className="arrow-link">
                How we work
                <Icon name="arrow-up-right" size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section services-preview" id="services" aria-labelledby="services-heading">
        <div className="shell">
          <SectionHead
            eyebrow="Capabilities"
            title={
              <span id="services-heading">
                Six disciplines. <span className="text-gradient">One studio.</span>
              </span>
            }
            lead="Most problems need more than one skill. We keep strategy, design and engineering in the same room so the answer is coherent."
            action={
              <Link to="/services" className="arrow-link">
                All services
                <Icon name="arrow-up-right" size={15} />
              </Link>
            }
          />

          <div className="services-preview__grid">
            {services.map((service, index) => (
              <TiltCard className="service-card" key={service.slug} max={4}>
                <div className="service-card__head">
                  <span className="service-card__index">{service.index}</span>
                  <span className="service-card__tags">{service.stack[0]}</span>
                </div>

                <ServiceVisual variant={service.visual} accent={service.accent} />

                <h3 className="service-card__title">
                  <Link to={`/services/${service.slug}`}>{service.title}</Link>
                </h3>
                <p className="service-card__copy">{service.summary}</p>

                <div className="service-card__foot">
                  <div className="service-card__tags">
                    {service.stack.slice(1, 4).map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="service-card__arrow"
                    aria-label={`Explore ${service.title}`}
                    style={{ transitionDelay: `${index * 10}ms` }}
                  >
                    <Icon name="arrow-up-right" size={16} />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <WordSequence />

      <section className="section section--surface" aria-labelledby="process-heading">
        <div className="shell">
          <SectionHead
            eyebrow="Process"
            title={
              <span id="process-heading">
                A process you can see,
                <br />
                not a black box.
              </span>
            }
            lead="Five stages, each with a defined output. You always know what is being built, what it costs and what happens next."
            action={
              <Link to="/process" className="arrow-link">
                Full process
                <Icon name="arrow-up-right" size={15} />
              </Link>
            }
          />

          <Reveal>
            <ProcessRail />
          </Reveal>

          <Reveal className="btn-row" delay={0.1} style={{ marginTop: 44 }}>
            <Button to="/contact">Start a project</Button>
            <Button to="/process" variant="ghost" icon="arrow-right">
              See how we deliver
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section featured-work" aria-labelledby="work-heading">
        <div className="shell">
          <SectionHead
            eyebrow="Selected work"
            title={
              <span id="work-heading">
                Built to be judged
                <br />
                on what it does.
              </span>
            }
            lead="Concept builds we created to demonstrate product thinking and engineering craft. Every case states plainly what it is."
            action={
              <Link to="/work" className="arrow-link">
                All work
                <Icon name="arrow-up-right" size={15} />
              </Link>
            }
          />

          <div className="work-list">
            {projects.slice(0, 3).map((project) => (
              <Reveal key={project.slug}>
                <Link to={`/work/${project.slug}`} className="work-card">
                  <div className="work-card__content">
                    <div className="work-card__meta">
                      <span className="badge badge--neutral">{project.status}</span>
                      <span>{project.category}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="work-card__title">{project.name}</h3>
                    <p className="work-card__copy">{project.summary}</p>
                    <div className="work-card__tags">
                      {project.stack.slice(0, 3).map((tool) => (
                        <span className="chip" key={tool}>
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="arrow-link work-card__link">
                      View case study
                      <Icon name="arrow-up-right" size={15} />
                    </span>
                  </div>
                  <div className="work-card__media">
                    <ProjectPreview project={project} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
