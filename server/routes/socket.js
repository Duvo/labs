'use strict';

var players = require('../controllers/players');
var games = require('../controllers/games');

module.exports = function(socket) {
  socket.on('newPlayer', function(msg, fn) {
    players.newPlayer(socket, msg, fn);
  });

  socket.on('getGame', function(msg, fn) {
    games.getGame(socket, msg, fn);
  });
  
  socket.on('changeGrid', function(msg) {
    games.changeGrid(socket, msg);
  });
};


