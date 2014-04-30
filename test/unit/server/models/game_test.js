'use strict';

var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var Game = requireHelper('models/game');

var expect = require('chai').expect;
describe('Game', function() {
  describe('contructor', function() {
    var game = new Game();
    it('should create a new Game with ID equals 1', function() {      
      expect(game.id).to.equals(1);
    });
    it('should create a new Game with a specific grid', function() {
      expect(game.grid).to.have.length(5);
      expect(game.grid[0]).to.have.length(5);
      expect(game.grid[0][0]).to.equals('B');
    });
  });
});