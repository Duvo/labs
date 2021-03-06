'use strict';

module.exports = function(app) {

  // Home route.
  var index = require('../controllers/index');

  app.get('/', index.index);
  app.get('/angular-ui', index.angularUI);
  app.get('/canvas', index.canvas);
  app.get('/socket', index.socket);
  app.get('/real-time', index.realTime);
};