var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

require('dotenv').config();

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var apps = require('./routes/apps');

var app = express();

// check connect mongodb
var mongoUser = process.env.MONGO_DB_USER;
var mongoPass = process.env.MONGO_DB_PASS;
var mongoHost = process.env.MONGO_DB_HOST;

var mongoUrl = "mongodb://"+mongoUser+":"+mongoPass+"@ds147599.mlab.com:47599/"+mongoHost+"";
mongoose.connect(mongoUrl, {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
// view edb.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/apps', apps);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
