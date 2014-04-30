'use strict';

module.exports = function(path) {
  return require((process.env.SERVER_DIR_COVERAGE || process.env.SERVER_DIR) + '/' + path);
};