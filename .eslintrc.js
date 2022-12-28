module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-useless-return': 'off',
    'no-unneeded-ternary': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'react/display-name': 'off',
  },
};
