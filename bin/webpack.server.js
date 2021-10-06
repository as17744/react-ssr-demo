const deepmerge = require('deepmerge');
const path = require('path');
const baseConfig = require('./webpack.base');

module.exports = deepmerge(baseConfig, {
  target: 'node12.18',
  entry: path.resolve(process.cwd(), 'src/entryServer.jsx'),
  output: {
    filename: 'server.js',
    path: path.resolve(process.cwd(), 'dist/server'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportOnlyLocals: true
              }
            }
          }
        ]
      }
    ]
  }
});
