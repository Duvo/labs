'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    cfg: require('./server/config.js').port,
    update_json: {
      bower: {
        src: 'package.json',
        dest: 'bower.json',
        fields: [
          'name',
          'main',
          'version',
          'description',     
          'repository',
          'author',
          'keywords',
          'license',
          'homepage',
        ]
      }
    },
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
    less: {
      dev: {
        files: {
          'public/styles/layout.css' : 'public/lessStyles/layout.less',
          'public/socket/styles/main.css' : 'public/socket/lessStyles/main.less',
          'public/angular-ui/styles/main.css' : 'public/angular-ui/lessStyles/main.less',
          'public/index/styles/main.css' : 'public/index/lessStyles/main.less',
          'public/canvas/styles/main.css' : 'public/canvas/lessStyles/main.less',
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
          ignores: ['**/bower_components/**/*']
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
      json: {
        files: ['package.json'],
        tasks: ['update_json']
      },
      styles: {
        files: ['public/**/*.less'],
        tasks: ['less']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
      },
      public: {
        files: '<%= jshint.public.src %>',
        tasks: ['jshint:public']
      },
      server: {
        files: '<%= jshint.server.src %>',
        tasks: ['jshint:server', 'nodeunit'],
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit'],
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
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-update-json');

  // Default task.
  grunt.registerTask('default', ['update_json', 'bower:install', 'less', 'jshint', 'nodeunit', 'concurrent']);

};
