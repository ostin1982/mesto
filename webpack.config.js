const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');



module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    mode: 'development',
    devServer: {
        open: true,
        compress: true,

    },
    
    devtool: 'inline-source-map',
    

        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.(png|svg|jpg|gif|woff2)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                },
                {
                    test: /\.css$/,
                    loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                    ],
                },  
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
}