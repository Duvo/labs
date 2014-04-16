'use strict';

function Game() {
  this.id = Game.newId();
  this.grid = Game.coolLetters;
}

Game.randomLetter = function() {
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alpha.charAt(Math.floor(Math.random() * alpha.length));
};

Game.randomLetters = function(height, width) {
  var grid = [];
  for (var i = 0; i < width; i++) {
    grid[i] = [];
    for (var j = 0; j < height; j++) {
      grid[i][j] = Game.randomLetter();
    }
  }
  return grid;
};

Game.coolLetters = [
  ['B', 'O', 'N', 'D', 'T'],
  ['A', 'G', 'J', 'I', 'U'],
  ['B', 'A', 'O', 'R', 'O'],
  ['A', 'R', 'U', 'A', 'T'],
  ['T', 'R', 'E', 'T', 'O']
];

Game._autoInc = 1;
Game.newId = function() {
  return Game._autoInc++;
};

module.exports = Game;
