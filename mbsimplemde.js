'use strict';

/**
 * @ngdoc directive
 * @name wwwApp.directive:mbSimpleMde
 * @description
 * # mbSimpleMde
 */
angular.module('mb.simplemde')
.directive('mbSimplemde', function(){
  return function($scope, element, attributes) {
    var simplemde = new SimpleMDE({
      element: element.get(0),
      hideIcons: ['side-by-side', 'fullscreen'],
      status: false
    });

    simplemde.codemirror.on('change', function(){
      element.val(simplemde.value());
      element.trigger('input');
    });
  };
});
