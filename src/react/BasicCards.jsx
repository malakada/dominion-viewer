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
      cards.push(<Card name={name} getCardInfo={this.props.getCardInfo} isPile={true} />);
    }
    
    return(
      <div id="basicCardSupply">
        {cards} 
      </div>
    );
  }
});

module.exports = BasicCards;
