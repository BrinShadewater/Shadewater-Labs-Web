import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:41739';

export default defineConfig({
  testDir: './tests/browser',
  use: {
    ...devices['iPhone 13'],
    browserName: 'chromium',
    baseURL,
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 41739 --strictPort',
    url: baseURL,
  },
});
