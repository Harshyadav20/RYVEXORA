/**
 * RYVEXORA — PHP edition preview server (no PHP installation required).
 *
 * Runs the real PHP templates inside WebAssembly so the PHP mirror can be
 * reviewed locally on a machine that has Node but no `php` binary.
 *
 *   npm i --no-save @php-wasm/node
 *   npm run php:preview          # http://localhost:8080
 *
 * The dependency is deliberately not in package.json: the PHP edition itself
 * has zero requirements, and this tool is only for local review. Production
 * hosting should use real PHP 8.1+ (see php/README.md).
 *
 * Note: PHP writes `inquiries.jsonl` inside the WebAssembly filesystem. After
 * each successful inquiry the file is mirrored to php/storage/inquiries.jsonl
 * so you can inspect exactly what a real deployment would store.
 */
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PHP } from '@php-wasm/universal';
import { loadNodeRuntime } from '@php-wasm/node';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', 'php');
const PORT = Number(process.env.PORT || 8080);
const SITE = '/site';

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

if (!fs.existsSync(ROOT)) {
  console.error(`Cannot find the PHP edition at ${ROOT}`);
  process.exit(1);
}

const php = new PHP(await loadNodeRuntime('8.3', { emscriptenOptions: { processId: 9001 } }));
await php.mkdir(SITE);
try {
  await php.mkdir(`${SITE}/storage`);
} catch {
  /* already present */
}

/** Mirror the PHP sources into the wasm filesystem before each request. */
async function syncSources(dir = ROOT, dest = SITE) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'assets' || entry.name === 'storage') continue;
    const source = path.join(dir, entry.name);
    const target = `${dest}/${entry.name}`;
    if (entry.isDirectory()) {
      try {
        await php.mkdir(target);
      } catch {
        /* exists */
      }
      await syncSources(source, target);
    } else if (entry.name.endsWith('.php')) {
      await php.writeFile(target, fs.readFileSync(source));
    }
  }
}

/** Serialise PHP executions — the wasm runtime handles one request at a time. */
let queue = Promise.resolve();
function enqueue(task) {
  const next = queue.then(task, task);
  queue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on('data', (chunk) => chunks.push(chunk));
    request.on('end', () => resolve(Buffer.concat(chunks)));
    request.on('error', reject);
  });
}

function sendFile(response, file) {
  const extension = path.extname(file).toLowerCase();
  response.statusCode = 200;
  response.setHeader('Content-Type', MIME[extension] || 'application/octet-stream');
  response.setHeader('Cache-Control', 'no-cache');
  fs.createReadStream(file).pipe(response);
}

function sendNotFound(response) {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.end('Not found');
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname.startsWith('/storage')) {
      response.statusCode = 403;
      response.end('Forbidden');
      return;
    }

    // Static assets are served from disk so fonts/CSS behave exactly as deployed.
    const candidate = path.resolve(ROOT, `.${pathname}`);
    const isSourceFile = pathname.endsWith('.php') || pathname.includes('/storage/');
    if (
      candidate.startsWith(ROOT) &&
      pathname !== '/' &&
      !isSourceFile &&
      fs.existsSync(candidate) &&
      fs.statSync(candidate).isFile()
    ) {
      sendFile(response, candidate);
      return;
    }

    if (pathname === '/favicon.ico') {
      sendFile(response, path.join(ROOT, 'assets', 'favicon.svg'));
      return;
    }

    // Resolve /name and /name/ to name.php, matching Apache's DirectoryIndex.
    let script = pathname.replace(/^\/+/, '');
    if (script === '' || script.endsWith('/')) script += 'index.php';
    else if (!script.endsWith('.php')) {
      if (fs.existsSync(path.join(ROOT, `${script}.php`))) script += '.php';
    }

    const isPhp = script.endsWith('.php');
    const exists = isPhp && fs.existsSync(path.join(ROOT, script));
    const target = exists ? script : '404.php';

    await syncSources();

    const body = request.method === 'POST' || request.method === 'PUT' ? await readBody(request) : undefined;

    const result = await enqueue(() =>
      php.run({
        scriptPath: `${SITE}/${target}`,
        relativeUri: `${pathname.replace(/^\/+/, '/')}${url.search}`,
        method: request.method,
        headers: {
          Host: request.headers.host || `localhost:${PORT}`,
          'User-Agent': request.headers['user-agent'] || 'php-preview',
          Cookie: request.headers.cookie || '',
          'Content-Type': request.headers['content-type'] || '',
          Accept: request.headers.accept || '*/*',
        },
        body: body && body.length ? new Uint8Array(body) : undefined,
        $_SERVER: {
          HTTP_HOST: request.headers.host || `localhost:${PORT}`,
          SERVER_NAME: 'localhost',
          SERVER_PORT: String(PORT),
          REQUEST_METHOD: request.method || 'GET',
          REQUEST_URI: `${url.pathname}${url.search}`,
          SCRIPT_NAME: `/${target}`,
          PHP_SELF: `/${target}`,
          DOCUMENT_ROOT: SITE,
          REMOTE_ADDR: '127.0.0.1',
          SERVER_PROTOCOL: 'HTTP/1.1',
          HTTPS: 'off',
        },
      }),
    );

    if (result.errors && /Fatal error|Parse error/i.test(result.errors)) {
      console.error(result.errors);
    }

    response.statusCode = exists ? result.httpStatusCode || 200 : 404;

    // Mirror the inquiry log out of wasm so the stored record is inspectable.
    if (request.method === 'POST' && target === 'contact.php' && response.statusCode >= 300 && response.statusCode < 400) {
      try {
        const log = await php.readFileAsText(`${SITE}/storage/inquiries.jsonl`);
        if (log) {
          await fsp.mkdir(path.join(ROOT, 'storage'), { recursive: true });
          await fsp.writeFile(path.join(ROOT, 'storage', 'inquiries.jsonl'), log, 'utf8');
        }
      } catch (error) {
        console.warn('Could not mirror the inquiry log:', error.message);
      }
    }
    for (const [key, values] of Object.entries(result.headers || {})) {
      if (key === 'x-powered-by') continue;
      response.setHeader(key, key === 'set-cookie' ? values : values.join(', '));
    }
    response.end(Buffer.from(result.bytes || new Uint8Array()));
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.end(`Preview server error:\n${error.stack || error}`);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`RYVEXORA PHP edition → http://localhost:${PORT}`);
  console.log(`Serving ${ROOT} through PHP 8.3 (WebAssembly)`);
});
