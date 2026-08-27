const js = require('@eslint/js');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplateParser = require('@angular-eslint/template-parser');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        localStorage: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        jasmine: 'readonly',
      },
    },
    plugins: { '@typescript-eslint': ts, '@angular-eslint': angular },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: { '@angular-eslint': angular },
  },
];
