var socket = new Socket();

socket.on('derp', function(hi) {
  console.log('hi: ', hi);
});

// butts

socket.on('connect', function() {
  // this will happen on connect and also on reconnect.
});

socket.on('disconnect', function() {
});

socket.on('error', function() {
});

