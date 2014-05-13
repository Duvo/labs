'use strict';

/* jshint unused: false */

var Cube = require('../models/cube');
var RealTime = require('../models/real-time');

var controller = {
  initialize: function(frequency, sockets) {
    this.realTime = new RealTime(frequency, sockets);
  },
  start: function() {
    this.realTime.start();
  },
  stop: function() {
    this.realTime.stop();
  },
  newCube: function() {
    this.realTime.cube = new Cube();
  },
  handleInput: function(input) {
    this.realTime.handleInput(input);
  }
};


module.exports = controller;