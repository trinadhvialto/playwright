require('dotenv').config();
const options = [
    '--require-module ts-node/register',
    '--require ./src/tests/steps/*.steps.ts',
    '--require ./src/tests/supportFiles/*.ts',
    '--format progress'
].join(' ');
const format = [
    // 'message:e2e/reports/cucumber-report.ndjson',
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
    'summary',
    'progress-bar',
    '/reporters/allure-reporter.ts'
].join(' ');
const run_feature = [
    './resources/features/ui/',
    options,
    format
].join(' ');

module.exports = {
    test_runner: run_feature,
}

