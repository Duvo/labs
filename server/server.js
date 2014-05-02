/*
 * labs
 * https://github.com/Duvo/labs
 *
 * Copyright (c) 2014 Noémi Salaün
 * Licensed under the MIT license.
 */

'use strict';

switch (process.env.EN) {
  /* istanbul ignore next */
  case 'PROD':
    global.CONFIG = require('./config.prod');
    break;
  default:
    global.CONFIG = require('./config.dev');
}

var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.set('log level', global.CONFIG.socketLog);

app.set('views', global.CONFIG.viewsPath);
app.set('view engine', 'jade');
app.use(express.static(global.CONFIG.root + 'public/'));
console.log(global.CONFIG.root + 'public/');

server.listen(process.env.PORT, function() {
  console.log('Listening on port %d', server.address().port);
});

require('./routes/index')(app);

io.sockets.on('connection', function(socket) {
  require('./routes/socket')(socket);
});