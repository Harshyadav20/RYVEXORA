<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$pageTitle = 'Selected work';
$pageDescription = 'Concept products and interfaces built by RYVEXORA — revenue software, headless commerce, AI operations, programmatic SEO and outbound tooling.';
require __DIR__ . '/includes/header.php';

$featured = $DATA['projects'][0];
$rest = array_slice($DATA['projects'], 1);
?>
<main id="main">
    <header class="page-hero">
        <div class="shell">
            <?php render_breadcrumbs([['label' => 'Work']]); ?>
            <span class="eyebrow">Selected work</span>
            <h1 class="h1">Built to be judged<br><span class="gradient-text">on what it does.</span></h1>
            <p class="lead">Product concepts and interface systems we designed and engineered ourselves. They show how we think and how we build — not who our clients are.</p>
        </div>
    </header>

    <section class="section section--tight" aria-label="Project archive">
        <div class="shell">
            <div class="notice reveal" style="margin-bottom:32px">
                <span><strong>Transparency note:</strong> every project below is a self-initiated concept build. No client logos, testimonials, awards or performance statistics are represented. Where real client work is shown, it will be labelled as such.</span>
            </div>

            <div class="portfolio-grid">
                <a class="project-feature reveal" href="project.php?slug=<?= e($featured['slug']) ?>">
                    <div><?php render_mock($featured); ?></div>
                    <div class="project-feature__body">
                        <div class="project-meta">
                            <span class="chip"><?= e($featured['status']) ?></span>
                            <span><?= e($featured['category']) ?></span>
                            <span>· <?= e($featured['year']) ?></span>
                        </div>
                        <h2><?= e($featured['name']) ?></h2>
                        <p><?= e($featured['summary']) ?></p>
                        <span class="card__link">View case study <span class="arrow" aria-hidden="true"></span></span>
                    </div>
                </a>

                <div class="grid grid--2">
                    <?php foreach ($rest as $project): ?>
                        <a class="card project-card reveal" href="project.php?slug=<?= e($project['slug']) ?>">
                            <?php render_mock($project, true); ?>
                            <div class="project-meta">
                                <span class="chip"><?= e($project['status']) ?></span>
                                <span><?= e($project['category']) ?></span>
                            </div>
                            <h2><?= e($project['name']) ?></h2>
                            <p><?= e($project['summary']) ?></p>
                            <span class="card__link">View case <span class="arrow" aria-hidden="true"></span></span>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <?php render_cta(
        'Your project could be next.',
        'We take on a small number of engagements at a time so senior people stay on the work. Tell us what you are building.',
        'See our services',
        'services.php',
    ); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
