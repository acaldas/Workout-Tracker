var mongoose = require('mongoose');

var exercises = ["Squat","Bench Press", "Overhead Press", "Deadlift", "Barbell Row", "Bicep Curls"];
exports.saveExercise = function saveExercise(exercise,callback){
 var Exercise = mongoose.model( 'Exercise' );
 var ex = new Exercise(exercise);
 var muscleModel = mongoose.model( 'Muscle' );
 var muscle = new muscleModel(exercise.muscle);

 ex.muscles.push(muscle);
 ex.save(function (err, result) {
  if(err){
   console.log(err);
  }else{
   console.log(result);
   callback("",result);
  }
 })
}

exports.getExercisesStats = function getExercisesStats(callback) {
    var Exercise = mongoose.model( 'Exercise' );
    var graphs = [];
    var n = 0;
    exercises.forEach(function (exercise, index) {
        var data = [];

        Exercise.find({name: exercise}).sort('added').exec( function(err, result) {
                if(err){
                console.log(err);
              } else {
                result.forEach(function (ex) {
                    data.push(
                    {
                       added: ex.added,
                       weight: ex.weight
                    });
                });
                graphs.push({name: exercise, graph: data});
                n++;
                if(n === exercises.length-1)
                    callback(graphs);
              }});
    });
}

exports.importExcell = function importExcell(callback){
    var Workout = mongoose.model( 'Workout' );
    var xlrd = require('xlsx-extract').XLSX;

    var Exercises = [];

    new xlrd().extract('../../Documents/Greyskull.xlsx', {sheet_nr:1})
        .on('row', function (row) {
            console.log(row);  //row is a array of values or []
            var exerciseJson = {};
            var exercise = row[1];
            if(exercise != null) {
                exercise = exercise.substring(0,exercise.indexOf(" "));
                var valid = true;

                switch(exercise){
                    case "Bench":
                        exercise = "Bench Press";
                        break;
                    case "Bent":
                        exercise = "Barbell Row";
                        break;
                    case "Squat":
                        exercise = "Squat";
                        break;
                    case "Deadlift":
                        exercise = "Deadlift";
                        break;
                    case "Overhead":
                        exercise = "Overhead Press";
                        break;
                    case "Curls":
                        exercise = "Bicep Curls";
                        break;
                    default:
                        valid = false;
                        break;
                }

                if(valid) {
                    exerciseJson.name = exercise;
                    var weight = row[2];
                    if(weight != null && row[3] != null) {
                        exerciseJson.weight = weight;
                        parseExercise(exerciseJson);
                    }

                }
            }
        })
        .on('error', function (err) {
            console.error(err);
        })
        .on('end', function (err) {
            console.log(added + " execises imported");
             callback("",{status: 'done ' + added});
        });


}

var added = 0;
function parseExercise(exercise) {
     var Exercise = mongoose.model( 'Exercise' );
     var sets = 3;
     var reps = 5;
     if(exercise.name == 'Bicep Curls') {
        sets = 2;
        reps = 8;
     }
     exercise.sets = sets;
     exercise.reps = reps;
     exercise.added = added;
     added++;
     var ex = new Exercise(exercise);

     ex.save(function (err, result) {
  if(err){
   console.log(err);
  }else{
   console.log(result);
  }
 })
}

