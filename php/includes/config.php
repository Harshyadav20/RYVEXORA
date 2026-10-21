<?php
/**
 * RYVEXORA — PHP edition configuration.
 *
 * Deploy this folder to any PHP 8+ host. No build step, no database.
 * See php/README.md for setup notes.
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

const SITE_NAME        = 'RYVEXORA';
const SITE_EMAIL       = 'hello@ryvexora.com';
const SITE_LOCATION    = 'Mumbai, India';
const SITE_TAGLINE     = 'Build beyond limits.';
const SITE_DESCRIPTION = 'RYVEXORA is a technology and digital growth studio engineering high-performance websites, AI systems, automation, SEO, outreach and SaaS products.';

/** Set to true once a working mail transport is configured on the host. */
const MAIL_ENABLED = false;

define('STORAGE_DIR', dirname(__DIR__) . '/storage');

$DATA = require __DIR__ . '/data.php';
require_once __DIR__ . '/ui.php';

function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function asset(string $path): string
{
    return e($path . '?v=1');
}

/**
 * Returns a class string when the current script matches one of the given files.
 *
 * @param string[] $files
 */
function nav_state(array $files, string $class = ' is-active'): string
{
    $current = basename($_SERVER['SCRIPT_NAME'] ?? '');
    return in_array($current, $files, true) ? $class : '';
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrf_valid(?string $token): bool
{
    return is_string($token)
        && $token !== ''
        && !empty($_SESSION['csrf'])
        && hash_equals($_SESSION['csrf'], $token);
}

function redirect(string $path): never
{
    header('Location: ' . $path, true, 303);
    exit;
}

function find_by_slug(array $items, ?string $slug): ?array
{
    if ($slug === null || $slug === '') {
        return null;
    }
    foreach ($items as $item) {
        if (($item['slug'] ?? '') === $slug) {
            return $item;
        }
    }
    return null;
}

function selected(string $value, string $current): string
{
    return $value === $current ? ' selected' : '';
}
