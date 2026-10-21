import useSeo from '../hooks/useSeo.js';
import Button from '../components/Button.jsx';

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'This page could not be found. Head back to RYVEXORA or start a project.',
    path: '/404',
  });

  return (
    <div className="notfound">
      <div className="bg-grid" aria-hidden="true" />
      <div
        className="bg-glow glow-blue"
        aria-hidden="true"
        style={{ width: 520, height: 520, top: '10%', left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className="notfound__inner">
        <span className="eyebrow">Error 404</span>
        <div className="notfound__code" aria-hidden="true">
          404
        </div>
        <h1 className="h1">This page drifted out of orbit.</h1>
        <p>
          The link may be old, or the page may have moved. Nothing is broken — you can head back to the
          studio or tell us what you were looking for.
        </p>
        <div className="notfound__orb" aria-hidden="true">
          <div className="orb" />
        </div>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="ghost" icon="arrow-right">
            Tell us what you needed
          </Button>
        </div>
      </div>
    </div>
  );
}
