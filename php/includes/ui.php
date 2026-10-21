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
