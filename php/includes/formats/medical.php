<?php
/**
 * Format 01 — Medical & Clinics demo composition.
 * Rendered inside includes/ui.php::render_format_demo(); $format is in scope.
 */
$demo = $format['demo'];
?>
<div class="demo-nav">
    <span class="demo-brand">
        <span class="demo-brand__mark" aria-hidden="true">N</span>
        <?= e($demo['brand']) ?>
    </span>
    <nav class="demo-nav__links" aria-label="Demo navigation">
        <?php foreach ($demo['nav'] as $item): ?>
            <span><?= e($item) ?></span>
        <?php endforeach; ?>
    </nav>
    <span class="demo-nav__actions">
        <span class="demo-btn demo-btn--accent"><?= icon_svg('calendar', 13) ?> Book</span>
    </span>
</div>

<section class="med-hero">
    <div class="med-hero__copy">
        <span class="demo-eyebrow"><?= e($demo['hero']['eyebrow']) ?></span>
        <h2 class="demo-h1"><?= e($demo['hero']['title']) ?></h2>
        <p class="demo-lead"><?= e($demo['hero']['lead']) ?></p>
        <ul class="med-badges">
            <?php foreach ($demo['hero']['badges'] as $badge): ?>
                <li><?= icon_svg('check', 11) ?> <?= e($badge) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div class="med-booker" role="group" aria-label="Appointment request preview">
        <span class="med-booker__flag"><?= icon_svg('clock', 12) ?> Next: 09:20 tomorrow</span>
        <h3><?= e($demo['booker']['title']) ?></h3>
        <?php foreach ($demo['booker']['fields'] as $field): ?>
            <div class="med-field">
                <span><?= e($field['label']) ?></span>
                <span class="med-field__value"><?= e($field['value']) ?> <?= icon_svg('arrow', 11) ?></span>
            </div>
        <?php endforeach; ?>
        <span class="demo-btn demo-btn--accent demo-btn--block"><?= e($demo['booker']['action']) ?></span>
        <p class="med-booker__note"><?= e($demo['booker']['note']) ?></p>
    </div>
</section>

<section class="med-section">
    <div class="med-section__head">
        <h3 class="demo-h3">Treatments</h3>
        <span class="demo-link">All treatments <?= icon_svg('arrow', 11) ?></span>
    </div>
    <div class="med-treatments">
        <?php foreach ($demo['treatments'] as $treatment): ?>
            <article class="med-treatment">
                <span class="med-treatment__time"><?= e($treatment['time']) ?></span>
                <h4><?= e($treatment['name']) ?></h4>
                <p><?= e($treatment['detail']) ?></p>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="med-section med-visit">
    <h3 class="demo-h3">What happens, in order</h3>
    <ol class="med-steps">
        <?php foreach ($demo['visit'] as $step): ?>
            <li>
                <span class="med-steps__num"><?= e($step['step']) ?></span>
                <h4><?= e($step['title']) ?></h4>
                <p><?= e($step['body']) ?></p>
            </li>
        <?php endforeach; ?>
    </ol>
</section>

<section class="med-section med-proof">
    <div class="med-clinician">
        <div class="med-clinician__portrait" aria-hidden="true"><span>AM</span></div>
        <div>
            <span class="demo-eyebrow">Clinical lead</span>
            <h4><?= e($demo['clinician']['name']) ?></h4>
            <p class="med-clinician__role"><?= e($demo['clinician']['role']) ?></p>
            <ul class="med-creds">
                <?php foreach ($demo['clinician']['credentials'] as $credential): ?>
                    <li><?= icon_svg('shield', 11) ?> <?= e($credential) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>

    <div class="med-fees">
        <h4>Fees, before you book</h4>
        <ul>
            <?php foreach ($demo['fees'] as $fee): ?>
                <li><span><?= e($fee['label']) ?></span><strong><?= e($fee['price']) ?></strong></li>
            <?php endforeach; ?>
        </ul>
        <p class="med-fees__note">Illustrative pricing · every plan is confirmed in writing.</p>
    </div>
</section>

<section class="med-section">
    <h3 class="demo-h3">Questions patients ask</h3>
    <div class="med-faq">
        <?php foreach ($demo['faq'] as $item): ?>
            <div class="med-faq__item">
                <h4><?= e($item['q']) ?></h4>
                <p><?= e($item['a']) ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<div class="demo-footer">
    <span><?= e($demo['brand']) ?> · 14 Northbeam Row, London</span>
    <span>Mon–Sat 08:30–19:00 · Emergency slots daily</span>
</div>
