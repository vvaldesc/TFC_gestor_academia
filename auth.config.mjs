import GitHub from '@auth/core/providers/google';

/*
import GitHub from '@auth/core/providers/apple';
import GitHub from '@auth/core/providers/facebook';
*/



import { defineConfig } from 'auth-astro';

export default defineConfig({
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});