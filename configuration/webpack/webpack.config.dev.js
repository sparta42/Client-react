const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
    mode: 'development',

    devServer: {
        historyApiFallback: true,
        port: 4000,
        proxy: {
            '/sparta': {
                    target: 'http://3.35.151.102:8080'
                }
            },
        },
});
