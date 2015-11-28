'use strict';

/**
 * @ngdoc directive
 * @name wwwApp.directive:mbSimpleMde
 * @description
 * # mbSimpleMde
 */
angular.module('mb.simplemde', []);

angular.module('mb.simplemde')
.directive('mbSimplemde', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function($scope, element, attributes, ngModel) {
      var hasBeenSet = false;

      var simplemde = new SimpleMDE({
        element: element.get(0),
        renderingConfig: {
          singleLineBreaks: true
        }
      });

      $scope.$watch(attributes.ngModel, function(value) {
        if (!hasBeenSet && !!value) {
          simplemde.value(value);
          hasBeenSet = true;
        }
      });

      simplemde.codemirror.on('change', function(){
        element.val(simplemde.value());
        element.trigger('input');
      });
    }
  };
});
