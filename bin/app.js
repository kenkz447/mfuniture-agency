'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const publicFolder = path.join(__dirname, 'static');

const getGzipFile = (req, res, next) => {
    const gzFile = req.path + '.gz';
    const fileLocation = path.join(__dirname, gzFile);
    const gzFileExist = fs.existsSync(fileLocation);

    if (gzFileExist) {
        req.url = gzFile;

        if (req._parsedUrl.search) {
            req.url += req._parsedUrl.search;
        }

        res.set('Content-Encoding', 'gzip');
        res.set(
            'Content-Type',
            req.path.endsWith('.css.gz')
                ? 'text/css'
                : 'text/javascript'
        );
    }

    next();
};

app.get('*/service-worker.js', function (req, res) {
    res.set('Service-Worker-Allowed', '/');
    res.sendFile(req.url, { root: __dirname });
});

app.get('*.js', getGzipFile);
app.get('*.css', getGzipFile);

app.use('/static', express.static(publicFolder));

app.use(function (req, res) {
    res.sendFile('index.html', { root: publicFolder });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});