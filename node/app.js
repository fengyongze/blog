var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var hbs = require('hbs');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var template=require('art-template');
var server = require('http').createServer(app);
app.use(bodyParser.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({
  extended:true
}));
template.config('base','');
template.config('extname','.html');
app.engine('.html',template.__express);
app.set('view engine','html');
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/hello',function(req,res,next){
  res.send('Hello,fengyongze');
});
app.get('/', function(req, res, next){
    res.render('default.hbs', {date: new Date()});
});
app.use('/users', users);
app.use('/account',require('./routes/account.js'));
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
