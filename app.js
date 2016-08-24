var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var server = require('http').createServer();
var url = require('url');
var webSocketServer = require('ws').Server;
var wss = new webSocketServer({ server: server });
var wsPort = 4080;
var querystring = require('querystring');
wss.on('connection', (ws) => {
  var location = url.parse(ws.upgradeReq.url, true);

  ws.on('message', (message) => {
    escape
    var senderName = querystring.unescape(ws.upgradeReq.headers['sec-websocket-protocol']);
    wss.clients.forEach((client) => {
      client.send(senderName + ': ' + message);
    });
  });

  ws.send('你已连接至聊天室，开始聊天吧。');
});
server.on('request', app);
server.listen(wsPort, () => {
  console.log('ws listening on ' + server.address().port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
