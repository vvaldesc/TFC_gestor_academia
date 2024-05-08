import Facebook from '@auth/core/providers/facebook';
import Google from '@auth/core/providers/google';

import { defineConfig } from 'auth-astro';

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: import.meta.env.FACEBOOK_CLIENT_ID,
      clientSecret: import.meta.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
});