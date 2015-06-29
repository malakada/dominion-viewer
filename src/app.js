var Socket = require('./socket');
var React = require('react');

var socket = new Socket();

//var DominionClient = React.createFactory(require('./react/DominionClient.jsx'));
var DominionClient = require('./react/DominionClient.jsx');

var mountNode = document.getElementById("container");

React.render(<DominionClient />, mountNode);

socket.on('connect', function() {
  // this will happen on connect and also on reconnect.
});

socket.on('disconnect', function() {
});

socket.on('error', function() {
});
