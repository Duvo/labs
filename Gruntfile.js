'use strict';

module.exports = function(grunt) {
  
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);
  var path = require('path');

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
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
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
        tasks: ['jshint:server'],
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test'],
      },
    },    
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          nodeArgs: ['--debug'],
          ignore: ['public/**', 'test/**'],
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
      dev: {
        PORT: 3000,
        SERVER_DIR: path.resolve('server'),
      },
      test: {
        PORT: 3000,
        SERVER_DIR: path.resolve('server'),
        TEST_DIR: path.resolve('test')
      },
      coverage: {
        SERVER_DIR: path.resolve('test/coverage/instrument/server'),
        TEST_DIR: path.resolve('test')
      }
    },
    copy: {
      instrument: {
        files: [{
            expand: true,
            src: ['server/**/!(*.js)', 'public/**'],
            dest: 'test/coverage/instrument',
        }]
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
        src: ['test/!(coverage)/**/*.js']
      },
      unit: {
        src: ['test/unit/**/*.js']
      },
      html: {
        src: ['test/html/index_test.js']
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

  // Default task.
  grunt.registerTask('default', ['test', 'env:dev', 'concurrent']);
  
  grunt.registerTask('test', ['buildDev', 'env:test', 'mochaTest:all']);
  grunt.registerTask('cover', ['buildDev', 'env:coverage', 'instrument', 'copy:instrument', 'mochaTest:all',
    'storeCoverage', 'makeReport', 'coveralls', 'coverage']);

  grunt.registerTask('buildDev', ['update_json', 'clean', 'jshint', 'bower:install', 'less']);

};
