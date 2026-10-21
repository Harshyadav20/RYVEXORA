import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import ProjectPreview from '../components/ProjectPreview.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { projects } from '../data/projects.js';
import { cn } from '../lib/utils.js';

export default function Work() {
  useSeo({
    title: 'Selected work',
    description:
      'Concept products and interfaces built by RYVEXORA — revenue software, headless commerce, AI operations, programmatic SEO and outbound tooling.',
    path: '/work',
  });

  return (
    <div className="page">
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Built to be judged{' '}
            <br />
            <span className="text-gradient">on what it does.</span>
          </>
        }
        lead="Product concepts and interface systems we designed and engineered ourselves. They show how we think and how we build — not who our clients are."
        crumbs={[{ label: 'Work' }]}
      />

      <section className="section section--tight" aria-label="Project archive">
        <div className="shell">
          <div className="notice" style={{ marginBottom: 34 }}>
            <Icon name="info" size={16} />
            <span>
              Transparency note: every project below is a self-initiated concept build. No client
              logos, testimonials, awards or performance statistics are represented. Where real client
              work is shown, it will be labelled as such.
            </span>
          </div>

          <div className="work-index">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 0.05}>
                <Link
                  to={`/work/${project.slug}`}
                  className={cn('project-card', index === 0 && 'project-card--featured')}
                >
                  <div className="project-card__media">
                    <ProjectPreview project={project} tall={index !== 0} />
                  </div>
                  <div className="project-card__body">
                    <div className="project-card__meta">
                      <span className="badge badge--neutral">
                        <span className="badge__dot" />
                        {project.status}
                      </span>
                      <span>{project.category}</span>
                      <span>· {project.year}</span>
                    </div>
                    <h2>{project.name}</h2>
                    <p>{project.summary}</p>
                    <div className="project-card__foot">
                      <span className="chip-row">
                        {project.stack.slice(0, 3).map((tool) => (
                          <span className="chip" key={tool}>
                            {tool}
                          </span>
                        ))}
                      </span>
                      <span className="arrow-link">
                        View case
                        <Icon name="arrow-up-right" size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Break the pattern"
        title="Your project could be next."
        lead="We take on a small number of engagements at a time so senior people stay on the work. Tell us what you are building."
        primaryLabel="Start a project"
        secondaryLabel="See our services"
        secondaryTo="/services"
      />
    </div>
  );
}
