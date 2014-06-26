'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('Workout', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {


  }])
  .controller('Progress', ['$scope', '$http', function($scope, $http) {
     $scope.currentTab = 0;
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

    if($scope.exerciseData.length > i) {
      $scope.currentTab = i;
          $scope.data = {
      series: [],
      data : []
    };
    var exercise = $scope.exerciseData[i];
        $scope.data.series.push(exercise.name);
        exercise.graph.forEach(function (ex){
         $scope.data.data.push({
          "x": ex.added,
          "y": [ex.weight],
          tooltip: exercise.name
        });
        })
    }
  };

  $scope.chartType = 'line';

  $scope.config = {
    labels: false,
    title : "Progress",
    legend : {
      display:true,
      position:'left'
    },
    innerRadius: 0
  };

  }])
 .controller('Measures', ['$scope', function($scope) {}]);
