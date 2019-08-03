// @ts-check

const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const WebpackGtagPlugin = require('webpack-gtag-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseBuildConfig = require('./baseConfigs');

function makeDefinitions(definitionValues) {
    return Object.keys(definitionValues).reduce(
        (definitionObj, key) => Object.assign(definitionObj, { [key]: JSON.stringify(definitionValues[key]) }), {})
}

module.exports = function getBuildConfig(options) {
    const plugins = [
        ...baseBuildConfig.plugins
    ];

    const definitions = options.definitions && makeDefinitions(options.definitions)
    if (definitions) {
        plugins.push(new webpack.DefinePlugin(definitions));
    }

    if (options.analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    plugins.push(new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true
    }));

    plugins.push(new webpack.NamedChunksPlugin());

    plugins.push(new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
        chunkFilename: "[id].[chunkhash].css"
    }));

    if (options.sourceMap) {
        plugins.push(new webpack.SourceMapDevToolPlugin({
            filename: '[name].[chunkhash].js.map',
            include: [/app/]
        }));
    }

    plugins.push(new InlineManifestWebpackPlugin())

    if (options.gaID) {
        plugins.push(new WebpackGtagPlugin({ id: options.gaID }));
    }

    plugins.push(new CopyWebpackPlugin([
        path.join(process.cwd(), baseBuildConfig.output.publicPath)
    ]));

    if (options.compression) {
        plugins.push(new CompressionPlugin({
            test: /\.(js$|css)/,
            exclude: /\.map/,
            deleteOriginalAssets: false,
            cache: true
        }));
    }

    plugins.push(new WorkboxPlugin.GenerateSW({
        navigateFallback: '/static/index.html',
        runtimeCaching: [
            {
                urlPattern: /\.(?:png|gif|jpg|svg|tff|otf|woff|woff2|eot)$/g,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'runtimeCachingAssets',
                    expiration: {
                        maxAgeSeconds: 30 * 24 * 60 * 60
                    }
                }
            },
            {
                urlPattern: /\.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'runtimeCaching',
                    expiration: {
                        maxAgeSeconds: 24 * 60 * 60
                    }
                }
            }
        ],
        exclude: [/runtime\.(.*)\.js$/],
        clientsClaim: true,
        skipWaiting: true
    }));

    return ({
        mode: 'production',
        performance: {
            hints: false
        },
        stats: {
            colors: true,
            entrypoints: false,
            children: false,
            modules: false,
            cached: false,
            cachedAssets: false,
            chunks: false,
            chunkModules: false,
            chunkOrigins: false
        },
        entry: {
            app: './src/index'
        },
        output: {
            ...baseBuildConfig.output,
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js'
        },
        optimization: {
            concatenateModules: true,
            noEmitOnErrors: true,
            namedModules: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    sourceMap: options.sourceMap,
                    parallel: true
                }),
                new OptimizeCssAssetsPlugin({})
            ],
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'all',
                        maxSize: 2440000,
                        enforce: true
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
        },
        plugins: plugins,
        module: {
            rules: [
                baseBuildConfig.modules.rules.stylesBuild,
                baseBuildConfig.modules.rules.typescriptBuild
            ]
        },
        resolve: {
            ...baseBuildConfig.resolve,
            alias: options.alias
        }
    })
}