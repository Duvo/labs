'use strict';

var Cube = require('../models/cube');

function RealTime(frequency, sockets) {
  this.initialize(frequency, sockets);
}

RealTime.prototype.initialize = function(frequency, sockets) {
  this.sockets = sockets;
  this.cube = null;
  this.timestep = (1 / frequency) * 1000;
  this.interval = null;
  this.lastTick = new Date().getTime();
};

RealTime.prototype.start = function() {
  var self = this;
  this.interval = setInterval(function() {
    self.tick();
  }, this.timestep);
};

RealTime.prototype.tick = function() {
  var current = new Date().getTime();
  var interval = current - this.lastTick;
  console.log(interval);

  if (this.cube instanceof Cube) {
    this.cube.process(this.lastTick, current);
  }

  this.broadcast();
  this.lastTick = current;
};

RealTime.prototype.broadcast = function() {
  this.sockets.emit('rt:world', {world: this.getWorld()});
};

RealTime.prototype.stop = function() {
  if (this.interval) {
    clearInterval(this.interval);
  }
};

RealTime.prototype.handleInput = function(input) {
  this.cube.inputs.push({action: input.action, press: input.press, time: new Date().getTime()});
};

RealTime.prototype.getWorld = function() {
  return {cube: this.cube};
};

module.exports = RealTime;
