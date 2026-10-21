<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$pageTitle = 'Build beyond limits';
$pageDescription = SITE_DESCRIPTION;
require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <section class="php-hero">
        <div class="shell php-hero__grid">
            <div>
                <span class="chip chip--accent"><i class="status__dot"></i> Technology &amp; digital growth studio</span>
                <h1 class="php-hero__title">
                    <span>BUILD</span>
                    <span>BEYOND</span>
                    <span class="gradient-text">LIMITS.</span>
                </h1>
                <p class="lead php-hero__lead">
                    We engineer digital experiences, intelligent automation, and technology that moves
                    businesses forward.
                </p>
                <div class="btn-row php-hero__actions">
                    <a class="btn" href="services.php">Explore our services</a>
                    <a class="btn btn--ghost" href="contact.php">Start a project <span class="arrow" aria-hidden="true"></span></a>
                </div>
                <ul class="php-hero__meta">
                    <li>Senior-led delivery</li>
                    <li>Fixed-scope pricing</li>
                    <li>You own the code</li>
                </ul>
            </div>
            <div class="php-hero__visual">
                <div class="orb" aria-hidden="true"></div>
            </div>
        </div>
    </section>

    <section class="section" aria-labelledby="services-heading">
        <div class="shell">
            <div class="section-head">
                <div class="reveal">
                    <span class="eyebrow">Capabilities</span>
                    <h2 class="h2" id="services-heading">Six disciplines. <span class="gradient-text">One studio.</span></h2>
                    <p class="lead">Most problems need more than one skill. We keep strategy, design and engineering in the same room so the answer is coherent.</p>
                </div>
                <div class="section-head__aside reveal">
                    <a class="btn btn--ghost" href="services.php">All services</a>
                </div>
            </div>

            <div class="grid grid--3">
                <?php foreach ($DATA['services'] as $service): ?>
                    <?php render_service_card($service); ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="section section--surface">
        <div class="shell">
            <div class="detail-layout">
                <div class="reveal">
                    <span class="eyebrow">The studio</span>
                    <h2 class="h2" style="margin-top:16px">We build the interface and the machinery behind it.</h2>
                    <div class="block" style="margin-top:20px">
                        <p>RYVEXORA is a technology and digital growth studio. We design and engineer websites, AI systems, automation and software products for teams that need the work to perform, not just launch.</p>
                        <p>Every engagement is senior-led, fixed-scope and measured against a business outcome. No layers of account management, no mystery invoices.</p>
                    </div>
                    <div class="chip-row" style="margin-top:20px">
                        <span class="chip">Web engineering</span>
                        <span class="chip">AI systems</span>
                        <span class="chip">Automation</span>
                        <span class="chip">SEO</span>
                        <span class="chip">Outbound</span>
                        <span class="chip">SaaS</span>
                    </div>
                </div>
                <div class="reveal">
                    <div class="card">
                        <span class="card__index">HOW WE WORK</span>
                        <h3>Five stages. Fixed scope.</h3>
                        <ul class="check-list">
                            <?php foreach ($DATA['process'] as $step): ?>
                                <li><?= e($step['number']) ?> — <?= e($step['title']) ?>: <?= e($step['summary']) ?></li>
                            <?php endforeach; ?>
                        </ul>
                        <a class="card__link" href="process.php">See the full process <span class="arrow" aria-hidden="true"></span></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section" aria-labelledby="work-heading">
        <div class="shell">
            <div class="section-head">
                <div class="reveal">
                    <span class="eyebrow">Selected work</span>
                    <h2 class="h2" id="work-heading">Built to be judged on what it does.</h2>
                    <p class="lead">Concept builds we created to demonstrate product thinking and engineering craft. Every case states plainly what it is.</p>
                </div>
                <div class="section-head__aside reveal">
                    <a class="btn btn--ghost" href="work.php">All work</a>
                </div>
            </div>

            <?php $featured = $DATA['projects'][0]; ?>
            <a class="project-feature reveal" href="project.php?slug=<?= e($featured['slug']) ?>">
                <div>
                    <?php render_mock($featured); ?>
                </div>
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
        </div>
    </section>

    <?php render_cta(); ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
