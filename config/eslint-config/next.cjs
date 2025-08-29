/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@rocketseat/eslint-config/next'],
  plugins: ['simple-import-sort', '@stylistic'],
  rules: {
    'simple-import-sort/imports': 'error',
    '@stylistic/jsx-sort-props': 'error',
  },
}
