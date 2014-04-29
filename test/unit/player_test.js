'use strict';

var requireHelper = require('../require_helper');
var Player = requireHelper('models/player');

var assert = require("assert");
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      var player = new Player();
      assert.equal(player.id, 1);
      assert.equal(-1, [1, 2, 3].indexOf(0));
    });
  });
});