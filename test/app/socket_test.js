'use strict';

var requireHelper = require(process.env.TEST_DIR + '/require_helper');
requireHelper('server.js');
var io = require('socket.io-client');
var expect = require('chai').expect;

var url = 'http://localhost:' + process.env.PORT;
var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Sockets', function() {
  var client1, client2;
  before(function(done) {
    this.timeout(5000);
    client1 = io.connect(url, options);
    client1.on('connect', function() {
      client2 = io.connect(url, options);
      client2.on('connect', function() {
        done();
      });
    });
  });

  after(function(done) {
    client1.disconnect();
    client2.disconnect();
    done();
  });

  it('shoud handle grid change', function(done) {
    client1.emit('newPlayer', null, function(player1) {
      expect(player1.id).to.be.a('number');

      client2.emit('newPlayer', null, function(player2) {
        expect(player2.id).to.not.equals(player1.id);

        client2.on('changeGrid', function(grid) {
          console.log('grid');
          expect(grid.player.id).to.equals(player1.id);
          done();
        });

        client1.emit('getGame', null, function(game) {
          expect(game.grid).to.have.length(5);
          expect(game.grid[0]).to.have.length(5);
          expect(game.grid[0][0]).to.equals('B');

          client2.emit('getGame', null, function() {
            client1.emit('changeGrid', game.grid);
          });
        });
      });
    });
  });
});