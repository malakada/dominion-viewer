/** @jsx React.DOM */

var React = require('react');
var BasicCards = require('./BasicCards.jsx');
var HandCards = require('./HandCards.jsx');
var Socket = require('../socket');

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
  componentDidMount: function() {
    var socket = new Socket();
    var self = this;

    socket.on('connect', function() {
      // this will happen on connect and also on reconnect.
    });

    socket.on('disconnect', function() {
    });

    socket.on('error', function() {
    });
    
    socket.on('playerHand', function(hand) {
      self.playerHand(hand);
    });
  },
  render: function() {
    return (
     <div>
      <BasicCards cards={this.state.basicCards} />
      <HandCards card={this.state.playerHand} />  
      </div>
    );
  },
  playerHand: function(hand) {
    // hooray we have a hand
    // update state for hand
    // make hand component
    // make sure hand component draws things
    this.setState({
      playerHand: hand,
    });
  },
});

module.exports = DominionClient;
