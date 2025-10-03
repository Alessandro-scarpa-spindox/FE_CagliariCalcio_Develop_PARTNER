module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    semi: 'off',
    curly: 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'warn',
    'import/order': 'error',
    'import/no-duplicates': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
}
