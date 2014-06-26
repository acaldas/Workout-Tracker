var mongoose = require('mongoose');

exports.musclelist = function musclelist(name,callback){
 var Muscle = mongoose.model( 'Muscle' );
 Muscle.find({'name':name}, function (err, muscles) {
  if(err){
   console.log(err);
  }else{
   console.log(muscles);
   callback("",muscles);
  }
 })// end Muscle.find
}// end exports.musclelist
