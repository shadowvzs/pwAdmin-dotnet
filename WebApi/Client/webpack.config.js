const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const webpack = require('webpack');
const resolveTsconfigPathsToAlias = require('./resolve-tsconfig-path-to-webpack-alias');
const path = require('path');

const environment = process.env.NODE_ENV;
const nodeEnv = environment
    ? environment.trim()
    : 'development';
const development = nodeEnv === 'development';
const production = nodeEnv === 'production';

const productionPlugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'process.env.JEST_WORKER_ID': undefined,
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[fullhash].css',
        chunkFilename: '[id].[fullhash].css',
    }),
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
    }),
];

/*
    new MiniCssExtractPlugin({
        filename: '[name].[fullhash].css',
        chunkFilename: '[id].[fullhash].css',
    }),
*/
const developmentPlugins = [
    // new ReactRefreshPlugin(),
    new webpack.DefinePlugin({
        __BUNDLE__: `"${process.env.BUNDLE || 'index'}"`,
        'process.env.NODE_ENV': `"${environment || 'development'}"`,
        'process.env.JEST_WORKER_ID': undefined,
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
    //Progress bar
    new ProgressBarPlugin({
        format: `  :msg [:bar] :percent (:elapsed s)`,
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        // favicon: './public/favicon.ico',
        inject: true,
    }),
];

module.exports = {
    mode: development ? 'development' : 'production',

    context: __dirname,
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    bail: true,

    stats: {
        warnings: false,
    },

    // devtool: development ? 'cheap-module-source-map' : 'source-map',

    output: {
        path: path.resolve(__dirname, '../wwwroot'),
        publicPath: 'auto',
        filename: development ? '[name].js' : '[name].[fullhash].js',
    },

    resolve: {
        fallback: {
            "crypto": false,
            "path": false,
            "fs": false,
            "os": false,
            "util": false,
            "module": false,
            "request": false,
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: resolveTsconfigPathsToAlias({
            tsconfigPath: './tsconfig.json', // Using custom path
            webpackConfigBasePath: './', // Using custom path
        }),
    },

    devServer: {
        static: path.resolve(__dirname, '../wwwroot'),
        compress: true,
        // historyApiFallback: {
        //     index: 'index.html'
        // },
        // hot: true,
        host: '0.0.0.0',        
        
    },
    watchOptions: {
        aggregateTimeout: 1000 * 3,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    development ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: false,
                            esModule: false,
                        }
                    },
                    "postcss-loader"
                ],
                include: /src/,
                exclude: /node_modules/,
                sideEffects: true,
            },
        ],
    },

    plugins: production ? productionPlugins : developmentPlugins,

    optimization: production
        ? {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: 4,
                    extractComments: true,
                }),
            ],
        }
        : undefined,
};