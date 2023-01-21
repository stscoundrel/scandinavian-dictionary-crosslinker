module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'jest',
    '@typescript-eslint',
  ],
  env: {
    node: true,
    es6: true,
    'jest/globals': true,
  },
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': ['error'],
  },
};
