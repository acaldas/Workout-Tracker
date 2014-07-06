'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('Workout', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {

    $scope.workout = {};

    function getWorkout() {
      $http({
      method: 'GET',
      url: '/api/getWorkout'
    }).
    success(function (data, status, headers, config) {
      $scope.workout = data.result;
      console.log(data);
     })
  };

  getWorkout();
    $scope.saveWorkout = function saveWorkout() { $http({
      method: 'POST',
      url: '/api/saveWorkout',
      data: { 'workout' : $scope.workout }
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      getWorkout();
     })
  };
  }])
  .controller('Progress', ['$scope', '$http', function($scope, $http) {
    $scope.currentTab = 0;
    $scope.chart = {
        labels : [],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0)",
                strokeColor : "rgba(240,211,121,1)",
                pointColor : "rgba(240,211,121,1)",
                pointStrokeColor : "rgba(240,211,121,0.1)",
                data : []
            }
        ],
    };

    $scope.options = {
      scaleStepWidth : 1,
        bezierCurve : false
    }

    $scope.exercises = [];
    $scope.exerciseData = [];
        $http({
      method: 'GET',
      url: '/api/exercises'
    }).
    success(function (data, status, headers, config) {
       $scope.exerciseData = data;
       data.forEach(function (exercise, index){
        var tab = {
          title: exercise.name,
          index: index
        };
        if(index===0)
          tab.active = true;
        $scope.exercises.push(tab);
      });
       $scope.drawGraph(0);
     });

  $scope.isActiveTab = function isActiveTab(i) {
    return i === $scope.currentTab;
  }

  $scope.drawGraph = function drawGraph(i){

    var exercise = $scope.exerciseData[i];
    $scope.chart.labels = [];
    $scope.chart.datasets[0].data = [];

    exercise.graph.forEach(function(day) {
      $scope.chart.labels.push(day.added);
      $scope.chart.datasets[0].data.push(day.weight);
    });
    $scope.currentTab = i;
  };
  }])
 .controller('Measures', ['$scope', function($scope) {}]);
