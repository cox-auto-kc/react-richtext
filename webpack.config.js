/*eslint-env node */
var path = require('path');

var loaders = [
  {test: /\.js$/, loader: 'babel'},
  {
    test: /\.css$/,
    exclude: /\.global\.css$/,
    loaders: [
      'style?sourceMap',
      'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    ],
  },
  { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [ 'url?limit=10000'] },
  {test: /\.global\.css$/, loader: 'style!raw'},
];

module.exports = [{
  entry: './src/RichTextEditor.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-rte.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {loaders: loaders},
}, {
  entry: './src/demo.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'demo.js',
  },
  module: {loaders: loaders},
}];
