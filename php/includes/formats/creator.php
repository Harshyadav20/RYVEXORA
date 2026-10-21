<?php
/**
 * Format 04 — Creators & Studios demo composition.
 * Rendered inside includes/ui.php::render_format_demo(); $format is in scope.
 */
$demo = $format['demo'];
?>
<div class="demo-nav">
    <span class="demo-brand"><?= e($demo['brand']) ?></span>
    <nav class="demo-nav__links" aria-label="Demo navigation">
        <?php foreach ($demo['nav'] as $item): ?>
            <span><?= e($item) ?></span>
        <?php endforeach; ?>
    </nav>
    <span class="demo-nav__actions">
        <span class="demo-btn demo-btn--accent">Enquire</span>
    </span>
</div>

<section class="cre-hero">
    <div class="cre-hero__copy">
        <span class="demo-eyebrow"><?= e($demo['hero']['eyebrow']) ?></span>
        <h2 class="demo-h1 cre-title"><?= e($demo['hero']['title']) ?></h2>
        <p class="demo-lead"><?= e($demo['hero']['lead']) ?></p>
        <ul class="cre-badges">
            <?php foreach ($demo['hero']['badges'] as $badge): ?>
                <li><?= e($badge) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div class="cre-portrait" aria-hidden="true">
        <div class="cre-portrait__frame">
            <span class="cre-portrait__grain"></span>
            <span class="cre-portrait__monogram">SN</span>
        </div>
        <div class="cre-available">
            <span class="cre-available__dot"></span>
            <div>
                <span><?= e($demo['availability']['label']) ?></span>
                <strong><?= e($demo['availability']['value']) ?></strong>
            </div>
            <span class="cre-available__note"><?= e($demo['availability']['note']) ?></span>
        </div>
    </div>
</section>

<section class="cre-work">
    <div class="cre-work__head">
        <h3>Selected work</h3>
        <span class="demo-link">Full archive <?= icon_svg('arrow', 11) ?></span>
    </div>
    <div class="cre-grid">
        <?php foreach ($demo['work'] as $index => $piece): ?>
            <article class="cre-piece cre-piece--<?= e($piece['tone']) ?><?= $index === 0 ? ' cre-piece--wide' : '' ?>">
                <span class="cre-piece__grain" aria-hidden="true"></span>
                <div class="cre-piece__meta">
                    <h4><?= e($piece['title']) ?></h4>
                    <span><?= e($piece['kind']) ?></span>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="cre-services">
    <div class="cre-services__head">
        <h3>Ways to work together</h3>
        <p>Rates are starting points. Scope, usage and delivery are agreed in writing before a hold is confirmed.</p>
    </div>
    <div class="cre-rates">
        <?php foreach ($demo['services'] as $service): ?>
            <article class="cre-rate">
                <div>
                    <h4><?= e($service['title']) ?></h4>
                    <p><?= e($service['detail']) ?></p>
                </div>
                <span><?= e($service['from']) ?></span>
            </article>
        <?php endforeach; ?>
    </div>
    <ol class="cre-process">
        <?php foreach ($demo['process'] as $index => $step): ?>
            <li><span><?= e(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)) ?></span><?= e($step) ?></li>
        <?php endforeach; ?>
    </ol>
</section>

<section class="cre-faq">
    <?php foreach ($demo['faq'] as $item): ?>
        <div>
            <h4><?= e($item['q']) ?></h4>
            <p><?= e($item['a']) ?></p>
        </div>
    <?php endforeach; ?>
</section>

<div class="demo-footer">
    <span><?= e($demo['brand']) ?> · Mumbai · working worldwide</span>
    <span>Booking Q1 2027 · Replies within two working days</span>
</div>
