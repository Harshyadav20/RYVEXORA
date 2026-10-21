<?php
/**
 * Format 02 — Digital Products & SaaS demo composition.
 * Rendered inside includes/ui.php::render_format_demo(); $format is in scope.
 */
$demo = $format['demo'];
?>
<div class="demo-nav">
    <span class="demo-brand">
        <span class="demo-brand__mark demo-brand__mark--square" aria-hidden="true"><?= icon_svg('layers', 14) ?></span>
        <?= e($demo['brand']) ?>
    </span>
    <nav class="demo-nav__links" aria-label="Demo navigation">
        <?php foreach ($demo['nav'] as $item): ?>
            <span><?= e($item) ?></span>
        <?php endforeach; ?>
    </nav>
    <span class="demo-nav__actions">
        <span class="demo-btn demo-btn--ghost">Sign in</span>
        <span class="demo-btn demo-btn--accent">Book a demo</span>
    </span>
</div>

<section class="prod-hero">
    <span class="demo-eyebrow"><?= e($demo['hero']['eyebrow']) ?></span>
    <h2 class="demo-h1 prod-hero__title"><?= e($demo['hero']['title']) ?></h2>
    <p class="demo-lead prod-hero__lead"><?= e($demo['hero']['lead']) ?></p>
    <div class="prod-hero__actions">
        <span class="demo-btn demo-btn--accent">Book a demo</span>
        <span class="demo-btn demo-btn--ghost">Start free</span>
    </div>
    <ul class="prod-badges">
        <?php foreach ($demo['hero']['badges'] as $badge): ?>
            <li><?= e($badge) ?></li>
        <?php endforeach; ?>
    </ul>
</section>

<div class="prod-window" role="img" aria-label="<?= e($demo['brand']) ?> dashboard preview">
    <div class="prod-window__bar">
        <span class="prod-window__dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="prod-window__title"><?= e($demo['window']['title']) ?></span>
        <span class="prod-window__pill">Live</span>
    </div>
    <div class="prod-window__body">
        <aside class="prod-side" aria-hidden="true">
            <?php foreach ($demo['window']['tabs'] as $index => $tab): ?>
                <span class="<?= $index === 2 ? 'is-on' : '' ?>"><i></i><?= e($tab) ?></span>
            <?php endforeach; ?>
        </aside>
        <div class="prod-main">
            <div class="prod-kpis">
                <?php foreach ($demo['window']['kpi'] as $item): ?>
                    <div><span><?= e($item['label']) ?></span><strong><?= e($item['value']) ?></strong></div>
                <?php endforeach; ?>
            </div>
            <div class="prod-table">
                <div class="prod-table__head"><span>Account</span><span>Status</span><span>Items</span></div>
                <?php foreach ($demo['window']['rows'] as $row): ?>
                    <div class="prod-table__row">
                        <span><?= e($row['a']) ?></span>
                        <span class="<?= str_contains($row['b'], 'review') ? 'is-warn' : 'is-ok' ?>"><?= e($row['b']) ?></span>
                        <span><?= e($row['c']) ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

<section class="prod-section">
    <div class="prod-features">
        <?php foreach ($demo['features'] as $index => $feature): ?>
            <article class="prod-feature">
                <div class="prod-feature__num"><?= e(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)) ?></div>
                <div>
                    <span class="prod-feature__tag"><?= e($feature['tag']) ?></span>
                    <h3><?= e($feature['title']) ?></h3>
                    <p><?= e($feature['body']) ?></p>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="prod-section prod-pricing">
    <div class="prod-section__head">
        <h3 class="demo-h3">Pricing you can read</h3>
        <span class="demo-link">Compare plans <?= icon_svg('arrow', 11) ?></span>
    </div>
    <div class="prod-tiers">
        <?php foreach ($demo['pricing'] as $tier): ?>
            <article class="prod-tier<?= $tier['featured'] ? ' is-featured' : '' ?>">
                <?php if ($tier['featured']): ?><span class="prod-tier__flag">Most teams</span><?php endif; ?>
                <h4><?= e($tier['name']) ?></h4>
                <p class="prod-tier__price">
                    <?= e($tier['price']) ?>
                    <?php if (str_starts_with($tier['price'], '$') && $tier['price'] !== '$0'): ?><small> / mo</small><?php endif; ?>
                </p>
                <p class="prod-tier__note"><?= e($tier['note']) ?></p>
                <span class="demo-btn <?= $tier['featured'] ? 'demo-btn--accent' : 'demo-btn--ghost' ?> demo-btn--block"><?= e($tier['cta']) ?></span>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="prod-section prod-integrations">
    <span class="demo-eyebrow">Works with what you already run</span>
    <ul>
        <?php foreach ($demo['integrations'] as $item): ?>
            <li><?= e($item) ?></li>
        <?php endforeach; ?>
    </ul>
</section>

<section class="prod-section">
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
    <span><?= e($demo['brand']) ?> · Illustrative product interface</span>
    <span>Status · Security · Docs · Privacy</span>
</div>
