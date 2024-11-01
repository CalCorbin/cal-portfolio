import react from 'eslint-plugin-react';
import _import from 'eslint-plugin-import';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import pluginCypress from 'eslint-plugin-cypress/flat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  // Files to ignore
  {
    ignores: [
      'build/*.js',
      'src/serviceWorker.js',
      'src/components/Firebase/context.js',
    ],
  },
  ...compat.extends(
    'plugin:react/recommended',
    'prettier',
    'eslint:recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    plugins: {
      react,
      import: fixupPluginRules(_import),
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.node,
      },
      parser: tsParser,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-filename-extension': 0,
      'no-underscore-dangle': 0,
      'func-names': 0,
      'no-use-before-define': 0,
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],
      'react/react-in-jsx-scope': 0,
    },
  },
  // Cypress
  pluginCypress.configs.recommended,
];
