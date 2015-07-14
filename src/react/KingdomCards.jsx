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
      cards.push(<Card name={name} getCardInfo={this.props.getCardInfo} isPile={true} isMini={false} possibleMoves={this.props.possibleMoves} />);
    }
    
    return(
      <div id="kingdomCardSupply">
        {cards} 
      </div>
    );
  }
});

module.exports = KingdomCards;
