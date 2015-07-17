var React = require('react');
var Card = require('./Card.jsx');

var KingdomCards = React.createClass({
  propTypes: {
    cards: React.PropTypes.array,
    getCardInfo: React.PropTypes.func,
    possibleMoves: React.PropTypes.array,
    makeMove: React.PropTypes.func,
  },
  render: function() {
    var cards = [];
    
    for (var i in this.props.cards) {
      var name = this.props.cards[i];
      var info = this.props.getCardInfo(name);
      var type = info.type;
      var cost = info.cost;
      var count = info.count;
      cards.push(<Card name={name} isPile={true} isMini={false} possibleMoves={this.props.possibleMoves} makeMove={this.props.makeMove} type={type} cost={cost} count={count} />);
    }
    
    return(
      <div id="kingdomCardSupply">
        {cards} 
      </div>
    );
  }
});

module.exports = KingdomCards;
