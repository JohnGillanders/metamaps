const config = require('./webpack.config')

config.target = 'node'
config.externals = config.externals.concat([
  'react/lib/ExecutionEnvironment',
  'react/lib/ReactContext',
  'react/addons',
  'react-test-renderer/shallow',
  'react-dom/test-utils',
  'canvas'
])

module.exports = config
