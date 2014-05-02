'use strict';

var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var Player = requireHelper('models/player');

var expect = require('chai').expect;
describe('Player', function() {
  describe('contructor', function() {
    var player1 = new Player();
    it('should create a new Player with a number ID', function() {      
      expect(player1.id).to.be.a('number');
    });
    it('shoud create the next Player with a different ID', function() {
      var player2 = new Player();
      expect(player2.id).to.not.equals(player1.id);
    });
  });
});