/*
 * labs
 * https://github.com/Duvo/labs
 *
 * Copyright (c) 2014 Noémi Salaün
 * Licensed under the MIT license.
 */

'use strict';

var config = require('./config');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(config.port);

/*app.get('/', function (req, res) {
  res.sendfile(config.root + '/public/pouet.html');
});*/

app.use(express.static(config.root + '/public/'));

io.sockets.on('connection', function(socket) {
  require('./routes/socket')(io.sockets, socket);
});