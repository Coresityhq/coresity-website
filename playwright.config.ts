import { defineConfig, devices } from '@playwright/test'

// Motion tests for the homepage. Run with `npm run test:e2e`.
//
// The tests run against the production export: `npm run build` writes out/
// and scripts/preview.mjs serves it on 8910 the way nginx does. Locally a
// server already on 8910 is reused, so `npm run dev` (or the Docker image via
// scripts/docker/prod.sh) works too; CI always builds and starts its own.
// PORT moves both the server and the tests when 8910 is taken.
const port = Number(process.env.PORT ?? 8910)

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: `http://localhost:${port}/healthz`,
    env: { PORT: String(port) },
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
})
