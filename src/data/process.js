export const processSteps = [
  {
    number: '01',
    slug: 'discover',
    title: 'Discover',
    duration: '1–2 weeks',
    summary: 'Understand the business before touching the interface.',
    description:
      'We interview the people who will use and maintain the work, review analytics and audit what already exists. The output is a short, opinionated brief: the problem, the constraints and how success will be judged.',
    outputs: ['Stakeholder interviews', 'Technical and content audit', 'Success criteria', 'Scope and estimate'],
    icon: 'compass',
  },
  {
    number: '02',
    slug: 'design',
    title: 'Design',
    duration: '2–3 weeks',
    summary: 'Resolve the experience in the browser, not just in frames.',
    description:
      'Architecture, wireframes and visual direction move together. We prototype key interactions at real breakpoints so typography, spacing and motion are validated before engineering begins.',
    outputs: ['Sitemap and page blueprints', 'Design system', 'Interactive prototype', 'Content plan'],
    icon: 'layers',
  },
  {
    number: '03',
    slug: 'develop',
    title: 'Develop',
    duration: '3–8 weeks',
    summary: 'Build in reviewable slices with quality gates.',
    description:
      'Work ships to a staging environment in weekly slices. Performance budgets, accessibility checks and responsive behaviour are verified continuously rather than at the end.',
    outputs: ['Production front end', 'CMS and integrations', 'Weekly staging builds', 'QA and accessibility pass'],
    icon: 'code',
  },
  {
    number: '04',
    slug: 'deploy',
    title: 'Deploy',
    duration: '3–5 days',
    summary: 'Launch without drama, with the boring parts handled.',
    description:
      'Redirects, analytics, metadata, backups and rollback plans are prepared before launch day. We deploy, verify and stay close for the first days of real traffic.',
    outputs: ['Launch checklist', 'Redirect map', 'Analytics verification', 'Monitoring and rollback plan'],
    icon: 'rocket',
  },
  {
    number: '05',
    slug: 'optimise',
    title: 'Optimise',
    duration: 'Ongoing',
    summary: 'Use real behaviour to improve what matters.',
    description:
      'After launch we look at how people actually use the site or product. Changes are prioritised by impact, not by what is easiest to redesign.',
    outputs: ['Performance monitoring', 'Conversion review', 'Experiment backlog', 'Monthly summary'],
    icon: 'pulse',
  },
];

export const principles = [
  {
    number: '01',
    title: 'Clarity before decoration',
    body: 'Motion and 3D are used to explain, not to impress other designers. If an effect slows comprehension, it is removed.',
  },
  {
    number: '02',
    title: 'Performance is a feature',
    body: 'A beautiful page that takes eight seconds to open is a failed page. We set weight and speed budgets before design begins.',
  },
  {
    number: '03',
    title: 'Evidence over adjectives',
    body: 'No invented metrics, fake logos or borrowed case studies. If something cannot be verified, it does not go on the site.',
  },
  {
    number: '04',
    title: 'Own what you pay for',
    body: 'Code repositories, infrastructure and accounts are set up in your name. There is no lock-in hidden in the architecture.',
  },
  {
    number: '05',
    title: 'Accessible by default',
    body: 'Keyboard navigation, readable contrast and reduced-motion support are part of the definition of done — not a later phase.',
  },
  {
    number: '06',
    title: 'Say the difficult thing early',
    body: 'Scope that will not fit, a direction that will not work, a deadline that is not real — we raise it in week one, not week six.',
  },
];

export const faqs = [
  {
    q: 'How do projects usually start?',
    a: 'With a short conversation and a written brief. If the fit is right, we scope the work in a fixed-price discovery, then move into design and build. You receive a written estimate before anything is committed.',
  },
  {
    q: 'What does a typical project cost?',
    a: 'Focused marketing sites generally start around $3,000–$8,000. Product and SaaS builds typically range from $12,000 to $40,000 depending on scope. Automation and AI work is scoped per workflow. You will always receive a fixed quote before work begins.',
  },
  {
    q: 'How do you communicate during a build?',
    a: 'A shared workspace, a weekly written update and a staging link that always reflects the latest work. Calls are scheduled when a decision is needed, not as a status ritual.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. We work remotely with clients across time zones and schedule overlap where it matters. Async written communication is the default.',
  },
];
