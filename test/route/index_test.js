'use strict';

var request = require('super-request');
var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var app = requireHelper('server.js');

describe('Index route', function() {

  it('should respond with a 200', function(done) {
    request(app)
            .get('/')
            .expect(/Labs - Index/)
            .expect(200, done);
  });

});