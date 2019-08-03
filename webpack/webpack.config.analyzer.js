// @type-check

const getBuildConfig = require('./base/getBuildConfigs');

module.exports = getBuildConfig({
    sourceMap: false,
    compression: false,
    analyzer: true
})