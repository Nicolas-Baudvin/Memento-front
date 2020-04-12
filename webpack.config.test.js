const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const devConfig = require('./webpack.config.js');

module.exports = merge(devConfig, {
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      // Pas la peine de compiler les styles pour les tests.
      {
        test: /\.(sa|sc|c)ss$/,
        loader: 'null-loader'
      }
    ]
  },
});
