'use strict';

function Player() {
  this.id = Player.lastPlayerId++;
}
Player.lastPlayerId = 1;

module.exports = Player;
