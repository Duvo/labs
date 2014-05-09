'use strict';
/* global createjs, Hero */

var _game = function() {
  var self = this,
          ticks = 0,
          canvas,
          stage,
          world,
          hero,
          w = 500,
          h = 300,
          assets = [],
          keyDown = false;

  // holds all collideable objects
  var collideables = [];
  this.getCollideables = function() {
    return collideables;
  };

  // starts to load all the assets
  this.preloadResources = function() {
    self.initializeGame();
  };

  var requestedAssets = 0,
          loadedAssets = 0;
  // loads the assets and keeps track 
  // of how many assets where there to
  // be loaded
  this.loadImage = function(e) {
    var img = new createjs.Image();
    img.onload = self.onLoadedAsset;
    img.src = e;

    assets[e] = img;

    ++requestedAssets;
  };
  // each time an asset is loaded
  // check if all assets are complete
  // and initialize the game, if so
  this.onLoadedAsset = function() {
    ++loadedAssets;
    if (loadedAssets === requestedAssets) {
      self.initializeGame();
    }
  };

  this.initializeGame = function() {

    // initializing the stage
    stage = new createjs.Stage('mainCanvas');
    world = new createjs.Container();
    stage.addChild(world);

    // creating the Hero, and assign an image
    // also position the hero in the middle of the screen
    hero = new Hero(self);
    hero.x = w / 2;
    hero.y = h / 2 + 20;
    world.addChild(hero);

    // add a platform for the hero to collide with
    self.addPlatform(w / 2 - 150 / 2, h / 1.25, 150);

    // Setting the listeners
    if ('ontouchstart' in document.documentElement) {
      canvas.addEventListener('touchstart', function() {
        self.handleKeyDown();
      }, false);

      canvas.addEventListener('touchend', function() {
        self.handleKeyUp();
      }, false);
    } else {
      document.onkeydown = self.handleKeyDown;
      document.onkeyup = self.handleKeyUp;
      document.onmousedown = self.handleKeyDown;
      document.onmouseup = self.handleKeyUp;
    }

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', self.tick);
  };

  this.tick = function() {
    ticks++;
    hero.tick();
    stage.update();
  };

  // this method adds a platform at the
  // given x- and y-coordinates and adds
  // it to the collideables-array
  this.addPlatform = function(x, y, width) {
    x = Math.round(x);
    y = Math.round(y);

    var platform = new createjs.Shape();
    platform.graphics.beginFill('grey').drawRect(0, 0, width, 10);
    platform.setBounds(0, 0, width, 10);
    platform.x = x;
    platform.y = y;
    platform.snapToPixel = true;

    world.addChild(platform);
    collideables.push(platform);
  };

  this.handleKeyDown = function() {
    if (!keyDown) {
      keyDown = true;
      hero.jump();
    }
  };

  this.handleKeyUp = function() {
    keyDown = false;
  };

  self.preloadResources();
};

new _game();