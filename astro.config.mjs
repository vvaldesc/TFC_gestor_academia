import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import icon from "astro-icon";
import storyblok from "astro-storyblok";

impor

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), react(), icon(), metaTags(),
    storyblok({
      accessToken: "<your-access-token>",
      apiOptions: {
        region: "es",
      },
    }),
  ]
});