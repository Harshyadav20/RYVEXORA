/**
 * Regenerate php/includes/data.php from the React content model.
 *
 *   node tools/sync-php-data.mjs
 *   npm run content:sync
 *
 * The React edition is the source of truth for copy. The PHP edition duplicates
 * it so it can be deployed without a build step, which makes drift easy — this
 * script rewrites the PHP data file from src/data/*.js so the two editions can
 * never disagree about services, projects, process stages, budgets or FAQs.
 *
 * Run it after any copy change, then re-check `git diff php/includes/data.php`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

const { services } = await import(`${ROOT}/src/data/services.js`);
const { projects } = await import(`${ROOT}/src/data/projects.js`);
const { processSteps } = await import(`${ROOT}/src/data/process.js`);
const { budgets } = await import(`${ROOT}/src/data/site.js`);
const { faqs } = await import(`${ROOT}/src/data/process.js`);
const { formats, formatPrinciples, formatComparison } = await import(`${ROOT}/src/data/formats.js`);

/* ------------------------------------------------------------------ */
/* Serialisation                                                       */
/* ------------------------------------------------------------------ */

const quote = (value) => `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function php(value, indent = 0) {
  const pad = '    '.repeat(indent + 1);
  const close = '    '.repeat(indent);

  if (typeof value === 'string') return quote(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value === null || value === undefined) return 'null';

  if (Array.isArray(value)) {
    const isList = value.every((_, index) => index in value);
    if (!value.length) return '[]';
    const lines = value.map((item, index) => {
      const rendered = php(item, indent + 1);
      return isList ? `${pad}${rendered},` : `${pad}${quote(index)} => ${rendered},`;
    });
    return `[\n${lines.join('\n')}\n${close}]`;
  }

  const entries = Object.entries(value).filter(([, v]) => v !== undefined);
  if (!entries.length) return '[]';
  const lines = entries.map(([key, item]) => `${pad}${quote(key)} => ${php(item, indent + 1)},`);
  return `[\n${lines.join('\n')}\n${close}]`;
}

/* ------------------------------------------------------------------ */
/* Shape the data the PHP templates actually read                       */
/* ------------------------------------------------------------------ */

const serviceShape = services.map((service) => ({
  slug: service.slug,
  index: service.index,
  title: service.title,
  kicker: service.kicker,
  summary: service.summary,
  description: service.description,
  deliverables: service.deliverables,
  approach: service.approach.map((step) => ({ title: step.title, body: step.body })),
  stack: service.stack,
  outcomes: service.outcomes,
  faqs: service.faqs,
}));

const projectShape = projects.map((project) => ({
  slug: project.slug,
  name: project.name,
  category: project.category,
  year: project.year,
  status: project.status,
  tagline: project.tagline,
  summary: project.summary,
  challenge: project.challenge,
  approach: project.approach,
  built: project.built,
  stack: project.stack,
  outcome: project.outcome,
}));

const processShape = processSteps.map((step) => ({
  number: step.number,
  slug: step.slug,
  title: step.title,
  duration: step.duration,
  summary: step.summary,
  description: step.description,
  outputs: step.outputs,
}));

const faqShape = faqs.map((faq) => ({ q: faq.q, a: faq.a }));

const formatShape = formats.map((format) => ({
  slug: format.slug,
  index: format.index,
  name: format.name,
  audience: format.audience,
  kicker: format.kicker,
  accent: format.accent,
  accent_soft: format.accentSoft,
  headline: format.headline,
  summary: format.summary,
  primary_action: format.primaryAction,
  key_pages: format.keyPages,
  motion: format.motion,
  changes: format.changes,
  avoid: format.avoid,
  seo: format.seo,
  demo: format.demo,
}));

const principleShape = formatPrinciples.map((item) => ({ title: item.title, body: item.body }));

const comparisonShape = formatComparison.map((row) => ({ label: row.label, values: row.values }));

/* ------------------------------------------------------------------ */
/* Write                                                              */
/* ------------------------------------------------------------------ */

const header = `<?php
declare(strict_types=1);

// Refuse direct web access to partials — these files expect to be included.
if (isset($_SERVER['SCRIPT_FILENAME'])
    && realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Not found';
    exit;
}

/**
 * Shared content for the PHP edition.
 *
 * GENERATED FILE — do not edit by hand.
 * Source of truth: src/data/*.js; regenerate with \`npm run content:sync\`.
 */

return [
    'services' => ${php(serviceShape, 1)},

    'projects' => ${php(projectShape, 1)},

    'process' => ${php(processShape, 1)},

    'budgets' => ${php(budgets, 1)},

    'faqs' => ${php(faqShape, 1)},

    'formats' => ${php(formatShape, 1)},

    'format_principles' => ${php(principleShape, 1)},

    'format_comparison' => ${php(comparisonShape, 1)},
];
`;

const target = path.join(ROOT, 'php/includes/data.php');

// Refuse to write a file the templates would choke on.
if (!services.length || !projects.length || !processShape.length) {
  console.error('Refusing to write empty data. Check src/data/*.js.');
  process.exit(1);
}

fs.writeFileSync(target, header, 'utf8');

console.log(`Wrote ${path.relative(ROOT, target)}`);
console.log(
  `  ${serviceShape.length} services · ${projectShape.length} projects · ${processShape.length} process stages · ${budgets.length} budgets · ${faqShape.length} FAQs · ${formatShape.length} formats`,
);
