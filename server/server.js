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

var maxPlayerId = 1;
var players = [];

io.sockets.on('connection', function(socket) {
  var newPlayer = {id: maxPlayerId++};
  console.log('PLAYER ' + newPlayer.id + ' JOIN THE GAME !!!!!!!!');

  socket.emit('helloPlayer', {
    player: newPlayer,
    others: players
  });
  players.push(newPlayer);

  socket.broadcast.emit('playerJoin', newPlayer.id);
  socket.on(newPlayer.id, function(grid) {
    newPlayer.grid = grid;
    socket.broadcast.emit(newPlayer.id, newPlayer.grid);
  });
});

app.use(express.static(config.root + '/public/'));