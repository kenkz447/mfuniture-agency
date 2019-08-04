// @ts-check

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const getWebpackConfig = require('./webpack/webpack.config.dev')
const checkPortTaken = require('./webpack/utils/checkPortTaken')

const defaultPort = process.env.npm_package_config_port;
const defaultHost = process.env.npm_package_config_host;

/**
 * @param {number} port
 */
function run(port) {
    const webpackConfig = getWebpackConfig({
        host: defaultHost,
        port: port,
        defineOptions: {
            FILE_HOST: JSON.stringify('http://admin.mfurniture.vn'),
            // API_ENTRY: JSON.stringify('http://admin.mfurniture.vn'),
            API_ENTRY: JSON.stringify('http://localhost:1337'),
            SUB_ENV: JSON.stringify('dev')
        }
    })

    // @ts-ignore
    const compiler = webpack(webpackConfig);

    const devServerConfig = {
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true,
            chunks: false,
        },
        overlay: true
    }

    const devServer = new WebpackDevServer(compiler, devServerConfig);

    /**
     * @param {Error} err
     */
    function onload(err) {
        if (err) {
            console.log(err);
        }
        console.log(`Listening at http://${defaultHost}:${port}/`);
    }

    devServer.listen(port, defaultHost, onload);
}

/**
 * @param {number} port
 */
function tryRunOnPort(port) {
    checkPortTaken(
        port,
        (isTaken) => {
            if (isTaken) {
                console.warn(`Port ${port} ready taken!`);
                return void tryRunOnPort(port + 1);
            }

            run(port);
        }
    );
}

tryRunOnPort(+defaultPort);
