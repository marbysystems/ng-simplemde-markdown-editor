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
      var inputEvents = ['+input', 'paste'];
      var options = $scope.$eval(attributes.mbSimplemde) || {};
      options.element = element.get(0);
      var simplemde = new SimpleMDE(options);

      var maxLength = parseInt(attributes.mbSimplemdeMaxLength, 10);
      if (!!maxLength) {
        element.siblings('.editor-statusbar').append('<span class="maxlength"></span>');
      }
      var maxLengthElement = element.siblings('.editor-statusbar').find('.maxlength');

      $scope.$watch(attributes.ngModel, function(value) {
        if (simplemde.value() !== value) {
          simplemde.value(value);
        }
      });

      simplemde.codemirror.on('change', function(instance, changeObj) {
        // Check if we're now at max length and set a warning.
        if (!!maxLength) {
          if (simplemde.value().length === maxLength) {
            maxLengthElement.text('Maximum characters reached');
          } else {
            maxLengthElement.text('');
          }
        }

        // Update the view value, so that all standard ngModel
        // parsers/validators get triggered
        //
        // We have to apply this explicitly as the
        // $setViewValue doesn't always force a digest
        $scope.$apply(function() {
          ngModel.$setViewValue(simplemde.value());
        });
      });

      simplemde.codemirror.on('beforeChange', function(instance, changeObj) {
        // If we have a maxlength set, make sure that this input won't exceed it
        // Currently only handling character '+input' and 'paste' events
        if (!!maxLength && _.include(inputEvents, changeObj.origin)) {
          var newTextLength = _.reduce(changeObj.text, function(memo, text) {
            return memo + text.length;
          }, changeObj.text.length - 1);
          if (simplemde.value().length + newTextLength > maxLength) {
            maxLengthElement.text('This would exceed your character limit');
            changeObj.cancel();
          }
        }
      });
    }
  };
});
