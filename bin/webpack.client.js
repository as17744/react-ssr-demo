const path = require('path');
const deepmerge = require('deepmerge');
const baseConfig = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfig = deepmerge(baseConfig, {
  entry: path.resolve(process.cwd(), 'src/entryClient.jsx'),
  output: {
    filename: 'index.js',
    path: path.resolve(process.cwd(), 'dist/client')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
});

webpackConfig.plugins = [
  new MiniCssExtractPlugin(),
];

module.exports = webpackConfig;
