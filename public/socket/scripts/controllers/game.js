angular.module('labsApp', []).controller('GameController', ['$scope', function($scope) {
    'use strict';

    var newGrid = function(values) {
      var grid = [];
      for (var i = 0; i < values.length; i++) {
        grid[i] = [];
        for (var j = 0; j < values[0].length; j++) {
          grid[i][j] = {
            value: values[i][j],
            selected: false
          };
        }
      }
      return grid;
    };

    var host = location.origin;
    var socket = io.connect(host);

    // Connexion au socket.
    socket.on('connect', function() {

      // Création du jouueur.
      socket.emit('newPlayer', null, function(player) {
        $scope.player = player;

        // Récupération de la partie.
        socket.emit('getGame', null, function(game) {
          $scope.game = game;
          $scope.grid = newGrid($scope.game.grid);
          console.log($scope.grid);
          $scope.others = [];
          $scope.$apply('grid');

          // Binding des modifications des autres joueurs.
          socket.on('changeGrid', function(data) {
            var player = data.player;
            var grid = data.grid;
            $scope.others[player.id] = grid;
            $scope.$apply('others');
          });

          // Binding des actions du joueur.
          $scope.$watch('grid', function(newGrid) {
            /*var change = {
             grid: newGrid,
             player: $scope.player
             };*/
            socket.emit('changeGrid', newGrid);
          }, true);
        });
      });
    });

    $scope.deselectAll = function() {
      $scope.grid.forEach(function(row) {
        row.forEach(function(cell) {
          cell.selected = false;
        });
      });
    };

    $scope.startSelect = function(item) {
      $scope.onSelect = true;
      item.selected = true;
    };

    $scope.select = function(item) {
      if ($scope.onSelect) {
        item.selected = true;
      }
    };

    $scope.stopSelect = function() {
      $scope.onSelect = false;
      $scope.deselectAll();
    };

    $scope.selectedOther = function(i, j) {
      var selected = false;
      $scope.others.forEach(function(other) {
        selected = selected || other[j][i].selected;
      });
      return selected;
    };

  }]);
