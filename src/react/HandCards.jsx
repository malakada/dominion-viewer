var React = require('react');
var Card = require('./Card.jsx');

var HandCards = React.createClass({
  propTypes: {
    cards: React.PropTypes.array,
    getCardInfo: React.PropTypes.func,
    possibleMoves: React.PropTypes.array,
    makeMove: React.PropTypes.func,
  },
  render: function() {
    var cards = [];
   
    if (this.props.cards) {
      for (var i = 0; i < this.props.cards.length; i++) {
        var card = this.props.cards[i];
        var info = this.props.getCardInfo(card.name);
        var type = info.type;
        var cost = info.cost;
        var count = info.count;
        cards.push(<Card name={card.name} isPile={false} possibleMoves={this.props.possibleMoves} makeMove={this.props.makeMove} type={type} cost={cost} count={count} />);
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
