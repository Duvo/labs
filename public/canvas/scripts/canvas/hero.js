'use strict';
/* global createjs, calculateIntersection */

(function(window) {
  function Hero(game) {
    this.initialize(game);
  }
  Hero.prototype = new createjs.Shape();

  Hero.prototype.Shape_initialize = Hero.prototype.initialize;

  Hero.prototype.initialize = function(game) {
    this.game = game;
    this.velocity = {x: 0, y: 25};
    this.onGround = false;
    this.doubleJump = false;

    this.Shape_initialize();
    this.graphics.beginFill('red').drawRect(-20, -20, 40, 40);
    this.setBounds(-20, -20, 40, 40);
    this.name = 'Hero';
    this.snapToPixel = true;
  };

  Hero.prototype.tick = function() {
    this.velocity.y += 1;

    // preparing the variables
    var cc = 0,
            addY = this.velocity.y,
            bounds = this.getTransformedBounds(),
            cbounds,
            collision = null,
            collideables = this.game.getCollideables();

    cc = 0;
    // for each collideable object we will calculate the
    // bounding-rectangle and then check for an intersection
    // of the hero's future position's bounding-rectangle
    while (!collision && cc < collideables.length) {
      cbounds = collideables[cc].getTransformedBounds();
      if (collideables[cc].isVisible) {
        collision = calculateIntersection(bounds, cbounds, 0, addY);
      }

      if (!collision && collideables[cc].isVisible) {
        // if there was NO collision detected, but somehow
        // the hero got onto the "other side" of an object (high velocity e.g.),
        // then we will detect this here, and adjust the velocity according to
        // it to prevent the Hero from "ghosting" through objects
        // try messing with the 'this.velocity = {x:0,y:25};'
        // -> it should still collide even with very high values
        if ((bounds.y < cbounds.y && bounds.y + addY > cbounds.y) ||
                (bounds.y > cbounds.y && bounds.y + addY < cbounds.y)) {
          addY = cbounds.y - bounds.y;
        } else {
          cc++;
        }
      }
    }

    // if no collision was to be found, just
    //  move the hero to it's new position
    if (!collision) {
      this.y += addY;
      if (this.onGround) {
        this.onGround = false;
        this.doubleJump = true;
      }
      // else move the hero as far as possible
      // and then make it stop and tell the
      // game, that the hero is now "an the ground"
    } else {
      this.y += addY - collision.height;
      if (addY > 0) {
        this.onGround = true;
        this.doubleJump = false;
      }
      this.velocity.y = 0;
    }
  };

  Hero.prototype.jump = function() {
    var self = this;
    var animate = function() {
      createjs.Tween.removeTweens(self);
      createjs.Tween.get(self).to({scaleX: 0.7, scaleY: 1.3}, 100, createjs.Ease.linear).call(function() {
        createjs.Tween.get(self).to({scaleX: 1.2, scaleY: 0.8}, 600, createjs.Ease.linear).call(function() {
          createjs.Tween.get(self).to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.linear);
        });
      });
    };

    // if the hero is "on the ground"
    // let him jump, physically correct!
    if (this.onGround) {
      animate();
      this.velocity.y = -15;
      this.onGround = false;
      this.doubleJump = true;
      // we want the hero to be able to
      // jump once more when he is in the
      // air - after that, he has to wait
      // to lang somewhere on the ground
    } else if (this.doubleJump) {
      animate();
      var velocity = this.velocity.y > 0 ? -10 : this.velocity.y - 10;
      this.velocity.y = Math.max(-15, velocity);
      this.doubleJump = false;
    }
  };

  window.Hero = Hero;
}(window));