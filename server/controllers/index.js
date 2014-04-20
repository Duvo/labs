'use strict';

exports.index = function(req, res) {
  res.sendfile(global.CONFIG.viewsPath + 'index.html');
};

exports.socket = function(req, res) {
  res.sendfile(global.CONFIG.viewsPath + 'socket.html');
};

exports.canvas = function(req, res) {
  res.sendfile(global.CONFIG.viewsPath + 'canvas.html');
};

exports.angularUI = function(req, res) {
  res.sendfile(global.CONFIG.viewsPath + 'angular-ui.html');
};