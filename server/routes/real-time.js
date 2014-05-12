'use strict';

/**
 * Real-Time module sockets routing.
 * @param {Socket} socket
 */
module.exports = function(socket) {
  socket.on('rt:newPlayer', function(msg/*, fn*/) {
    console.log(msg);
  });

};


