import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://localhost:4322',
    // supportFile: "cypress/support/commands.js",
    supportFile: false,
  },
  env: {
    googleRefreshToken: 'xxxxxxx',
    googleClientId: 'xxxxxxx',
    googleClientSecret: 'xxxxxxx',
    hostApi: 'http://localhost:4321',
  },
  video: true,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
})