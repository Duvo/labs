'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../');

module.exports = {
  port: 3000,
  root: rootPath,
  viewsPath: rootPath + 'server/views/'
};

