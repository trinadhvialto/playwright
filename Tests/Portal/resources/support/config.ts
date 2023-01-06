// playwright.config.js
// @ts-check
import { devices } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  forbidOnly: !!process.env.forbidOnly,
  workers: 2,// workers will be take from Pipeline variable given by user
  retries: Number(process.env.testFailureRetryCount),
  
  use: {
    trace: 'on-first-retry',
    actionTimeout: 5 * 1000,
    navigationTimeout: 60 * 1000,
    screenshot: 'only-on-failure',
    video : 'retain-on-failure',
    locale: process.env.locale,
    headless: false,    
    browserName: 'chromium',
    channel: process.env.browser,
    viewport: null,
       launchOptions: {
      args: ['--start-maximized']
    },
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': '*/*',
    },
    
    
  },



  
  // projects: [
  //   {
  //     name: 'chromium',
      
  //     use: { ...devices['Desktop Chrome'] },
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

//module.exports = config;
export {config};