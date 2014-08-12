var mongoose = require( 'mongoose' );

var muscleSchema = new mongoose.Schema({
 name: String,
 type: String
});
mongoose.model( 'Muscle', muscleSchema );

var exerciseSchema = new mongoose.Schema({
 name: String,
 muscles: [muscleSchema],
 sets: Number,
 reps: Number,
 lastReps: Number,
 weight: Number,
 added: Number
});
mongoose.model( 'Exercise', exerciseSchema );

var workoutSchema = new mongoose.Schema ({
    date: Date,
    type: Number,
    exercises: [exerciseSchema]
});
mongoose.model( 'Workout', workoutSchema );

var measuresSchema = new mongoose.Schema ({
    date: Date,
    weight: Number,
    fat: Number,
    muscle: Number,
    water: Number
});
mongoose.model( 'Measures', measuresSchema );

mongoose.connect( 'mongodb://Acaldas:qweasd@ds043057.mongolab.com:43057/heroku_app26374475' );
