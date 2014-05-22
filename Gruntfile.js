'use strict';

module.exports = function(grunt) {
  
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  // Project configuration.
  grunt.initConfig({
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
          'public/layout/styles/layout.css' : 'public/layout/lessStyles/layout.less',
          'public/socket/styles/main.css' : 'public/socket/lessStyles/main.less',
          'public/angular-ui/styles/main.css' : 'public/angular-ui/lessStyles/main.less',
          'public/index/styles/main.css' : 'public/index/lessStyles/main.less',
          'public/canvas/styles/main.css' : 'public/canvas/lessStyles/main.less',
          'public/real-time/styles/main.css' : 'public/real-time/lessStyles/main.less',
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
        files: ['<%= jshint.server.src %>', 'server/**/*.jade'],
        tasks: ['jshint:server'],
        options: {
          livereload: true
        }
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test']
      }
    },
    forever: {
      prod: {
        options: {
          index: 'server/server.js',
          logDir: 'logs'
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          nodeArgs: ['--debug'],
          watch: ['server/**/*'],
          cwd: __dirname
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
      prod: {
        ENV: 'PROD',
        PORT: 80,
        SERVER_DIR: path.resolve('server'),
        SOCKET_LOG: 1
      },
      dev: {
        ENV: 'DEV',
        PORT: 3000,
        SERVER_DIR: path.resolve('server'),
        SOCKET_LOG: 3
      },
      test: {
        ENV: 'TEST',
        PORT: 3001,
        SERVER_DIR: path.resolve('server'),
        TEST_DIR: path.resolve('test'),
        SOCKET_LOG: 3
      },
      coverage: {
        ENV: 'TEST',
        PORT: 3001,
        SERVER_DIR: path.resolve('test/coverage/instrument/server'),
        TEST_DIR: path.resolve('test'),
        SOCKET_LOG: 1
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
        src: ['test/!(coverage)/**/*_test.js']
      },
      page: {
        src: ['test/page/**/*_test.js']
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
          'statements': 80,
          'branches': 80,
          'lines': 80,
          'functions': 80
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
  grunt.registerTask('default', ['test', 'runDev']);
  grunt.registerTask('runDev', ['env:dev', 'concurrent']);
  grunt.registerTask('runProd', ['env:prod', 'forever:prod:start']);
  
  grunt.registerTask('test', ['buildDev', 'env:test', 'mochaTest']);
  grunt.registerTask('testNew', ['buildDev', 'env:test', 'mochaTest:page']);
  grunt.registerTask('cover', ['buildDev', 'env:coverage', 'instrument', 'copy:instrument', 'mochaTest',
    'storeCoverage', 'makeReport', 'coveralls', 'coverage']);

  grunt.registerTask('buildDev', ['update_json', 'clean', 'jshint', 'bower:install', 'less']);

};
