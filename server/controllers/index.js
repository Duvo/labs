'use strict';

exports.render = function(req, res) {
  res.sendfile(global.CONFIG.viewsPath + 'index.html');
};