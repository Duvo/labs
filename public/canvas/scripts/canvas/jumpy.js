'use strict';
/* global createjs, Hero */

var _game = function() {
  var self = this,
          ticks = 0,
          canvas,
          stage,
          world,
          hero1,
          hero2,
          w = 500,
          h = 300,
          assets = [],
          spaceDown = false,
          zeroDown = false;

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
    hero1 = new Hero(self);
    hero1.x = w / 2 - 50;
    hero1.y = h / 2 + 20;
    world.addChild(hero1);

    hero2 = new Hero(self);
    hero2.x = w / 2 + 50;
    hero2.y = h / 2 + 20;
    world.addChild(hero2);

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
    hero1.tick();
    hero2.tick();
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

  this.handleKeyDown = function(e) {
    if (e.keyCode === 32) {
      if (!spaceDown) {
        spaceDown = true;
        hero1.jump();
      }
    }
    if (e.keyCode === 96) {
      if (!zeroDown) {
        zeroDown = true;
        hero2.jump();
      }
    }
  };

  this.handleKeyUp = function(e) {
    if (e.keyCode === 32) {
      spaceDown = false;
    }
    if (e.keyCode === 96) {
      zeroDown = false;
    }
  };

  self.preloadResources();
};

new _game();