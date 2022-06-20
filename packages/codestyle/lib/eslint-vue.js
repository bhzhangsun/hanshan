module.exports = {
  extends: ['plugin:vue/essential', '@vue/prettier', 'plugin:import/recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rulse: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
