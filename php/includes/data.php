<?php
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
 * Source of truth: src/data/*.js; regenerate with `npm run content:sync`.
 */

return [
    'services' => [
        [
            'slug' => 'web-development',
            'index' => '01',
            'title' => 'Web Development',
            'kicker' => 'Design-engineered websites',
            'summary' => 'Fast, distinctive websites that look premium and convert — built on modern frameworks with performance budgets baked in.',
            'description' => 'We build marketing sites, product sites and web applications that load quickly, rank well and feel considered on every screen. Every build starts with a performance and accessibility budget, not a template.',
            'deliverables' => [
                'Information architecture and page blueprints',
                'Design system with reusable components',
                'Hand-built front end (React, Next.js or Astro)',
                'Headless CMS so your team can publish',
                'Motion design with reduced-motion fallbacks',
                'Analytics, events and conversion tracking',
            ],
            'approach' => [
                [
                    'title' => 'Define the job of the page',
                    'body' => 'We agree what each page must make a visitor understand, believe and do before a single visual is designed.',
                ],
                [
                    'title' => 'Design in the browser',
                    'body' => 'Layouts are prototyped at real breakpoints so spacing, type and motion survive contact with real content.',
                ],
                [
                    'title' => 'Engineer to a budget',
                    'body' => 'JavaScript weight, image strategy and Core Web Vitals targets are set up front and checked on every build.',
                ],
                [
                    'title' => 'Ship, measure, refine',
                    'body' => 'We launch with analytics in place, then iterate on the sections that actually influence enquiries.',
                ],
            ],
            'stack' => [
                'React',
                'Next.js',
                'Astro',
                'TypeScript',
                'Three.js',
                'GSAP',
                'Sanity',
                'Shopify',
            ],
            'outcomes' => [
                'A site that reflects the quality of your product',
                'Pages that stay readable and usable on slow connections',
                'Content your team can update without a developer',
                'A measurable path from landing to enquiry',
            ],
            'faqs' => [
                [
                    'q' => 'Do you work with an existing design?',
                    'a' => 'Yes. If you have a finished design system we can build directly from it. If the design only exists in Figma as flat frames, we usually refine interaction, spacing and mobile behaviour as part of the build.',
                ],
                [
                    'q' => 'Can you take over an existing site?',
                    'a' => 'Often. We start with a short technical audit covering performance, accessibility, SEO basics and maintainability, then recommend whether to refactor or rebuild. We will tell you when a rebuild is not worth the money.',
                ],
                [
                    'q' => 'What happens after launch?',
                    'a' => 'You can take the code and run. Most clients keep us on a light monthly retainer for improvements, new sections and performance monitoring.',
                ],
            ],
        ],
        [
            'slug' => 'ai-automation',
            'index' => '02',
            'title' => 'AI & Intelligent Automation',
            'kicker' => 'Applied artificial intelligence',
            'summary' => 'AI systems grounded in your own data — assistants, agents and document pipelines that do real work, with humans in control.',
            'description' => 'We build AI features and internal tools that solve a defined operational problem: answering support questions, qualifying leads, reading documents or preparing work for your team. Retrieval quality, evaluation and guardrails are treated as core engineering, not add-ons.',
            'deliverables' => [
                'Use-case discovery and feasibility scoring',
                'Retrieval-augmented generation (RAG) pipelines',
                'Custom assistants trained on your knowledge base',
                'Document extraction and classification workflows',
                'Human-in-the-loop review interfaces',
                'Evaluation suites, logging and cost controls',
            ],
            'approach' => [
                [
                    'title' => 'Pick a problem worth automating',
                    'body' => 'We map the workflow, the volume of work and the cost of a wrong answer before choosing a model.',
                ],
                [
                    'title' => 'Ground it in your data',
                    'body' => 'Content is cleaned, chunked, embedded and permissioned so answers cite real sources rather than guessing.',
                ],
                [
                    'title' => 'Build the loop, not the demo',
                    'body' => 'Real usage needs review queues, escalation paths, fallbacks and audit logs. We ship those with the model.',
                ],
                [
                    'title' => 'Measure and contain cost',
                    'body' => 'Test sets, latency targets and token budgets keep quality predictable as usage grows.',
                ],
            ],
            'stack' => [
                'OpenAI',
                'Anthropic',
                'LangChain',
                'pgvector',
                'Pinecone',
                'Python',
                'Node.js',
                'n8n',
            ],
            'outcomes' => [
                'Fewer repetitive tasks for your team',
                'Faster first-response time on inbound work',
                'Answers that cite your documents instead of inventing them',
                'A system you can audit and improve over time',
            ],
            'faqs' => [
                [
                    'q' => 'Will the AI make things up?',
                    'a' => 'Any language model can. We reduce it with retrieval, strict prompting, source citations and refusal behaviour, then measure it against a test set. For high-stakes answers we add human approval before anything is sent.',
                ],
                [
                    'q' => 'Do we need our own model?',
                    'a' => 'Rarely. Most businesses get better results from a hosted frontier model plus good retrieval than from a custom-trained model. We will only recommend fine-tuning when the evidence supports it.',
                ],
                [
                    'q' => 'How do you handle private data?',
                    'a' => 'We work with providers that do not train on your data by default, keep credentials server-side, limit retrieval by permission, and agree a retention policy before the build starts.',
                ],
            ],
        ],
        [
            'slug' => 'seo-growth',
            'index' => '03',
            'title' => 'SEO & Digital Growth',
            'kicker' => 'Compounding organic demand',
            'summary' => 'Technical SEO, content architecture and conversion work that compounds — measured in qualified traffic and enquiries.',
            'description' => 'We treat search as an engineering and editorial system: crawlable foundations, a content architecture mapped to real intent, and pages designed to convert the visitors they attract. No tricks, no thin pages at scale without a reason.',
            'deliverables' => [
                'Technical audit and crawl budget fixes',
                'Keyword and intent mapping by revenue potential',
                'Site architecture and internal linking plans',
                'Programmatic and editorial content systems',
                'On-page optimisation and schema markup',
                'Reporting tied to enquiries, not vanity rankings',
            ],
            'approach' => [
                [
                    'title' => 'Audit the foundation',
                    'body' => 'Crawlability, indexation, site speed, duplicate content and structured data are checked before content investment.',
                ],
                [
                    'title' => 'Map intent to pages',
                    'body' => 'We map queries to the page that should own them, then remove or merge pages that compete with each other.',
                ],
                [
                    'title' => 'Build a content engine',
                    'body' => 'Templates, briefs and editorial standards make consistent publishing possible without diluting quality.',
                ],
                [
                    'title' => 'Convert the traffic',
                    'body' => 'Ranking is only useful if the page moves someone. We optimise layout, proof and calls to action together.',
                ],
            ],
            'stack' => [
                'Ahrefs',
                'Semrush',
                'Screaming Frog',
                'GSC',
                'GA4',
                'Schema.org',
                'Looker Studio',
            ],
            'outcomes' => [
                'A site search engines can crawl and trust',
                'Clear ownership of the queries that matter',
                'A publishing process your team can sustain',
                'Reporting that connects search to pipeline',
            ],
            'faqs' => [
                [
                    'q' => 'How long does SEO take?',
                    'a' => 'Technical fixes can show movement in weeks. Content and authority typically need three to six months before trends are meaningful. Anyone promising page-one rankings in 30 days is guessing or misleading you.',
                ],
                [
                    'q' => 'Do you write content?',
                    'a' => 'We produce briefs and can write technical pages ourselves. For subject-heavy editorial, we work with your in-house experts and edit for search and clarity.',
                ],
                [
                    'q' => 'Can you guarantee rankings?',
                    'a' => 'No. We can guarantee the work: audits, fixes, architecture and measurement. Rankings are controlled by search engines, not us.',
                ],
            ],
        ],
        [
            'slug' => 'cold-email',
            'index' => '04',
            'title' => 'Cold Email Outreach',
            'kicker' => 'Outbound that respects the inbox',
            'summary' => 'Outbound infrastructure and sequences built on accurate targeting, clean deliverability and relevant messaging.',
            'description' => 'We build outreach systems that reach the right people with a message worth reading. That means verified contact data, authenticated domains, warmed inboxes, short sequences and honest reporting. We do not send bulk spam or scrape contact lists.',
            'deliverables' => [
                'ICP and segment research',
                'Contact verification and list hygiene',
                'Domain authentication (SPF, DKIM, DMARC)',
                'Inbox warm-up and sending limits',
                'Copy, sequences and reply handling',
                'CRM sync and reporting',
            ],
            'approach' => [
                [
                    'title' => 'Narrow the audience',
                    'body' => 'A tight segment with a real problem beats a large list. We define who should hear from you and why now.',
                ],
                [
                    'title' => 'Set up the infrastructure',
                    'body' => 'Secondary domains, authentication, warm-up and volume limits are handled before the first email is sent.',
                ],
                [
                    'title' => 'Write something human',
                    'body' => 'Short, specific emails that reference the recipient’s context and make one clear ask. No fake follow-ups, no false urgency.',
                ],
                [
                    'title' => 'Route and learn',
                    'body' => 'Replies go to a human. Positive responses sync to your CRM, and we refine segments from real objection patterns.',
                ],
            ],
            'stack' => [
                'Instantly',
                'Smartlead',
                'Apollo',
                'Clay',
                'HubSpot',
                'Pipedrive',
                'Google Workspace',
            ],
            'outcomes' => [
                'Deliverability protected before volume increases',
                'Messaging built around a real business problem',
                'Replies handled by a person, not a bot',
                'Clear visibility into what is working',
            ],
            'faqs' => [
                [
                    'q' => 'Is cold email legal?',
                    'a' => 'It depends on the jurisdiction and how you send it. We follow applicable rules such as GDPR legitimate-interest requirements and CAN-SPAM identity and opt-out rules, keep volumes reasonable, and maintain suppression lists.',
                ],
                [
                    'q' => 'How many emails will you send?',
                    'a' => 'Far fewer than most agencies propose. We scale slowly, watch reply and bounce signals daily, and keep each inbox within limits that protect your domain reputation.',
                ],
                [
                    'q' => 'Do you guarantee meetings?',
                    'a' => 'No. We guarantee the system: verified data, authenticated infrastructure, relevant copy and honest reporting. Meeting volume depends on your offer, market and capacity to follow up.',
                ],
            ],
        ],
        [
            'slug' => 'saas-development',
            'index' => '05',
            'title' => 'SaaS & Software Development',
            'kicker' => 'Products built to last',
            'summary' => 'Multi-tenant products, internal tools and APIs engineered for real usage — auth, billing, permissions and observability included.',
            'description' => 'We design and build software products from first sketch to production: data model, permissions, billing, dashboards, integrations and deployment. The goal is a maintainable product your team can extend, not a prototype that collapses under real usage.',
            'deliverables' => [
                'Product scoping and technical discovery',
                'Data modelling and API design',
                'Multi-tenant architecture and roles',
                'Authentication and subscription billing',
                'Admin dashboards and user interfaces',
                'CI/CD, monitoring and environments',
            ],
            'approach' => [
                [
                    'title' => 'Scope the smallest useful product',
                    'body' => 'We define the core loop that delivers value, and defer everything that does not prove it.',
                ],
                [
                    'title' => 'Design the data first',
                    'body' => 'Schemas, tenancy and permissions are decided early because they are expensive to change later.',
                ],
                [
                    'title' => 'Build in vertical slices',
                    'body' => 'Each slice ships from database to interface so you can review working software every week.',
                ],
                [
                    'title' => 'Harden for production',
                    'body' => 'Error tracking, backups, rate limits and environment separation are part of the launch, not a later favour.',
                ],
            ],
            'stack' => [
                'Next.js',
                'React',
                'Node.js',
                'PostgreSQL',
                'Prisma',
                'Stripe',
                'Supabase',
                'AWS',
            ],
            'outcomes' => [
                'A product your team can operate and extend',
                'Billing and permissions that work from day one',
                'Deployments that are boring and repeatable',
                'Clear documentation and handover',
            ],
            'faqs' => [
                [
                    'q' => 'Can you work with our existing codebase?',
                    'a' => 'Yes. We start with a short review of architecture, test coverage and deployment, then agree a plan. If the codebase is a risk to your business we will say so clearly.',
                ],
                [
                    'q' => 'Who owns the code?',
                    'a' => 'You do. Repositories, infrastructure accounts and third-party services are set up in your name from the start.',
                ],
                [
                    'q' => 'Do you provide ongoing support?',
                    'a' => 'We offer retainers for feature work, maintenance and monitoring. Handover is also a first-class outcome — with documentation, runbooks and a walkthrough.',
                ],
            ],
        ],
        [
            'slug' => 'business-automation',
            'index' => '06',
            'title' => 'Business Automation',
            'kicker' => 'Operations without the busywork',
            'summary' => 'Connected systems that move data, trigger actions and remove manual steps — built on tools your team already uses.',
            'description' => 'Most operational drag comes from tools that do not talk to each other. We map the workflow, then connect CRM, finance, support and internal tools with reliable automation, clear ownership and failure alerts.',
            'deliverables' => [
                'Process mapping and bottleneck analysis',
                'Tool integration and data sync',
                'Internal dashboards and approvals',
                'Document generation and e-signature flows',
                'Error handling, retries and alerts',
                'Team training and documentation',
            ],
            'approach' => [
                [
                    'title' => 'Map the real process',
                    'body' => 'We sit with the people doing the work and document what actually happens, including the workarounds.',
                ],
                [
                    'title' => 'Remove before automating',
                    'body' => 'Steps that exist for no reason get deleted first. Automating waste just makes it faster.',
                ],
                [
                    'title' => 'Connect the systems',
                    'body' => 'Webhooks, queues and scheduled jobs replace copy-paste with a traceable flow that has one source of truth.',
                ],
                [
                    'title' => 'Make failure visible',
                    'body' => 'Alerts, retries and a run log mean a broken integration gets noticed by you, not by a customer.',
                ],
            ],
            'stack' => [
                'n8n',
                'Make',
                'Zapier',
                'Airtable',
                'Notion',
                'HubSpot',
                'Google Workspace',
                'PostgreSQL',
            ],
            'outcomes' => [
                'Fewer manual handoffs and copy-paste errors',
                'A single source of truth across tools',
                'Faster internal turnaround on routine requests',
                'Processes documented so they survive staff changes',
            ],
            'faqs' => [
                [
                    'q' => 'Do we need to replace our tools?',
                    'a' => 'Usually not. We connect what you already pay for. Replacement is only recommended when a tool is the actual source of the bottleneck.',
                ],
                [
                    'q' => 'What if an automation breaks?',
                    'a' => 'Every flow ships with logging and alerts, plus a documented manual fallback so work can continue while it is fixed.',
                ],
                [
                    'q' => 'How do you price automation work?',
                    'a' => 'We scope flows individually and quote fixed prices. Where the requirements are genuinely unclear, we start with a paid discovery.',
                ],
            ],
        ],
    ],

    'projects' => [
        [
            'slug' => 'atlas-revenue-os',
            'name' => 'Atlas Revenue OS',
            'category' => 'SaaS · Revenue operations',
            'year' => '2026',
            'status' => 'Concept build',
            'tagline' => 'A single operating surface for pipeline, forecasts and account health.',
            'summary' => 'A revenue workspace concept for teams who outgrew spreadsheets but do not need a twelve-seat enterprise suite.',
            'challenge' => 'Revenue teams often run pipeline in one tool, forecasts in another and account health in a third. The result is duplicated data, stale dashboards and a weekly reporting ritual that consumes a working day.',
            'approach' => 'We designed one surface where deals, accounts and forecasts share the same data model. Every view is generated from the same event stream, so a change in one place is immediately true everywhere else.',
            'built' => [
                'Multi-tenant workspace model with role-based access',
                'Deal pipeline with configurable stages and required fields',
                'Forecast view with scenario comparison and confidence bands',
                'Account health timeline aggregating product and support signals',
                'Weekly digest generation with exportable summaries',
                'Keyboard-first navigation and command palette',
            ],
            'stack' => [
                'Next.js',
                'TypeScript',
                'PostgreSQL',
                'Prisma',
                'Stripe',
                'Tailwind CSS',
                'Vercel',
            ],
            'outcome' => [
                'A single source of truth for pipeline and forecast data',
                'Weekly reporting generated instead of assembled',
                'A data model that can accept new signal sources without a rewrite',
            ],
        ],
        [
            'slug' => 'novacommerce',
            'name' => 'NovaCommerce',
            'category' => 'Commerce · Headless storefront',
            'year' => '2026',
            'status' => 'Concept build',
            'tagline' => 'A storefront engineered like a product, not decorated like a catalogue.',
            'summary' => 'A headless commerce concept focused on one thing most stores get wrong: making the path from product discovery to checkout feel effortless.',
            'challenge' => 'Template storefronts usually trade speed for features. Heavy apps, unoptimised imagery and generic product pages make the experience slow on mobile, where most traffic actually arrives.',
            'approach' => 'We treated the storefront as a performance problem first. Product data is modelled cleanly, images are served responsively, and interactions are progressively enhanced so the page works before JavaScript finishes loading.',
            'built' => [
                'Headless product catalogue with typed content model',
                'Server-rendered collection and product routes',
                'Responsive image pipeline with art direction',
                'Persistent cart with optimistic updates',
                'Editorial modules for merchandising and stories',
                'Checkout handoff with clear error states',
            ],
            'stack' => [
                'Astro',
                'React',
                'Shopify Storefront API',
                'TypeScript',
                'Tailwind CSS',
                'Cloudflare',
            ],
            'outcome' => [
                'Product pages that remain usable on slow networks',
                'A merchandising model non-technical teams can operate',
                'Architecture that supports new channels without a rebuild',
            ],
        ],
        [
            'slug' => 'helix-ops',
            'name' => 'Helix Ops',
            'category' => 'AI · Operations automation',
            'year' => '2025',
            'status' => 'Concept build',
            'tagline' => 'Human-reviewed AI for the operational documents nobody wants to read.',
            'summary' => 'An operations console concept that reads incoming documents, extracts the facts that matter and routes decisions to the right person with evidence attached.',
            'challenge' => 'Back-office teams receive invoices, contracts and service requests in inconsistent formats. Someone has to read each one, copy key fields into a system, and notice when something does not match.',
            'approach' => 'Instead of a fully automatic black box, we designed a review loop. The model proposes structured values with source citations and a confidence score; a person approves, corrects or rejects. Corrections become evaluation data.',
            'built' => [
                'Document ingestion with OCR and layout parsing',
                'Extraction schema with per-field confidence',
                'Source-highlighted review interface',
                'Approval routing with SLA timers',
                'Model evaluation dashboard built from real corrections',
                'Audit log and export to downstream systems',
            ],
            'stack' => [
                'Python',
                'FastAPI',
                'OpenAI',
                'pgvector',
                'React',
                'PostgreSQL',
                'Docker',
            ],
            'outcome' => [
                'Routine documents reach a reviewer pre-filled, not blank',
                'Every automated value traceable to a source page',
                'Quality measured continuously instead of assumed',
            ],
        ],
        [
            'slug' => 'signal-seo',
            'name' => 'Signal SEO',
            'category' => 'Growth · Programmatic content',
            'year' => '2025',
            'status' => 'Concept build',
            'tagline' => 'A content system that scales pages without scaling thin content.',
            'summary' => 'A programmatic SEO concept for a marketplace: structured pages generated from real inventory, with editorial rules that prevent near-duplicate filler.',
            'challenge' => 'Programmatic SEO usually fails in one of two ways: too few pages to matter, or thousands of near-identical pages that search engines ignore. The difference is whether each page has a genuine reason to exist.',
            'approach' => 'We started with a data sufficiency test. A page is generated only when the underlying record has enough verified attributes to answer the query. Everything else waits or is merged into a parent page.',
            'built' => [
                'Data sufficiency scoring before page generation',
                'Templated page system with editorial guardrails',
                'Internal linking graph based on entity relationships',
                'Automated quality checks in the publish pipeline',
                'Structured data and canonical strategy',
                'Search Console reporting segmented by template',
            ],
            'stack' => [
                'Next.js',
                'Python',
                'PostgreSQL',
                'Schema.org',
                'GA4',
                'Search Console API',
            ],
            'outcome' => [
                'Page creation tied to evidence, not ambition',
                'Crawlable architecture that stays understandable',
                'Reporting that shows which template earns attention',
            ],
        ],
        [
            'slug' => 'orbit-outreach',
            'name' => 'Orbit Outreach',
            'category' => 'Growth · Outbound infrastructure',
            'year' => '2025',
            'status' => 'Concept build',
            'tagline' => 'Outbound tooling designed around inbox trust.',
            'summary' => 'An outreach operations concept that treats deliverability and relevance as the product, with sequences that stop the moment a human replies.',
            'challenge' => 'Outbound tools optimise for volume because volume is easy to show. Inboxes, domain reputation and recipient attention pay the cost, and reply quality quietly falls.',
            'approach' => 'We designed around constraints: verified contacts only, per-inbox limits, automatic pause on reply, and copy that must pass a relevance check before it can enter a sequence.',
            'built' => [
                'Contact verification and suppression logic',
                'Per-inbox sending limits with warm-up schedule',
                'Sequence builder with reply detection',
                'Deliverability monitoring and DNS guidance',
                'Reply triage with owner assignment',
                'Reporting on positive replies, not open rates',
            ],
            'stack' => [
                'React',
                'Node.js',
                'PostgreSQL',
                'Redis',
                'Instantly API',
                'Google Workspace API',
            ],
            'outcome' => [
                'Sending behaviour that protects domain reputation',
                'Copy requirements enforced before launch',
                'A clear handoff from automated sequence to human conversation',
            ],
        ],
    ],

    'process' => [
        [
            'number' => '01',
            'slug' => 'discover',
            'title' => 'Discover',
            'duration' => '1–2 weeks',
            'summary' => 'Understand the business before touching the interface.',
            'description' => 'We interview the people who will use and maintain the work, review analytics and audit what already exists. The output is a short, opinionated brief: the problem, the constraints and how success will be judged.',
            'outputs' => [
                'Stakeholder interviews',
                'Technical and content audit',
                'Success criteria',
                'Scope and estimate',
            ],
        ],
        [
            'number' => '02',
            'slug' => 'design',
            'title' => 'Design',
            'duration' => '2–3 weeks',
            'summary' => 'Resolve the experience in the browser, not just in frames.',
            'description' => 'Architecture, wireframes and visual direction move together. We prototype key interactions at real breakpoints so typography, spacing and motion are validated before engineering begins.',
            'outputs' => [
                'Sitemap and page blueprints',
                'Design system',
                'Interactive prototype',
                'Content plan',
            ],
        ],
        [
            'number' => '03',
            'slug' => 'develop',
            'title' => 'Develop',
            'duration' => '3–8 weeks',
            'summary' => 'Build in reviewable slices with quality gates.',
            'description' => 'Work ships to a staging environment in weekly slices. Performance budgets, accessibility checks and responsive behaviour are verified continuously rather than at the end.',
            'outputs' => [
                'Production front end',
                'CMS and integrations',
                'Weekly staging builds',
                'QA and accessibility pass',
            ],
        ],
        [
            'number' => '04',
            'slug' => 'deploy',
            'title' => 'Deploy',
            'duration' => '3–5 days',
            'summary' => 'Launch without drama, with the boring parts handled.',
            'description' => 'Redirects, analytics, metadata, backups and rollback plans are prepared before launch day. We deploy, verify and stay close for the first days of real traffic.',
            'outputs' => [
                'Launch checklist',
                'Redirect map',
                'Analytics verification',
                'Monitoring and rollback plan',
            ],
        ],
        [
            'number' => '05',
            'slug' => 'optimise',
            'title' => 'Optimise',
            'duration' => 'Ongoing',
            'summary' => 'Use real behaviour to improve what matters.',
            'description' => 'After launch we look at how people actually use the site or product. Changes are prioritised by impact, not by what is easiest to redesign.',
            'outputs' => [
                'Performance monitoring',
                'Conversion review',
                'Experiment backlog',
                'Monthly summary',
            ],
        ],
    ],

    'budgets' => [
        'Under $2,000',
        '$2,000 – $5,000',
        '$5,000 – $15,000',
        '$15,000 – $40,000',
        '$40,000+',
        'Not sure yet',
    ],

    'faqs' => [
        [
            'q' => 'How do projects usually start?',
            'a' => 'With a short conversation and a written brief. If the fit is right, we scope the work in a fixed-price discovery, then move into design and build. You receive a written estimate before anything is committed.',
        ],
        [
            'q' => 'What does a typical project cost?',
            'a' => 'Focused marketing sites generally start around $3,000–$8,000. Product and SaaS builds typically range from $12,000 to $40,000 depending on scope. Automation and AI work is scoped per workflow. You will always receive a fixed quote before work begins.',
        ],
        [
            'q' => 'How do you communicate during a build?',
            'a' => 'A shared workspace, a weekly written update and a staging link that always reflects the latest work. Calls are scheduled when a decision is needed, not as a status ritual.',
        ],
        [
            'q' => 'Do you work with clients outside India?',
            'a' => 'Yes. We work remotely with clients across time zones and schedule overlap where it matters. Async written communication is the default.',
        ],
    ],

    'formats' => [
        [
            'slug' => 'medical',
            'index' => '01',
            'name' => 'Medical & Clinics',
            'audience' => 'Doctors, dentists, specialists, multi-site clinics',
            'kicker' => 'Appointment first',
            'accent' => '#36d9ff',
            'accent_soft' => 'rgba(54, 217, 255, 0.14)',
            'headline' => 'A clinic site that answers the only question a patient has.',
            'summary' => '“Can I be seen, by whom, and how soon?” Everything above the fold serves that. Credentials, fees and insurance are one tap away, and no page asks a worried person to decode marketing language.',
            'primary_action' => 'Book an appointment',
            'key_pages' => [
                'Home',
                'Specialities',
                'Your visit',
                'Doctors',
                'Fees & insurance',
                'Contact',
            ],
            'motion' => 'Near-static — no parallax, no reveal longer than 200 ms',
            'changes' => [
                'Budget ranges are removed — clinical decisions are not shopping decisions.',
                'The first screen is a booking action, not a manifesto.',
                'Registration numbers, qualifications and fees are published, not implied.',
                'Every claim is medically reviewed; outcomes are never guaranteed.',
            ],
            'avoid' => [
                'Before/after galleries without consent and clinical context.',
                'Invented success rates, awards or “painless” promises.',
                'Collecting health details in a form that is not secured and consented.',
                'Autoplay video or sound in a waiting room.',
            ],
            'seo' => 'Local schema, treatment pages, opening hours, and a booking path that works one-handed on a phone.',
            'demo' => [
                'brand' => 'NORTHBEAM DENTAL',
                'brandNote' => 'Illustrative clinic — not a client',
                'nav' => [
                    'Treatments',
                    'Your visit',
                    'Team',
                    'Fees',
                ],
                'hero' => [
                    'eyebrow' => 'Hampstead · Est. 2014',
                    'title' => 'Same-day care for the thing that cannot wait.',
                    'lead' => 'Emergency slots held back every morning, evening appointments twice a week, and a written plan with costs before anything begins.',
                    'badges' => [
                        'GDC registered',
                        'Emergency slots daily',
                        'Evening clinic Tue & Thu',
                    ],
                ],
                'booker' => [
                    'title' => 'Request an appointment',
                    'fields' => [
                        [
                            'label' => 'Reason',
                            'value' => 'Urgent tooth pain',
                        ],
                        [
                            'label' => 'Preferred day',
                            'value' => 'Tomorrow, morning',
                        ],
                    ],
                    'note' => 'Demo form · not connected',
                    'action' => 'Find a slot',
                ],
                'treatments' => [
                    [
                        'name' => 'Emergency care',
                        'detail' => 'Same-day assessment for pain, swelling or a broken tooth.',
                        'time' => '20 min',
                    ],
                    [
                        'name' => 'General dentistry',
                        'detail' => 'Examinations, hygiene, fillings and preventive plans.',
                        'time' => '30–45 min',
                    ],
                    [
                        'name' => 'Implants & restore',
                        'detail' => 'Staged implant work with a written cost plan at every step.',
                        'time' => 'Consult',
                    ],
                    [
                        'name' => 'Aligners',
                        'detail' => 'Clear aligner assessment with a digital preview of the outcome.',
                        'time' => '45 min',
                    ],
                ],
                'visit' => [
                    [
                        'step' => '01',
                        'title' => 'Tell us what hurts',
                        'body' => 'A two-minute request form, or call the desk. Urgent cases are triaged the same morning.',
                    ],
                    [
                        'step' => '02',
                        'title' => 'Examination',
                        'body' => 'A dentist examines, explains what they see, and shows you the scan on screen.',
                    ],
                    [
                        'step' => '03',
                        'title' => 'Written plan',
                        'body' => 'Options, costs and timescales leave with you in writing — including the option to wait.',
                    ],
                    [
                        'step' => '04',
                        'title' => 'Treatment & follow-up',
                        'body' => 'Care happens at your pace, with a direct line for anything that changes.',
                    ],
                ],
                'clinician' => [
                    'name' => 'Dr. A. Mensah',
                    'role' => 'Clinical lead · Implantology',
                    'credentials' => [
                        'BDS, King’s College London',
                        'MSc Implant Dentistry',
                        'GDC registration on request',
                    ],
                    'note' => 'Illustrative profile. Real credentials must be verifiable and listed exactly as registered.',
                ],
                'fees' => [
                    [
                        'label' => 'New patient examination',
                        'price' => 'from £65',
                    ],
                    [
                        'label' => 'Emergency appointment',
                        'price' => 'from £85',
                    ],
                    [
                        'label' => 'Hygiene visit',
                        'price' => 'from £70',
                    ],
                    [
                        'label' => 'Written treatment plan',
                        'price' => 'Included',
                    ],
                ],
                'faq' => [
                    [
                        'q' => 'Do you take insurance?',
                        'a' => 'The clinic invoices directly and provides itemised receipts for reimbursement. Cover is confirmed before treatment, not after.',
                    ],
                    [
                        'q' => 'What if I am in pain today?',
                        'a' => 'Emergency slots are held back daily. Call before 10:00 and the desk will tell you honestly whether there is capacity.',
                    ],
                ],
            ],
        ],
        [
            'slug' => 'digital-product',
            'index' => '02',
            'name' => 'Digital Products & SaaS',
            'audience' => 'Founders, product teams, B2B software',
            'kicker' => 'Product-led',
            'accent' => '#246bfd',
            'accent_soft' => 'rgba(36, 107, 253, 0.16)',
            'headline' => 'Show the product working before you ask for a meeting.',
            'summary' => 'The interface is the argument. A real product surface above the fold, features in the order people adopt them, and pricing that is legible without a call.',
            'primary_action' => 'Book a demo',
            'key_pages' => [
                'Product',
                'Features',
                'Pricing',
                'Customers',
                'Docs',
                'Security',
            ],
            'motion' => 'Product micro-states, chart transitions, hover feedback',
            'changes' => [
                'A real interface replaces a decorative illustration.',
                'Pricing is public — hiding it filters out the wrong buyers and wastes both sides.',
                'Feature order follows adoption, not the org chart.',
                'Security and data handling become first-class pages, not footnotes.',
            ],
            'avoid' => [
                'Invented customer logos, ARR or “10× faster” badges.',
                'A demo form that takes the place of showing the product.',
                'Feature lists with no state, error or empty view.',
                'Auto-playing carousels on the pricing page.',
            ],
            'seo' => 'Comparison and integration pages, docs in the index, and structured data for software and pricing.',
            'demo' => [
                'brand' => 'LEDGERLINE',
                'brandNote' => 'Illustrative product — not a client',
                'nav' => [
                    'Product',
                    'Features',
                    'Pricing',
                    'Docs',
                ],
                'hero' => [
                    'eyebrow' => 'Finance operations',
                    'title' => 'Close the month in a day, not a week.',
                    'lead' => 'Ledgerline reconciles every account, flags what does not match, and leaves a review trail your accountant will actually accept.',
                    'badges' => [
                        'SOC 2 ready',
                        'SSO / SAML',
                        'Read-only by default',
                    ],
                ],
                'window' => [
                    'title' => 'Reconciliation · March',
                    'tabs' => [
                        'Overview',
                        'Accounts',
                        'Review',
                        'Exports',
                    ],
                    'rows' => [
                        [
                            'a' => 'Stripe payouts',
                            'b' => 'Reconciled',
                            'c' => '412',
                        ],
                        [
                            'a' => 'Bank · Barclays',
                            'b' => '3 to review',
                            'c' => '1,208',
                        ],
                        [
                            'a' => 'Xero ledger',
                            'b' => 'Reconciled',
                            'c' => '986',
                        ],
                        [
                            'a' => 'Expense cards',
                            'b' => '1 to review',
                            'c' => '147',
                        ],
                    ],
                    'kpi' => [
                        [
                            'label' => 'Matched',
                            'value' => '97.4%',
                        ],
                        [
                            'label' => 'Open items',
                            'value' => '4',
                        ],
                        [
                            'label' => 'Days to close',
                            'value' => '1.2',
                        ],
                    ],
                ],
                'features' => [
                    [
                        'title' => 'Reconcile automatically',
                        'body' => 'Rules match transactions across accounts, currencies and payment providers — then explain every match it made.',
                        'tag' => 'Core',
                    ],
                    [
                        'title' => 'Review only exceptions',
                        'body' => 'Your team sees the four things that need a human, not eleven thousand rows.',
                        'tag' => 'Workflow',
                    ],
                    [
                        'title' => 'Export an audit trail',
                        'body' => 'Every action is attributed and timestamped. Accountants get a file, not a screenshot.',
                        'tag' => 'Trust',
                    ],
                ],
                'pricing' => [
                    [
                        'name' => 'Starter',
                        'price' => '$0',
                        'note' => 'One workspace, two accounts, 200 matches / month.',
                        'cta' => 'Start free',
                        'featured' => false,
                    ],
                    [
                        'name' => 'Team',
                        'price' => '$49',
                        'note' => 'Unlimited accounts, approvals, audit log. Per month, billed annually.',
                        'cta' => 'Book a demo',
                        'featured' => true,
                    ],
                    [
                        'name' => 'Scale',
                        'price' => 'Custom',
                        'note' => 'SSO, data residency, custom retention and a named engineer.',
                        'cta' => 'Talk to us',
                        'featured' => false,
                    ],
                ],
                'integrations' => [
                    'Accounting sync',
                    'Open banking',
                    'SSO / SAML',
                    'Webhooks',
                    'CSV import',
                    'Audit export',
                ],
                'faq' => [
                    [
                        'q' => 'Do you store our bank credentials?',
                        'a' => 'No. Connections are read-only and tokenised; credentials never touch our servers.',
                    ],
                    [
                        'q' => 'How long does onboarding take?',
                        'a' => 'One workspace is live in an afternoon. Multi-entity rollouts are staged over two to three weeks with a named engineer.',
                    ],
                ],
            ],
        ],
        [
            'slug' => 'luxury',
            'index' => '03',
            'name' => 'Luxury & Hospitality',
            'audience' => 'Ateliers, hotels, fashion, interiors, high-end services',
            'kicker' => 'Editorial restraint',
            'accent' => '#c9a96a',
            'accent_soft' => 'rgba(201, 169, 106, 0.14)',
            'headline' => 'Sell the room, not the website.',
            'summary' => 'Full-bleed imagery, wide margins and copy that behaves like a caption. The only ask is a quiet one: request the lookbook, hold a table, arrange a viewing.',
            'primary_action' => 'Request the lookbook',
            'key_pages' => [
                'Home',
                'Collections',
                'Atelier',
                'Journal',
                'Enquiries',
            ],
            'motion' => 'Slow fades and gentle parallax; nothing bounces',
            'changes' => [
                'Type gets larger, copy gets shorter, and margins get wider.',
                'Enquiry replaces the checkout path — a conversation is the conversion.',
                'Photography carries the page; the interface steps back.',
                'Motion slows to fades and parallax, never bounce.',
            ],
            'avoid' => [
                'Stock photography passed off as the house’s own work.',
                'Sale banners, countdown timers or urgency copy.',
                'A cart where the product is made to order.',
                'Autoplay video with sound in a boutique context.',
            ],
            'seo' => 'Collection and journal pages, image sitemaps, and language alternates for multi-market houses.',
            'demo' => [
                'brand' => 'MAISON AUREL',
                'brandNote' => 'Illustrative house — not a client',
                'nav' => [
                    'Collections',
                    'Atelier',
                    'Journal',
                    'Enquiries',
                ],
                'hero' => [
                    'eyebrow' => 'Autumn collection · 2026',
                    'title' => 'The Quiet Hour',
                    'lead' => 'Nine pieces cut from undyed wool and washed silk, made in a courtyard atelier in the twelfth.',
                    'badges' => [
                        'Made to order',
                        'Six-week lead time',
                        'Paris · By appointment',
                    ],
                ],
                'collection' => [
                    [
                        'name' => 'No. 01 — The Long Coat',
                        'detail' => 'Undyed lambswool, horn buttons',
                        'tone' => 'a',
                    ],
                    [
                        'name' => 'No. 04 — The Slip',
                        'detail' => 'Washed silk, hand-finished hem',
                        'tone' => 'b',
                    ],
                    [
                        'name' => 'No. 07 — The Trouser',
                        'detail' => 'Wide leg, pressed wool crepe',
                        'tone' => 'c',
                    ],
                ],
                'specs' => [
                    [
                        'label' => 'Cloth',
                        'value' => 'Undyed lambswool · 640 g',
                    ],
                    [
                        'label' => 'Construction',
                        'value' => 'Half-canvassed, hand-finished',
                    ],
                    [
                        'label' => 'Lead time',
                        'value' => 'Six weeks from fitting',
                    ],
                    [
                        'label' => 'Care',
                        'value' => 'Cold wash or atelier service',
                    ],
                ],
                'atelier' => [
                    'title' => 'An appointment at the atelier',
                    'body' => 'Fittings are held Tuesday to Saturday in the twelfth arrondissement. Tell us what you are looking for and we will reply with a time.',
                    'fields' => [
                        'Name',
                        'Email',
                        'City',
                        'What you are looking for',
                    ],
                    'action' => 'Request an appointment',
                ],
                'quote' => 'Nothing here is in a hurry.',
            ],
        ],
        [
            'slug' => 'creator',
            'index' => '04',
            'name' => 'Creators & Studios',
            'audience' => 'Photographers, directors, designers, small studios',
            'kicker' => 'Portfolio, with a rate card',
            'accent' => '#8b5cf6',
            'accent_soft' => 'rgba(139, 92, 246, 0.16)',
            'headline' => 'A portfolio that ends in a booking, not a shrug.',
            'summary' => 'Work first, in the order you want to be commissioned. Then the practical parts most portfolios hide: what you do, how you engage, what it costs, and how to start.',
            'primary_action' => 'Check availability',
            'key_pages' => [
                'Work',
                'About',
                'Services',
                'Rates',
                'Contact',
            ],
            'motion' => 'Cuts and stills; hover scrubbing on work tiles',
            'changes' => [
                'Work leads; the biography is a sidebar, not the opening act.',
                'A rate card replaces “contact for pricing”, which filters both ways.',
                'Availability is a real date, not a vague “open for projects”.',
                'Usage and licensing are stated before the first call.',
            ],
            'avoid' => [
                'A reel that is three years old at the top of the page.',
                'Testimonials from clients who cannot be named.',
                'Mystery pricing that turns every enquiry into a negotiation.',
                'Instagram embeds that break the page when a post is deleted.',
            ],
            'seo' => 'Project pages with descriptive titles, an image sitemap, and a person schema that matches public profiles.',
            'demo' => [
                'brand' => 'STUDIO NOOR',
                'brandNote' => 'Illustrative studio — not a client',
                'nav' => [
                    'Work',
                    'About',
                    'Services',
                    'Rates',
                ],
                'hero' => [
                    'eyebrow' => 'Director & photographer · Mumbai',
                    'title' => 'Films with a pulse, frames that hold.',
                    'lead' => 'Campaigns, brand films and editorial portraits for people who care how it feels, not just how it looks.',
                    'badges' => [
                        'Booking Q1 2027',
                        'Remote & travel',
                        'Reply within 2 days',
                    ],
                ],
                'availability' => [
                    'label' => 'Next opening',
                    'value' => 'March 2027',
                    'note' => 'Two project slots per month',
                ],
                'work' => [
                    [
                        'title' => 'Salt & Static',
                        'kind' => 'Brand film · 02:40',
                        'tone' => 'a',
                    ],
                    [
                        'title' => 'The Long Table',
                        'kind' => 'Editorial · 12 frames',
                        'tone' => 'b',
                    ],
                    [
                        'title' => 'Night Shift',
                        'kind' => 'Campaign · 6 assets',
                        'tone' => 'c',
                    ],
                    [
                        'title' => 'Quiet Machines',
                        'kind' => 'Documentary · 08:10',
                        'tone' => 'd',
                    ],
                ],
                'services' => [
                    [
                        'title' => 'Brand film',
                        'detail' => 'Concept, direction, shoot, edit and grade. One film or a small system of cutdowns.',
                        'from' => 'from ₹2,40,000',
                    ],
                    [
                        'title' => 'Editorial shoot',
                        'detail' => 'Half or full day, lighting, crew and a retouched set delivered in ten working days.',
                        'from' => 'from ₹85,000',
                    ],
                    [
                        'title' => 'Creative direction',
                        'detail' => 'Monthly direction for teams shipping campaigns without an in-house director.',
                        'from' => 'from ₹1,20,000 / mo',
                    ],
                ],
                'process' => [
                    'Brief',
                    'Treatment',
                    'Shoot',
                    'Delivery',
                ],
                'faq' => [
                    [
                        'q' => 'Do you travel?',
                        'a' => 'Yes, with travel and accommodation billed at cost. International work needs three weeks of notice for visas where applicable.',
                    ],
                    [
                        'q' => 'Who owns the footage?',
                        'a' => 'Usage is licensed by channel, territory and duration. Raw files stay with the studio; extended usage is quoted separately.',
                    ],
                ],
            ],
        ],
    ],

    'format_principles' => [
        [
            'title' => 'One design system, four compositions',
            'body' => 'Tokens, type scale, spacing, motion rules and form behaviour are shared. Only hierarchy and density change — so every format feels like the same studio and none of them looks like a template.',
        ],
        [
            'title' => 'The first screen carries the decision',
            'body' => 'A patient wants a slot, a buyer wants evidence, a collector wants atmosphere, a commissioner wants work and rates. Each format puts that one thing above the fold and lets the rest support it.',
        ],
        [
            'title' => 'Honesty is a layout decision',
            'body' => 'No invented logos, metrics or testimonials in any format. Where proof would normally go, the templates hold deliberate space so nothing gets filled in by accident.',
        ],
    ],

    'format_comparison' => [
        [
            'label' => 'First screen',
            'values' => [
                'Next available slot',
                'The product, running',
                'Atmosphere and craft',
                'Work, then the rate',
            ],
        ],
        [
            'label' => 'Primary ask',
            'values' => [
                'Book an appointment',
                'Book a demo',
                'Request the lookbook',
                'Check availability',
            ],
        ],
        [
            'label' => 'Proof',
            'values' => [
                'Registration, credentials, fees',
                'Interface, pricing, security',
                'Photography, materials, provenance',
                'Selected work, usage terms',
            ],
        ],
        [
            'label' => 'Density',
            'values' => [
                'Calm, high legibility',
                'Dense, scannable',
                'Wide margins, large type',
                'Rhythmic, image-led',
            ],
        ],
        [
            'label' => 'Motion',
            'values' => [
                'Almost none',
                'Product micro-states',
                'Slow fades, parallax',
                'Cuts and stills',
            ],
        ],
        [
            'label' => 'Never',
            'values' => [
                'Outcome guarantees',
                'Invented logos',
                'Stock passed off as own',
                'Mystery pricing',
            ],
        ],
    ],
];
