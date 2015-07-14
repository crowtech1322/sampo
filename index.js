var config = require('./config');
var express = require('./web/express');

process.on('uncaughtException', function (err) {
    console.error('Uncaught exception!', err);
    console.error(err.stack);
});

express.init(__dirname, config);
