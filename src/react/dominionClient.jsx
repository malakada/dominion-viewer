/** @jsx React.DOM */

var React = require('react');
var BasicCards = require('./BasicCards');

var DominionClient = React.createClass({
  render: function() {
    return (<BasicCards cards={cards} />);
  }
});

module.exports = DominionClient;
