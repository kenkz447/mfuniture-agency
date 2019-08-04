// @ts-check

const path = require('path')
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const baseConfigs = require('./base/baseConfigs');

/**
 * @param {{ port: number; host: string; defineOptions: object }} options
 */
module.exports = (options) => {
    const { port, host, defineOptions } = options;

    return {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        entry: [
            `webpack-dev-server/client?http://${host}:${port}`,
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/index',
        ],
        output: {
            publicPath: '/',
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.DefinePlugin(defineOptions),
            new ErrorOverlayPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NamedChunksPlugin(),
            ...baseConfigs.plugins
        ],
        module: {
            rules: [
                baseConfigs.modules.rules.stylesDev,
                baseConfigs.modules.rules.typescriptDev
            ]
        },
        resolve: {
            ...baseConfigs.resolve,
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        }
    }
};