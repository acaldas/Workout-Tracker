'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('editClick', function() {
    return {
        restrict: "E",
        scope: {
            bindModel:'=ngModel'
        },
        require:"ngModel",
        template:'<p>{{bindModel}}</p>',
        link: function(scope, elem, attrs, ctrl){
            var firstTime = true;

            elem.bind('click', function() {
                if(firstTime) {
                    elem.html('<input type="number" value="' + scope.bindModel + '">');

                elem.bind('input', function(val){
                    ctrl.$setViewValue(parseInt(elem.children()[0].value));
                    scope.$apply();
                });
                firstTime = false;
                }
        });
        }
    }
  });
