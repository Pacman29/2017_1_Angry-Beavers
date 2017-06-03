/**
 * Created by ed on 06.04.17.
 */

'use strict';

const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: './app/main.js',
    output: {
        path: __dirname,
        filename: './public/static/bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.(s)?css$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options:
                            {
                                minimize: true
                            }
                    },
                    {
                        loader: "sass-loader",
                        options :
                            {
                                minimize: true
                            }
                    }
                    ]
            },
            {
                test: /\.pug$/,
                loaders: ['pug-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
