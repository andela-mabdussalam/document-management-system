import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    debug: true,
    devtool: 'source-map',
    entry: {
        bundle: path.resolve(__dirname, 'client/src/index'),
    },
    target: 'web',
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
        }
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Hammer: 'hammerjs/hammer'
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client'),
                    path.join(__dirname, 'server')],
                loaders: ['babel-loader']

            }, {
                test: /(\.css)$/,
                loader: ExtractTextPlugin.extract('css?sourceMap')
            },  {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }, {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                },
            }, {
                test: /materialize-css\/bin\//,
                loader: 'imports?jQuery=jquery,$=jquery,hammerjs'
            },
                  {
        test: /\.json$/,
        loader: "json-loader",
      },
        ]
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
};
