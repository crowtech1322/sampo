var pjson = require('./package.json');
var env = process.env;

var config = {
    name: pjson.name,
    version: pjson.version,

    port: env.PORT || 8080,
};

module.exports = config;
