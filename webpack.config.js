const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtactPlugin = require('mini-css-extract-plugin')
const CopyWebPack = require('copy-webpack-plugin')
const CssMiimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js"
    },
    resolve: {
        extensions: [".js"],
        alias:{
            '@images':path.resolve(__dirname,'./src/assets/images'), 
            '@CSS':path.resolve(__dirname,'./src/CSS'), 
            
            

        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtactPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg)/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtactPlugin({
            filename:'./assets/[name].[contenthash].css'
        }),
        new CopyWebPack({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images'
                }
            ]
        })
    ],
    optimization: {

        minimize: true,
        minimizer: [
            new CssMiimizerPlugin(),
            new TerserPlugin(),
        ]

    }


}