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
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(global.CONFIG.root + '/public/'));

server.listen(global.CONFIG.port, function() {
  console.log('Listening on port %d', server.address().port);
});

require('./routes/index')(app);

io.sockets.on('connection', function(socket) {
  require('./routes/socket')(socket);
});