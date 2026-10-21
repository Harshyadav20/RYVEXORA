<?php
declare(strict_types=1);

// Refuse direct web access to partials — these files expect to be included.
if (isset($_SERVER['SCRIPT_FILENAME'])
    && realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Not found';
    exit;
}

/**
 * Small HTML helpers shared by the PHP templates.
 */


/** Abstract project preview built from divs — replaces the React UI mock. */
function render_mock(array $project, bool $tall = false): void
{
    $heights = [44, 66, 38, 82, 58, 92, 70, 48, 62, 36];
    ?>
    <div class="mock" role="img" aria-label="<?= e($project['name']) ?> interface preview" style="<?= $tall ? 'aspect-ratio:4/3;' : '' ?>">
        <div class="mock__bar">
            <span class="mock__dot"></span>
            <span class="mock__dot"></span>
            <span class="mock__dot"></span>
            <span class="mock__url"><?= e($project['slug']) ?>.ryvexora.com</span>
        </div>
        <div class="mock__body">
            <div class="mock__side"></div>
            <div class="mock__main">
                <div class="mock__row">
                    <div class="mock__tile"></div>
                    <div class="mock__tile"></div>
                    <div class="mock__tile"></div>
                </div>
                <div class="mock__chart">
                    <?php foreach ($heights as $height): ?>
                        <i style="height:<?= (int) $height ?>%"></i>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <?php
}

/** Service summary card used on the home and services pages. */
function render_service_card(array $service): void
{
    ?>
    <a class="card service-card reveal" href="service.php?slug=<?= e($service['slug']) ?>">
        <div class="service-card__visual" aria-hidden="true"></div>
        <span class="card__index">SERVICE <?= e($service['index']) ?></span>
        <h2><?= e($service['title']) ?></h2>
        <p><?= e($service['summary']) ?></p>
        <div class="card__foot">
            <span class="chip-row">
                <?php foreach (array_slice($service['stack'], 0, 2) as $tool): ?>
                    <span class="chip"><?= e($tool) ?></span>
                <?php endforeach; ?>
            </span>
            <span class="card__link">Explore <span class="arrow" aria-hidden="true"></span></span>
        </div>
    </a>
    <?php
}

/** Breadcrumb trail. Each item: ['label' => string, 'href' => ?string]. */
function render_breadcrumbs(array $crumbs): void
{
    ?>
    <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="index.php">Home</a>
        <?php foreach ($crumbs as $crumb): ?>
            <span aria-hidden="true">/</span>
            <?php if (!empty($crumb['href'])): ?>
                <a href="<?= e($crumb['href']) ?>"><?= e($crumb['label']) ?></a>
            <?php else: ?>
                <span><?= e($crumb['label']) ?></span>
            <?php endif; ?>
        <?php endforeach; ?>
    </nav>
    <?php
}

function render_faqs(array $faqs): void
{
    foreach ($faqs as $index => $faq) {
        ?>
        <details class="faq"<?= $index === 0 ? ' open' : '' ?>>
            <summary><?= e($faq['q']) ?></summary>
            <p><?= e($faq['a']) ?></p>
        </details>
        <?php
    }
}

function render_cta(
    string $title = "Tell us what you are trying to solve.",
    string $lead = "A short, honest brief is more useful than a long one. We will reply with scope, price and whether we are the right studio for it.",
    string $secondaryLabel = 'Explore our services',
    string $secondaryHref = 'services.php',
): void {
    ?>
    <section class="cta-band">
        <div class="shell cta-band__inner">
            <div class="reveal">
                <span class="eyebrow">Next step</span>
                <h2><?= e($title) ?></h2>
                <p><?= e($lead) ?></p>
            </div>
            <div class="btn-row reveal">
                <a class="btn" href="contact.php">Start a project</a>
                <a class="btn btn--ghost" href="<?= e($secondaryHref) ?>"><?= e($secondaryLabel) ?></a>
            </div>
        </div>
    </section>
    <?php
}

/* ------------------------------------------------------------------ */
/* Inline icons (no icon font, no extra requests)                      */
/* ------------------------------------------------------------------ */

function icon_svg(string $name, int $size = 14): string
{
    $paths = [
        'check' => '<path d="M2.5 7.5 6 11l5.5-6" />',
        'close' => '<path d="M3.5 3.5l7 7m0-7-7 7" />',
        'calendar' => '<rect x="2" y="3.2" width="10" height="8.6" rx="1.6" /><path d="M2 6.2h10M5 1.8v2.2M9 1.8v2.2" />',
        'clock' => '<circle cx="7" cy="7" r="5.2" /><path d="M7 4.2V7l2 1.3" />',
        'shield' => '<path d="M7 1.8 11.4 3.4v3.3c0 2.6-1.8 4.4-4.4 5.5-2.6-1.1-4.4-2.9-4.4-5.5V3.4L7 1.8Z" />',
        'info' => '<circle cx="7" cy="7" r="5.2" /><path d="M7 6.3v3.2M6.9 4.4h.2" />',
        'layers' => '<path d="m7 1.9 4.6 2.4L7 6.7 2.4 4.3 7 1.9Z" /><path d="m2.4 7.4 4.6 2.4 4.6-2.4" />',
        'globe' => '<circle cx="7" cy="7" r="5.2" /><path d="M1.8 7h10.4M7 1.8c1.7 1.6 2.5 3.4 2.5 5.2S8.7 10.6 7 12.2C5.3 10.6 4.5 8.8 4.5 7S5.3 3.4 7 1.8Z" />',
        'compass' => '<circle cx="7" cy="7" r="5.2" /><path d="m9.3 4.7-1.4 3.2-3.2 1.4 1.4-3.2 3.2-1.4Z" />',
        'arrow' => '<path d="M2.6 7h8.8M8.4 3.6 11.8 7l-3.4 3.4" />',
        'arrow-up-right' => '<path d="M4 10 10 4M4.6 4H10v5.4" />',
        'chevron-down' => '<path d="m3.6 5.4 3.4 3.4 3.4-3.4" />',
        'chevron-up' => '<path d="m3.6 8.6 3.4-3.4 3.4 3.4" />',
    ];

    $path = $paths[$name] ?? $paths['arrow'];

    return sprintf(
        '<svg width="%1$d" height="%1$d" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">%2$s</svg>',
        $size,
        $path
    );
}

/* ------------------------------------------------------------------ */
/* Format library                                                      */
/* ------------------------------------------------------------------ */

function render_format_card(array $format): void
{
    ?>
    <a class="fmt-card" href="format.php?slug=<?= e($format['slug']) ?>"
       style="--fmt-accent:<?= e($format['accent']) ?>;--fmt-accent-soft:<?= e($format['accent_soft']) ?>">
        <div class="fmt-card__preview fmt-preview--<?= e($format['slug']) ?>" aria-hidden="true">
            <span class="fmt-card__ghost"><?= e($format['demo']['brand']) ?></span>
            <span class="fmt-card__swatch"></span>
            <span class="fmt-card__line fmt-card__line--a"></span>
            <span class="fmt-card__line fmt-card__line--b"></span>
            <span class="fmt-card__block"></span>
        </div>
        <div class="fmt-card__body">
            <div class="fmt-card__top">
                <span class="fmt-card__index">Format <?= e($format['index']) ?></span>
                <span class="fmt-card__kicker"><?= e($format['kicker']) ?></span>
            </div>
            <h3><?= e($format['name']) ?></h3>
            <p><?= e($format['summary']) ?></p>
            <dl class="fmt-card__meta">
                <div><dt>Built for</dt><dd><?= e($format['audience']) ?></dd></div>
                <div><dt>Primary action</dt><dd><?= e($format['primary_action']) ?></dd></div>
            </dl>
            <span class="card__link">Open the format <span class="arrow" aria-hidden="true"></span></span>
        </div>
    </a>
    <?php
}

/** Render the full composition for a format, inside the labelled demo frame. */
function render_format_demo(array $format): void
{
    $allowed = ['medical', 'digital-product', 'luxury', 'creator'];
    if (!in_array($format['slug'], $allowed, true)) {
        return;
    }
    ?>
    <div class="demo-frame"
         style="--demo-accent:<?= e($format['accent']) ?>;--demo-accent-soft:<?= e($format['accent_soft']) ?>">
        <div class="demo-frame__bar">
            <div class="demo-frame__dots" aria-hidden="true"><span></span><span></span><span></span></div>
            <span class="demo-frame__label">
                <span class="demo-frame__live" aria-hidden="true"></span>
                Format <?= e($format['index']) ?> · <?= e($format['name']) ?>
            </span>
            <span class="demo-frame__note"><?= icon_svg('info', 12) ?> <?= e($format['demo']['brandNote'] ?? '') ?></span>
            <button type="button" class="demo-frame__toggle" data-demo-toggle aria-expanded="false">
                <span data-demo-toggle-label>Open full page</span>
                <?= icon_svg('chevron-down', 12) ?>
            </button>
        </div>
        <div class="demo demo--<?= e($format['slug']) ?>">
            <div class="demo__inner">
                <?php require __DIR__ . '/formats/' . $format['slug'] . '.php'; ?>
            </div>
        </div>
        <span class="demo-frame__more" aria-hidden="true" data-demo-more>
            Scroll inside the frame <?= icon_svg('chevron-down', 13) ?>
        </span>
    </div>
    <?php
}

function render_format_comparison(array $rows, array $formats): void
{
    ?>
    <div class="fmt-table-wrap" tabindex="0" role="region" aria-label="Format comparison">
        <table class="fmt-table">
            <caption class="sr-only">Comparison of the four formats across first screen, primary ask, proof, density, motion and what each format never does.</caption>
            <thead>
                <tr>
                    <th scope="col">Layer</th>
                    <?php foreach ($formats as $format): ?>
                        <th scope="col">
                            <span class="fmt-table__name"><?= e($format['name']) ?></span>
                            <span class="fmt-table__index">Format <?= e($format['index']) ?></span>
                        </th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($rows as $row): ?>
                    <tr>
                        <th scope="row"><?= e($row['label']) ?></th>
                        <?php foreach ($row['values'] as $value): ?>
                            <td><?= e($value) ?></td>
                        <?php endforeach; ?>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}
