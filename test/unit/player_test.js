'use strict';

var requireHelper = require('../require_helper');
var Player = requireHelper('models/player');

var expect = require('chai').expect;
describe('Player', function() {
  describe('contructor', function() {
    it('should create a new Player with ID equals 1', function() {
      var player = new Player();
      expect(player.id).to.equals(1);
    });
  });
});