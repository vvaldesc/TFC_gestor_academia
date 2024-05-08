import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import icon from "astro-icon";
import basicSsl from '@vitejs/plugin-basic-ssl';
import metaTags from "astro-meta-tags";
import path from 'path'; // Añade esta línea

import auth from "auth-astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: [import.meta.env.VITE_IMAGE_DOMAIN]
  },
  redirects: {
    '/home': '/'
  },
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true
    },
    resolve: {
      alias: {
        '@/*': path.resolve('./src/*'),
        '@/components/*': path.resolve('./src/components/*'),
        '@/layouts/*': path.resolve('./src/layouts/*'),
        '@/pages/*': path.resolve('./src/pages/*'),
        '@/services/*': path.resolve('./src/services/*'),
        '@/sections/*': path.resolve('./src/sections/*'),
        '@/consts/*': path.resolve('./src/consts/*'),
        '@/assets/*': path.resolve('./assets/*')
      }
    }
  },
  integrations: [tailwind(), svelte(), react(), icon(), metaTags(), auth()],
  output: "server",
  adapter: vercel()
});