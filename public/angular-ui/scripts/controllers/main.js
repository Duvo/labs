angular.module('angularUiApp').controller('MainController', ['$scope',
  function($scope) {
    'use strict';
    
    $scope.title = 'Labs - Angular UI';
  }
]);

angular.module('angularUiApp').controller('UiDraggableController', ['$scope',
  function($scope) {
    'use strict';

    $scope.myBox = {x: '20', y: '30'};
    $scope.draggableOptions = {containment: '#dragWindow'};
  }
]);

angular.module('angularUiApp').controller('UiSortableController', ['$scope', '$filter', '$timeout',
  function($scope, $filter, $timeout) {
    'use strict';

    var sortableItems = [[
        {index: 5, text: 'apple', list: 'A'},
        {index: 3, text: 'banana', list: 'A'},
        {index: 1, text: 'kiwi', list: 'A'},
        {index: 2, text: 'strawberry', list: 'A'},
        {index: 4, text: 'peach', list: 'A'}
      ], [{index: 5, text: 'kitten', list: 'B'},
        {index: 3, text: 'dog', list: 'B'},
        {index: 1, text: 'horse', list: 'B'},
        {index: 2, text: 'rabbit', list: 'B'},
        {index: 4, text: 'bird', list: 'B'}]];

    $scope.sortableItemsA = $filter('orderBy')(sortableItems[0], '+index');
    $scope.sortableItemsB = $filter('orderBy')(sortableItems[1], '+index');

    $scope.coloredA = false;
    $scope.coloredB = false;

    var setOrder = function(newVal, oldVal, list) {
      if (newVal !== oldVal) {
        $scope['colored' + list] = true;
        $timeout(function() {
          $scope['colored' + list] = false;
        }, 1000);
        for (var index in newVal) {
          var item = newVal[index];
          item.index = parseInt(index, 10) + 1;
        }
      }
    };

    $scope.$watchCollection('sortableItemsA', function(newVal, oldVal) {
      setOrder(newVal, oldVal, 'A');
    });
    $scope.$watchCollection('sortableItemsB', function(newVal, oldVal) {
      setOrder(newVal, oldVal, 'B');
    });

    $scope.sortableConsole = '';

    $scope.sortableOptions = {
      axis: 'y',
      connectWith: '.mySortable'
    };
  }
]);

angular.module('angularUiApp').controller('UiNestedController', ['$scope',
  function($scope) {
    'use strict';

    $scope.main = {value: 'hello'};

    $scope.change = function() {
      $scope.main.value = 'hi';
    };
  }
]);

angular.module('angularUiApp').controller('UiNestedSubController', ['$scope',
  function($scope) {
    'use strict';

    $scope.change = function() {
      $scope.main.value = 'bye';
    };
  }
]);

angular.module('angularUiApp').controller('UiComingSoonController', ['$scope',
  function($scope) {
    'use strict';
    $scope.msg = 'Coming soon';
  }
]);