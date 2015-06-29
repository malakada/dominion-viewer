var React = require('react');
var Card = require('./card');

var BasicCards = React.createClass({
  propTypes: {
    cards: React.PropTypes.array,
  },
  render: function() {
    var cards = [];
    
    for (var i = 0; i < this.props.cards.length; i++) {
      var card = this.props.cards[i];
      cards.push(<Card name={card.name} type={card.type} cost={card.cost} isPile={true} />);
    }
    
    return(
      <div id="basicCardSupply">
        {cards} 
      </div>
    );
  }
});
