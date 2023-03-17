module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    "@typescript-eslint"
  ],
  rules: {
    // For Coding
    'quotes': ['error', 'single'], // "" => ''
    'semi': ['error', 'never'], // semicolon
    'no-empty': 'error', // No empty in bracket
    'indent': [ 'error', 2, { 'SwitchCase' : 1 } ],
    'comma-dangle': ['error', 'only-multiline'], // Ex) { a, b, }
    'object-curly-spacing': ['error', 'always'], // Space between { },
    'no-multi-spaces': 'error', // Ex) var a =  1 => var a = 1
    'no-unused-vars': 'off',
    'space-before-blocks': 'error', // Ex) if (a){ => if (a) {
    'no-trailing-spaces': 'error', // No trailing spaces important!!
    'max-len': ['error', { 'code': 150, 'ignorePattern': 'd="([\\s\\S]*?)"' }], // limit max length
    // For Typescript
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // For React
    'react/react-in-jsx-scope': 'off',
  }
}
