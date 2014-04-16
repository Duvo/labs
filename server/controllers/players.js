'use strict';

var Player = require('../models/player');

var players = [];

exports.newPlayer = function(socket, fn) {
  var player = new Player();
  socket.player = player;

  console.log('PLAYER ' + player.id + ' CONNECTED');
  fn({player: player, others: players});

  players.push(player);

  socket.broadcast.emit('playerJoin', player.id);
};

exports.changeGrid = function(socket, grid) {
  var player = socket.player;
  player.grid = grid;
  socket.broadcast.emit(player.id, player.grid);
};