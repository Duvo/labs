'use strict';

var Game = require('../models/game');

var games = {
  games: [],
  getGame: function(socket, msg, fn) {
    if (!games[0]) {
      games[0] = new Game();
    }
    var game = games[0];
    socket.game = game;
    socket.join(game.id);
    fn(game);
  },
  changeGrid: function(socket, grid) {
    var data = {
      grid: grid,
      player: socket.player
    };
    socket.broadcast.to(socket.game.id).emit('changeGrid', data);
  }
};

module.exports = games;