/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

var muscledata = require('../models/muscle');

exports.muscles = function (req, res) {
   var strGroup = "D";
 muscledata.musclelist(strGroup,function(err,musclelist){
  res.json({
    name: "muscles",
    muscles: musclelist
  });
 });
};
var exercisedata = require('../models/exercise');
exports.saveExercise = function (req, res) {
 exercisedata.saveExercise(exercise,function(err,result){
  res.json({
    name: "result",
    result: result
  });
 });
};

exports.getExercisesStats = function (req, res) {
    exercisedata.getExercisesStats(function (result){
        res.send(result);
    });
}

var workoutdata = require('../models/workout');
exports.getWorkoutDay = function (req, res) {

 workoutdata.getWorkoutDay(function(err,result){
  res.json({
    name: "result",
    result: result
  });
 });
};

exports.importExcell = function (req, res) {

 exercisedata.importExcell(function(err,result){
  res.json({
    name: "result",
    result: result
  });
 });
};
