var React = require('react');

var Card = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    isPile: React.PropTypes.bool,  
    isMini: React.PropTypes.bool,
    possibleMoves: React.PropTypes.array,
    makeMove: React.PropTypes.func,
    type: React.PropTypes.string,
    cost: React.PropTypes.number,
    count: React.PropTypes.number,
  },
  isPurchasable: function() {
    var purchasable = false;
    for (var play in this.props.possibleMoves) {
      var move = this.props.possibleMoves[play];
      if (move.name === 'buy' && move.params.card === this.props.name) {
        purchasable = true;
      }
    }
    return purchasable;
  },
  onPurchaseClick: function() {
    var move = { name: 'buy', params: { card: this.props.name } };
    this.props.makeMove(move);
  },
  render: function() {
    var htmlFriendlyName = this.props.name.replace(/ /g,"_");
    var idName = (this.props.isPile) ? 'supply-' + htmlFriendlyName : '';
    var className = 'card ' + htmlFriendlyName;

    var purchaseClass = 'purchase' + ((!this.isPurchasable()) ? ' hide' : ''); 
    
    if (this.props.isMini) {
      className += ' mini';
    }

    return (
      <div id={idName} className={className}>
        <div className="count">{this.props.count}</div>
        <div className={purchaseClass} onClick={this.onPurchaseClick}>+</div>
      </div>
    );
  }
});

module.exports = Card;
