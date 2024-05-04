import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import icon from "astro-icon";
import storyblok from "@storyblok/astro";

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), react(), icon(), metaTags(),
    storyblok({
      accessToken: "dq66cq2mTAWPoyV4KnL3Gwtt",
      region: "eu",
      bridge: true,
      apiOptions: {}, // storyblok-js-client options
      components: {},
      componentsDir: "src",
      enableFallbackComponent: false,
      customFallbackComponent: "",
      useCustomApi: false,
      components: {
        page: 'components/storyblok/Page',
        feature: 'components/storyblok/Feature',
        grid: 'components/storyblok/Grid',
        teaser: 'components/storyblok/Teaser',
      },
    }),
  ]
});