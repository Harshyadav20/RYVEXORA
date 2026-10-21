/**
 * Format libraries.
 *
 * Each entry is a *layout system*, not a template with swapped copy: a clinic
 * answers "can I get an appointment", a product answers "what does it do and
 * what does it cost", a luxury house answers "is this for me", a creator
 * answers "can I book you". The same brand, tokens and engineering sit
 * underneath; the composition and the asks change.
 *
 * Every demo brand below is fictional and labelled as such in the UI. No
 * testimonial, logo, metric or award is invented anywhere in this file.
 */

export const formats = [
  {
    slug: 'medical',
    motion: 'Near-static — no parallax, no reveal longer than 200 ms',
    index: '01',
    name: 'Medical & Clinics',
    audience: 'Doctors, dentists, specialists, multi-site clinics',
    kicker: 'Appointment first',
    accent: '#36d9ff',
    accentSoft: 'rgba(54, 217, 255, 0.14)',
    headline: 'A clinic site that answers the only question a patient has.',
    summary:
      '“Can I be seen, by whom, and how soon?” Everything above the fold serves that. Credentials, fees and insurance are one tap away, and no page asks a worried person to decode marketing language.',
    primaryAction: 'Book an appointment',
    keyPages: ['Home', 'Specialities', 'Your visit', 'Doctors', 'Fees & insurance', 'Contact'],
    demo: {
      brand: 'NORTHBEAM DENTAL',
      brandNote: 'Illustrative clinic — not a client',
      nav: ['Treatments', 'Your visit', 'Team', 'Fees'],
      hero: {
        eyebrow: 'Hampstead · Est. 2014',
        title: 'Same-day care for the thing that cannot wait.',
        lead: 'Emergency slots held back every morning, evening appointments twice a week, and a written plan with costs before anything begins.',
        badges: ['GDC registered', 'Emergency slots daily', 'Evening clinic Tue & Thu'],
      },
      booker: {
        title: 'Request an appointment',
        fields: [
          { label: 'Reason', value: 'Urgent tooth pain' },
          { label: 'Preferred day', value: 'Tomorrow, morning' },
        ],
        note: 'Demo form · not connected',
        action: 'Find a slot',
      },
      treatments: [
        { name: 'Emergency care', detail: 'Same-day assessment for pain, swelling or a broken tooth.', time: '20 min' },
        { name: 'General dentistry', detail: 'Examinations, hygiene, fillings and preventive plans.', time: '30–45 min' },
        { name: 'Implants & restore', detail: 'Staged implant work with a written cost plan at every step.', time: 'Consult' },
        { name: 'Aligners', detail: 'Clear aligner assessment with a digital preview of the outcome.', time: '45 min' },
      ],
      visit: [
        { step: '01', title: 'Tell us what hurts', body: 'A two-minute request form, or call the desk. Urgent cases are triaged the same morning.' },
        { step: '02', title: 'Examination', body: 'A dentist examines, explains what they see, and shows you the scan on screen.' },
        { step: '03', title: 'Written plan', body: 'Options, costs and timescales leave with you in writing — including the option to wait.' },
        { step: '04', title: 'Treatment & follow-up', body: 'Care happens at your pace, with a direct line for anything that changes.' },
      ],
      clinician: {
        name: 'Dr. A. Mensah',
        role: 'Clinical lead · Implantology',
        credentials: ['BDS, King’s College London', 'MSc Implant Dentistry', 'GDC registration on request'],
        note: 'Illustrative profile. Real credentials must be verifiable and listed exactly as registered.',
      },
      fees: [
        { label: 'New patient examination', price: 'from £65' },
        { label: 'Emergency appointment', price: 'from £85' },
        { label: 'Hygiene visit', price: 'from £70' },
        { label: 'Written treatment plan', price: 'Included' },
      ],
      faq: [
        { q: 'Do you take insurance?', a: 'The clinic invoices directly and provides itemised receipts for reimbursement. Cover is confirmed before treatment, not after.' },
        { q: 'What if I am in pain today?', a: 'Emergency slots are held back daily. Call before 10:00 and the desk will tell you honestly whether there is capacity.' },
      ],
    },
    changes: [
      'Budget ranges are removed — clinical decisions are not shopping decisions.',
      'The first screen is a booking action, not a manifesto.',
      'Registration numbers, qualifications and fees are published, not implied.',
      'Every claim is medically reviewed; outcomes are never guaranteed.',
    ],
    avoid: [
      'Before/after galleries without consent and clinical context.',
      'Invented success rates, awards or “painless” promises.',
      'Collecting health details in a form that is not secured and consented.',
      'Autoplay video or sound in a waiting room.',
    ],
    seo: 'Local schema, treatment pages, opening hours, and a booking path that works one-handed on a phone.',
  },
  {
    slug: 'digital-product',
    motion: 'Product micro-states, chart transitions, hover feedback',
    index: '02',
    name: 'Digital Products & SaaS',
    audience: 'Founders, product teams, B2B software',
    kicker: 'Product-led',
    accent: '#246bfd',
    accentSoft: 'rgba(36, 107, 253, 0.16)',
    headline: 'Show the product working before you ask for a meeting.',
    summary:
      'The interface is the argument. A real product surface above the fold, features in the order people adopt them, and pricing that is legible without a call.',
    primaryAction: 'Book a demo',
    keyPages: ['Product', 'Features', 'Pricing', 'Customers', 'Docs', 'Security'],
    demo: {
      brand: 'LEDGERLINE',
      brandNote: 'Illustrative product — not a client',
      nav: ['Product', 'Features', 'Pricing', 'Docs'],
      hero: {
        eyebrow: 'Finance operations',
        title: 'Close the month in a day, not a week.',
        lead: 'Ledgerline reconciles every account, flags what does not match, and leaves a review trail your accountant will actually accept.',
        badges: ['SOC 2 ready', 'SSO / SAML', 'Read-only by default'],
      },
      window: {
        title: 'Reconciliation · March',
        tabs: ['Overview', 'Accounts', 'Review', 'Exports'],
        rows: [
          { a: 'Stripe payouts', b: 'Reconciled', c: '412' },
          { a: 'Bank · Barclays', b: '3 to review', c: '1,208' },
          { a: 'Xero ledger', b: 'Reconciled', c: '986' },
          { a: 'Expense cards', b: '1 to review', c: '147' },
        ],
        kpi: [
          { label: 'Matched', value: '97.4%' },
          { label: 'Open items', value: '4' },
          { label: 'Days to close', value: '1.2' },
        ],
      },
      features: [
        { title: 'Reconcile automatically', body: 'Rules match transactions across accounts, currencies and payment providers — then explain every match it made.', tag: 'Core' },
        { title: 'Review only exceptions', body: 'Your team sees the four things that need a human, not eleven thousand rows.', tag: 'Workflow' },
        { title: 'Export an audit trail', body: 'Every action is attributed and timestamped. Accountants get a file, not a screenshot.', tag: 'Trust' },
      ],
      pricing: [
        { name: 'Starter', price: '$0', note: 'One workspace, two accounts, 200 matches / month.', cta: 'Start free', featured: false },
        { name: 'Team', price: '$49', note: 'Unlimited accounts, approvals, audit log. Per month, billed annually.', cta: 'Book a demo', featured: true },
        { name: 'Scale', price: 'Custom', note: 'SSO, data residency, custom retention and a named engineer.', cta: 'Talk to us', featured: false },
      ],
      integrations: ['Accounting sync', 'Open banking', 'SSO / SAML', 'Webhooks', 'CSV import', 'Audit export'],
      faq: [
        { q: 'Do you store our bank credentials?', a: 'No. Connections are read-only and tokenised; credentials never touch our servers.' },
        { q: 'How long does onboarding take?', a: 'One workspace is live in an afternoon. Multi-entity rollouts are staged over two to three weeks with a named engineer.' },
      ],
    },
    changes: [
      'A real interface replaces a decorative illustration.',
      'Pricing is public — hiding it filters out the wrong buyers and wastes both sides.',
      'Feature order follows adoption, not the org chart.',
      'Security and data handling become first-class pages, not footnotes.',
    ],
    avoid: [
      'Invented customer logos, ARR or “10× faster” badges.',
      'A demo form that takes the place of showing the product.',
      'Feature lists with no state, error or empty view.',
      'Auto-playing carousels on the pricing page.',
    ],
    seo: 'Comparison and integration pages, docs in the index, and structured data for software and pricing.',
  },
  {
    slug: 'luxury',
    motion: 'Slow fades and gentle parallax; nothing bounces',
    index: '03',
    name: 'Luxury & Hospitality',
    audience: 'Ateliers, hotels, fashion, interiors, high-end services',
    kicker: 'Editorial restraint',
    accent: '#c9a96a',
    accentSoft: 'rgba(201, 169, 106, 0.14)',
    headline: 'Sell the room, not the website.',
    summary:
      'Full-bleed imagery, wide margins and copy that behaves like a caption. The only ask is a quiet one: request the lookbook, hold a table, arrange a viewing.',
    primaryAction: 'Request the lookbook',
    keyPages: ['Home', 'Collections', 'Atelier', 'Journal', 'Enquiries'],
    demo: {
      brand: 'MAISON AUREL',
      brandNote: 'Illustrative house — not a client',
      nav: ['Collections', 'Atelier', 'Journal', 'Enquiries'],
      hero: {
        eyebrow: 'Autumn collection · 2026',
        title: 'The Quiet Hour',
        lead: 'Nine pieces cut from undyed wool and washed silk, made in a courtyard atelier in the twelfth.',
        badges: ['Made to order', 'Six-week lead time', 'Paris · By appointment'],
      },
      collection: [
        { name: 'No. 01 — The Long Coat', detail: 'Undyed lambswool, horn buttons', tone: 'a' },
        { name: 'No. 04 — The Slip', detail: 'Washed silk, hand-finished hem', tone: 'b' },
        { name: 'No. 07 — The Trouser', detail: 'Wide leg, pressed wool crepe', tone: 'c' },
      ],
      specs: [
        { label: 'Cloth', value: 'Undyed lambswool · 640 g' },
        { label: 'Construction', value: 'Half-canvassed, hand-finished' },
        { label: 'Lead time', value: 'Six weeks from fitting' },
        { label: 'Care', value: 'Cold wash or atelier service' },
      ],
      atelier: {
        title: 'An appointment at the atelier',
        body: 'Fittings are held Tuesday to Saturday in the twelfth arrondissement. Tell us what you are looking for and we will reply with a time.',
        fields: ['Name', 'Email', 'City', 'What you are looking for'],
        action: 'Request an appointment',
      },
      quote: 'Nothing here is in a hurry.',
    },
    changes: [
      'Type gets larger, copy gets shorter, and margins get wider.',
      'Enquiry replaces the checkout path — a conversation is the conversion.',
      'Photography carries the page; the interface steps back.',
      'Motion slows to fades and parallax, never bounce.',
    ],
    avoid: [
      'Stock photography passed off as the house’s own work.',
      'Sale banners, countdown timers or urgency copy.',
      'A cart where the product is made to order.',
      'Autoplay video with sound in a boutique context.',
    ],
    seo: 'Collection and journal pages, image sitemaps, and language alternates for multi-market houses.',
  },
  {
    slug: 'creator',
    motion: 'Cuts and stills; hover scrubbing on work tiles',
    index: '04',
    name: 'Creators & Studios',
    audience: 'Photographers, directors, designers, small studios',
    kicker: 'Portfolio, with a rate card',
    accent: '#8b5cf6',
    accentSoft: 'rgba(139, 92, 246, 0.16)',
    headline: 'A portfolio that ends in a booking, not a shrug.',
    summary:
      'Work first, in the order you want to be commissioned. Then the practical parts most portfolios hide: what you do, how you engage, what it costs, and how to start.',
    primaryAction: 'Check availability',
    keyPages: ['Work', 'About', 'Services', 'Rates', 'Contact'],
    demo: {
      brand: 'STUDIO NOOR',
      brandNote: 'Illustrative studio — not a client',
      nav: ['Work', 'About', 'Services', 'Rates'],
      hero: {
        eyebrow: 'Director & photographer · Mumbai',
        title: 'Films with a pulse, frames that hold.',
        lead: 'Campaigns, brand films and editorial portraits for people who care how it feels, not just how it looks.',
        badges: ['Booking Q1 2027', 'Remote & travel', 'Reply within 2 days'],
      },
      availability: { label: 'Next opening', value: 'March 2027', note: 'Two project slots per month' },
      work: [
        { title: 'Salt & Static', kind: 'Brand film · 02:40', tone: 'a' },
        { title: 'The Long Table', kind: 'Editorial · 12 frames', tone: 'b' },
        { title: 'Night Shift', kind: 'Campaign · 6 assets', tone: 'c' },
        { title: 'Quiet Machines', kind: 'Documentary · 08:10', tone: 'd' },
      ],
      services: [
        { title: 'Brand film', detail: 'Concept, direction, shoot, edit and grade. One film or a small system of cutdowns.', from: 'from ₹2,40,000' },
        { title: 'Editorial shoot', detail: 'Half or full day, lighting, crew and a retouched set delivered in ten working days.', from: 'from ₹85,000' },
        { title: 'Creative direction', detail: 'Monthly direction for teams shipping campaigns without an in-house director.', from: 'from ₹1,20,000 / mo' },
      ],
      process: ['Brief', 'Treatment', 'Shoot', 'Delivery'],
      faq: [
        { q: 'Do you travel?', a: 'Yes, with travel and accommodation billed at cost. International work needs three weeks of notice for visas where applicable.' },
        { q: 'Who owns the footage?', a: 'Usage is licensed by channel, territory and duration. Raw files stay with the studio; extended usage is quoted separately.' },
      ],
    },
    changes: [
      'Work leads; the biography is a sidebar, not the opening act.',
      'A rate card replaces “contact for pricing”, which filters both ways.',
      'Availability is a real date, not a vague “open for projects”.',
      'Usage and licensing are stated before the first call.',
    ],
    avoid: [
      'A reel that is three years old at the top of the page.',
      'Testimonials from clients who cannot be named.',
      'Mystery pricing that turns every enquiry into a negotiation.',
      'Instagram embeds that break the page when a post is deleted.',
    ],
    seo: 'Project pages with descriptive titles, an image sitemap, and a person schema that matches public profiles.',
  },
];

export const formatBySlug = (slug) => formats.find((format) => format.slug === slug) ?? null;

export const formatPrinciples = [
  {
    title: 'One design system, four compositions',
    body: 'Tokens, type scale, spacing, motion rules and form behaviour are shared. Only hierarchy and density change — so every format feels like the same studio and none of them looks like a template.',
  },
  {
    title: 'The first screen carries the decision',
    body: 'A patient wants a slot, a buyer wants evidence, a collector wants atmosphere, a commissioner wants work and rates. Each format puts that one thing above the fold and lets the rest support it.',
  },
  {
    title: 'Honesty is a layout decision',
    body: 'No invented logos, metrics or testimonials in any format. Where proof would normally go, the templates hold deliberate space so nothing gets filled in by accident.',
  },
];

/**
 * The comparison only makes sense against the four formats above; keeping the
 * rows here (rather than in a page) means both editions render the same table.
 */
export const formatComparison = [
  { label: 'First screen', values: ['Next available slot', 'The product, running', 'Atmosphere and craft', 'Work, then the rate'] },
  { label: 'Primary ask', values: ['Book an appointment', 'Book a demo', 'Request the lookbook', 'Check availability'] },
  { label: 'Proof', values: ['Registration, credentials, fees', 'Interface, pricing, security', 'Photography, materials, provenance', 'Selected work, usage terms'] },
  { label: 'Density', values: ['Calm, high legibility', 'Dense, scannable', 'Wide margins, large type', 'Rhythmic, image-led'] },
  { label: 'Motion', values: ['Almost none', 'Product micro-states', 'Slow fades, parallax', 'Cuts and stills'] },
  { label: 'Never', values: ['Outcome guarantees', 'Invented logos', 'Stock passed off as own', 'Mystery pricing'] },
];
