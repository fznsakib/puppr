module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'standard',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'parser': 'babel-eslint',
    'sourceType': 'module'
  },
  'plugins': [
  ],
  'rules': {
    'space-before-function-paren': 'off'
  }
}
