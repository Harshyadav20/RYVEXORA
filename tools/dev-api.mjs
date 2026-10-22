/**
 * Vite dev middleware for the Vercel functions in `api/`.
 *
 * Production runs them on Vercel; `vite dev` has no serverless runtime, so
 * without this the payment page would only ever see a 404 while developing.
 * Rather than a second implementation, this imports the real handlers and
 * calls them with Node's own req/res — which is exactly what Vercel does.
 *
 * Deliberately not a production server: it is attached to the dev server only.
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROUTES = {
  '/api/payment-config': 'api/payment-config.js',
  '/api/create-order': 'api/create-order.js',
  '/api/verify-payment': 'api/verify-payment.js',
};

export default function devApi(root = process.cwd()) {
  return {
    name: 'ryvexora-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        const target = ROUTES[url];

        if (!target) {
          // Don't let unknown API paths fall through to the SPA shell: a page
          // returned to `fetch()` reads as a confusing JSON parse error.
          if (url.startsWith('/api/')) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'not_found' }));
            return;
          }
          return next();
        }

        try {
          const module = await import(pathToFileURL(path.join(root, target)).href);
          const handler = module.default;

          if (typeof handler !== 'function') {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'no_handler' }));
            return;
          }

          await handler(req, res);
        } catch (error) {
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
          }
          res.end(JSON.stringify({ error: 'dev_api_failed', message: String(error?.message ?? error) }));
        }
      });

      server.config.logger.info(
        '  ➜  Payments API : /api/payment-config, /api/create-order, /api/verify-payment',
      );
    },
  };
}
