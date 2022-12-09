const { config } = require('./config.js');
const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
  request,
} = require ('@playwright/test');
const { ITestCaseHookParameter } = require('@cucumber/cucumber/lib/support_code_library_builder/types');
const { ensureDir } = require('fs-extra');
// const { default: test } = require('node:test');

let browser= ChromiumBrowser;
const tracesDir = 'traces';

// declare global {
//   // eslint-disable-next-line no-var
//   var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
// }

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  switch ("chrome") {
    case 'firefox':
      browser = await firefox.launch(config.browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch();
  }
  await ensureDir(tracesDir);
});

// Before({ tags: '@ignore' }, async function () {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return 'skipped' as any;
// });

Before({ tags: '@debug' }, async function () {
  this.debug = true;
});

Before(async function () {
  this.startTime = new Date();
  this.testName = "Demo Tet";
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    viewport: { width: 1200, height: 800 },
  });
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    // baseURL: config.BASE_API_URL,
  });

  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.on('console', async () => {
    if (msg.type() === 'log') {
      await this.attach(msg.text());
    }
  });
  this.feature = test;
});

After(async function () {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${
          this.startTime?.toISOString().split('.')[0]
        }trace.zip`,
      });
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
