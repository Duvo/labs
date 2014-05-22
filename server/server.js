/*
 * labs
 * https://github.com/Duvo/labs
 *
 * Copyright (c) 2014 Noémi Salaün
 * Licensed under the MIT license.
 */

'use strict';

global.CONFIG = require('./config');

var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var realTime = require('./controllers/real-time');

io.set('log level', process.env.SOCKET_LOG);

app.set('views', global.CONFIG.viewsPath);
app.set('view engine', 'jade');
app.use(express.static(global.CONFIG.root + '/public'));
app.use('/bower', express.static(global.CONFIG.root + '/bower_components'));

server.listen(process.env.PORT, function() {
  console.log('Listening on port %d', server.address().port);
});

require('./routes/index')(app);

var frequency = 10; // ticks/s
realTime.initialize(frequency, io.sockets);
realTime.start();
if (process.env.ENV === 'TEST') {
  realTime.stop();
}

io.sockets.on('connection', function(socket) {
  require('./routes/socket')(socket);
  require('./routes/real-time')(socket);
});