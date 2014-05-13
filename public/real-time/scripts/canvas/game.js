'use strict';
/* global createjs, Hero */

(function(window) {
  var _Game = function() {
    this.initialize();
  };

  _Game.prototype.initialize = function() {
    var self = this;
    this.stage = new createjs.Stage('mainCanvas');
    this.world = new createjs.Container();
    this.stage.addChild(this.world);
    this.hero = new Hero();
    this.hero.x = 100;
    this.hero.y = 100;
    this.world.addChild(this.hero);
    
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', function() {
      self.tick();
    });
  };
  
  _Game.prototype.tick = function() {
    this.stage.update();
  };
  
  window._Game = _Game;
}(window));