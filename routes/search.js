require('dotenv').load();
var express = require('express');
var router = express.Router();

var YouTube = require('youtube-node');
var youtube = new YouTube();
youtube.setKey(process.env.YOUTUBE_DEV_KEY);

/* GET home page. */
router.get('/', function(req, res, next) {
    var q = req.query.q;

    var room = req.session.room;

    youtube.search(q, 5, function(error, result) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        }else {
            //probably a good idea to massage this data into a format fit fot the app?
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result, null, 2));
        }
    });

});

module.exports = router;
