    var common = [
        './src/tests/bddframework/**/features/**/*.feature',
        `--format ${
        process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
        }`,
        '--parallel 20',
        '--require-module ts-node/register',
        '--require ./src/tests/bddframework/**/stepDefinitions/**/*.ts',
        '--require ./src/tests/bddframework/**/stepDefinitions/*.ts',
        '--require ./build/tests/support/*.ts'
    ].join(' ');
    
    module.exports = {
        default: common,
    };