var webpack = require('webpack'),
    path = require('path');

module.exports = {
    context: path.join(__dirname, '..', 'src'),
    entry: './index.js',
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'vo.min.js',
        library: 'vo',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'eslint-loader']
            }
        ]
    }
};