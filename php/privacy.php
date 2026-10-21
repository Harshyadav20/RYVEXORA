<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

$pageTitle = 'Privacy notice';
$pageDescription = 'How RYVEXORA handles the information you share through this website.';
require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <header class="page-hero">
        <div class="shell">
            <?php render_breadcrumbs([['label' => 'Privacy']]); ?>
            <span class="eyebrow">Legal</span>
            <h1 class="h1">Privacy notice.</h1>
            <p class="lead">A plain-language account of what this website collects, why, and how to have it removed.</p>
            <p class="mono" style="margin-top:20px;color:var(--faint)">Last updated · 21 October 2026</p>
        </div>
    </header>

    <section class="section">
        <div class="shell detail-layout">
            <div>
                <div class="block reveal">
                    <h2>Who we are</h2>
                    <p>RYVEXORA is a technology and digital growth studio based in <?= e(SITE_LOCATION) ?>. For any question about this notice or your data, write to <a class="cyan" href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a>.</p>
                </div>

                <div class="block reveal">
                    <h2>What this site collects</h2>
                    <ul class="check-list">
                        <li><strong>Project inquiry details.</strong> The information you enter in the contact form: name, email, company, website, selected service, budget range and your message.</li>
                        <li><strong>Technical logs.</strong> Our hosting provider may record standard request logs (IP address, user agent, timestamp) for security and reliability.</li>
                    </ul>
                </div>

                <div class="block reveal">
                    <h2>Why we use it</h2>
                    <p>To read and respond to your inquiry, to scope potential work, and to keep a record of conversations with prospective clients. We do not sell your details, rent them to third parties, or add you to a marketing list without your explicit consent.</p>
                </div>

                <div class="block reveal">
                    <h2>Where it is stored</h2>
                    <p>Inquiries are written to a protected file on this server and, where mail is configured, sent to our inbox. Server access is limited to the people who need it to reply.</p>
                </div>

                <div class="block reveal">
                    <h2>Cookies and analytics</h2>
                    <p>This site uses a session cookie only to protect the contact form against cross-site request forgery. It sets no advertising cookies and loads no third-party tracking scripts.</p>
                </div>

                <div class="block reveal">
                    <h2>How long we keep it</h2>
                    <p>Inquiries are kept for up to twelve months from the last message, then deleted unless we are working together or the law requires retention for longer.</p>
                </div>

                <div class="block reveal">
                    <h2>Your rights</h2>
                    <p>Depending on where you live, you may have the right to access, correct, export or delete the personal data we hold about you, and to object to certain processing. Email <a class="cyan" href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a> and we will respond within a reasonable period, normally within 30 days.</p>
                </div>

                <div class="block reveal">
                    <h2>Security</h2>
                    <p>Access to inquiry data is limited to the people who need it to reply. Please do not send passwords, payment details or sensitive personal data through the form.</p>
                </div>

                <div class="block reveal">
                    <h2>Changes</h2>
                    <p>If this notice changes materially, the updated version will be published here with a new date.</p>
                </div>
            </div>

            <aside class="detail-aside reveal">
                <h2>Summary</h2>
                <p><strong style="color:var(--text)">Collected</strong><br>Inquiry form details, server logs</p>
                <hr>
                <p><strong style="color:var(--text)">Used for</strong><br>Replying to you and scoping work</p>
                <hr>
                <p><strong style="color:var(--text)">Shared with</strong><br>No one — not sold or rented</p>
                <hr>
                <p><strong style="color:var(--text)">Retention</strong><br>Up to 12 months</p>
                <a class="btn btn--block" href="contact.php">Contact the studio</a>
            </aside>
        </div>
    </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
