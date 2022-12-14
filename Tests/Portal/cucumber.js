    var common = [
        './bddframework/**/features/**/*.feature',
        `--format ${
        process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
        }`,
        '--parallel 20',
        '--require-module ts-node/register',
        '--require ./bddframework/**/stepDefinitions/**/*.ts',
        '--require ./bddframework/**/stepDefinitions/*.ts',
        '--require ./build/tests/support/*.ts'
    ].join(' ');
    
    module.exports = {
        default: common,
    };