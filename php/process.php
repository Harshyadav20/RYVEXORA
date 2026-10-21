<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$pageTitle = 'Process';
$pageDescription = 'Five stages — Discover, Design, Develop, Deploy and Optimise — each with a defined output. No black boxes, no surprise invoices.';
require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <header class="page-hero">
        <div class="shell">
            <?php render_breadcrumbs([['label' => 'Process']]); ?>
            <span class="eyebrow">How we work</span>
            <h1 class="h1">A process built to<br><span class="gradient-text">remove surprises.</span></h1>
            <p class="lead">Five stages, each with a defined output and a clear decision point. You always know what is being built, what it costs and what happens next.</p>
            <div class="chip-row" style="margin-top:24px">
                <span class="chip chip--accent">Fixed scope</span>
                <span class="chip">Weekly written updates</span>
                <span class="chip">Staging link, always current</span>
            </div>
        </div>
    </header>

    <section class="section" aria-label="Process overview">
        <div class="shell">
            <h2 class="sr-only">Process overview</h2>
            <div class="grid grid--3">
                <?php foreach ($DATA['process'] as $step): ?>
                    <div class="principle reveal">
                        <span class="principle__num"><?= e($step['number']) ?> · <?= e($step['duration']) ?></span>
                        <h3><?= e($step['title']) ?></h3>
                        <p><?= e($step['summary']) ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="section section--surface section--flush" aria-labelledby="phases-heading">
        <div class="shell">
            <div class="section-head">
                <div class="reveal">
                    <span class="eyebrow">Stage by stage</span>
                    <h2 class="h2" id="phases-heading">What actually happens.</h2>
                    <p class="lead">No document for the sake of a document. Each stage produces something you can review, use or hand to another team.</p>
                </div>
            </div>

            <?php foreach ($DATA['process'] as $step): ?>
                <div class="step reveal" style="grid-template-columns:90px minmax(0,1fr)">
                    <span class="step__num" style="width:64px;height:64px;font-size:0.9rem"><?= e($step['number']) ?></span>
                    <div>
                        <h3 style="font-size:clamp(1.2rem,2vw,1.6rem)"><?= e($step['title']) ?> <span class="mono faint">· <?= e($step['duration']) ?></span></h3>
                        <p style="max-width:70ch;margin-top:6px"><?= e($step['description']) ?></p>
                        <div class="chip-row" style="margin-top:12px">
                            <?php foreach ($step['outputs'] as $output): ?>
                                <span class="chip"><?= e($output) ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="section" aria-labelledby="process-faq-heading">
        <div class="shell detail-layout">
            <div class="reveal">
                <span class="eyebrow">Questions</span>
                <h2 class="h2" id="process-faq-heading" style="margin-top:16px">Before we start.</h2>
                <p class="lead">If something is not covered here, ask directly. We would rather answer a hard question now than discover a mismatch in week five.</p>
                <p style="margin-top:18px"><a class="card__link" href="mailto:<?= e(SITE_EMAIL) ?>">Email the studio <span class="arrow" aria-hidden="true"></span></a></p>
            </div>
            <div class="reveal">
                <?php render_faqs($DATA['faqs']); ?>
            </div>
        </div>
    </section>

    <?php render_cta(
        'Ready when you are.',
        'Bring the problem, the constraint and the deadline. We will bring an honest plan and a fixed price.',
        'See services',
        'services.php',
    ); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
