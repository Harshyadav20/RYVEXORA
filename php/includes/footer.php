<?php
// Refuse direct web access to partials — these files expect to be included.
if (isset($_SERVER['SCRIPT_FILENAME'])
    && realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Not found';
    exit;
}

/** Shared footer (PHP edition). */
?>
<footer class="site-footer">
    <div class="footer-glow" aria-hidden="true"></div>
    <div class="shell footer-top">
        <div class="footer-brand">
            <a class="brand" href="index.php" aria-label="RYVEXORA — home">
                <img src="assets/favicon.svg" width="34" height="34" alt="">
                <span class="brand__name">RYVEX<span>ORA</span></span>
            </a>
            <p>A technology and digital growth studio building the websites, systems and software that move businesses forward.</p>
            <span class="chip chip--accent"><i class="status__dot"></i> Accepting new projects</span>
        </div>

        <div class="footer-col">
            <h2>Studio</h2>
            <a href="about.php">About</a>
            <a href="process.php">How we work</a>
            <a href="work.php">Selected work</a>
            <a href="formats.php">Formats</a>
            <a href="contact.php">Contact</a>
            <a href="privacy.php">Privacy</a>
        </div>

        <div class="footer-col">
            <h2>Services</h2>
            <?php foreach ($DATA['services'] as $footerService): ?>
                <a href="service.php?slug=<?= e($footerService['slug']) ?>"><?= e($footerService['title']) ?></a>
            <?php endforeach; ?>
        </div>

        <div class="footer-col footer-col--contact">
            <h2>Contact</h2>
            <a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a>
            <p><?= e(SITE_LOCATION) ?> · Working worldwide</p>
            <p>Mon–Fri · 10:00–19:00 IST</p>
            <p>Replies within one business day</p>
        </div>
    </div>

    <p class="footer-wordmark" aria-hidden="true">RYVEXORA</p>

    <div class="shell">
        <div class="footer-bottom">
            <span>© <?= date('Y') ?> RYVEXORA. All rights reserved.</span>
            <div class="footer-bottom__links">
                <span>Built in Mumbai · 19.0760° N · 72.8777° E</span>
                <a href="#top" data-to-top>Back to top ↑</a>
            </div>
        </div>
    </div>
</footer>

<script src="<?= asset('assets/site.js') ?>" defer></script>
</body>
</html>
