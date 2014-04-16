angular.module('labsApp', []).controller('GameController', ['$scope', function($scope) {
    'use strict';

    var values = [
      ['B', 'O', 'N', 'D', 'T'],
      ['A', 'G', 'J', 'I', 'U'],
      ['B', 'A', 'O', 'R', 'O'],
      ['A', 'R', 'U', 'A', 'T'],
      ['T', 'R', 'E', 'T', 'O']
    ];

    $scope.height = values.length;
    $scope.width = values[0].length;

    var initGrid = [];
    for (var i = 0; i < $scope.height; i++) {
      initGrid[i] = [];
      for (var j = 0; j < $scope.width; j++) {
        initGrid[i][j] = {
          selected: false,
          value: values[i][j],
          i: i,
          j: j
        };
      }
    }

    $scope.grid = initGrid;
    $scope.otherGrids = [];
    $scope.onSelect = false;

    $scope.selectedOther = function(item) {
      var selected = false;
      $scope.otherGrids.forEach(function(otherGrid) {
        selected = selected || otherGrid[item.i][item.j].selected;
      });
      return selected;
    };

    var host = location.origin;
    var socket = io.connect(host);
    socket.on('connect', function() {
      socket.emit('newPlayer', null, function(hello) {
        var playerId = hello.player.id;
        $scope.playerId = playerId;
        bindPlayer($scope.playerId);
        hello.others.forEach(function(other) {
          bindOtherPlayer(other.id);
        });
        socket.on('playerJoin', function(playerId) {
          if (playerId !== $scope.playerId) {
            bindOtherPlayer(playerId);
          }
        });
      });
    });
    var bindPlayer = function(playerId) {
      $scope.playerId = playerId;
      console.log('I am player ' + $scope.playerId);

      $scope.$watch('grid', function(newGrid) {
        socket.emit('changeGrid', newGrid);
      }, true);

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
    };

    var bindOtherPlayer = function(playerId) {
      console.log('Player ' + playerId + ' join the game');
      socket.on(playerId, function(otherGrid) {
        $scope.otherGrids[playerId] = otherGrid;
        $scope.$apply('otherGrids');
      });
    };

  }]);

