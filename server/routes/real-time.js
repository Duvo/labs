'use strict';

var realTime = require('../controllers/real-time');

/**
 * Real-Time module sockets routing.
 * @param {Socket} socket
 */
module.exports = function(socket) {
  socket.on('rt:newCube', function(/*msg/*, fn*/) {
    realTime.newCube();
  });
  socket.on('rt:input', function(msg/*, fn*/) {
    console.log(msg);
    realTime.handleInput(msg);
  });

};


