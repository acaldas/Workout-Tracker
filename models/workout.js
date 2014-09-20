
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

exports.getProgramWorkouts = function getProgramWorkouts(program, callback) {
    if(!program)
        callback("Invalid program", {});
    else {
         var Workout = mongoose.model( 'Workout' );
           Workout.find({program: 'Upper/Lower'}).sort('-date').exec( function(err, workouts) {
            if(err){
                callback("Invalid program", err);
            } else {
                callback("",workouts);
            }
        })
       }
}


exports.getWorkoutDay = function getWorkoutDay(callback){
    var Workout = mongoose.model( 'Workout' );
    var Q = require('q');

    Workout.findOne({program: 'Upper/Lower'}).sort('-date').exec( function(err, lastWorkout) {
     if(err){
        console.log(err);
  } else {
    var type = 0;

    if(lastWorkout && lastWorkout.type < 3)
        type = lastWorkout.type + 1;

    var workout = new Workout();
    workout.program = 'Upper/Lower';
    workout.type = type;
    workout.exercises = genericBulkWorkouts[type];
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
                    if(exercise.reps)
                        exercise.lastReps = exercise.reps;
                    else
                        typeToReps(exercise);
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

function typeToReps(exercise) {

    switch(exercise.type) {
        case 1:
            exercise.sets = 4;
            exercise.reps = 8;
            break;
        case 2:
            exercise.sets = 3;
            exercise.reps = 12;
            break;
        case 3:
            exercise.sets = 2;
            exercise.reps = 15;
            break;
    }
}

function updateExercise(exercise, lastExercise) {

    if(!exercise.reps)
        typeToReps(exercise);
    exercise.lastReps = lastExercise.lastReps;

    if(lastExercise.lastReps >= exercise.reps) {//if it was successfull
        if(exercise.name === "Squats" || exercise.name === "Deadlift" || exercise.name === "Standing Barbell Calf")
            exercise.weight = lastExercise.weight + 4;
        else if(exercise.name === "Leg Curl" || exercise.name === "Leg Extension" || exercise.name === "Lateral Raises" || exercise.name === "Rear Delt Row" || exercise.name === "Skullcrushers" || exercise.name === "Bicep Curls")
            exercise.weight = lastExercise.weight + 1;
        else
            exercise.weight = lastExercise.weight + 2;
    } else
        exercise.weight = lastExercise.weight
}

var genericBulkWorkouts = [
    [
        {
            name: "Squat",
            type: 1
        },
        {
            name: "SLDL",
            type: 1
        },
        {
            name: "Hack Squat",
            type: 2
        },
        {
            name: "Leg Curl",
            type: 2
        },
        {
            name: "Leg Extension",
            type: 2
        },
        {
            name: "Standing Barbell Calf",
            type: 3
        }
    ],
     [
        {
            name: "Bench Press",
            type: 1
        },
        {
            name: "Barbell Row",
            type: 1
        },
        {
            name: "Incline DB Press",
            type: 2
        },
        {
            name: "Lateral Raises",
            type: 3
        },
        {
            name: "Shrugs",
            type: 2
        },
        {
            name: "Skullcrushers",
            type: 3
        },
        {
            name: "Bicep Curls",
            type: 3
        }
    ],
    [
        {
            name: "Deadlift",
            type: 1
        },
        {
            name: "Hack Squat",
            type: 2
        },
        {
            name: "Leg Curl",
            type: 2
        },
        {
            name: "Leg Extension",
            type: 2
        },
        {
            name: "Hip Thrust",
            type: 2
        },
        {
            name: "Standing Barbell Calf",
            type: 3
        }
    ],
    [
        {
            name: "Overhead Press",
            type: 1
        },
        {
            name: "One Arm DB Row",
            type: 2
        },
        {
            name: "DB Press",
            type: 2
        },
        {
            name: "Flies",
            type: 2
        },
        {
            name: "Rear Delt Row",
            type: 2
        },
        {
            name: "Skullcrushers",
            type: 3
        },
        {
            name: "Bicep Curls",
            type: 3
        }
    ]
];

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
