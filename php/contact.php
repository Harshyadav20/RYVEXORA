<?php
declare(strict_types=1);

require __DIR__ . '/includes/config.php';

/** Append an inquiry to a protected JSON-lines file. */
function store_inquiry(array $record): bool
{
    if (!is_dir(STORAGE_DIR) && !@mkdir(STORAGE_DIR, 0775, true) && !is_dir(STORAGE_DIR)) {
        return false;
    }

    $line = json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($line === false) {
        return false;
    }

    return @file_put_contents(STORAGE_DIR . '/inquiries.jsonl', $line . PHP_EOL, FILE_APPEND | LOCK_EX) !== false;
}

$serviceChoices = array_merge(
    array_column($DATA['services'], 'title'),
    ['Multiple services / partnership', 'Not sure yet'],
);

$values = [
    'name' => '',
    'email' => '',
    'company' => '',
    'website' => '',
    'service' => '',
    'budget' => '',
    'message' => '',
    'trap' => '',
];
$errors = [];
$flash = null;

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    foreach (array_keys($values) as $key) {
        $values[$key] = trim((string) ($_POST[$key] ?? ''));
    }

    if (!csrf_valid(isset($_POST['csrf']) ? (string) $_POST['csrf'] : null)) {
        $errors['form'] = 'Your session expired. Please reload the page and send the brief again.';
    }

    // Honeypot: silently accept bot submissions without storing anything.
    if ($values['trap'] !== '') {
        $_SESSION['contact_flash'] = ['name' => '', 'email' => '', 'service' => '', 'budget' => ''];
        redirect('contact.php?sent=1');
    }

    if ($errors === []) {
        if (mb_strlen($values['name']) < 2) {
            $errors['name'] = 'Please enter your name.';
        }
        if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Enter a valid email address, like name@company.com.';
        }
        if (!in_array($values['service'], $serviceChoices, true)) {
            $errors['service'] = 'Choose the service closest to what you need.';
        }
        if (!in_array($values['budget'], $DATA['budgets'], true)) {
            $errors['budget'] = 'Select an approximate budget range.';
        }
        if (mb_strlen($values['message']) < 20) {
            $errors['message'] = 'Give us a little context — at least 20 characters.';
        }
        if ($values['website'] !== '') {
            $candidate = preg_match('~^https?://~i', $values['website'])
                ? $values['website']
                : 'https://' . $values['website'];
            if (!filter_var($candidate, FILTER_VALIDATE_URL)) {
                $errors['website'] = 'Enter a valid URL, or leave this empty.';
            } else {
                $values['website'] = $candidate;
            }
        }
    }

    if ($errors === []) {
        $record = [
            'received_at' => gmdate('c'),
            'name' => $values['name'],
            'email' => $values['email'],
            'company' => $values['company'],
            'website' => $values['website'],
            'service' => $values['service'],
            'budget' => $values['budget'],
            'message' => $values['message'],
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
        ];

        $stored = store_inquiry($record);
        $mailed = false;

        if (MAIL_ENABLED) {
            $safeName = str_replace(["\r", "\n"], ' ', $values['name']);
            $safeEmail = str_replace(["\r", "\n"], '', $values['email']);
            $body = "New project inquiry — RYVEXORA\n\n"
                . "Name: {$values['name']}\n"
                . "Email: {$values['email']}\n"
                . "Company: {$values['company']}\n"
                . "Website: {$values['website']}\n"
                . "Service: {$values['service']}\n"
                . "Budget: {$values['budget']}\n\n"
                . "Project details:\n{$values['message']}\n";
            $headers = "From: RYVEXORA <no-reply@ryvexora.com>\r\n"
                . "Reply-To: {$safeEmail}\r\n"
                . "Content-Type: text/plain; charset=UTF-8\r\n";
            $mailed = @mail(SITE_EMAIL, 'Project inquiry — ' . $safeName, $body, $headers);
        }

        if (!$stored && !$mailed) {
            $errors['form'] = 'The brief could not be saved on the server. Please email us directly at ' . SITE_EMAIL . '.';
        } else {
            $_SESSION['contact_flash'] = [
                'name' => $values['name'],
                'email' => $values['email'],
                'service' => $values['service'],
                'budget' => $values['budget'],
            ];
            redirect('contact.php?sent=1');
        }
    }
}

if (isset($_GET['sent']) && !empty($_SESSION['contact_flash'])) {
    $flash = $_SESSION['contact_flash'];
    unset($_SESSION['contact_flash']);
}

$pageTitle = 'Contact';
$pageDescription = 'Start a project with RYVEXORA. Tell us what you are building, what is in the way and when you need it live. Replies within one business day.';
require __DIR__ . '/includes/header.php';
?>
<main id="main">
    <section class="section" style="padding-top:calc(var(--header) + clamp(26px, 4vw, 52px))" aria-labelledby="contact-heading">
        <div class="shell">
            <?php render_breadcrumbs([['label' => 'Contact']]); ?>
        </div>

        <div class="shell contact-grid" style="margin-top:clamp(18px, 3vw, 34px)">
            <div>
                <span class="eyebrow">Start a project</span>
                <h1 class="contact-title" id="contact-heading" style="margin-top:18px">
                    LET'S BUILD
                    <em>WHAT'S NEXT.</em>
                </h1>
                <p class="lead" style="margin-top:22px">
                    Have an idea? Tell us where you are and where you want to be. You will get a considered
                    reply with a clear next step — not an automated sales sequence.
                </p>

                <div style="margin-top:26px;max-width:440px">
                    <div class="contact-detail">
                        <div><strong>Email</strong><a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a></div>
                    </div>
                    <div class="contact-detail">
                        <div><strong>Studio</strong><?= e(SITE_LOCATION) ?> · working worldwide</div>
                    </div>
                    <div class="contact-detail">
                        <div><strong>Response</strong>Within one business day · Mon–Fri, 10:00–19:00 IST</div>
                    </div>
                    <div class="contact-detail">
                        <div><strong>Availability</strong>Accepting new projects</div>
                    </div>
                </div>

                <div style="width:120px;margin-top:30px" aria-hidden="true">
                    <div class="orb" style="width:120px"></div>
                </div>
            </div>

            <div class="form-wrap">
                <?php if ($flash !== null): ?>
                    <div class="form-success" role="status">
                        <span class="chip chip--accent">Brief received</span>
                        <h2 style="margin-top:14px"><?= $flash['name'] !== '' ? 'Thanks, ' . e(explode(' ', $flash['name'])[0]) . '.' : 'Brief received.' ?></h2>
                        <p>
                            <?php if ($flash['email'] !== ''): ?>
                                We will reply to <strong style="color:var(--text)"><?= e($flash['email']) ?></strong> within one business day.
                            <?php else: ?>
                                We will reply within one business day.
                            <?php endif; ?>
                        </p>
                        <?php if ($flash['service'] !== ''): ?>
                            <dl class="definition" style="margin-top:18px">
                                <div><dt>Service</dt><dd><?= e($flash['service']) ?></dd></div>
                                <div><dt>Budget</dt><dd><?= e($flash['budget']) ?></dd></div>
                            </dl>
                        <?php endif; ?>
                        <div class="btn-row" style="margin-top:20px">
                            <a class="btn" href="mailto:<?= e(SITE_EMAIL) ?>">Email the studio</a>
                            <a class="btn btn--ghost" href="contact.php">Send another brief</a>
                        </div>
                    </div>
                <?php else: ?>
                    <?php if ($errors !== []): ?>
                        <div class="form-error" role="alert">
                            <?= isset($errors['form']) ? e($errors['form']) : 'Please check the highlighted fields below.' ?>
                        </div>
                    <?php endif; ?>

                    <form method="post" action="contact.php" data-contact-form>
                        <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">

                        <div class="form-grid">
                            <div class="field">
                                <label for="name">Name <span>*</span></label>
                                <input id="name" name="name" type="text" autocomplete="name" placeholder="Your name" value="<?= e($values['name']) ?>" required<?= isset($errors['name']) ? ' aria-invalid="true" aria-describedby="err-name"' : '' ?>>
                                <?php if (isset($errors['name'])): ?><span class="field__error" id="err-name"><?= e($errors['name']) ?></span><?php endif; ?>
                            </div>

                            <div class="field">
                                <label for="email">Email <span>*</span></label>
                                <input id="email" name="email" type="email" autocomplete="email" placeholder="you@company.com" value="<?= e($values['email']) ?>" required<?= isset($errors['email']) ? ' aria-invalid="true" aria-describedby="err-email"' : '' ?>>
                                <?php if (isset($errors['email'])): ?><span class="field__error" id="err-email"><?= e($errors['email']) ?></span><?php endif; ?>
                            </div>

                            <div class="field">
                                <label for="company">Company <span style="color:var(--faint)">optional</span></label>
                                <input id="company" name="company" type="text" autocomplete="organization" placeholder="Company name" value="<?= e($values['company']) ?>">
                            </div>

                            <div class="field">
                                <label for="website">Website <span style="color:var(--faint)">optional</span></label>
                                <input id="website" name="website" type="text" autocomplete="url" placeholder="example.com" value="<?= e($values['website']) ?>"<?= isset($errors['website']) ? ' aria-invalid="true" aria-describedby="err-website"' : '' ?>>
                                <?php if (isset($errors['website'])): ?><span class="field__error" id="err-website"><?= e($errors['website']) ?></span><?php endif; ?>
                            </div>

                            <div class="field">
                                <label for="service">Service needed <span>*</span></label>
                                <select id="service" name="service" required<?= isset($errors['service']) ? ' aria-invalid="true" aria-describedby="err-service"' : '' ?>>
                                    <option value="">Select a service</option>
                                    <?php foreach ($serviceChoices as $choice): ?>
                                        <option value="<?= e($choice) ?>"<?= selected($choice, $values['service']) ?>><?= e($choice) ?></option>
                                    <?php endforeach; ?>
                                </select>
                                <?php if (isset($errors['service'])): ?><span class="field__error" id="err-service"><?= e($errors['service']) ?></span><?php endif; ?>
                            </div>

                            <div class="field">
                                <label for="budget">Budget range <span>*</span></label>
                                <select id="budget" name="budget" required<?= isset($errors['budget']) ? ' aria-invalid="true" aria-describedby="err-budget"' : '' ?>>
                                    <option value="">Select a range</option>
                                    <?php foreach ($DATA['budgets'] as $budget): ?>
                                        <option value="<?= e($budget) ?>"<?= selected($budget, $values['budget']) ?>><?= e($budget) ?></option>
                                    <?php endforeach; ?>
                                </select>
                                <?php if (isset($errors['budget'])): ?><span class="field__error" id="err-budget"><?= e($errors['budget']) ?></span><?php endif; ?>
                                <span class="form-note">All figures in USD. We will confirm the right scope before quoting.</span>
                            </div>

                            <div class="field field--full">
                                <label for="message">Project details <span>*</span></label>
                                <textarea id="message" name="message" placeholder="What are you building, what is in the way, and when would you like it live?" required<?= isset($errors['message']) ? ' aria-invalid="true" aria-describedby="err-message"' : '' ?>><?= e($values['message']) ?></textarea>
                                <?php if (isset($errors['message'])): ?><span class="field__error" id="err-message"><?= e($errors['message']) ?></span><?php endif; ?>
                            </div>

                            <div class="sr-only" aria-hidden="true">
                                <label for="trap">Leave this field empty</label>
                                <input id="trap" name="trap" type="text" tabindex="-1" autocomplete="off">
                            </div>
                        </div>

                        <div class="form-foot">
                            <button class="btn" type="submit">Send inquiry</button>
                            <p class="form-note">We use your details only to reply to this inquiry. See the <a href="privacy.php" style="color:var(--muted)">privacy notice</a>.</p>
                        </div>
                    </form>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <section class="section section--surface section--tight" aria-labelledby="next-heading">
        <div class="shell">
            <div class="section-head">
                <div class="reveal">
                    <span class="eyebrow">What happens next</span>
                    <h2 class="h2" id="next-heading">Three steps. No mystery.</h2>
                    <p class="lead">No discovery maze and no automated sales sequence. A person reads your brief and replies.</p>
                </div>
            </div>
            <div class="grid grid--3">
                <div class="principle reveal">
                    <span class="principle__num">01</span>
                    <h3>Tell us what you need</h3>
                    <p>Send the brief with context: the problem, the constraint and the timing. A realistic budget range helps us answer honestly.</p>
                </div>
                <div class="principle reveal">
                    <span class="principle__num">02</span>
                    <h3>We reply within a business day</h3>
                    <p>You get a real response from the person who would do the work — questions, a recommendation, or an honest note that we are not the right fit.</p>
                </div>
                <div class="principle reveal">
                    <span class="principle__num">03</span>
                    <h3>Scope, then build</h3>
                    <p>If it is a match, we send a written scope with price and dates. Work starts after a deposit and a kickoff call.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="shell detail-layout">
            <div class="reveal">
                <span class="eyebrow">Before you write</span>
                <h2 class="h2" style="margin-top:16px">A few answers up front.</h2>
                <p class="lead">Prefer email? Write to <a href="mailto:<?= e(SITE_EMAIL) ?>" class="cyan"><?= e(SITE_EMAIL) ?></a> — the same people read it.</p>
            </div>
            <div class="reveal">
                <?php render_faqs([
                    ['q' => 'Do you sign NDAs?', 'a' => 'Yes, before a detailed brief if you prefer. Send yours or ask for ours. We keep client information confidential regardless.'],
                    ['q' => 'Can you work alongside our in-house team?', 'a' => 'Often. We can lead a workstream, embed for a release, or review architecture before your team commits. We agree boundaries and communication up front.'],
                    ['q' => 'What if we only have a rough idea?', 'a' => 'That is normal. Start with the problem and the outcome you want. If the idea needs shaping, we scope a short paid discovery before a full build.'],
                    ['q' => 'How quickly can you start?', 'a' => 'Small builds can usually start within two weeks of a signed scope; larger engagements are scheduled around the team’s capacity.'],
                ]); ?>
            </div>
        </div>
    </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
