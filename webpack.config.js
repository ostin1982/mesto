const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 


module.exports = {
    entry: './src/pages/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
        overlay: true,
        },
        

        module: {
            rules: [
                {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                        },
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2)$/i,
                    use: [
                    {
                        loader: 'file-loader',
                    },
                    ],
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                    importLoaders: 1,
                            },
                        },
                        'postcss-loader'
                        ],
                },
                ],
        },
    plugins: [
        new HtmlWebpackPlugin({
        template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
    ]
}
