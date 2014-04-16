'use strict';

var Player = require('../server/models/player.js');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit
 
 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

module.exports = {
  setUp: function(done) {
    // setup here
    done();
  },
  createPlayer: function(test) {
    test.expect(2);
    // tests here
    var player1 = new Player();
    var player2 = new Player();
    test.equal(player1.id, 1);
    test.equal(player2.id, 2);
    test.done();
  },
};
