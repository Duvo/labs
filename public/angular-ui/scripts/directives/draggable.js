angular.module('app').directive('draggable', function() {
  'use strict';
  
  return {
    restrict: 'A',
    scope: {model: '='},
    link: function(scope, elm, attrs) {
      var options = scope.$parent.$eval(attrs.draggable);

      options.drag = function() {
        scope.$apply(function() {
          scope.model.y = parseFloat(elm.css('top'));
          scope.model.x = parseFloat(elm.css('left'));
        });
      };
      elm.draggable(options);
    }
  };
});