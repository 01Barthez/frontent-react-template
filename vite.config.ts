import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig(() => {
  const enablePwa =
    (process.env.VITE_ENABLE_PWA || (process.env.NODE_ENV === 'production' ? 'true' : 'false')) ===
    'true';
  const plugins = [react(), tailwindcss()];

  if (enablePwa) {
    plugins.push(
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'icons/*.svg'],
        manifest: {
          name: 'Frontend Starter',
          short_name: 'Starter',
          description: 'A progressive web app starter (modular).',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/icons/icon-192.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
            {
              src: '/icons/icon-512.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
            {
              urlPattern: /\/api\//,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 3,
              },
            },
          ],
        },
      }),
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
