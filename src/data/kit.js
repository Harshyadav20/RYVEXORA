/**
 * RYVEXORA — element catalog.
 *
 * Every entry is a real element from the design system: `id` matches the key in
 * components/kit/elements.jsx, and `code` is the JSX that renders that exact
 * preview. If you change a preview, change its snippet in the same commit —
 * the library is only useful if the code shown is the code that runs.
 *
 * Deliberately absent: install counts, save counts, star counts. Those would be
 * invented numbers on a studio site.
 */

export const kitCategories = [
  { id: 'all', label: 'All elements' },
  { id: 'actions', label: 'Actions' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'display', label: 'Display' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'feedback', label: 'Feedback' },
];

export const kitElements = [
  /* ---------------------------------------------------------------- Actions */
  {
    id: 'button',
    name: 'Button',
    category: 'actions',
    status: 'Base',
    summary: 'One primary action per screen. The ghost variant is the alternative, never a second primary.',
    tags: ['primary', 'ghost', 'sizes', 'loading'],
    code: `<Button to="/contact">Start a project</Button>

<Button variant="ghost" icon="arrow-right">
  See how we work
</Button>

<Button size="lg" icon="arrow-up-right">
  Open the brief
</Button>`,
    notes: [
      'Primary carries a gradient fill, an inner top highlight and a blue glow.',
      'Ghost is glass — a gradient fill and hairline, not an outline.',
      'Motion is a 2px lift; the arrow travels 4px on hover.',
    ],
  },
  {
    id: 'icon-button',
    name: 'Icon button',
    category: 'actions',
    status: 'Base',
    summary: 'Square hit area for a single action. Always carries an accessible label.',
    tags: ['control', 'a11y'],
    code: `<button className="el-icon-btn" aria-label="Copy link">
  <Icon name="copy" size={16} />
</button>

<button className="el-icon-btn is-active" aria-label="Save">
  <Icon name="bookmark" size={16} />
</button>`,
    notes: [
      '40px target — larger than the 24px icon so it survives touch.',
      'aria-label is required; the icon alone is not a name.',
    ],
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'actions',
    status: 'Base',
    summary: 'A binary setting that applies immediately — no save button.',
    tags: ['control', 'state'],
    code: `<Switch defaultChecked label="Reduced motion" />
<Switch label="Weekly digest" />`,
    notes: [
      'Built on a real checkbox input, so it keeps keyboard and form semantics.',
      'The thumb moves 20px; the track fills with the accent colour.',
    ],
  },

  /* ----------------------------------------------------------------- Inputs */
  {
    id: 'field',
    name: 'Text field',
    category: 'inputs',
    status: 'Base',
    summary: 'Label above, hint below, error replaces the hint. Focus is a cyan ring, not a browser outline.',
    tags: ['form', 'validation'],
    code: `<Field
  label="Work email"
  type="email"
  hint="We reply within one working day."
  required
/>

<Field
  label="Project budget"
  defaultValue="Not sure yet"
  error="Pick a range so the quote is accurate."
/>`,
    notes: [
      'Label is always visible — placeholder-as-label fails the moment someone types.',
      'Errors are announced through aria-describedby and use text, not just colour.',
    ],
  },
  {
    id: 'search',
    name: 'Search field',
    category: 'inputs',
    status: 'Base',
    summary: 'Filter input with a keyboard hint. Clears with Escape, focuses with the shortcut.',
    tags: ['filter', 'keyboard'],
    code: `<SearchField
  value={query}
  onChange={setQuery}
  placeholder="Search 16 elements"
  shortcut="/"
/>`,
    notes: [
      'The shortcut is decoration until it is wired — here "/" focuses the field from anywhere.',
      'Escape clears, so the field never traps a user with a stale query.',
    ],
  },
  {
    id: 'segmented',
    name: 'Segmented control',
    category: 'inputs',
    status: 'Base',
    summary: 'Two to four mutually exclusive options, visible at once. A radio group in disguise.',
    tags: ['choice', 'filter'],
    code: `<Segmented
  label="Preview width"
  value={width}
  onChange={setWidth}
  options={['Desktop', 'Tablet', 'Phone']}
/>`,
    notes: [
      'The selected pill slides; the whole group is one tab stop with arrow-key navigation.',
      'Past four options, use a select — the labels start to truncate.',
    ],
  },

  /* ---------------------------------------------------------------- Display */
  {
    id: 'metric',
    name: 'Metric block',
    category: 'display',
    status: 'Base',
    summary: 'A number with a label and one line of context. No sparkline without real data.',
    tags: ['data', 'stat'],
    code: `<Metric
  label="Time to first value"
  value="9 days"
  note="Median across the last four builds"
  trend="down"
/>`,
    notes: [
      'Never show a metric without saying what it measures and over what period.',
      'Trend arrows are decorative; the direction is also in the note.',
    ],
  },
  {
    id: 'tag',
    name: 'Tag set',
    category: 'display',
    status: 'Base',
    summary: 'Short labels for stack, status or filters. Mono, uppercase, generous tracking.',
    tags: ['label', 'filter'],
    code: `<TagSet items={['React', 'Vite', 'Three.js', 'GSAP']} />

<TagSet
  variant="outline"
  items={['Stable', 'Documented']}
/>`,
    notes: [
      'Tags are 0.7rem with 0.045em tracking — below that, mono uppercase turns to noise.',
      'Interactive tags are buttons; static tags are spans. Never style a span to look clickable.',
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar group',
    category: 'display',
    status: 'Base',
    summary: 'Overlapping initials with a ring that matches the surface behind them.',
    tags: ['people', 'team'],
    code: `<AvatarGroup
  people={[
    { initials: 'AR', name: 'Aarav R.' },
    { initials: 'SN', name: 'Sana N.' },
    { initials: 'KM', name: 'Kabir M.' },
  ]}
  max={3}
/>`,
    notes: [
      'Initials are a fallback, not a design — real faces load when they exist.',
      'Every avatar keeps its name in a title and an sr-only span.',
    ],
  },
  {
    id: 'price',
    name: 'Price tier',
    category: 'display',
    status: 'Base',
    summary: 'One plan, one price, one action. The featured tier is marked once, with words.',
    tags: ['pricing', 'card'],
    code: `<PriceTier
  name="Fixed scope"
  price="₹85,000"
  cadence="from"
  note="Site, copy and one round of revisions."
  featured
  cta="Start a project"
/>`,
    notes: [
      'Price is public. Hiding it filters out the wrong buyers and wastes both sides.',
      'The featured tier is labelled in text — colour alone is not a signal.',
    ],
  },
  {
    id: 'progress',
    name: 'Progress meter',
    category: 'display',
    status: 'Base',
    summary: 'Determinate progress with the value in text. Indeterminate only when work is truly unbounded.',
    tags: ['status', 'loading'],
    code: `<Meter label="Build" value={68} />

<Meter label="Copy review" value={100} tone="ok" />`,
    notes: [
      'role="progressbar" with aria-valuenow, so it is not just a div with a gradient.',
      'The number is visible — a bar alone cannot be read precisely.',
    ],
  },

  /* ------------------------------------------------------------- Navigation */
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'navigation',
    status: 'Base',
    summary: 'Peer views of one subject. Arrow keys move, Enter activates, state is in the URL when it matters.',
    tags: ['nav', 'keyboard'],
    code: `<Tabs
  label="Element detail"
  tabs={['Preview', 'Code', 'Info']}
  value={tab}
  onChange={setTab}
/>`,
    notes: [
      'Two tabs are a toggle; four are a menu. Tabs earn their place at three or more.',
      'The selected tab has both a background and an accent underline — not colour alone.',
    ],
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'navigation',
    status: 'Base',
    summary: 'Where you are, in mono uppercase. The current page is text, never a link.',
    tags: ['wayfinding'],
    code: `<Breadcrumb
  items={[
    { label: 'Home', to: '/' },
    { label: 'Kit', to: '/kit' },
    { label: 'Button' },
  ]}
/>`,
    notes: [
      'Separators are CSS, not text nodes, so screen readers skip them.',
      'The last item carries aria-current="page".',
    ],
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'navigation',
    status: 'Base',
    summary: 'Compact page control with a real current page and disabled edges.',
    tags: ['nav', 'list'],
    code: `<Pagination page={2} pages={6} onChange={setPage} />`,
    notes: [
      'Edge buttons disable rather than disappear, so the control does not jump.',
      'aria-current marks the active page.',
    ],
  },

  /* --------------------------------------------------------------- Feedback */
  {
    id: 'alert',
    name: 'Inline alert',
    category: 'feedback',
    status: 'Base',
    summary: 'Explains something in place — an assumption, a limit, a caveat. Not a decoration.',
    tags: ['message', 'status'],
    code: `<Alert tone="info" title="Illustrative content">
  Every brand shown in this library is fictional.
</Alert>

<Alert tone="warn" title="Not connected">
  This form does not submit anywhere yet.
</Alert>`,
    notes: [
      'Tone is carried by an icon and a title, not by colour alone.',
      'Live regions are only used for messages that appear after an action.',
    ],
  },
  {
    id: 'empty',
    name: 'Empty state',
    category: 'feedback',
    status: 'Base',
    summary: 'Says what is missing, why, and the one thing to do next.',
    tags: ['state', 'content'],
    code: `<EmptyState
  title="Nothing saved yet"
  body="Elements you bookmark appear here, newest first."
  action={{ label: 'Browse elements', to: '/kit' }}
/>`,
    notes: [
      'An empty state without an action is a dead end.',
      'Copy is specific: "nothing saved yet" beats "no data".',
    ],
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'feedback',
    status: 'New',
    summary: 'Confirms a quiet action without stealing focus. Dismisses itself, can be replayed.',
    tags: ['confirm', 'transient'],
    code: `<Toast open={saved} onClose={() => setSaved(false)}>
  Snippet copied to the clipboard
</Toast>`,
    notes: [
      'Announced with aria-live="polite" — never assertive for a success message.',
      'Auto-dismiss is 4s and pauses on hover or focus.',
    ],
  },
];
