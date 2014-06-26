
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

    Workout.findOne().sort('-date').exec( function(err, type) {
     if(err){
        console.log(err);
  } else {
    if(type==null || type == 5)
        type = 0;
    else
        type += 1;

    var workout = new Workout();
    workout.exercises = days[type];
    workout.date = new Date();
    console.log(workout);
    callback("",workout);
  }
});
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
