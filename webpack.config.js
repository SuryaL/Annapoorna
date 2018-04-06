let path = require('path');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let yargs = require('yargs');
let env = require('./env');
// let importer = require("node-sass-importer");

let argv = yargs
    .boolean("disableclean")
    .argv;

let plugins = [
    new ExtractTextWebpackPlugin({
        filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
        template: './frontend/index.html'
    }),
    new webpack.DefinePlugin({
        'ENV': JSON.stringify({
            'url': env.base_url + ':' + env.port,
            'API_URL': env.base_url + ':' + env.port + (env.base_api_path || ''),
            'FACEBOOK_CLIENT_ID': env.secret_configs.FACEBOOK_CLIENT_ID
        })
    })
]

if(argv.disableclean) {
    plugins.unshift(new CleanWebpackPlugin(['dist']))
}

module.exports = {
    entry: './frontend/src/app/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
        // publicPath: 'dist'
    },
    resolve: {
        alias: {
            'common': path.join(__dirname, 'frontend/src/common'),
            'assets': path.join(__dirname, 'frontend/assets')
        },
        modules: [
            path.resolve(__dirname, 'frontend/src'),
            path.resolve(__dirname, 'node_modules'),
            'node_modules'
        ]
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, 'frontend/src/common/stylesheets')],
                            sourceMap: true,
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['ng-annotate-loader', {
                    loader: 'babel-loader',

                }]
            }, {
                test: /\.(eot|woff|woff2|otf|ttf|svg|ico|png|jpe?g|gif)(\?\S*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '',
                        publicPath: ''
                    }
                }]
            }, {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['link:href','img:src', 'img:ng-src', 'img:fallback-src']
                    }
                }]
            },
        ]
    },
    plugins,
}