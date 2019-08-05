// @ts-check
'use strict';

const path = require('path');
const slash = require('slash');

const getAllFilePathInDir = require('../utils/getAllFilePathInDir');


class InjectStaticWepackPlugin {
    constructor(options) {
        this.publicPath = path.join(process.cwd(), options.staticDir);
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('InjectStaticWepackPlugin', compilation => {
            const baseDir = path.dirname(this.publicPath);

            const staticFiles = getAllFilePathInDir(this.publicPath);
            const cssFiles = staticFiles.filter(file => file.endsWith('.css'))

            const cssInjectPaths = [];
            for (const cssFile of cssFiles) {
                const cssFilePath = path.relative(baseDir, cssFile);
                const injectFile = path.join('/', cssFilePath)

                cssInjectPaths.push(
                    slash(injectFile)
                );
            }
            
            compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap('InjectStaticWepackPlugin', ({ assets }) => {
                for (const cssInjectPath of cssInjectPaths) {
                    assets.css.unshift(cssInjectPath)
                };

                console.log(assets.css)
            });
        });
    }
}

module.exports = InjectStaticWepackPlugin;