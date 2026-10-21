<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$project = find_by_slug($DATA['projects'], isset($_GET['slug']) ? (string) $_GET['slug'] : null);

if ($project === null) {
    http_response_code(404);
    $pageTitle = 'Project not found';
    require __DIR__ . '/includes/header.php';
    ?>
    <main id="main" class="notfound">
        <div class="notfound__inner">
            <span class="eyebrow">Error 404</span>
            <div class="notfound__code" aria-hidden="true">404</div>
            <h1 class="h1">That project is not here.</h1>
            <p>The link may be old. Browse the full archive or tell us what you are building.</p>
            <div class="btn-row">
                <a class="btn" href="work.php">All work</a>
                <a class="btn btn--ghost" href="contact.php">Contact the studio</a>
            </div>
        </div>
    </main>
    <?php
    require __DIR__ . '/includes/footer.php';
    exit;
}

$pageTitle = $project['name'];
$pageDescription = $project['summary'];

$index = array_search($project['slug'], array_column($DATA['projects'], 'slug'), true);
$next = $DATA['projects'][($index + 1) % count($DATA['projects'])];

require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <header class="page-hero">
        <div class="shell">
            <?php render_breadcrumbs([
                ['label' => 'Work', 'href' => 'work.php'],
                ['label' => $project['name']],
            ]); ?>
            <div class="chip-row" style="margin-bottom:18px">
                <span class="chip"><?= e($project['status']) ?></span>
                <span class="chip"><?= e($project['category']) ?></span>
                <span class="chip"><?= e($project['year']) ?></span>
            </div>
            <h1 class="display"><?= e($project['name']) ?></h1>
            <p class="lead"><?= e($project['tagline']) ?></p>

            <dl class="definition" style="margin-top:30px;max-width:760px">
                <div><dt>Type</dt><dd>Self-initiated concept build</dd></div>
                <div><dt>Discipline</dt><dd><?= e($project['category']) ?></dd></div>
                <div><dt>Year</dt><dd><?= e($project['year']) ?></dd></div>
                <div><dt>Status</dt><dd><?= e($project['status']) ?></dd></div>
            </dl>
        </div>
    </header>

    <section class="section section--tight">
        <div class="shell">
            <div class="card reveal" style="padding:clamp(12px,2vw,22px)">
                <?php render_mock($project); ?>
            </div>
            <p class="form-note" style="margin-top:12px">Interface preview · illustrative data · <?= e($project['name']) ?></p>

            <div class="notice reveal" style="margin-top:26px">
                <span><strong>Note:</strong> this is a self-initiated concept build, not a client engagement. No performance metrics, logos or testimonials are claimed. Shown to demonstrate design and engineering approach.</span>
            </div>
        </div>
    </section>

    <section class="section section--flush">
        <div class="shell detail-layout">
            <div>
                <div class="block reveal">
                    <h2>01 — The challenge</h2>
                    <p><?= e($project['challenge']) ?></p>
                </div>
                <div class="block reveal">
                    <h2>02 — Our approach</h2>
                    <p><?= e($project['approach']) ?></p>
                </div>
                <div class="block reveal">
                    <h2>03 — What we built</h2>
                    <ul class="check-list">
                        <?php foreach ($project['built'] as $item): ?>
                            <li><?= e($item) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="block reveal">
                    <h2>04 — What the build demonstrates</h2>
                    <ul class="outcome-list">
                        <?php foreach ($project['outcome'] as $item): ?>
                            <li><?= e($item) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>

            <aside class="detail-aside reveal">
                <h2>Project facts</h2>
                <p><strong style="color:var(--text)">Type</strong><br>Self-initiated concept build</p>
                <hr>
                <p><strong style="color:var(--text)">Stack</strong></p>
                <div class="chip-row">
                    <?php foreach ($project['stack'] as $tool): ?>
                        <span class="chip"><?= e($tool) ?></span>
                    <?php endforeach; ?>
                </div>
                <hr>
                <p>Have a similar problem in production? The constraints are usually messier than a concept. That is the part we are good at.</p>
                <a class="card__link" href="mailto:<?= e(SITE_EMAIL) ?>">Discuss your project <span class="arrow" aria-hidden="true"></span></a>
            </aside>
        </div>
    </section>

    <section class="section section--tight">
        <div class="shell">
            <a class="project-feature reveal" href="project.php?slug=<?= e($next['slug']) ?>">
                <div class="project-feature__body">
                    <span class="eyebrow">Next project</span>
                    <h2><?= e($next['name']) ?></h2>
                    <p><?= e($next['tagline']) ?></p>
                </div>
                <div><?php render_mock($next); ?></div>
            </a>
        </div>
    </section>

    <?php render_cta(); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
