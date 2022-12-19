// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');    //Donot change to import module. Breaks the flow.
require('dotenv').config(); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  forbidOnly: !!process.env.forbidOnly,
  workers: 1,// workers will be take from Pipeline variable given by user
  retries: 0,

  use: {
    trace: 'on-first-retry',
    actionTimeout:  60* 1000,
    navigationTimeout: 60 * 1000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: process.env.locale,
    headless: false,
    browserName: process.env.browser,
    channel: process.env.browser,
    acceptDownloads: true,
    args: ['--start-maximized'],
    viewport: null,

    // use: {
    //   viewport: { width: 1920, height: 1080 },
    // },
    launchOptions: {
      viewport: null,
      args: ['--start-maximized'],
      slowMo: 1000
    },
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/vnd.github.v3+json',
    },


  },




  // projects: [
  //   {
  //     name: 'chromium',

  //     use: {
  //       ...devices['Desktop Chrome']
  //     },
      

  //   },
  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },
  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },
  // ],
  globalTimeout: 120 * 100 * 1000,
  timeout: 11 * 60 * 1000,
  expect: {
    timeout: 12 * 10000,
  },
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['json', { outputFile: 'testresults/' + process.env.customReportName + '.json' }],
    ['junit', { outputFile: 'testresults/' + process.env.customReportName + '-junit-xml.xml' }],
    ['./customReportGenerator.ts', { outputFile: process.env.customReportName, environment: 'windows 10+ chrome' }]
  ],

};
export default config;