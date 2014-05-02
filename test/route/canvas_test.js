'use strict';

var request = require('super-request');
var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var app = requireHelper('server.js');

describe('Canvas route', function() {

  it('should respond with a 200', function(done) {
    request(app)
            .get('/canvas')            
            .expect(/Labs - Canvas/)
            .expect(200, done);
  });

});