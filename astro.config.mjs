import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import icon from "astro-icon";
import storyblok from "@storyblok/astro";
import basicSsl from '@vitejs/plugin-basic-ssl'
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/home': '/'
  },
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  integrations: [tailwind(), svelte(), react(), icon(), metaTags(),
    storyblok({
      accessToken: import.meta.env.VITE_STORYBLOK_API_TOKEN,
      region: "eu",
      bridge: true,
      apiOptions: {}, // storyblok-js-client options
      componentsDir: "src",
      enableFallbackComponent: false,
      customFallbackComponent: "",
      useCustomApi: false,
      components: {
        page: 'components/Storyblok_native/Page',
        feature: 'components/Storyblok_native/Feature',
        grid: 'components/Storyblok_native/Grid',
        teaser: 'components/Storyblok_native/Teaser',
        testblog: 'components/Storyblok_native/Testblog',
        slider: 'sections/Slider',
      }
    }),
  ]
});