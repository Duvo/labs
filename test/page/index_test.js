'use strict';

var Browser = require("zombie");
var browser = new Browser();

var expect = require('chai').expect;

var requireHelper = require(process.env.TEST_DIR + '/require_helper');
requireHelper('server.js');

var url = 'http://localhost:' + process.env.PORT;

describe('Index page', function() {
  it('should contain Labs - Index', function(done) {
    this.timeout(5000);
    browser.visit(url).then(function() {
      expect(browser.text("H1")).to.contain('Laboratory');
      done();
    }).fail(function(error) {
      done(error);
    });
  });
});