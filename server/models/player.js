'use strict';

function Player() {
  this.id = Player.newId();
}

Player._autoInc = 1;
Player.newId = function() {
  return Player._autoInc++;
};

module.exports = Player;
