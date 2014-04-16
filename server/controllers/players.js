'use strict';

var Player = require('../models/player');

var players = {
  newPlayer: function(socket, msg, fn) {
    var player = new Player();
    console.log('PLAYER ' + player.id + ' CONNECTED');
    socket.player = player;
    fn(player);    
  }
};

module.exports = players;