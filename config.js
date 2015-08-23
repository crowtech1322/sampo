var pjson = require('./package.json');
var env = process.env;

var config = {
    name: pjson.name,
    version: pjson.version,

    port: env.PORT || 8080,
    youtubeApiKey: env.YOUTUPE_API_KEY
};

module.exports = config;
