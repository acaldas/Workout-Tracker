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
  }).
   directive('measuresDiff', function() {
    return {
        restrict: "E",
        scope: {
        currentMeasure: '@current',
        lastMeasure: '@last',
        weightDiff: currentMeasure.weight - lastMeasure.weight,
        fatDiff: currentMeasure.fat/100 * currentMeasure.weight - lastMeasure.fat/100 * lastMeasure.weight,
        muscleDiff: currentMeasure.muscle/100 * currentMeasure.weight - lastMeasure.muscle/100 * lastMeasure.weight,
        waterDiff: currentMeasure.water/100 * currentMeasure.weight - lastMeasure.water/100 * lastMeasure.weight
        },
        controller: function(){alert('aaaa')},
        template: "<div><td>{{weightDiff | number : 3}}</td><td>{{fatDiff | number : 3}}</td><td>{{muscleDiff | number : 3}}</td><td>{{waterDiff | number : 3}}</td></div>",
        replace: false
    }
  }).
   directive('numberColor', function() {
    return {
        restrict: "E",
        scope: {
            value: "@"
        },
        template:"<td>{{value}}</td>",
        link: function(scope, element, attrs) {
            var n = attrs.value;
            if(n<0)
                element.innerHtml = "-" + n;
            else if(n>0)
                element.innerHtml = "+" + n;
        },
        replace: true
    }
  }).
   directive('workoutsTimeline', [ '_', function( _ )  {
    return {
        restrict: "E",
        scope: {
            programWorkouts: "=programWorkouts"
        },
        link: function(scope, element, attrs) {
                function getDateStr(date) {
                    return date.split('T',1);
                }
                function addDays(date, days) {
                    var result = new Date(date);
                    result.setDate(date.getDate() + days);
                    return result;
                }
                scope.$watch('programWorkouts', function() {
                    var workouts = scope.programWorkouts;
                if( workouts && workouts.length) {
                    var firstDate = new Date(workouts[0].date),
                        lastDate = new Date();

                    var timeDiff = Math.abs(lastDate.getTime() - firstDate.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    var workoutDays = {};
                    _.each(workouts,function( workout ) {
                        switch(workout.type) {
                            case 0:
                                workout.day= 'LA'
                                break;
                            case 1:
                                workout.day= 'UA'
                                break;
                            case 2:
                                workout.day= 'LB'
                                break;
                            case 3:
                                workout.day= 'UB'
                                break;
                        };
                        workoutDays[getDateStr(workout.date)] = workout;
                    });

                    for(var i=0;i<diffDays;i++) {
                        var currentDate = addDays(firstDate, i);
                        var currentDateStr = getDateStr(currentDate.toISOString())[0];

                            workoutDays[currentDateStr] = workoutDays[currentDateStr] || false;
                    }

                    scope.workoutDays = workoutDays;
                    console.log(workoutDays);
                }
            });
        },
        templateUrl: 'directives/workoutsTimeline.html'
    }
  }])
  ;
