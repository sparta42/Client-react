const {merge} = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 4000
    // proxy: '',
  }
});
