import { Link, useParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { getNextProject, getProject } from '../data/projects.js';
import { site } from '../data/site.js';
import ProjectPreview from '../components/ProjectPreview.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import NotFound from './NotFound.jsx';

export default function WorkDetail() {
  const { slug } = useParams();
  const project = getProject(slug ?? '');

  useSeo({
    title: project ? project.name : 'Project not found',
    description: project?.summary,
    path: `/work/${slug ?? ''}`,
    type: 'article',
  });

  if (!project) return <NotFound />;

  const next = getNextProject(project.slug);

  return (
    <div className="page">
      <header className="case-hero">
        <div className="bg-grid" aria-hidden="true" />
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/work">Work</Link>
            <span aria-hidden="true">/</span>
            <span>{project.name}</span>
          </nav>

          <div className="case-hero__top">
            <span className="badge badge--neutral">
              <span className="badge__dot" />
              {project.status}
            </span>
            <span className="chip">{project.category}</span>
            <span className="chip">{project.year}</span>
          </div>

          <h1>{project.name}</h1>
          <p className="case-hero__lead">{project.tagline}</p>

          <dl className="case-hero__meta">
            <div>
              <dt>Scope</dt>
              <dd>{project.scope}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Concept build</dd>
            </div>
            <div>
              <dt>Discipline</dt>
              <dd>{project.category.split(' · ')[0]}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="case-media" aria-label="Project preview">
        <div className="shell">
          <Reveal className="case-media__frame">
            <ProjectPreview project={project} />
            <div className="case-media__caption">
              <span>Interface preview · illustrative data</span>
              <span>{project.name}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="notice" style={{ marginBottom: 40 }}>
            <Icon name="info" size={16} />
            <span>{project.disclaimer}</span>
          </div>

          <div className="case-layout">
            <div>
              <Reveal className="case-section">
                <h2>
                  <span>01</span>
                  The challenge
                </h2>
                <p>{project.challenge}</p>
              </Reveal>

              <Reveal className="case-section">
                <h2>
                  <span>02</span>
                  Our approach
                </h2>
                <p>{project.approach}</p>
              </Reveal>

              <Reveal className="case-section">
                <h2>
                  <span>03</span>
                  What we built
                </h2>
                <ul className="bullet-list">
                  {project.built.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="case-section">
                <h2>
                  <span>04</span>
                  What the build demonstrates
                </h2>
                <ul className="outcome-list">
                  {project.outcome.map((item) => (
                    <li key={item}>
                      <Icon name="sparkle" size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal as="aside" className="case-aside" delay={0.05}>
              <h2>Project facts</h2>
              <div className="detail-aside__row">
                <span className="detail-aside__label">Type</span>
                <span className="detail-aside__value">Self-initiated concept build</span>
              </div>
              <div className="detail-aside__row">
                <span className="detail-aside__label">Scope</span>
                <span className="detail-aside__value">{project.scope}</span>
              </div>
              <div className="detail-aside__row">
                <span className="detail-aside__label">Stack</span>
                <span className="chip-row" style={{ marginTop: 8 }}>
                  {project.stack.map((tool) => (
                    <span className="chip" key={tool}>
                      {tool}
                    </span>
                  ))}
                </span>
              </div>
              <p>
                Have a similar problem in production? The constraints are usually messier than a
                concept. That is the part we are good at.
              </p>
              <a href={`mailto:${site.email}`} className="arrow-link">
                Discuss your project
                <Icon name="arrow-up-right" size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-label="Next project">
        <div className="shell">
          <Link to={`/work/${next.slug}`} className="next-project">
            <div>
              <span className="next-project__label">Next project</span>
              <h2>{next.name}</h2>
            </div>
            <span className="service-card__arrow" aria-hidden="true">
              <Icon name="arrow-up-right" size={18} />
            </span>
          </Link>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
