'use strict';

var Browser = require("zombie");
var browser = new Browser();

var expect = require('chai').expect;

var requireHelper = require(process.env.TEST_DIR + '/require_helper');
requireHelper('server.js');

var url = 'http://localhost:' + process.env.PORT  + '/socket';

describe('Socket page', function() {
  it('should contain Labs - Socket', function(done) {
    browser.visit(url).then(function() {
      expect(browser.text("H1")).to.contain('Labs - Socket');
      done();
    }).fail(function(error) {
      done(error);
    });
  });
});