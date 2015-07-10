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
  sortCardsByCost: function(cards) {
    if (cards instanceof Array) {
      var self = this;
      cards.sort(function(a, b) {
        var cardA = self.getCardInfo(a);
        var cardB = self.getCardInfo(b);

        if (cardA.cost < cardB.cost)
          return -1;
        if (cardA.cost > cardB.cost)
          return 1;
        return 0; 
      });

      return cards;
    }
  },
  render: function() {
    return (
      <div>
        <BasicCards cards={this.state.basicCards} getCardInfo={this.getCardInfo} />
        <KingdomCards cards={this.sortCardsByCost(this.state.kingdomCards)} getCardInfo={this.getCardInfo} />
        <HandCards cards={this.state.playerHand} getCardInfo={this.getCardInfo} />  
      </div>
    );
  },
});

module.exports = DominionClient;
