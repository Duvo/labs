'use strict';

var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var Game = requireHelper('models/game');

var expect = require('chai').expect;
describe('Game', function() {
  describe('contructor', function() {
    var game1 = new Game();
    it('should create a new Game with ID equals 1', function() {      
      expect(game1.id).to.equals(1);
    });
    it('should create a new Game with a specific grid', function() {
      expect(game1.grid).to.have.length(5);
      expect(game1.grid[0]).to.have.length(5);
      expect(game1.grid[0][0]).to.equals('B');
    });
    it('shoud create the next Game with a different ID', function() {
      var game2 = new Game();
      expect(game2.id).to.not.equals(game1.id);
    });
  });
});