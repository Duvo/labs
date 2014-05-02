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

io.set('log level', process.env.SOCKET_LOG);

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