var React = require('react');
var Card = require('./Card.jsx');

var KingdomCards = React.createClass({
  getInitialState: function() {
    return {
      sortedCards: [],
    };
  },
  propTypes: {
    cards: React.PropTypes.array,
    getCardInfo: React.PropTypes.func,
  },
  componentWillMount: function() {
    this.sortCards(this.props.cards);
  },
  componentWillReceiveProps: function(nextProps) {
    this.sortCards(nextProps.cards);
  },
  sortCards: function(cards) {
    var self = this;
    if (cards && Object.keys(cards).length > 0) {
      var sortedCards = cards.sort(function(a, b) {
        var cardA = self.props.getCardInfo(a);
        var cardB = self.props.getCardInfo(b);

        if (cardA.cost < cardB.cost)
          return -1;
        if (cardA.cost > cardB.cost)
          return 1;
        return 0; 
      });

      this.setState({
        sortedCards: sortedCards,
      });
    }
  },
  render: function() {
    var cards = [];
    
    for (var i in this.state.sortedCards) {
      var name = this.props.cards[i];
      var card = this.props.getCardInfo(this.props.cards[i]);
      cards.push(<Card name={name} type={card.type} cost={card.cost} isPile={true} />);
    }
    
    return(
      <div id="kingdomCardSupply">
        {cards} 
      </div>
    );
  }
});

module.exports = KingdomCards;
