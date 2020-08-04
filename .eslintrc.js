module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'react',
      'prettier',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'prettier',
      'prettier/@typescript-eslint',
      'prettier/react',
    ],
    rules: {
        // suppress errors for missing 'import React' in files
       'react/react-in-jsx-scope': 'off',
      }
  };