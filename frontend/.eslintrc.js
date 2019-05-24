module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'standard',
    'plugin:vue/recommended'
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
    'vue'
  ],
  'rules': {
    'vue/require-valid-default-prop': 'off',
    'space-before-function-paren': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-newline': 'off',

    /*'vue/max-attributes-per-line': [1, {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }]*/
  }
}
