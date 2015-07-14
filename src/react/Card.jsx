var React = require('react');

var Card = React.createClass({
  getInitialState: function() {
    return this.updateCardInfo(this.props.name);
  },
  componentWillRecieveProps: function(props) {
    this.updateCardInfo(props.name);
  },
  propTypes: {
    name: React.PropTypes.string,
    isPile: React.PropTypes.bool,  
    isMini: React.PropTypes.bool,
    getCardInfo: React.PropTypes.func,
    possibleMoves: React.PropTypes.array,
  },
  updateCardInfo: function(name) {
    var info = this.props.getCardInfo(name);
    return {
      type: info.type,
      cost: info.cost,
      count: info.count, 
    };
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
        <div className="count">{this.state.count}</div>
        <div className={purchaseClass}>+</div>
      </div>
    );
  }
});

module.exports = Card;
