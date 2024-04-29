module.exports = {
  root: true,
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: [
    '**/*/*.js',
    '*.js',
    '*.svg',
    '*.json',
    '*.png',
    'package.json',
    'package-lock.json',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'react',
    'prettier',
    'react-hooks',
    '@typescript-eslint',
    'unused-imports',
    'eslint-plugin-import-helpers',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.d.ts',
          '.web.js',
          '.web.jsx',
          '.web.ts',
          '.web.tsx',
          '.css',
        ],
      },
    },
  },
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        groups: [
          '/^react+$/',
          ['/^react-?/', 'module'],
          '/^(shared|services|routes|assets|screens|context|theme)/?.*/',
          ['parent', 'sibling'],
          '/types/',
          '/styles/',
        ],
        newlinesBetween: 'always',
        alphabetize: {order: 'asc', ignoreCase: true},
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'import/extensions': [
      'error',
      'never',
      {
        svg: 'always',
        model: 'always',
        style: 'always',
        png: 'always',
        jpg: 'always',
        json: 'always',
        constant: 'always',
      },
    ],
    'react/function-component-definition': [
      2,
      {namedComponents: 'arrow-function'},
    ],
    'max-len': ['error', 120],
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
    'import/no-extraneous-dependencies': 2,
    'import/no-named-as-default-member': 2,
    'import/order': 0,
    'import/no-duplicates': 2,
    'import/no-useless-path-segments': 2,
    'import/no-cycle': 2,
    'import/prefer-default-export': 0,
    'import/no-anonymous-default-export': 0,
    'import/named': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default': 0,
    'import/no-unused-modules': 0,
    'import/no-deprecated': 0,
    '@typescript-eslint/indent': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': ['warn', {additionalHooks: '(useMemoOne)'}],
    'react/jsx-props-no-spreading': 0,
    camelcase: 2,
    'prefer-destructuring': 2,
    'no-nested-ternary': 2,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
