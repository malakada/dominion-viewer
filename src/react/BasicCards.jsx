var React = require('react');
var Card = require('./Card.jsx');

var BasicCards = React.createClass({
  propTypes: {
    cards: React.PropTypes.array,
    getCardInfo: React.PropTypes.func,
  },
  render: function() {
    var cards = [];
    
    for (var i in this.props.cards) {
      var name = this.props.cards[i];
      var card = this.props.getCardInfo(this.props.cards[i]);
      cards.push(<Card name={name} type={card.type} cost={card.cost} isPile={true} isMini={true} />);
    }
    
    return(
      <div id="basicCardSupply">
        {cards} 
      </div>
    );
  }
});

module.exports = BasicCards;
