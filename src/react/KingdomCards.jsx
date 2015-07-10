var React = require('react');
var Card = require('./Card.jsx');

var KingdomCards = React.createClass({
  propTypes: {
    cards: React.PropTypes.array,
    getCardInfo: React.PropTypes.func,
  },
  render: function() {
    var cards = [];
    
    for (var i in this.props.cards) {
      var name = this.props.cards[i];
      var card = this.props.getCardInfo(name);
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
