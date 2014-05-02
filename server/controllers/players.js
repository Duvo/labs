'use strict';

var Player = require('../models/player');

var players = {
  newPlayer: function(socket, msg, fn) {
    var player = new Player();
    socket.player = player;
    fn(player);    
  }
};

module.exports = players;