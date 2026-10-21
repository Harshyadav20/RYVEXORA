<?php
/**
 * Format 03 — Luxury & Hospitality demo composition.
 * Rendered inside includes/ui.php::render_format_demo(); $format is in scope.
 */
$demo = $format['demo'];
?>
<div class="demo-nav demo-nav--quiet">
    <nav class="demo-nav__links" aria-label="Demo navigation">
        <?php foreach (array_slice($demo['nav'], 0, 2) as $item): ?>
            <span><?= e($item) ?></span>
        <?php endforeach; ?>
    </nav>
    <span class="demo-brand demo-brand--serif"><?= e($demo['brand']) ?></span>
    <nav class="demo-nav__links demo-nav__links--right" aria-label="Demo navigation, secondary">
        <?php foreach (array_slice($demo['nav'], 2) as $item): ?>
            <span><?= e($item) ?></span>
        <?php endforeach; ?>
    </nav>
</div>

<section class="lux-hero">
    <div class="lux-hero__plate" aria-hidden="true">
        <div class="lux-hero__grain"></div>
        <div class="lux-hero__figure"></div>
        <span class="lux-hero__caption">Look 07 · undyed wool</span>
    </div>
    <div class="lux-hero__copy">
        <span class="demo-eyebrow"><?= e($demo['hero']['eyebrow']) ?></span>
        <h2 class="lux-title"><?= e($demo['hero']['title']) ?></h2>
        <p class="demo-lead"><?= e($demo['hero']['lead']) ?></p>
        <span class="lux-cta">Request the lookbook <?= icon_svg('arrow-up-right', 13) ?></span>
        <ul class="lux-badges">
            <?php foreach ($demo['hero']['badges'] as $badge): ?>
                <li><?= e($badge) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>

<section class="lux-collection">
    <div class="lux-collection__head">
        <h3>The collection</h3>
        <span>Nine pieces · Autumn 2026</span>
    </div>
    <div class="lux-grid">
        <?php foreach ($demo['collection'] as $piece): ?>
            <article class="lux-piece">
                <div class="lux-piece__plate lux-plate--<?= e($piece['tone']) ?>" aria-hidden="true">
                    <span class="lux-piece__grain"></span>
                </div>
                <h4><?= e($piece['name']) ?></h4>
                <p><?= e($piece['detail']) ?></p>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="lux-specs">
    <div class="lux-specs__intro">
        <span class="demo-eyebrow">The making</span>
        <h3>Cut slowly, finished by hand.</h3>
        <p>Each piece is made to order in the atelier. Cloth is chosen with you at the fitting.</p>
    </div>
    <dl class="lux-specs__list">
        <?php foreach ($demo['specs'] as $spec): ?>
            <div><dt><?= e($spec['label']) ?></dt><dd><?= e($spec['value']) ?></dd></div>
        <?php endforeach; ?>
    </dl>
</section>

<section class="lux-atelier">
    <div>
        <span class="demo-eyebrow">Enquiries</span>
        <h3><?= e($demo['atelier']['title']) ?></h3>
        <p><?= e($demo['atelier']['body']) ?></p>
        <span class="lux-quote">“<?= e($demo['quote']) ?>”</span>
    </div>
    <form class="lux-form" aria-label="Appointment request preview" onsubmit="return false">
        <?php foreach ($demo['atelier']['fields'] as $field): ?>
            <label>
                <span><?= e($field) ?></span>
                <span class="lux-form__line" aria-hidden="true"></span>
            </label>
        <?php endforeach; ?>
        <button type="button" class="lux-form__submit" disabled>
            <?= e($demo['atelier']['action']) ?> <?= icon_svg('arrow', 13) ?>
        </button>
        <p class="lux-form__note">Form preview · not connected</p>
    </form>
</section>

<div class="demo-footer demo-footer--quiet">
    <span><?= e($demo['brand']) ?> · 22 Rue de l’Atelier, Paris</span>
    <span>By appointment · Tuesday to Saturday</span>
</div>
