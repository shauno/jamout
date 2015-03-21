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
            //res.write(JSON.stringify(error));
            res.end();
        }else {
            //console.log(room);
            res.write(JSON.stringify(result, null, 2));
            res.end();
        }
    });

});

module.exports = router;
