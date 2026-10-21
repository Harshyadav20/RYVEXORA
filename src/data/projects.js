/**
 * Portfolio content.
 *
 * IMPORTANT: every entry is marked as a concept build. These are internal and
 * concept projects created to demonstrate approach and craft. No client names,
 * testimonials, awards or performance statistics are invented anywhere in this
 * project. Replace `status` and copy with verified facts when real client work
 * is added.
 */

export const projects = [
  {
    slug: 'atlas-revenue-os',
    name: 'Atlas Revenue OS',
    category: 'SaaS · Revenue operations',
    year: '2026',
    status: 'Concept build',
    visual: 'dashboard',
    accent: '#246BFD',
    accentSoft: '#8B5CF6',
    tagline: 'A single operating surface for pipeline, forecasts and account health.',
    summary:
      'A revenue workspace concept for teams who outgrew spreadsheets but do not need a twelve-seat enterprise suite.',
    challenge:
      'Revenue teams often run pipeline in one tool, forecasts in another and account health in a third. The result is duplicated data, stale dashboards and a weekly reporting ritual that consumes a working day.',
    approach:
      'We designed one surface where deals, accounts and forecasts share the same data model. Every view is generated from the same event stream, so a change in one place is immediately true everywhere else.',
    built: [
      'Multi-tenant workspace model with role-based access',
      'Deal pipeline with configurable stages and required fields',
      'Forecast view with scenario comparison and confidence bands',
      'Account health timeline aggregating product and support signals',
      'Weekly digest generation with exportable summaries',
      'Keyboard-first navigation and command palette',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Tailwind CSS', 'Vercel'],
    outcome: [
      'A single source of truth for pipeline and forecast data',
      'Weekly reporting generated instead of assembled',
      'A data model that can accept new signal sources without a rewrite',
    ],
    scope: 'Product strategy · UX · Full-stack build · Design system',
    disclaimer:
      'Concept build. This is not a client engagement and no performance metrics are claimed. Shown to demonstrate design and engineering approach.',
  },
  {
    slug: 'novacommerce',
    name: 'NovaCommerce',
    category: 'Commerce · Headless storefront',
    year: '2026',
    status: 'Concept build',
    visual: 'commerce',
    accent: '#36D9FF',
    accentSoft: '#246BFD',
    tagline: 'A storefront engineered like a product, not decorated like a catalogue.',
    summary:
      'A headless commerce concept focused on one thing most stores get wrong: making the path from product discovery to checkout feel effortless.',
    challenge:
      'Template storefronts usually trade speed for features. Heavy apps, unoptimised imagery and generic product pages make the experience slow on mobile, where most traffic actually arrives.',
    approach:
      'We treated the storefront as a performance problem first. Product data is modelled cleanly, images are served responsively, and interactions are progressively enhanced so the page works before JavaScript finishes loading.',
    built: [
      'Headless product catalogue with typed content model',
      'Server-rendered collection and product routes',
      'Responsive image pipeline with art direction',
      'Persistent cart with optimistic updates',
      'Editorial modules for merchandising and stories',
      'Checkout handoff with clear error states',
    ],
    stack: ['Astro', 'React', 'Shopify Storefront API', 'TypeScript', 'Tailwind CSS', 'Cloudflare'],
    outcome: [
      'Product pages that remain usable on slow networks',
      'A merchandising model non-technical teams can operate',
      'Architecture that supports new channels without a rebuild',
    ],
    scope: 'Experience design · Headless build · Performance engineering',
    disclaimer:
      'Concept build. This is not a client engagement and no performance metrics are claimed. Shown to demonstrate design and engineering approach.',
  },
  {
    slug: 'helix-ops',
    name: 'Helix Ops',
    category: 'AI · Operations automation',
    year: '2025',
    status: 'Concept build',
    visual: 'ops',
    accent: '#8B5CF6',
    accentSoft: '#36D9FF',
    tagline: 'Human-reviewed AI for the operational documents nobody wants to read.',
    summary:
      'An operations console concept that reads incoming documents, extracts the facts that matter and routes decisions to the right person with evidence attached.',
    challenge:
      'Back-office teams receive invoices, contracts and service requests in inconsistent formats. Someone has to read each one, copy key fields into a system, and notice when something does not match.',
    approach:
      'Instead of a fully automatic black box, we designed a review loop. The model proposes structured values with source citations and a confidence score; a person approves, corrects or rejects. Corrections become evaluation data.',
    built: [
      'Document ingestion with OCR and layout parsing',
      'Extraction schema with per-field confidence',
      'Source-highlighted review interface',
      'Approval routing with SLA timers',
      'Model evaluation dashboard built from real corrections',
      'Audit log and export to downstream systems',
    ],
    stack: ['Python', 'FastAPI', 'OpenAI', 'pgvector', 'React', 'PostgreSQL', 'Docker'],
    outcome: [
      'Routine documents reach a reviewer pre-filled, not blank',
      'Every automated value traceable to a source page',
      'Quality measured continuously instead of assumed',
    ],
    scope: 'AI discovery · Pipeline engineering · Interface design',
    disclaimer:
      'Concept build. This is not a client engagement and no performance metrics are claimed. Shown to demonstrate design and engineering approach.',
  },
  {
    slug: 'signal-seo',
    name: 'Signal SEO',
    category: 'Growth · Programmatic content',
    year: '2025',
    status: 'Concept build',
    visual: 'seo',
    accent: '#246BFD',
    accentSoft: '#36D9FF',
    tagline: 'A content system that scales pages without scaling thin content.',
    summary:
      'A programmatic SEO concept for a marketplace: structured pages generated from real inventory, with editorial rules that prevent near-duplicate filler.',
    challenge:
      'Programmatic SEO usually fails in one of two ways: too few pages to matter, or thousands of near-identical pages that search engines ignore. The difference is whether each page has a genuine reason to exist.',
    approach:
      'We started with a data sufficiency test. A page is generated only when the underlying record has enough verified attributes to answer the query. Everything else waits or is merged into a parent page.',
    built: [
      'Data sufficiency scoring before page generation',
      'Templated page system with editorial guardrails',
      'Internal linking graph based on entity relationships',
      'Automated quality checks in the publish pipeline',
      'Structured data and canonical strategy',
      'Search Console reporting segmented by template',
    ],
    stack: ['Next.js', 'Python', 'PostgreSQL', 'Schema.org', 'GA4', 'Search Console API'],
    outcome: [
      'Page creation tied to evidence, not ambition',
      'Crawlable architecture that stays understandable',
      'Reporting that shows which template earns attention',
    ],
    scope: 'Technical SEO · Content architecture · Engineering',
    disclaimer:
      'Concept build. This is not a client engagement and no performance metrics are claimed. Shown to demonstrate design and engineering approach.',
  },
  {
    slug: 'orbit-outreach',
    name: 'Orbit Outreach',
    category: 'Growth · Outbound infrastructure',
    year: '2025',
    status: 'Concept build',
    visual: 'outreach',
    accent: '#36D9FF',
    accentSoft: '#8B5CF6',
    tagline: 'Outbound tooling designed around inbox trust.',
    summary:
      'An outreach operations concept that treats deliverability and relevance as the product, with sequences that stop the moment a human replies.',
    challenge:
      'Outbound tools optimise for volume because volume is easy to show. Inboxes, domain reputation and recipient attention pay the cost, and reply quality quietly falls.',
    approach:
      'We designed around constraints: verified contacts only, per-inbox limits, automatic pause on reply, and copy that must pass a relevance check before it can enter a sequence.',
    built: [
      'Contact verification and suppression logic',
      'Per-inbox sending limits with warm-up schedule',
      'Sequence builder with reply detection',
      'Deliverability monitoring and DNS guidance',
      'Reply triage with owner assignment',
      'Reporting on positive replies, not open rates',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Instantly API', 'Google Workspace API'],
    outcome: [
      'Sending behaviour that protects domain reputation',
      'Copy requirements enforced before launch',
      'A clear handoff from automated sequence to human conversation',
    ],
    scope: 'Product design · Workflow engineering · Dashboard build',
    disclaimer:
      'Concept build. This is not a client engagement and no performance metrics are claimed. Shown to demonstrate design and engineering approach.',
  },
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);

export const getNextProject = (slug) => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
