import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'error',
      'no-console': ['error', { allow: ['error'] }],
      eqeqeq: 'error',
    },
  },
];

export default config;
