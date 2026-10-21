<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$pageTitle = 'About';
$pageDescription = 'RYVEXORA is a senior-led technology and digital growth studio. Small team, explicit scope, evidence over adjectives.';
require __DIR__ . '/includes/header.php';

$principles = [
    ['01', 'Clarity before decoration', 'Motion and 3D are used to explain, not to impress other designers. If an effect slows comprehension, it is removed.'],
    ['02', 'Performance is a feature', 'A beautiful page that takes eight seconds to open is a failed page. We set weight and speed budgets before design begins.'],
    ['03', 'Evidence over adjectives', 'No invented metrics, fake logos or borrowed case studies. If something cannot be verified, it does not go on the site.'],
    ['04', 'Own what you pay for', 'Code repositories, infrastructure and accounts are set up in your name. There is no lock-in hidden in the architecture.'],
    ['05', 'Accessible by default', 'Keyboard navigation, readable contrast and reduced-motion support are part of the definition of done — not a later phase.'],
    ['06', 'Say the difficult thing early', 'Scope that will not fit, a direction that will not work, a deadline that is not real — we raise it in week one, not week six.'],
];

$promises = [
    'Fixed scope and fixed price before we start',
    'A staging link you can open at any time',
    'Written weekly updates — no status meetings',
    'Full ownership of code, accounts and infrastructure',
];
?>
<main id="main">
    <header class="page-hero">
        <div class="shell">
            <?php render_breadcrumbs([['label' => 'About']]); ?>
            <span class="eyebrow">About the studio</span>
            <h1 class="h1">Small team.<br>Senior work.<br><span class="gradient-text">No theatre.</span></h1>
            <p class="lead">RYVEXORA is a technology and digital growth studio. We design and engineer the systems ambitious teams rely on — and we say what we actually think.</p>
            <div class="chip-row" style="margin-top:24px">
                <span class="chip chip--accent">Mumbai · Working worldwide</span>
                <span class="chip">Senior-led</span>
                <span class="chip">Fixed-scope</span>
            </div>
        </div>
    </header>

    <section class="section">
        <div class="shell detail-layout">
            <div class="reveal">
                <h2 class="h2">We would rather build one useful system than present <span class="cyan">ten beautiful screens.</span></h2>
                <div class="block" style="margin-top:22px">
                    <p>RYVEXORA exists because too many good businesses were paying agencies for process instead of outcomes. Long discovery decks, account layers and redesigns with no commercial reason behind them.</p>
                    <p>We keep the team small and the scope explicit. The people who scope your project are the people who design and build it. You talk to engineers, not intermediaries.</p>
                    <p>We work across web, AI, automation, search and product engineering because real problems rarely arrive one discipline at a time. Sometimes the right answer is a website. Sometimes it is a workflow, a data model or a single well-placed automation. We will tell you which.</p>
                </div>
            </div>
            <aside class="detail-aside reveal">
                <h2>At a glance</h2>
                <p><strong style="color:var(--text)">Studio</strong><br><?= e(SITE_LOCATION) ?> · working worldwide</p>
                <hr>
                <p><strong style="color:var(--text)">Model</strong><br>Senior-led, remote-first, async by default</p>
                <hr>
                <p><strong style="color:var(--text)">Availability</strong><br>Accepting new projects</p>
                <a class="btn btn--block" href="contact.php">Start a project</a>
            </aside>
        </div>
    </section>

    <section class="section section--surface" aria-labelledby="principles-heading">
        <div class="shell">
            <div class="section-head">
                <div class="reveal">
                    <span class="eyebrow">Operating principles</span>
                    <h2 class="h2" id="principles-heading">Six rules we do not bend.</h2>
                    <p class="lead">They are not values on a wall. They decide what we build, what we charge for and what we turn down.</p>
                </div>
            </div>
            <div class="grid grid--3">
                <?php foreach ($principles as $principle): ?>
                    <div class="principle reveal">
                        <span class="principle__num"><?= e($principle[0]) ?></span>
                        <h3><?= e($principle[1]) ?></h3>
                        <p><?= e($principle[2]) ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="section" aria-labelledby="fit-heading">
        <div class="shell detail-layout">
            <div class="reveal">
                <span class="eyebrow">Honest fit</span>
                <h2 class="h2" id="fit-heading" style="margin-top:16px">Clear about what we do — and what we refuse.</h2>
                <p class="lead">A studio that says yes to everything is a studio that does nothing particularly well.</p>

                <div class="block" style="margin-top:26px">
                    <h2>What we are good at</h2>
                    <div class="chip-row">
                        <?php foreach (['Web development', 'AI & automation', 'SEO & growth', 'Cold email systems', 'SaaS products', 'Design systems', 'Performance engineering', 'Technical writing'] as $skill): ?>
                            <span class="chip"><?= e($skill) ?></span>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="block">
                    <h2>What we will not do</h2>
                    <ul class="bullet-list">
                        <li>Promise rankings, meeting counts or revenue we cannot control.</li>
                        <li>Publish invented case studies, borrowed logos or fake testimonials.</li>
                        <li>Pad a scope to win a bigger invoice.</li>
                        <li>Take on work we do not have the capacity to deliver properly.</li>
                    </ul>
                </div>
            </div>

            <aside class="detail-aside reveal">
                <h2>What you can expect</h2>
                <ul class="check-list">
                    <?php foreach ($promises as $promise): ?>
                        <li><?= e($promise) ?></li>
                    <?php endforeach; ?>
                </ul>
                <hr>
                <p>Remote-first, async by default, with scheduled calls only when a decision needs one. You get a staging link that always reflects the latest build.</p>
                <p>Code, repositories and infrastructure accounts are set up in your name. If you leave, everything leaves with you.</p>
            </aside>
        </div>
    </section>

    <?php render_cta(
        'A short conversation beats a long proposal.',
        'Tell us what you are building and what is getting in the way. If we are not the right fit, we will say so and point you somewhere better.',
        'See our work',
        'work.php',
    ); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
