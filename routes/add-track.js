require('dotenv').load();
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    //req.session.tracks
    req.session.room.tracks[req.session.room.tracks.length] = req.body.track;
    req.db.collection('rooms').save(req.session.room);

    res.end();
});

module.exports = router;
