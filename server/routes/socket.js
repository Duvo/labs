'use strict';

var players = require('../controllers/players');

module.exports = function(socket) {
  socket.on('newPlayer', function(msg, fn) {
    players.newPlayer(socket, fn);

    socket.on('changeGrid', function(grid) {
      players.changeGrid(socket, grid);
    });
  });
};


