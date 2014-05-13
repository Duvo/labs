'use strict';

var requireHelper = require(process.env.TEST_DIR + '/require_helper');
var Cube = requireHelper('models/cube');

var expect = require('chai').expect;
describe('Cube', function() {
  describe('constructor', function() {
    var cube = new Cube();
    it('should create a new Cube with initialized values', function() {
      expect(cube.position.x).to.equals(200);
      expect(cube.position.y).to.equals(100);
      expect(cube.speed).to.equals(40);
    });
  });
  describe('tick', function() {
    var cube = new Cube();
    it('should change cube according to its attributes', function() {
      cube.velocity.x = 10;
      cube.tick(1000);
      expect(cube.lifeTime).to.equals(1000);
      expect(cube.position.x).to.equals(210);
    });
  });
  describe('process', function() {
    var cube = new Cube();
    it('should move when process inputs', function() {
      cube.inputs = [
        {time: 0, action: 'up', press: true},
        {time: 200, action: 'up', press: false},
        
        {time: 200, action: 'down', press: true},
        {time: 300, action: 'down', press: false},
        
        {time: 300, action: 'right', press: true},
        {time: 500, action: 'right', press: false},
        
        {time: 600, action: 'left', press: true},
        {time: 700, action: 'left', press: false}
      ];
      cube.process(0, 1000);
      expect(cube.position.y).to.equals(96); //100 - (speed*0.2s) + (speed*0.1s) = 96
      expect(cube.position.x).to.equals(204); //200 + (speed*0.2s) - (speed*0.1s) = 204
    });
  });
});