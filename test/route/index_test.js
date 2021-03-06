'use strict';

var request = require('super-request');
var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var app = requireHelper('server.js');

describe('Index route', function() {

  it('should respond with a 200', function(done) {
    this.timeout(5000);
    request(app)
            .get('/')
            .expect(200, done);
  });

});