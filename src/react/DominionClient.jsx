/** @jsx React.DOM */

var React = require('react');
var KingdomCards = require('./KingdomCards.jsx');
var BasicCards = require('./BasicCards.jsx');
var HandCards = require('./HandCards.jsx');
var Socket = require('../socket');

var socket = new Socket();

var DominionClient = React.createClass({
  getInitialState: function() {
    return {
      hasGame: false,
    };
  },
  componentDidMount: function() {
    //var socket = new Socket();
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

    socket.on('gameLoaded', function() {
      self.setState({
        hasGame: true,
      });
    });

    socket.on('possibleMoves', function(moves) {
      self.setState({
        possibleMoves: moves,
      });
    });
  },
  getCardInfo: function(cardName) {
    return this.state.allCards[cardName];
  },
  sortCardsByCost: function(cards) {
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
  },
  makeMove: function(move) {
    socket.send('move', move);
  },
  render: function() {
    if (this.state.hasGame) {
      return (
        <div>
          <BasicCards cards={this.state.basicCards} getCardInfo={this.getCardInfo} possibleMoves={this.state.possibleMoves} makeMove={this.makeMove} />
          <KingdomCards cards={this.sortCardsByCost(this.state.kingdomCards)} getCardInfo={this.getCardInfo} possibleMoves={this.state.possibleMoves} makeMove={this.makeMove} />
          <HandCards cards={this.state.playerHand} getCardInfo={this.getCardInfo} possibleMoves={this.state.possibleMoves} makeMove={this.makeMove} />
        </div>
      );
    } else {
      return (
        <div>Loading....</div>
      );
    }
  },
});

module.exports = DominionClient;
