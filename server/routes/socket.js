'use strict';

var input = require('../controllers/input');

module.exports = function(sockets, socket) {
  socket.emit('input', input.val);
  socket.on('input', function(msg) {
    input.val = msg;
    sockets.emit('input', msg);
  });
};