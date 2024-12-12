module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic/ts'
  ],
  rules: {
    '@stylistic/ts/indent': [2, 2],
    '@stylistic/ts/key-spacing': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        'varsIgnorePattern': '_',
        args: 'after-used',
        'argsIgnorePattern': '_'
      }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'consistent-return': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-unresolved': 'off',
    'no-await-in-loop': 'off',
    'no-return-assign': 'off',
    'no-shadow': 'off',
    'no-unused-vars': ['off'],
    'no-var': 'off',
    'promise/catch-or-return': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'semi': ['error', 'never'],
    'vars-on-top': 'off'
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts')
      },
      typescript: {}
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  }
}
