'use strict';

var request = require('super-request');
var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var app = requireHelper('server.js');

describe('Real-Time route', function() {

  it('should respond with a 200', function(done) {
    this.timeout(5000);
    request(app)
            .get('/real-time')
            .expect(200, done);
  });

});