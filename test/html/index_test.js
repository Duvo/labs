'use strict';

var zombie = require('zombie');
var browser = new zombie();
var expect = require('chai').expect;

var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var server = requireHelper('server.js');

describe('Index page', function() {
  it('should visit the index and find H1', function(done) {
    browser.visit("http://localhost:3000/").then(function() {
      expect(browser.success).to.equals(true);
      expect(browser.text("H1")).to.equals('Labs - Index');
      done();
    }).fail(function(error) {
      done(error);
    });
  });
});
after(function() {
  server.close();
});
