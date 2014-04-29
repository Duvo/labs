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
        src: ['test/**/*.js'],
        options: {
          ignores: ['test/coverage/**/*.js']
        }
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
    },
    clean: {
      coverage: {
        src: ['test/coverage']
      }
    },
    /** TESTS **/
    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/server/'
      }
    },
    instrument: {
      files: 'server/**/*.js',
      options: {
        lazy: true,
        basePath: 'test/coverage/instrument/'
      }
    },
    mochaTest: {
      options: {
          reporter: 'spec'
        },
      all: {
        src: ['test/**/*.js']
      },
      unit: {
        src: ['test/unit/**/*.js']
      }
    },
    storeCoverage: {
      options: {
        dir: 'test/coverage/reports'
      }
    },
    makeReport: {
      src: 'test/coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'test/coverage/reports',
        print: 'detail'
      }
    },
    coverage: {
      options: {
        thresholds: {
          'statements': 50,
          'branches': 0,
          'lines': 50,
          'functions': 10
        },
        dir: 'coverage',
        root: 'test'
      }
    },
    coveralls: {
      options: {        
        force: true
      },
      mocha: {
        src: 'test/coverage/reports/lcov.info',
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-update-json');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-istanbul-coverage');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-coveralls');

  // Default task.
  grunt.registerTask('default', ['update_json', 'bower:install', 'less', 'jshint', 'test', 'concurrent']);
  grunt.registerTask('test', ['jshint', 'mochaTest:unit']);
  grunt.registerTask('cover', ['clean:coverage', 'jshint', 'env:coverage', 'instrument', 'mochaTest:all',
    'storeCoverage', 'makeReport', 'coveralls', 'coverage']);
  grunt.registerTask('build', ['clean', 'cover']);

};
