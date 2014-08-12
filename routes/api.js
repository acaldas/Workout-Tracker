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
exports.getWorkout = function (req, res) {

 workoutdata.getWorkoutDay(function(err,result){
  res.json({
    result: result
  });
 });
};

exports.saveWorkout = function (req, res) {
  workoutdata.saveWorkout(req.body.workout,function(err,result){
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

var measuresdata = require('../models/measures');
exports.getLastMeasure = function (req, res) {

 measuresdata.getLastMeasure().then(function(result){
  res.json({
    result: result
  });
 });
};

exports.saveMeasures = function (req, res) {
  measuresdata.saveMeasures(req.body.measures).then(function(result){
  res.json({
    name: "result",
    result: result
  });
 });
};
