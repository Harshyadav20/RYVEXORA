<?php
// Refuse direct web access to partials — these files expect to be included.
if (isset($_SERVER['SCRIPT_FILENAME'])
    && realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Not found';
    exit;
}

/**
 * Shared document head + site header (PHP edition).
 * Expects: $pageTitle, optional $pageDescription, $DATA.
 */

$pageTitle = $pageTitle ?? 'Technology & digital growth studio';
$pageDescription = $pageDescription ?? SITE_DESCRIPTION;
$bodyClass = $bodyClass ?? '';
$currentScript = basename($_SERVER['SCRIPT_NAME'] ?? '');
$isCurrent = static fn (array $files): string =>
    in_array($currentScript, $files, true) ? ' aria-current="page"' : '';
?><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#07090D">
    <title><?= e($pageTitle) ?> — RYVEXORA</title>
    <meta name="description" content="<?= e($pageDescription) ?>">
    <link rel="canonical" href="https://ryvexora.com/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="RYVEXORA">
    <meta property="og:title" content="<?= e($pageTitle) ?> — RYVEXORA">
    <meta property="og:description" content="<?= e($pageDescription) ?>">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
    <link rel="preload" href="assets/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="<?= asset('assets/site.css') ?>">
</head>
<body class="<?= e($bodyClass) ?>">
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" data-header>
    <div class="shell header-inner">
        <a class="brand" href="index.php" aria-label="RYVEXORA — home">
            <img src="assets/favicon.svg" width="34" height="34" alt="">
            <span class="brand__name">RYVEX<span>ORA</span></span>
        </a>

        <nav class="main-nav" aria-label="Primary">
            <a class="nav-link<?= nav_state(['work.php', 'project.php']) ?>" href="work.php"<?= $isCurrent(['work.php', 'project.php']) ?>>Work</a>

            <div class="nav-drop">
                <a class="nav-link<?= nav_state(['services.php', 'service.php']) ?>" href="services.php" aria-haspopup="true"<?= $isCurrent(['services.php', 'service.php']) ?>>Services</a>
                <div class="nav-drop__panel">
                    <?php foreach ($DATA['services'] as $navService): ?>
                        <a href="service.php?slug=<?= e($navService['slug']) ?>">
                            <span class="nav-drop__index"><?= e($navService['index']) ?></span>
                            <span>
                                <strong><?= e($navService['title']) ?></strong>
                                <small><?= e($navService['kicker']) ?></small>
                            </span>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>

            <a class="nav-link<?= nav_state(['formats.php', 'format.php']) ?>" href="formats.php"<?= $isCurrent(['formats.php', 'format.php']) ?>>Formats</a>
            <a class="nav-link<?= nav_state(['process.php']) ?>" href="process.php"<?= $isCurrent(['process.php']) ?>>Process</a>
            <a class="nav-link<?= nav_state(['about.php']) ?>" href="about.php"<?= $isCurrent(['about.php']) ?>>About</a>
            <a class="nav-link<?= nav_state(['contact.php']) ?>" href="contact.php"<?= $isCurrent(['contact.php']) ?>>Contact</a>
        </nav>

        <div class="header-actions">
            <span class="status"><i class="status__dot"></i>Accepting new projects</span>
            <a class="btn btn--sm" href="contact.php">Start a project</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-menu-toggle>
                <span></span>
                <span></span>
                <span class="sr-only">Menu</span>
            </button>
        </div>
    </div>

    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile" data-mobile-nav hidden>
        <div class="mobile-nav__inner">
            <a href="index.php">Home</a>
            <a href="work.php">Work</a>
            <a href="formats.php">Formats</a>
            <a href="services.php">Services</a>
            <a href="process.php">Process</a>
            <a href="about.php">About</a>
            <a href="contact.php">Contact</a>
            <div class="mobile-nav__services">
                <?php foreach ($DATA['services'] as $navService): ?>
                    <a href="service.php?slug=<?= e($navService['slug']) ?>"><?= e($navService['title']) ?></a>
                <?php endforeach; ?>
            </div>
            <a class="btn btn--block" href="contact.php">Start a project</a>
            <p class="muted small"><?= e(SITE_EMAIL) ?> · <?= e(SITE_LOCATION) ?></p>
        </div>
    </nav>
</header>
