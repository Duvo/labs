/* global io, _Game */

angular.module('app').controller('MainController', ['$scope', function($scope) {
    'use strict';

    $scope.game = new _Game();

    var host = location.origin;
    var socket = io.connect(host);

    // Connexion au socket.
    socket.on('connect', function() {

      socket.on('rt:world', function(data) {
        $scope.lifeTime = data.world.cube.lifeTime;
        $scope.$apply('lifeTime');
        $scope.game.hero.x = data.world.cube.position.x;
        $scope.game.hero.y = data.world.cube.position.y;
      });

      // Création du cube.
      socket.emit('rt:newCube');

      var keyBind = {
        37: {action: 'left', press: false},
        38: {action: 'up', press: false},
        39: {action: 'right', press: false},
        40: {action: 'down', press: false}
      };

      document.onkeydown = function(e) {
        if (e.keyCode in keyBind) {
          e.preventDefault();
          if (!keyBind[e.keyCode].press) {
            keyBind[e.keyCode].press = true;
            socket.emit('rt:input', {action: keyBind[e.keyCode].action, press: true});
          }
        }
      };
      document.onkeyup = function(e) {
        if (e.keyCode in keyBind) {
          e.preventDefault();
          keyBind[e.keyCode].press = false;
          socket.emit('rt:input', {action: keyBind[e.keyCode].action, press: false});
        }
      };
    });

  }
]);
