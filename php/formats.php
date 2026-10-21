<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$pageTitle = 'Formats';
$pageDescription = 'Four composition systems from one design language — clinic, digital product, luxury house and creator portfolio. Layout, hierarchy and asks change; the engineering does not.';
require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <header class="page-hero">
        <div class="shell">
            <?php render_breadcrumbs([['label' => 'Formats']]); ?>
            <span class="eyebrow">Format library</span>
            <h1 class="h1">One system.<br><span class="gradient-text">Four ways to be understood.</span></h1>
            <p class="lead">A clinic, a SaaS product, a maison and a photographer do not need the same page. These are four complete compositions on the same tokens, components and engineering — each rebuilt around the one decision its visitor is trying to make.</p>
            <div class="chip-row" style="margin-top:24px">
                <span class="chip chip--accent">4 formats</span>
                <span class="chip">Shared design system</span>
                <span class="chip">Every brand below is illustrative</span>
            </div>
        </div>
    </header>

    <section class="section section--tight" aria-label="How the library works">
        <div class="shell">
            <div class="fmt-principles">
                <?php foreach ($DATA['format_principles'] as $index => $principle): ?>
                    <article class="fmt-principle">
                        <span class="fmt-principle__num"><?= e(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)) ?></span>
                        <h2><?= e($principle['title']) ?></h2>
                        <p><?= e($principle['body']) ?></p>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="section" aria-labelledby="formats-heading">
        <div class="shell">
            <div class="section-head">
                <div>
                    <span class="eyebrow">The library</span>
                    <h2 class="h2" id="formats-heading" style="margin-top:18px">Four formats, built end to end.</h2>
                </div>
                <p class="section-head__aside">Each opens as a full composition — navigation, hierarchy, asks and footer — not a screenshot of a hero.</p>
            </div>

            <div class="fmt-grid">
                <?php foreach ($DATA['formats'] as $format): ?>
                    <?php render_format_card($format); ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="section section--surface" aria-labelledby="compare-heading">
        <div class="shell">
            <div class="section-head">
                <div>
                    <span class="eyebrow">Side by side</span>
                    <h2 class="h2" id="compare-heading" style="margin-top:18px">What actually changes.</h2>
                    <p class="lead" style="margin-top:18px">The palette, type scale and components stay. The hierarchy, the density and the ask move to fit the decision in front of the visitor.</p>
                </div>
            </div>

            <?php render_format_comparison($DATA['format_comparison'], $DATA['formats']); ?>

            <div class="fmt-note">
                <?= icon_svg('info', 16) ?>
                <p>Every format shares one rule: no invented proof. Where a template would normally carry a client logo or a performance statistic, the space is deliberately left empty and labelled.</p>
            </div>
        </div>
    </section>

    <?php render_cta(
        'Tell us the decision your visitor is making.',
        'That single sentence decides the format. Send it over and we will tell you which composition fits — and which one would waste your budget.',
        'Start a project',
        'contact.php',
    ); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
