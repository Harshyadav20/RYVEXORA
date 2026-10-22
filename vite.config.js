import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import devApi from './tools/dev-api.mjs';

// The preview environment proxies the dev server through a dynamic host, so
// allowedHosts must stay open. Everything is served from 0.0.0.0 for previews.
export default defineConfig(({ mode }) => {
  // Vite only inlines VITE_* into the client. The payment functions read
  // process.env at request time, so mirror the server-side keys for `npm run
  // dev` as well. Nothing secret is exposed to the browser by doing this.
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith('VITE_') && process.env[key] === undefined) process.env[key] = value;
  }

  return {
    plugins: [react(), devApi()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      allowedHosts: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
      allowedHosts: true,
    },
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 1400,
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three', '@react-three/fiber', '@react-three/drei'],
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  };
});
