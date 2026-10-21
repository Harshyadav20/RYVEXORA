<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$service = find_by_slug($DATA['services'], isset($_GET['slug']) ? (string) $_GET['slug'] : null);

if ($service === null) {
    http_response_code(404);
    $pageTitle = 'Service not found';
    require __DIR__ . '/includes/header.php';
    ?>
    <main id="main" class="notfound">
        <div class="notfound__inner">
            <span class="eyebrow">Error 404</span>
            <div class="notfound__code" aria-hidden="true">404</div>
            <h1 class="h1">That service is not here.</h1>
            <p>The link may be old. Browse all six disciplines or tell us what you need and we will point you in the right direction.</p>
            <div class="btn-row">
                <a class="btn" href="services.php">All services</a>
                <a class="btn btn--ghost" href="contact.php">Contact the studio</a>
            </div>
        </div>
    </main>
    <?php
    require __DIR__ . '/includes/footer.php';
    exit;
}

$pageTitle = $service['title'];
$pageDescription = $service['summary'];

$related = [];
foreach ($DATA['services'] as $candidate) {
    if ($candidate['slug'] !== $service['slug'] && count($related) < 2) {
        $related[] = $candidate;
    }
}

require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <header class="page-hero">
        <div class="shell">
            <?php render_breadcrumbs([
                ['label' => 'Services', 'href' => 'services.php'],
                ['label' => $service['title']],
            ]); ?>
            <span class="eyebrow">Service <?= e($service['index']) ?> · <?= e($service['kicker']) ?></span>
            <div class="page-hero__grid">
                <div>
                    <h1 class="h1"><?= e($service['title']) ?></h1>
                    <p class="lead"><?= e($service['summary']) ?></p>
                    <div class="btn-row" style="margin-top:26px">
                        <a class="btn" href="contact.php">Start a project</a>
                        <a class="btn btn--ghost" href="mailto:<?= e(SITE_EMAIL) ?>?subject=<?= rawurlencode('Question about ' . $service['title']) ?>">Ask a question</a>
                    </div>
                </div>
                <div class="page-hero__aside">
                    <div class="service-card__visual" style="width:100%;height:140px" aria-hidden="true"></div>
                    <span class="chip">Fixed-scope project or monthly partnership</span>
                    <span class="chip chip--accent"><i class="status__dot"></i> Accepting new projects</span>
                </div>
            </div>
        </div>
    </header>

    <section class="section">
        <div class="shell detail-layout">
            <div>
                <div class="block reveal">
                    <span class="eyebrow">Context</span>
                    <h2 style="margin-top:14px">What this is for</h2>
                    <p><?= e($service['description']) ?></p>
                </div>

                <div class="block reveal">
                    <h2>What you get</h2>
                    <ul class="check-list">
                        <?php foreach ($service['deliverables'] as $item): ?>
                            <li><?= e($item) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <div class="block reveal">
                    <h2>How we approach it</h2>
                    <div class="step-list">
                        <?php foreach ($service['approach'] as $index => $step): ?>
                            <div class="step">
                                <span class="step__num"><?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?></span>
                                <div>
                                    <h3><?= e($step['title']) ?></h3>
                                    <p><?= e($step['body']) ?></p>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="block reveal">
                    <h2>What good looks like</h2>
                    <ul class="outcome-list">
                        <?php foreach ($service['outcomes'] as $item): ?>
                            <li><?= e($item) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <div class="block reveal">
                    <h2>Tools &amp; technology</h2>
                    <div class="chip-row">
                        <?php foreach ($service['stack'] as $tool): ?>
                            <span class="chip"><?= e($tool) ?></span>
                        <?php endforeach; ?>
                    </div>
                    <p style="margin-top:16px;font-size:0.82rem;color:var(--faint)">Tools change as the problem requires. We choose boring, well-supported technology unless there is a clear reason not to.</p>
                </div>

                <div class="block reveal">
                    <h2>Questions, answered</h2>
                    <?php render_faqs($service['faqs']); ?>
                </div>
            </div>

            <aside class="detail-aside reveal">
                <h2>At a glance</h2>
                <p><?= e($service['title']) ?></p>
                <hr>
                <p><strong style="color:var(--text)">Engagement</strong><br>Fixed-scope project or monthly partnership</p>
                <p><strong style="color:var(--text)">Kickoff</strong><br>After scope and deposit</p>
                <p><strong style="color:var(--text)">Contact</strong><br><a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a></p>
                <a class="btn btn--block" href="contact.php">Start a project</a>
                <a class="card__link" href="process.php">See the full process →</a>
            </aside>
        </div>
    </section>

    <section class="section section--surface section--tight" aria-labelledby="related-heading">
        <div class="shell">
            <h2 class="h3" id="related-heading" style="margin-bottom:20px">Usually combined with</h2>
            <div class="grid grid--2">
                <?php foreach ($related as $item): ?>
                    <a class="card reveal" href="service.php?slug=<?= e($item['slug']) ?>">
                        <span class="card__index">SERVICE <?= e($item['index']) ?></span>
                        <h3><?= e($item['title']) ?></h3>
                        <p><?= e($item['summary']) ?></p>
                        <span class="card__link">Explore →</span>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <?php render_cta(); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
