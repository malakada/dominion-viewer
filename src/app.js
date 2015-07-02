var React = require('react');

var DominionClient = require('./react/DominionClient.jsx');

var mountNode = document.getElementById("container");

React.render(<DominionClient />, mountNode);

