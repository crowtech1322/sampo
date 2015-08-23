var request = require('superagent');
var agent = request.agent();

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
        var ytKey = config.youtubeApiKey;

        // TODO: optimization cache tile and description e.g. in Redis
        agent.get('https://www.googleapis.com/youtube/v3/videos?id=' + youtubeId + '&key=' + ytKey + '&part=snippet&fields=items(snippet)').end(function (err2, res2) {
            
            if (err2) {
                console.error(err2);
                return res.status(500).json({error: 'Internal Server Error'});
            }

            var videoTitle = res2.body.items[0].snippet.title + ' - IpRaven';
            var videoDescription = res2.body.items[0].snippet.description;

            res.render('video', { youtubeId: youtubeId, videoTitle: videoTitle, videoDescription: videoDescription}, function (err, html) {
            if (err) {
                console.error(err);
                return res.status(500).json({error: 'Internal Server Error'});
            }
            res.end(html);
            });

        });


    });

};
