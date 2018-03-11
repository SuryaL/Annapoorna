let path = require( 'path' );
let ExtractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
let CleanWebpackPlugin = require( 'clean-webpack-plugin' );
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack')
let extractPlugin = new ExtractTextWebpackPlugin({
    filename: 'main.css'
})
module.exports = {
    entry: './src/app/app.js',
    output: {
        path: path.resolve( __dirname, 'server/dist' ),
        filename: 'app.bundle.js'
        // publicPath: 'dist'
    },
    module: {
        rules: [ {
            test: /\.(scss|css)$/,
            use:extractPlugin.extract({
                use:['css-loader','sass-loader']
            })
            // use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [ 'ng-annotate-loader', {
                loader: 'babel-loader',
                options: {
                    presets: [ 'es2015' ]
                }
            } ]
        }, {
            test: /\.(eot|woff|woff2|otf|ttf|svg|ico|png|jpe?g|gif)(\?\S*)?$/,
            use: [ {
                loader: 'file-loader',
                options:{
                    name:'[name].[ext]',
                    outputPath:'',
                    publicPath:''
                }
            } ]
        },
        {
            test:/\.html$/,
            use: 'html-loader'
        }
         ]
    },
    plugins: [
        extractPlugin,
        new CleanWebpackPlugin( [ 'dist' ] ),
        new HtmlWebpackPlugin( {
            template:'./index.html'
        } ),
        new webpack.ProvidePlugin({
            qrcode: 'qrcode-generator',
          })

    ]
}

