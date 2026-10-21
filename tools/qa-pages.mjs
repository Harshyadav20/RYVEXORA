/**
 * Render every PHP page through WebAssembly PHP and assert the content is the
 * content that page is supposed to show.
 *
 *   npm i --no-save @php-wasm/node
 *   node tools/qa-pages.mjs
 *
 * Guards the class of bug where a shared include reuses a template variable
 * (e.g. header.php looping `$service` overwrote the service detail page with
 * the last service in the array).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PHP } from '@php-wasm/universal';
import { loadNodeRuntime } from '@php-wasm/node';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'php');
const SITE = '/site';

const php = new PHP(await loadNodeRuntime('8.3', { emscriptenOptions: { processId: 4242 } }));
await php.mkdir(SITE);

async function sync(dir = ROOT, dest = SITE) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets' || entry.name === 'storage') continue;
    const source = path.join(dir, entry.name);
    const target = `${dest}/${entry.name}`;
    if (entry.isDirectory()) {
      try { await php.mkdir(target); } catch {}
      await sync(source, target);
    } else if (entry.name.endsWith('.php')) {
      await php.writeFile(target, fs.readFileSync(source));
    }
  }
}
await sync();
try { await php.mkdir(`${SITE}/storage`); } catch {}

await php.writeFile(`${SITE}/_dump.php`, '<?php echo json_encode(require __DIR__ . "/includes/data.php", JSON_UNESCAPED_UNICODE);');
const data = JSON.parse((await php.run({ scriptPath: `${SITE}/_dump.php` })).text);

const unescape = (value) =>
  value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#039;/g, "'").replace(/&quot;/g, '"');

async function get(file, query = '') {
  const uri = `/${file}${query}`;
  return php.run({
    scriptPath: `${SITE}/${file}`,
    relativeUri: uri,
    method: 'GET',
    headers: { Host: 'localhost', Cookie: 'PHPSESSID=qa' },
    $_SERVER: { REQUEST_URI: uri, SCRIPT_NAME: `/${file}`, DOCUMENT_ROOT: SITE, HTTP_HOST: 'localhost' },
  });
}

let pass = 0;
const failures = [];
const check = (name, condition, detail = '') => {
  if (condition) pass += 1;
  else failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
};

for (const service of data.services) {
  const { text: html, httpStatusCode } = await get('service.php', `?slug=${service.slug}`);
  const h1 = unescape((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').trim();
  check(`service/${service.slug} status`, httpStatusCode === 200, String(httpStatusCode));
  check(`service/${service.slug} headline`, h1 === service.title, `h1="${h1}"`);
  check(`service/${service.slug} summary`, html.includes(service.summary.slice(0, 40)));
  check(`service/${service.slug} first approach step`, html.includes(service.approach[0].title));
  check(`service/${service.slug} stack`, html.includes(service.stack[0]));
  check(`service/${service.slug} faqs`, (html.match(/class="faq"/g) || []).length === service.faqs.length);
}

for (const project of data.projects) {
  const { text: html, httpStatusCode } = await get('project.php', `?slug=${project.slug}`);
  const h1 = unescape((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').trim();
  check(`project/${project.slug} status`, httpStatusCode === 200, String(httpStatusCode));
  check(`project/${project.slug} headline`, h1 === project.name, `h1="${h1}"`);
  check(`project/${project.slug} challenge`, html.includes(project.challenge.slice(0, 50)));
  check(`project/${project.slug} built list`, project.built.every((item) => html.includes(item.replace(/&/g, '&amp;'))));
  check(`project/${project.slug} stack`, project.stack.every((item) => html.includes(item.replace(/&/g, '&amp;'))));
}

for (const page of ['index.php', 'services.php', 'work.php', 'about.php', 'process.php', 'contact.php', 'privacy.php']) {
  const { text: html, httpStatusCode } = await get(page);
  check(`${page} status`, httpStatusCode === 200, String(httpStatusCode));
  check(`${page} single h1`, (html.match(/<h1\b/g) || []).length === 1);
  check(`${page} title`, /<title>[^<]+<\/title>/.test(html));
  check(`${page} no unrendered PHP`, !/\$[a-zA-Z_]+\[['"]/.test(html));
}

const unknown = await get('service.php', '?slug=not-a-service');
check('unknown service returns 404', unknown.httpStatusCode === 404, String(unknown.httpStatusCode));

console.log(`${pass} page checks passed, ${failures.length} failed`);
if (failures.length) {
  for (const failure of failures) console.log(` - ${failure}`);
  process.exit(1);
}

// The wasm runtime keeps the event loop alive; exit explicitly.
process.exit(0);
