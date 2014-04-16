'use strict';

var players = require('../controllers/players');
var games = require('../controllers/games');

module.exports = function(socket) {
  socket.on('newPlayer', function(msg, fn) {
    console.log('NEW PLAYER');
    players.newPlayer(socket, msg, fn);
  });

  socket.on('getGame', function(msg, fn) {
    console.log('GET GAME');
    games.getGame(socket, msg, fn);
  });
  
  socket.on('changeGrid', function(msg) {
    console.log('CHANGE GRID');
    games.changeGrid(socket, msg);
  });
};


