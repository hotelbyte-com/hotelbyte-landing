import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'src/data/generated'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // Story bodies are ~420 KB; a value import of dailyStories.ts anywhere in
    // client code puts them back in a page chunk. Use src/data/dailyStoryLoader.ts
    // (one chunk per story) or the generated list/latest/keys instead.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/prerender-entry.tsx'],
    rules: {
      '@typescript-eslint/no-restricted-imports': ['error', {
        patterns: [{ group: ['**/data/dailyStories'], allowTypeImports: true, message: 'Do not import story bodies into client code; see src/data/dailyStoryLoader.ts.' }],
      }],
    },
  }
);
