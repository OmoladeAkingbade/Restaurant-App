module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'input'
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'no-console': 'off'
  },
  env: {
    es2021:true,
    node:true
  }
};
