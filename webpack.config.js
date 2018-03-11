let path = require( 'path' );
let ExtractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
let CleanWebpackPlugin = require( 'clean-webpack-plugin' );
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack')
const extractSass = new ExtractTextWebpackPlugin({
    filename: 'main.css'
});
module.exports = {
    entry: './frontend/src/app/app.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'app.bundle.js'
        // publicPath: 'dist'
    },
    resolve:{
        alias : {
            'common': path.join(__dirname, 'frontend/src/common'),
            'assets': path.join(__dirname, 'frontend/assets')
          },
          modules:[
            path.resolve (__dirname, 'frontend/src'),
            path.resolve (__dirname, 'node_modules'), 
            'node_modules'
          ]
    },
    module: {
        rules: [ 
        //     {
        //     test: /\.(scss|css)$/,
        //     use:extractPlugin.extract({
        //         use:['css-loader',{
        //             options: {
        //                 includePaths : [ path.resolve(__dirname, 'frontend/src/assets/stylesheets') ],
        //                 sourceMap: true
        //               },
        //            loader: 'sass-loader'
        //         }
        //         ]
        //     })
        //     // use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        // }
        {
            test: /\.scss$/,
            use: [
              { loader : 'style-loader' },
              { loader : 'css-loader' },
              {
                loader : 'sass-loader',
                options: {
                  includePaths : [ path.resolve(__dirname, 'frontend/src/common/stylesheets') ],
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              { loader : 'style-loader' },
              { loader : 'css-loader' },
            ]
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
            test: /\.html$/,
            use : [
              {
                loader : 'html-loader',
                options : {
                  attrs : ['img:src', 'img:ng-src', 'img:fallback-src']
                }
              }
            ]
          },
         ]
    },
    plugins: [
        extractSass,
        new CleanWebpackPlugin( [ 'dist' ] ),
        new HtmlWebpackPlugin( {
            template:'./frontend/index.html'
        } ),
        new webpack.ProvidePlugin({
            qrcode: 'qrcode-generator',
          })

    ]
}

