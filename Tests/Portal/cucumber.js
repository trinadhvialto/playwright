var common = [
    './src/tests/bddframework/**/features/**/*.feature',
    `--format ${
    process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
    }`,
    '--parallel 20',
    '--require-module ts-node/register',
    '--require ./src/tests/bddframework/**/stepDefinitions/**/*.ts',
    '--require ./src/tests/bddframework/**/stepDefinitions/*.ts',
    '--require ./build/tests/support/*.ts',
    '--require ./test.setup.ts',
    '--publish-quiet'
].join(' ');

module.exports = {
    default: common,
};