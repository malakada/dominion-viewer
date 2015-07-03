/** @jsx React.DOM */

var React = require('react');
var KingdomCards = require('./KingdomCards.jsx');
var BasicCards = require('./BasicCards.jsx');
var HandCards = require('./HandCards.jsx');
var Socket = require('../socket');

var DominionClient = React.createClass({
  getInitialState: function() {
    return {
      basicCards: {},
      kingdomCards: {},
      playerHand: {},
    };
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
    
    socket.on('allCards', function(cards) {
      var basicCards = [];
      var kingdomCards = [];

      for (card in cards) {
        var includeCondition = cards[card].includeCondition;
        if (includeCondition === 'always') {
          basicCards.push(card);
        } else if (includeCondition === 'kingdomCard') {
          kingdomCards.push(card);
        }
      }

      self.setState({
        allCards: cards,
        basicCards: basicCards,
        kingdomCards: kingdomCards,
      });
    });
    
    socket.on('playerHand', function(hand) {
      self.setState({
        playerHand: hand,
      });
    });
  },
  getCardInfo: function(cardName) {
    return this.state.allCards[cardName];
  },
  render: function() {
    return (
      <div>
        <BasicCards cards={this.state.basicCards} getCardInfo={this.getCardInfo} />
        <KingdomCards cards={this.state.kingdomCards} getCardInfo={this.getCardInfo} />
        <HandCards cards={this.state.playerHand} getCardInfo={this.getCardInfo} />  
      </div>
    );
  },
});

module.exports = DominionClient;
