angular.module('socketApp').directive('grid', function() {
  'use strict';
  return {
    restrict: 'A',
    templateUrl: '/socket/views/grid.html',
    link: function(scope, element/*, attrs*/) {
      scope.gridWidth = element.width();
      var elBorder = element.find('.border');
      var leftBorder = Math.ceil(parseFloat(elBorder.css('border-left-width')));
      var rightBorder = Math.ceil(parseFloat(elBorder.css('border-right-width')));
      scope.cellSize = function() {
        return Math.floor((scope.gridWidth - (leftBorder + rightBorder) * 5) / scope.grid[0].length) + 'px';
      };
    }
  };
});