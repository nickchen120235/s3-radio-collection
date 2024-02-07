module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'indent': ['warn', 2],
        'no-console': ['warn', { 'allow': ['warn', 'error'] }],
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'never'],
        'no-template-curly-in-string': ['error'],
        'eqeqeq': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': ['warn', {
            'allowedNames': ['Component', 'ErrorBoundary']
        }],
        '@typescript-eslint/explicit-function-return-type': ['warn', {
            'allowFunctionsWithoutTypeParameters': true,
        }],
        '@typescript-eslint/no-unused-vars': ['warn', {
            'argsIgnorePattern': '^_',
            'varsIgnorePattern': '^_',
            'caughtErrorsIgnorePattern': '^_',
        }]
    }
}
