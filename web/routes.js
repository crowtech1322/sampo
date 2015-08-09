/*
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
}*/

module.exports = function (app, config) {

    app.get('/info', function(req, res) {
        res.json({
            version: config.version
        });
    });

    // TODO extract common render method with error handling
    app.get('/', function(req, res) {
        res.render('index', {}, function (err, html) {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
            }
            else res.end(html);
        });
    });

    app.get('/imprint', function(req, res) {
        res.render('imprint', {}, function (err, html) {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
            }
            else res.end(html);
        });
    });

    app.get('/detail', function(req, res) {
        res.render('detail', {}, function (err, html) {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
            }
            else res.end(html);
        });
    });

    app.get('/yt/:youtubeId', function(req, res) {

        var youtubeId = req.params.youtubeId;

        res.render('video', { youtubeId: youtubeId}, function (err, html) {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
            }
            else res.end(html);
        });
    });

};
