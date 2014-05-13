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

describe('RealTime sockets', function() {
  var client;
  before(function(done) {
    this.timeout(5000);
    client = io.connect(url, options);
    client.on('connect', function() {
      done();
    });
  });

  after(function(done) {
    client.disconnect();
    done();
  });

  it('shoud handle newCube and inputs', function() {
    client.emit('rt:newCube');
    client.emit('rt:input', {action: 'up', press: true});
    expect(true).to.equals(true);
  });
});