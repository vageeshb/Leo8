'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    // JS Linting
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      GruntFile: {
        src: ['Gruntfile.js']
      },
      Server: {
        src: ['app.js', 'app/**/*.js', 'config/**/*.js']
      }
    },

    // Watching for changes
    watch: {
      options: {
        livereload: true,
      },
      express: {
        files:  [ 'app.js', 'config/**/*.js', 'app/routes/**/*.js', 'app/models/**/*.js'],
        tasks:  [ 'jshint', 'wiredep', 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      gruntFile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint', 'wiredep'],
      },
      views: {
        files: ['app/views/**/*.jade'],
        tasks: ['wiredep']
      },
    },

    // Installing bower dependencies
    wiredep: {
      target:{
        src: ['app/views/**/*.jade'],
        ignorePath: '../../../public'
      }
    },

    // Launching express server
    express: {
      dev: {
        options: {
          script: 'app.js'          
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['jshint', 'wiredep', 'express', 'watch']);
};