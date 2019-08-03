'use strict';

// @ts-check

class ModifyHtmlWebpackPlugin {
    constructor(options) {
        this.lang = options.lang;
        this.noscriptMessage = options.noscriptMessage;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('ModifyHtmlWebpackPlugin', compilation => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap('ModifyHtmlWebpackPlugin', ({ html }) => {
                return ({
                    html: html
                        .replace('<html>', `<html lang="${this.lang}">`)
                        .replace('<body>', `<body>\n<noscript>${this.noscriptMessage}</noscript>`)
                });
            });
        });
    }
}

module.exports = ModifyHtmlWebpackPlugin;