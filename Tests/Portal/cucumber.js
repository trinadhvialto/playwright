require('dotenv').config();
const options = [
  '--require-module ts-node/register',
  '--require ./src/tests/steps/*.steps.ts',
  '--require ./src/tests/supportFiles/*.ts',
  '--format progress',
].join(' ');
const format = [
  // 'message:e2e/reports/cucumber-report.ndjson',
  '--format ./src/tests/supportFiles/reporters/allure-reporter.ts',
  '--format json:reports/cucumber-report.json',
  '--format json:allure-results/cucumber-report.json',
  '--format html:reports/report.html',
  '--format @cucumber/pretty-formatter',
  `--format-options '{"snippetInterface":"async-await"}'`,
  '--format summary',
  '--format progress-bar',
  '--publish-quiet',
  `--format-options '{"theme":{"datatable border":["green"],"datatable content":["green","italic"],"docstring content":["green","italic"],"docstring delimiter":["green"],"feature description":["green"],"feature keyword":["bold","green"],"rule keyword":["yellow"],"scenario keyword":["greenBright"],"scenario name":["green","underline"],"step keyword":["bgGreen","black","italic"],"step text":["greenBright","italic"],"tag":["green"]}}'`,

].join(' ');
const run_feature = [
  './resources/features/ui/',
  options,
  format
].join(' ');

module.exports = {
  default: run_feature,
}