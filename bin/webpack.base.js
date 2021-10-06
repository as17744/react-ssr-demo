module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react',  ['@babel/preset-env', {
            targets: {
              browsers: ['last 2 versions']
            }
          }]]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", '.jsx'],
    mainFiles: ['index'],
  },
  plugins: []
}
