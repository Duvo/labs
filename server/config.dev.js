'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../');

module.exports = {
  root: rootPath,
  viewsPath: rootPath + 'server/views/',
  socketLog: 3
};

