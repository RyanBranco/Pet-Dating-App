var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var favicon = require("serve-favicon")
var methodOverride = require('method-override');

//require secrets
require('dotenv').config();

var app = express();

//require database
require('./config/database');

//configure the passport module
require('./config/passport');

var indexRouter = require('./routes/index');
var matcherRouter = require('./routes/matcher');
var userRouter = require('./routes/user');
var postRouter = require('./routes/post');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(cookieParser());
app.use(session({
  secret: "r62ya3n",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//mount all routes here
app.use('/', indexRouter);
app.use('/pwalanding', indexRouter);
app.use('/matcher', matcherRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
