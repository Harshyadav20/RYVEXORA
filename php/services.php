<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$pageTitle = 'Services';
$pageDescription = 'Web development, AI and automation, SEO and growth, cold email systems, SaaS engineering and business automation. Six disciplines, one accountable studio.';
require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <header class="page-hero">
        <div class="shell">
            <?php render_breadcrumbs([['label' => 'Services']]); ?>
            <span class="eyebrow">Services</span>
            <h1 class="h1">Six disciplines.<br><span class="gradient-text">One accountable studio.</span></h1>
            <p class="lead">Most real problems need more than one skill. We keep strategy, design and engineering together so the answer stays coherent from brief to production.</p>
            <div class="chip-row" style="margin-top:24px">
                <span class="chip chip--accent">Fixed-scope pricing</span>
                <span class="chip">Senior-led delivery</span>
                <span class="chip">You own the code</span>
            </div>
        </div>
    </header>

    <section class="section" aria-label="All services">
        <div class="shell">
            <div class="grid grid--3">
                <?php foreach ($DATA['services'] as $service): ?>
                    <?php render_service_card($service); ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="section section--surface" aria-labelledby="engagement-heading">
        <div class="shell">
            <div class="section-head">
                <div class="reveal">
                    <span class="eyebrow">Engagement models</span>
                    <h2 class="h2" id="engagement-heading">Three ways to work with us.</h2>
                    <p class="lead">No retainer you will not use, no unexplained change orders. The model is chosen to fit the work, not the other way around.</p>
                </div>
            </div>
            <div class="grid grid--3">
                <div class="principle reveal">
                    <span class="principle__num">01</span>
                    <h3>Fixed-scope project</h3>
                    <p>A defined outcome, a fixed price and a delivery window agreed before design begins. Best for sites, launches, automation builds and first product releases.</p>
                </div>
                <div class="principle reveal">
                    <span class="principle__num">02</span>
                    <h3>Monthly partnership</h3>
                    <p>A reserved block of senior time each month for improvements, experiments and maintenance. Cancel with 30 days notice — no annual lock-in.</p>
                </div>
                <div class="principle reveal">
                    <span class="principle__num">03</span>
                    <h3>Advisory sprint</h3>
                    <p>One to two weeks of audit, architecture and prioritisation when you need a senior second opinion before committing a larger budget.</p>
                </div>
            </div>
            <p class="form-note" style="margin-top:26px">Prices are fixed after a short discovery. Where scope is genuinely unclear, we quote the discovery on its own so you can decide before committing further.</p>
        </div>
    </section>

    <?php render_cta(
        'Not sure which service you need?',
        'Describe the problem rather than the solution. We will tell you what actually needs building — including when the answer is smaller than you expected.',
        'See how we work',
        'process.php',
    ); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
