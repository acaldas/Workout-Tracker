module.exports = function(grunt) {
grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {

      target: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'views/index.html'   // .html support...
        ]
      }
    }
  })
};
