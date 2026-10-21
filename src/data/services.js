/**
 * Service content model.
 * Every service page is generated from this file — no duplicated markup.
 * Copy is deliberately specific and makes no claims we cannot substantiate.
 */

export const services = [
  {
    slug: 'web-development',
    index: '01',
    title: 'Web Development',
    kicker: 'Design-engineered websites',
    summary:
      'Fast, distinctive websites that look premium and convert — built on modern frameworks with performance budgets baked in.',
    description:
      'We build marketing sites, product sites and web applications that load quickly, rank well and feel considered on every screen. Every build starts with a performance and accessibility budget, not a template.',
    visual: 'web',
    accent: '#36D9FF',
    deliverables: [
      'Information architecture and page blueprints',
      'Design system with reusable components',
      'Hand-built front end (React, Next.js or Astro)',
      'Headless CMS so your team can publish',
      'Motion design with reduced-motion fallbacks',
      'Analytics, events and conversion tracking',
    ],
    approach: [
      {
        title: 'Define the job of the page',
        body: 'We agree what each page must make a visitor understand, believe and do before a single visual is designed.',
      },
      {
        title: 'Design in the browser',
        body: 'Layouts are prototyped at real breakpoints so spacing, type and motion survive contact with real content.',
      },
      {
        title: 'Engineer to a budget',
        body: 'JavaScript weight, image strategy and Core Web Vitals targets are set up front and checked on every build.',
      },
      {
        title: 'Ship, measure, refine',
        body: 'We launch with analytics in place, then iterate on the sections that actually influence enquiries.',
      },
    ],
    stack: ['React', 'Next.js', 'Astro', 'TypeScript', 'Three.js', 'GSAP', 'Sanity', 'Shopify'],
    outcomes: [
      'A site that reflects the quality of your product',
      'Pages that stay readable and usable on slow connections',
      'Content your team can update without a developer',
      'A measurable path from landing to enquiry',
    ],
    faqs: [
      {
        q: 'Do you work with an existing design?',
        a: 'Yes. If you have a finished design system we can build directly from it. If the design only exists in Figma as flat frames, we usually refine interaction, spacing and mobile behaviour as part of the build.',
      },
      {
        q: 'Can you take over an existing site?',
        a: 'Often. We start with a short technical audit covering performance, accessibility, SEO basics and maintainability, then recommend whether to refactor or rebuild. We will tell you when a rebuild is not worth the money.',
      },
      {
        q: 'What happens after launch?',
        a: 'You can take the code and run. Most clients keep us on a light monthly retainer for improvements, new sections and performance monitoring.',
      },
    ],
    related: ['saas-development', 'seo-growth'],
  },
  {
    slug: 'ai-automation',
    index: '02',
    title: 'AI & Intelligent Automation',
    kicker: 'Applied artificial intelligence',
    summary:
      'AI systems grounded in your own data — assistants, agents and document pipelines that do real work, with humans in control.',
    description:
      'We build AI features and internal tools that solve a defined operational problem: answering support questions, qualifying leads, reading documents or preparing work for your team. Retrieval quality, evaluation and guardrails are treated as core engineering, not add-ons.',
    visual: 'ai',
    accent: '#8B5CF6',
    deliverables: [
      'Use-case discovery and feasibility scoring',
      'Retrieval-augmented generation (RAG) pipelines',
      'Custom assistants trained on your knowledge base',
      'Document extraction and classification workflows',
      'Human-in-the-loop review interfaces',
      'Evaluation suites, logging and cost controls',
    ],
    approach: [
      {
        title: 'Pick a problem worth automating',
        body: 'We map the workflow, the volume of work and the cost of a wrong answer before choosing a model.',
      },
      {
        title: 'Ground it in your data',
        body: 'Content is cleaned, chunked, embedded and permissioned so answers cite real sources rather than guessing.',
      },
      {
        title: 'Build the loop, not the demo',
        body: 'Real usage needs review queues, escalation paths, fallbacks and audit logs. We ship those with the model.',
      },
      {
        title: 'Measure and contain cost',
        body: 'Test sets, latency targets and token budgets keep quality predictable as usage grows.',
      },
    ],
    stack: ['OpenAI', 'Anthropic', 'LangChain', 'pgvector', 'Pinecone', 'Python', 'Node.js', 'n8n'],
    outcomes: [
      'Fewer repetitive tasks for your team',
      'Faster first-response time on inbound work',
      'Answers that cite your documents instead of inventing them',
      'A system you can audit and improve over time',
    ],
    faqs: [
      {
        q: 'Will the AI make things up?',
        a: 'Any language model can. We reduce it with retrieval, strict prompting, source citations and refusal behaviour, then measure it against a test set. For high-stakes answers we add human approval before anything is sent.',
      },
      {
        q: 'Do we need our own model?',
        a: 'Rarely. Most businesses get better results from a hosted frontier model plus good retrieval than from a custom-trained model. We will only recommend fine-tuning when the evidence supports it.',
      },
      {
        q: 'How do you handle private data?',
        a: 'We work with providers that do not train on your data by default, keep credentials server-side, limit retrieval by permission, and agree a retention policy before the build starts.',
      },
    ],
    related: ['business-automation', 'saas-development'],
  },
  {
    slug: 'seo-growth',
    index: '03',
    title: 'SEO & Digital Growth',
    kicker: 'Compounding organic demand',
    summary:
      'Technical SEO, content architecture and conversion work that compounds — measured in qualified traffic and enquiries.',
    description:
      'We treat search as an engineering and editorial system: crawlable foundations, a content architecture mapped to real intent, and pages designed to convert the visitors they attract. No tricks, no thin pages at scale without a reason.',
    visual: 'seo',
    accent: '#246BFD',
    deliverables: [
      'Technical audit and crawl budget fixes',
      'Keyword and intent mapping by revenue potential',
      'Site architecture and internal linking plans',
      'Programmatic and editorial content systems',
      'On-page optimisation and schema markup',
      'Reporting tied to enquiries, not vanity rankings',
    ],
    approach: [
      {
        title: 'Audit the foundation',
        body: 'Crawlability, indexation, site speed, duplicate content and structured data are checked before content investment.',
      },
      {
        title: 'Map intent to pages',
        body: 'We map queries to the page that should own them, then remove or merge pages that compete with each other.',
      },
      {
        title: 'Build a content engine',
        body: 'Templates, briefs and editorial standards make consistent publishing possible without diluting quality.',
      },
      {
        title: 'Convert the traffic',
        body: 'Ranking is only useful if the page moves someone. We optimise layout, proof and calls to action together.',
      },
    ],
    stack: ['Ahrefs', 'Semrush', 'Screaming Frog', 'GSC', 'GA4', 'Schema.org', 'Looker Studio'],
    outcomes: [
      'A site search engines can crawl and trust',
      'Clear ownership of the queries that matter',
      'A publishing process your team can sustain',
      'Reporting that connects search to pipeline',
    ],
    faqs: [
      {
        q: 'How long does SEO take?',
        a: 'Technical fixes can show movement in weeks. Content and authority typically need three to six months before trends are meaningful. Anyone promising page-one rankings in 30 days is guessing or misleading you.',
      },
      {
        q: 'Do you write content?',
        a: 'We produce briefs and can write technical pages ourselves. For subject-heavy editorial, we work with your in-house experts and edit for search and clarity.',
      },
      {
        q: 'Can you guarantee rankings?',
        a: 'No. We can guarantee the work: audits, fixes, architecture and measurement. Rankings are controlled by search engines, not us.',
      },
    ],
    related: ['web-development', 'cold-email'],
  },
  {
    slug: 'cold-email',
    index: '04',
    title: 'Cold Email Outreach',
    kicker: 'Outbound that respects the inbox',
    summary:
      'Outbound infrastructure and sequences built on accurate targeting, clean deliverability and relevant messaging.',
    description:
      'We build outreach systems that reach the right people with a message worth reading. That means verified contact data, authenticated domains, warmed inboxes, short sequences and honest reporting. We do not send bulk spam or scrape contact lists.',
    visual: 'email',
    accent: '#36D9FF',
    deliverables: [
      'ICP and segment research',
      'Contact verification and list hygiene',
      'Domain authentication (SPF, DKIM, DMARC)',
      'Inbox warm-up and sending limits',
      'Copy, sequences and reply handling',
      'CRM sync and reporting',
    ],
    approach: [
      {
        title: 'Narrow the audience',
        body: 'A tight segment with a real problem beats a large list. We define who should hear from you and why now.',
      },
      {
        title: 'Set up the infrastructure',
        body: 'Secondary domains, authentication, warm-up and volume limits are handled before the first email is sent.',
      },
      {
        title: 'Write something human',
        body: 'Short, specific emails that reference the recipient’s context and make one clear ask. No fake follow-ups, no false urgency.',
      },
      {
        title: 'Route and learn',
        body: 'Replies go to a human. Positive responses sync to your CRM, and we refine segments from real objection patterns.',
      },
    ],
    stack: ['Instantly', 'Smartlead', 'Apollo', 'Clay', 'HubSpot', 'Pipedrive', 'Google Workspace'],
    outcomes: [
      'Deliverability protected before volume increases',
      'Messaging built around a real business problem',
      'Replies handled by a person, not a bot',
      'Clear visibility into what is working',
    ],
    faqs: [
      {
        q: 'Is cold email legal?',
        a: 'It depends on the jurisdiction and how you send it. We follow applicable rules such as GDPR legitimate-interest requirements and CAN-SPAM identity and opt-out rules, keep volumes reasonable, and maintain suppression lists.',
      },
      {
        q: 'How many emails will you send?',
        a: 'Far fewer than most agencies propose. We scale slowly, watch reply and bounce signals daily, and keep each inbox within limits that protect your domain reputation.',
      },
      {
        q: 'Do you guarantee meetings?',
        a: 'No. We guarantee the system: verified data, authenticated infrastructure, relevant copy and honest reporting. Meeting volume depends on your offer, market and capacity to follow up.',
      },
    ],
    related: ['seo-growth', 'ai-automation'],
  },
  {
    slug: 'saas-development',
    index: '05',
    title: 'SaaS & Software Development',
    kicker: 'Products built to last',
    summary:
      'Multi-tenant products, internal tools and APIs engineered for real usage — auth, billing, permissions and observability included.',
    description:
      'We design and build software products from first sketch to production: data model, permissions, billing, dashboards, integrations and deployment. The goal is a maintainable product your team can extend, not a prototype that collapses under real usage.',
    visual: 'saas',
    accent: '#8B5CF6',
    deliverables: [
      'Product scoping and technical discovery',
      'Data modelling and API design',
      'Multi-tenant architecture and roles',
      'Authentication and subscription billing',
      'Admin dashboards and user interfaces',
      'CI/CD, monitoring and environments',
    ],
    approach: [
      {
        title: 'Scope the smallest useful product',
        body: 'We define the core loop that delivers value, and defer everything that does not prove it.',
      },
      {
        title: 'Design the data first',
        body: 'Schemas, tenancy and permissions are decided early because they are expensive to change later.',
      },
      {
        title: 'Build in vertical slices',
        body: 'Each slice ships from database to interface so you can review working software every week.',
      },
      {
        title: 'Harden for production',
        body: 'Error tracking, backups, rate limits and environment separation are part of the launch, not a later favour.',
      },
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe', 'Supabase', 'AWS'],
    outcomes: [
      'A product your team can operate and extend',
      'Billing and permissions that work from day one',
      'Deployments that are boring and repeatable',
      'Clear documentation and handover',
    ],
    faqs: [
      {
        q: 'Can you work with our existing codebase?',
        a: 'Yes. We start with a short review of architecture, test coverage and deployment, then agree a plan. If the codebase is a risk to your business we will say so clearly.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do. Repositories, infrastructure accounts and third-party services are set up in your name from the start.',
      },
      {
        q: 'Do you provide ongoing support?',
        a: 'We offer retainers for feature work, maintenance and monitoring. Handover is also a first-class outcome — with documentation, runbooks and a walkthrough.',
      },
    ],
    related: ['web-development', 'business-automation'],
  },
  {
    slug: 'business-automation',
    index: '06',
    title: 'Business Automation',
    kicker: 'Operations without the busywork',
    summary:
      'Connected systems that move data, trigger actions and remove manual steps — built on tools your team already uses.',
    description:
      'Most operational drag comes from tools that do not talk to each other. We map the workflow, then connect CRM, finance, support and internal tools with reliable automation, clear ownership and failure alerts.',
    visual: 'automation',
    accent: '#246BFD',
    deliverables: [
      'Process mapping and bottleneck analysis',
      'Tool integration and data sync',
      'Internal dashboards and approvals',
      'Document generation and e-signature flows',
      'Error handling, retries and alerts',
      'Team training and documentation',
    ],
    approach: [
      {
        title: 'Map the real process',
        body: 'We sit with the people doing the work and document what actually happens, including the workarounds.',
      },
      {
        title: 'Remove before automating',
        body: 'Steps that exist for no reason get deleted first. Automating waste just makes it faster.',
      },
      {
        title: 'Connect the systems',
        body: 'Webhooks, queues and scheduled jobs replace copy-paste with a traceable flow that has one source of truth.',
      },
      {
        title: 'Make failure visible',
        body: 'Alerts, retries and a run log mean a broken integration gets noticed by you, not by a customer.',
      },
    ],
    stack: ['n8n', 'Make', 'Zapier', 'Airtable', 'Notion', 'HubSpot', 'Google Workspace', 'PostgreSQL'],
    outcomes: [
      'Fewer manual handoffs and copy-paste errors',
      'A single source of truth across tools',
      'Faster internal turnaround on routine requests',
      'Processes documented so they survive staff changes',
    ],
    faqs: [
      {
        q: 'Do we need to replace our tools?',
        a: 'Usually not. We connect what you already pay for. Replacement is only recommended when a tool is the actual source of the bottleneck.',
      },
      {
        q: 'What if an automation breaks?',
        a: 'Every flow ships with logging and alerts, plus a documented manual fallback so work can continue while it is fixed.',
      },
      {
        q: 'How do you price automation work?',
        a: 'We scope flows individually and quote fixed prices. Where the requirements are genuinely unclear, we start with a paid discovery.',
      },
    ],
    related: ['ai-automation', 'saas-development'],
  },
];

export const getService = (slug) => services.find((service) => service.slug === slug);

export const serviceOptions = services.map(({ title, slug }) => ({ title, slug }));
