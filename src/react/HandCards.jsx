var React = require('react');
var Card = require('./Card.jsx');

var HandCards = React.createClass({
  propTypes: {
    cards: React.PropTypes.array,
  },
  render: function() {
    var cards = [];
    
    if (this.props.cards) {
      for (var i = 0; i < this.props.cards.length; i++) {
        var card = this.props.cards[i];
        cards.push(<Card name={card.name} type={card.type} cost={card.cost} isPile={true} />);
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
