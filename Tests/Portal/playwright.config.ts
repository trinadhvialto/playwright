// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');    //Donot change to import module. Breaks the flow.

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'C:\\Users\\vtpr271\\Automation\\playwright\\Tests\\Portal\\src\\tests\\ui\\Traveller',
  forbidOnly: !!process.env.forbidOnly,
  workers: 1,// workers will be take from Pipeline variable given by user
  retries: 0,
  
  use: {
    trace: 'on-first-retry',
    actionTimeout: 5 * 5000,
    navigationTimeout: 60 * 1000,
    screenshot: 'only-on-failure',
    video : 'retain-on-failure',
    locale: process.env.locale,
    headless: false,    
    // browserName: 'chromium',
    channel: process.env.browser,
    // viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    },
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/vnd.github.v3+json',
    },
    
    
  },



  
  projects: [
    {
      name: 'chromium',
      
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  globalTimeout: 120 * 100 * 1000,
  timeout: 11 * 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  reporter: [
    ['dot'],
    ['allure-playwright'],
    ['json', {  outputFile: 'testresults/'+process.env.customReportName+'.json' }],
    ['junit',{  outputFile: 'testresults/'+process.env.customReportName+'-junit-xml.xml' }],
    ['./customReportGenerator.ts',{ outputFile: process.env.customReportName, environment: 'windows 10+ chrome' }]
  ],
  
};

module.exports = config;