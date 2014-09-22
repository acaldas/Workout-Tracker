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

  $scope.getProgramWorkouts = function getProgramWorkouts( name ) {
    if(name) {
        return $http({
          method: 'POST',
          url: '/api/getProgramWorkouts',
          data: { program: name}
        }).
        success(function (data, status, headers, config) {
          $scope.programWorkouts = data;
       })
      }
    }
    $scope.getProgramWorkouts('Upper/Lower');
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
 .controller('Measures', ['$scope', '$http', function($scope, $http) {


      $http({
      method: 'GET',
      url: '/api/getLastMeasure'
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      $scope.measures = data.result;
    });

    $scope.saveMeasures = function saveMeasures() {
      delete $scope.measures._id;
      $http({
      method: 'POST',
      url: '/api/saveMeasures',
      data: { 'measures' : $scope.measures }
    }).
    success(function (data, status, headers, config) {
      console.log("Measures saved!");
     });
  };

  $http({
      method: 'GET',
      url: '/api/getMeasures'
    }).
    success(function (data, status, headers, config) {

      var length = data.result.length;
      for (var i = 0; i < length-1; i++) {
        var currentMeasure = data.result[i],
        lastMeasure = data.result[i+1];
        currentMeasure.weightDiff = currentMeasure.weight - lastMeasure.weight;
        currentMeasure.fatDiff = currentMeasure.fat/100 * currentMeasure.weight - lastMeasure.fat/100 * lastMeasure.weight;
        currentMeasure.muscleDiff = currentMeasure.muscle/100 * currentMeasure.weight - lastMeasure.muscle/100 * lastMeasure.weight;
        currentMeasure.waterDiff = currentMeasure.water/100 * currentMeasure.weight - lastMeasure.water/100 * lastMeasure.weight;
        lastMeasure.days = $scope.datesDifference(currentMeasure.date, lastMeasure.date);

        if(i === 0)
          currentMeasure.days = Math.floor($scope.datesDifference(new Date(), currentMeasure.date));

        currentMeasure.weightColor = true;
      }
      $scope.allMeasures = data.result;
      console.log(data.result);
    });


    $scope.datesDifference = function (date1, date2) {
      var d1 = new Date(date1);
      var d2 = new Date(date2);
      var miliseconds = d1-d2;
      var seconds = miliseconds/1000;
      var minutes = seconds/60;
      var hours = minutes/60;

      return hours/24;
    }

 }]);
