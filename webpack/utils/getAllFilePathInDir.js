// @ts-check

const fs = require('fs');
const path = require('path');

/**
 * @param {string} dir
 * @param {string[]} [filelist]
 */
function getAllFilePathInDir(dir, filelist) {
    const files = fs.readdirSync(dir);

    filelist = filelist || [];

    files.forEach(function (file) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = getAllFilePathInDir(
                filePath,
                filelist
            );
        }
        else {
            filelist.push(filePath);
        }
    });

    return filelist;
};

module.exports = getAllFilePathInDir;