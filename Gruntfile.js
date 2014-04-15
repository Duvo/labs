'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    cfg: require('./server/config.js').port,
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    bower: {
      install: {
        options: {
          copy: false,
          verbose: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',        
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      public: {
        src: ['public/**/*.js'],
        options: {
          ignores: ['public/bower_components/**/*']
        }
      },
      server: {
        src: ['server/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
        options: {
          livereload: true
        }
      },
      public: {
        files: '<%= jshint.public.src %>',
        tasks: ['jshint:public'],
        options: {
          livereload: true
        }
      },
      server: {
        files: '<%= jshint.server.src %>',
        tasks: ['jshint:server', 'nodeunit'],
        options: {
          livereload: true
        }
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit'],
        options: {
          livereload: true
        }
      },
    },    
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          nodeArgs: ['--debug'],
          ignore: ['public/**', 'test/**'],
          env: {
            PORT: '<%= cfg.port %>'
          },
          cwd: __dirname,
        }
      }
    },
    concurrent: {
      tasks: ['nodemon','watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'concurrent']);

};
