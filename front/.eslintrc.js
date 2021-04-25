module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off', // next.js에서는 React를 자동으로 주입해주기 때문에 import하지 않아도 됨.
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Retrun type이 유추되는 경우 Return type을 꼭 명시할 필요는 없음.
  },
};
