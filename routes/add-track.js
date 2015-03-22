require('dotenv').load();
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

    res.end();
    //var room = req.session.room;
});

module.exports = router;
