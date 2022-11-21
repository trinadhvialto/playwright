// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  forbidOnly: !!process.env.forbidOnly,
  workers: 1,
  retries: Number(process.env.testFailureRetryCount),
  
  use: {
    trace: 'on-first-retry',
    actionTimeout: 5 * 1000,
    navigationTimeout: 60 * 1000,
    screenshot: 'only-on-failure',
    locale: process.env.locale,
    headless: false,    
    browserName: 'chromium',
    channel: process.env.browser,
    viewport: null,
       launchOptions: {
      args: ['--start-maximized']
    }
    
  },
  
  // projects: [
  //   {
  //     name: 'chromium',
      
  //     use: { ...devices['Desktop Chrome'] },
  //   },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  // ],
  globalTimeout: 120 * 100 * 1000,
  timeout: 11 * 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  reporter: [
    ['dot'],
    ['json', {  outputFile: 'testresults/'+process.env.customReportName+'.json' }],
    ['junit',{  outputFile: 'testresults/'+process.env.customReportName+'-junit-xml.xml' }],
    ['./customReportGenerator.js',{ outputFile: process.env.customReportName, environment: 'windows 10+ chrome' }]
  ],
  
};

module.exports = config;