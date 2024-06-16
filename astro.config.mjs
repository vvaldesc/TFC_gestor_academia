import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import icon from "astro-icon";
import basicSsl from '@vitejs/plugin-basic-ssl';
import metaTags from "astro-meta-tags";
import path from 'path'; // Añade esta línea
import mkcert from 'vite-plugin-mkcert';
// import serviceWorker from "astrojs-service-worker";
import auth from "auth-astro";
// import netlify from '@astrojs/netlify';

import vercel from "@astrojs/vercel/serverless";
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://astro.build/config
export default defineConfig({
  image: {
    domains: [import.meta.env.VITE_IMAGE_DOMAIN]
  },
  redirects: {
    '/home': '/'
  },
  vite: {
    http: {
      large_client_headers_buffers: 4096
    },
    plugins: [basicSsl()],
    server: {
      https: true
    },
    plugins: [mkcert({
      savePath: './certs',
      // save the generated certificate into certs directory
      autoUpgrade: true,
      // auto upgrade the certificate if it's expired
      hosts: ['localhost'] // generate certificate for localhost
    })],
    resolve: {
      alias: {
        '@/*': path.resolve(__dirname, './src/*'),
        '@/components/*': path.resolve(__dirname, './src/components/*'),
        '@/layouts/*': path.resolve(__dirname, './src/layouts/*'),
        '@/pages/*': path.resolve(__dirname, './src/pages/*'),
        '@/services/*': path.resolve(__dirname, './src/services/*'),
        '@/sections/*': path.resolve(__dirname, './src/sections/*'),
        '@/consts/*': path.resolve(__dirname, './src/consts/*'),
        '@/public/*': path.resolve(__dirname, './public/*'),
        '@/styles/*': path.resolve(__dirname, './src/styles/*')
      }
    }
  },
  integrations: [tailwind(), svelte(), react(), icon({
    include: {
      mdi: ["*"],
      // (Default) Loads entire Material Design Icon set
      bxs: ["*"] // Loads entire bxs set
    }
  }), metaTags(), auth()
  // , serviceWorker()
  ],
  output: "server",
  adapter: vercel()
});