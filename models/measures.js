var mongoose = require('mongoose');
var Q = require('q');

exports.saveMeasures = function saveMeasures(measuresJson){
    var Measures = mongoose.model( 'Measures' );
    var deferred = Q.defer(),
    measures = new Measures(measuresJson);
    measures.save(function (err, result) {
    if(err){
       console.log(err);
       deferred.reject(err);
    }else{
       console.log(result);
       deferred.resolve(result);
      }
     });
     return deferred.promise;
}

exports.getLastMeasure = function getLastMeasure() {
    var Measures = mongoose.model( 'Measures' );
    var deferred = Q.defer();

     Measures.findOne().sort('-date').exec( function(err, lastMeasure) {
     if(err){
        console.log(err);
        deferred.reject(err);
    } else {
        deferred.resolve(lastMeasure);
    }
    });
    return deferred.promise;
 }
