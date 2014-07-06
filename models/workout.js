
var mongoose = require('mongoose');

exports.saveWorkout = function saveWorkout(workoutJson,callback){
var Workout = mongoose.model( 'Workout' );
 var workout = new Workout(workoutJson);
 workout.save(function (err, result) {
  if(err){
   console.log(err);
  }else{
   console.log(result);
   callback("",result);
  }
 })// end Muscle.find
}// end exports.musclelist

exports.getWorkoutDay = function getWorkoutDay(callback){
    var Workout = mongoose.model( 'Workout' );
    var Q = require('q');

    Workout.findOne().sort('-date').exec( function(err, lastWorkout) {
     if(err){
        console.log(err);
  } else {
    var type = 0;

    if(lastWorkout==null)
        type = 1;
    else if(lastWorkout.type == 5)
        type = 0;
    else
        type = lastWorkout.type + 1;

    var workout = new Workout();
    workout.type = type;
    workout.exercises = days[type];
    workout.date = new Date();
    var exercisesToResolve = [];

    for(var i=0; i<workout.exercises.length; i++) {
        exercisesToResolve.push(getNextExercise(workout.exercises[i]));
    }

    Q.all(exercisesToResolve).then(function(){
        callback("",workout);
    }
    );
  }
});
}

function getNextExercise( exercise ) {
    var Workout = mongoose.model( 'Workout' );

  return Workout.findOne({ "exercises.name": exercise.name },'exercises').sort('-date').exec(
    function(err, result) {
                if(err){
                console.log(err);
              } else {
                if(!result) {
                    exercise.weight = 0;
                    exercise.lastReps = exercise.reps;
                }
                else {
                    var lastExercise = result.exercises.filter(function (ex) {
                                        return ex.name === exercise.name;
                    })[0];
                    updateExercise(exercise, lastExercise);
                }
              }}
    );
}

function updateExercise(exercise, lastExercise) {
    exercise.lastReps = lastExercise.lastReps;

    if(lastExercise.lastReps >= exercise.reps) {//if it was successfull
        if(exercise.name === "Bicep Curls") {
            if(lastExercise.lastReps < 12) {
                exercise.lastReps += 1;
                exercise.weight = lastExercise.weight;
            } else {
                lastExercise = 8;
                exercise.weight = lastExercise.weight + 2;
            }
        } else
            exercise.weight = lastExercise.weight + 1;

        if(exercise.name === "Deadlift")
            exercise.weight += 1;
    } else if(exercise.name !== "Bicep Curls")//if it was not successfull
        exercise.weight = Math.ceil(0.9*lastExercise.weight);
}

var days = [
    [
        {
        name: "Overhead Press",
        muscle: {
            name: "Deltoid",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Bicep Curls",
        muscle: {
            name: "Bicep",
            type: "Target"
            },
        sets: 3,
        reps: 8
        },
        {
        name: "Squat",
        muscle: {
            name: "Quadriceps",
            type: "Target"
            },
        sets: 3,
        reps: 5
        }
    ],
    [
        {
        name: "Bench Press",
        muscle: {
            name: "Pectoralis",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Barbell Row",
        muscle: {
            name: "Back",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Deadlift",
        muscle: {
            name: "Erector Spinae",
            type: "Target"
            },
        sets: 3,
        reps: 5
        }
    ],
    [
        {
        name: "Overhead Press",
        muscle: {
            name: "Deltoid",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Bicep Curls",
        muscle: {
            name: "Bicep",
            type: "Target"
            },
        sets: 2,
        reps: 8
        },
        {
        name: "Squat",
        muscle: {
            name: "Quadriceps",
            type: "Target"
            },
        sets: 3,
        reps: 5
        }
    ],
    [
        {
        name: "Bench Press",
        muscle: {
            name: "Pectoralis",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Barbell Row",
        muscle: {
            name: "Back",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Squat",
        muscle: {
            name: "Quadriceps",
            type: "Target"
            },
        sets: 3,
        reps: 5
        }
    ],
    [
        {
        name: "Overhead Press",
        muscle: {
            name: "Deltoid",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Bicep Curls",
        muscle: {
            name: "Bicep",
            type: "Target"
            },
        sets: 2,
        reps: 8
        },
        {
        name: "Deadlift",
        muscle: {
            name: "Erector Spinae",
            type: "Target"
            },
        sets: 3,
        reps: 5
        }
    ],
    [
        {
        name: "Bench Press",
        muscle: {
            name: "Pectoralis",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Barbell Row",
        muscle: {
            name: "Back",
            type: "Target"
            },
        sets: 3,
        reps: 5
        },
        {
        name: "Squat",
        muscle: {
            name: "Quadriceps",
            type: "Target"
            },
        sets: 3,
        reps: 5
        }
    ]
];
