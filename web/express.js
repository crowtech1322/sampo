var express = require('express');
var path = require('path');
var compression = require('compression');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var app;

var init = function (rootDir, config) {
    config = config || require('../config');

    app = express();

    app.disable('x-powered-by');
    app.use(compression());
    app.use(bodyParser.json());
    app.use(express.static(path.join(rootDir, 'public')));

    require('./routes')(app, config);

    return new Promise(function (fulfill, reject) {
        app = app.listen(config.port, function (err) {
            if (err) return reject('error starting server');
            console.log('Listening on port', config.port);
            return fulfill();
        });
    });

};

var shutdown = function () {
    if (!app) return Promise.resolve();
    return new Promise(function (fulfill, reject) {
        app.close(function (err) {
            if (err) return reject(err);
            fulfill();
        });
    });
};

module.exports = {
    init: init,
    shutdown: shutdown
};
