<?php
declare(strict_types=1);

http_response_code(404);
require __DIR__ . '/includes/config.php';

$pageTitle = 'Page not found';
$pageDescription = 'This page could not be found. Head back to RYVEXORA or start a project.';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="notfound">
    <div class="notfound__inner">
        <span class="eyebrow">Error 404</span>
        <div class="notfound__code" aria-hidden="true">404</div>
        <h1 class="h1">This page drifted out of orbit.</h1>
        <p>The link may be old, or the page may have moved. Nothing is broken — head back to the studio or tell us what you were looking for.</p>
        <div style="width:150px;margin:6px auto 10px" aria-hidden="true">
            <div class="orb" style="width:150px"></div>
        </div>
        <div class="btn-row" style="justify-content:center">
            <a class="btn" href="index.php">Back to home</a>
            <a class="btn btn--ghost" href="contact.php">Tell us what you needed</a>
        </div>
    </div>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
