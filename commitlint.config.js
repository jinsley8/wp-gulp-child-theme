// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// chore: Build process, code maintenance or auxiliary tool changes
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// clean - Reset changes
// docs: Documentation only changes
// feat: Introduces a new feature to the codebase
// fix: Patches or fixes a bug
// perf: A code change that improves performance
// ref: Reference other commit IDs
// refactor: A code change that neither fixes a bug nor adds a feature
// revert: Reverting things
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 100],
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 100],
        'header-max-length': [2, 'always', 100],
        'scope-case': [2, 'always', 'lower-case'],
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'build',
                'chore',
                'ci',
                'clean',
                'docs',
                'feat',
                'fix',
                'perf',
                'ref',
                'refactor',
                'revert',
                'style',
                'test',
            ],
        ],
    },
};
