// @ts-check

const getBuildConfig = require('./base/getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        VERSION_HASH: '$Id$',
        SUB_ENV: 'production',
        API_ENTRY: 'http://admin.mfurniture.vn',
        SENTRY_ID: 'https://802c5412246d42258a4b295c98b0954a@sentry.io/1520601',
    },
    sourceMap: true,
    compression: true,
    gaID: 'UA-135627950-3'
})