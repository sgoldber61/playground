module.exports = {
  watch: true,
  target: 'electron-renderer',
  entry: './app/index.js',
  output: {
    path: __dirname + '/build',
    publicPath: 'build/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?(c|a)ss$/,
        use: ['css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
