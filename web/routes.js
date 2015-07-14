var BaseError = require('../lib/errors').BaseError;

function render(fn) {
    return function (req, res) {
        fn(req.backend, req, res).then(function (dto) {
            res.json(dto);
        }).catch(BaseError, function (e) {
            res.status(e.status).json(e.dto());
        }).catch(function (e) {
            console.error(e);
            return res.status(500).json(e);
        });
    };
}

module.exports = function (app, config) {

    app.get('/', function(req, res) {
        res.json({
            version: config.version
        });
    });

};
