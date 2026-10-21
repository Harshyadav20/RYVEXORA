<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$format = find_by_slug($DATA['formats'], isset($_GET['slug']) ? (string) $_GET['slug'] : null);

if ($format === null) {
    http_response_code(404);
    $pageTitle = 'Format not found';
    require __DIR__ . '/includes/header.php';
    ?>
    <main id="main" class="notfound">
        <div class="notfound__inner">
            <span class="eyebrow">Error 404</span>
            <div class="notfound__code" aria-hidden="true">404</div>
            <h1 class="h1">That format is not in the library.</h1>
            <p>There are four compositions: clinic, digital product, luxury house and creator studio. Start from the library and pick the one closest to the decision you are asking a visitor to make.</p>
            <div class="btn-row">
                <a class="btn" href="formats.php">All formats</a>
                <a class="btn btn--ghost" href="contact.php">Talk to the studio</a>
            </div>
        </div>
    </main>
    <?php
    require __DIR__ . '/includes/footer.php';
    exit;
}

$pageTitle = $format['name'] . ' format';
$pageDescription = $format['summary'];

$currentIndex = 0;
foreach ($DATA['formats'] as $index => $candidate) {
    if ($candidate['slug'] === $format['slug']) {
        $currentIndex = $index;
    }
}
$next = $DATA['formats'][($currentIndex + 1) % count($DATA['formats'])];

require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <header class="fmt-detail__hero" style="--fmt-accent:<?= e($format['accent']) ?>;--fmt-accent-soft:<?= e($format['accent_soft']) ?>">
        <div class="bg-grid" aria-hidden="true"></div>
        <span class="fmt-detail__glow" aria-hidden="true"></span>
        <div class="shell">
            <?php render_breadcrumbs([
                ['label' => 'Formats', 'href' => 'formats.php'],
                ['label' => $format['name']],
            ]); ?>
            <div class="fmt-detail__layout">
                <div>
                    <span class="eyebrow">Format <?= e($format['index']) ?> · <?= e($format['kicker']) ?></span>
                    <h1 class="fmt-detail__title"><?= e($format['headline']) ?></h1>
                    <p class="lead"><?= e($format['summary']) ?></p>
                    <div class="fmt-detail__actions">
                        <a class="btn" href="contact.php">Build this format</a>
                        <a class="btn btn--ghost" href="formats.php">All formats <?= icon_svg('arrow', 15) ?></a>
                    </div>
                </div>

                <aside class="fmt-detail__aside" aria-label="Format facts">
                    <dl>
                        <div><dt>Built for</dt><dd><?= e($format['audience']) ?></dd></div>
                        <div><dt>Primary action</dt><dd><?= e($format['primary_action']) ?></dd></div>
                        <div><dt>Default motion</dt><dd><?= e($format['motion']) ?></dd></div>
                    </dl>
                    <div class="fmt-detail__pages">
                        <span>Page architecture</span>
                        <ul>
                            <?php foreach ($format['key_pages'] as $page): ?>
                                <li><?= e($page) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    </header>

    <section class="section section--flush fmt-stage-section" aria-labelledby="demo-heading">
        <div class="shell">
            <div class="fmt-stage__head">
                <h2 id="demo-heading" class="sr-only"><?= e($format['name']) ?> composition preview</h2>
                <span class="fmt-stage__label"><?= icon_svg('compass', 13) ?> Full composition · scroll inside the frame on mobile</span>
                <span class="fmt-stage__hint">Illustrative content throughout</span>
            </div>

            <?php render_format_demo($format); ?>
        </div>
    </section>

    <section class="section" aria-labelledby="changes-heading">
        <div class="shell fmt-split">
            <div>
                <span class="eyebrow">What we change</span>
                <h2 class="h2" id="changes-heading" style="margin-top:18px">The decisions this format makes for you.</h2>
                <ul class="fmt-list fmt-list--checks">
                    <?php foreach ($format['changes'] as $item): ?>
                        <li><?= icon_svg('check', 14) ?><?= e($item) ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div>
                <span class="eyebrow">What we never do</span>
                <h2 class="h2" style="margin-top:18px">Lines this format will not cross.</h2>
                <ul class="fmt-list fmt-list--crosses">
                    <?php foreach ($format['avoid'] as $item): ?>
                        <li><?= icon_svg('close', 14) ?><?= e($item) ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>

        <div class="shell">
            <div class="fmt-seo">
                <span class="fmt-seo__label"><?= icon_svg('globe', 14) ?> Search &amp; structure</span>
                <p><?= e($format['seo']) ?></p>
            </div>
        </div>
    </section>

    <section class="section section--tight">
        <div class="shell">
            <a class="fmt-next" href="format.php?slug=<?= e($next['slug']) ?>">
                <div>
                    <span class="eyebrow">Next format</span>
                    <h2><?= e($next['name']) ?></h2>
                    <p><?= e($next['headline']) ?></p>
                </div>
                <span class="fmt-next__arrow" aria-hidden="true"><?= icon_svg('arrow-up-right', 20) ?></span>
            </a>
        </div>
    </section>

    <?php render_cta(
        'We can build this, or tell you it is wrong.',
        'Send the decision your visitor is trying to make. We will reply with the format that fits, the pages it needs and what it costs.',
        'Start a project',
        'contact.php',
    ); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
