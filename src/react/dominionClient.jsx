/** @jsx React.DOM */

var React = require('react');
var BasicCards = require('./BasicCards.jsx');

var DominionClient = React.createClass({
  getInitialState: function() {
   return {
      basicCards: [{
        name: 'Estate',
        cost: '',
        type: '',
      },{
        name: 'Duchy',
        cost: '',
        type: '',
      },{
        name: 'Province',
        cost: '',
        type: '',
      },{
        name: 'Curse',
        cost: '',
        type: '',
      },{
        name: 'Copper',
        cost: '',
        type: '',
      },{
        name: 'Silver',
        cost: '',
        type: '',
      },{
        name: 'Gold',
        cost: '',
        type: '',
      }],
    }
  },
  render: function() {
    return (<BasicCards cards={this.state.basicCards} />);
  }
});

module.exports = DominionClient;
