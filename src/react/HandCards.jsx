var React = require('react');
var Card = require('./Card.jsx');

var HandCards = React.createClass({
  propTypes: {
    cards: React.PropTypes.array,
    getCardInfo: React.PropTypes.func,
  },
  render: function() {
    var cards = [];
   
    if (this.props.cards) {
      for (var i = 0; i < this.props.cards.length; i++) {
        var card = this.props.cards[i];
        cards.push(<Card name={card.name} getCardInfo={this.props.getCardInfo} isPile={false} possibleMoves={this.props.possibleMoves} />);
      }
    }

    return(
      <div id="handCardContainer">
        {cards} 
      </div>
    );
  }
});

module.exports = HandCards;
