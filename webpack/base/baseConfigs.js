// @ts-check
const path = require('path')
const slash = require('slash');

const { IgnorePlugin } = require('webpack');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar');
const HappyPack = require('happypack');
const tsImportPluginFactory = require('ts-import-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const InjectStaticWepackPlugin = require('../plugins/InjectStaticWepackPlugin');
const ModifyHtmlWebpackPlugin = require('../plugins/ModifyHtmlWebpackPlugin');

const manifestPath = path.join(process.cwd(), 'static', 'manifest.json');
const manifest = require(manifestPath);

const staticDirName = 'static';
const outputDirName = 'dist';

const staticDir = path.join('/', staticDirName, '/');
const outputPath = path.join(process.cwd(), outputDirName, staticDirName);

module.exports = {
    output: {
        publicPath: slash(staticDir),
        path: outputPath
    },
    modules: {
        rules: {
            /** BUILD */
            stylesBuild: {
                test: /\.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=styles']
            },
            typescriptBuild: {
                test: /\.tsx?$/,
                use: 'happypack/loader?id=typescript-build',
                exclude: /node_modules/
            },
            /** DEV */
            stylesDev: {
                test: /\.(css|sass|scss)$/,
                use: ["style-loader", 'happypack/loader?id=styles']
            },
            typescriptDev: {
                test: /\.tsx?$/,
                use: 'happypack/loader?id=typescript-dev',
                exclude: /node_modules/
            }
        }
    },
    plugins: [
        new IgnorePlugin(/^\.\/locale$/, /moment$/),
        new WebpackBar(),
        new HtmlWebpackPlugin({
            inject: 'body',
            title: manifest.name,
            favicon: path.join(staticDirName, 'favicon.ico'),
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'theme-color': manifest.theme_color
            }
        }),
        new ModifyHtmlWebpackPlugin({
            lang: 'vi',
            noscriptMessage: 'Javascript is not enabled, please turn it on to view app content!'
        }),
        new InjectStaticWepackPlugin({
            staticDir: staticDir
        }),
        new HappyPack({
            id: 'styles',
            threads: 2,
            loaders: [
                {
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }),
        new HappyPack({
            id: 'typescript-build',
            threads: 2,
            loaders: [
                {
                    path: 'ts-loader',
                    query: { happyPackMode: true },
                },
                {
                    path: 'ts-nameof-loader'
                }
            ]
        }),
        new HappyPack({
            id: 'typescript-dev',
            threads: 2,
            loaders: [
                {
                    path: 'ts-loader',
                    query: { happyPackMode: true },
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                        getCustomTransformers: () => ({
                            before: [tsImportPluginFactory( /** options */)]
                        })
                    }
                },
                {
                    path: 'ts-nameof-loader'
                }
            ]
        })
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    }
}