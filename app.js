require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var routes = require('./routes/index');
var facebook = require('./routes/facebook');
var search = require('./routes/search');
var addtrack = require('./routes/add-track');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-mongo-db')(require('mongodb')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    db: process.env.DB_NAME
  })
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.APP_URL + "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var user = {
      displayName: profile.displayName,
      facebook: profile
    };
    done(null, user);
  }
));

//app.use('/', routes);
app.use('/auth', facebook);
app.use('/api/search', search);
app.use('/api/add-track', addtrack);

app.use(express.static(__dirname + '/public'));

// catch 404 to server "static" app for initial page load
app.use(function(req, res, next) {

  if(typeof(req.user) == 'undefined') {
    res.sendFile('/views/login.html', {
      root: __dirname
    });
  }else{
    res.sendFile('/views/app.html', {
      root: __dirname
    });
  }

});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
