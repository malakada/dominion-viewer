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
  isPlayable: function() {
    var playable = false;
    for (var play in this.props.possibleMoves) {
      var move = this.props.possibleMoves[play];
      if (move.name === 'play' && move.params.card === this.props.name) {
        playable = true;
      }
    }
    return playable;
  },
  onPlayClick: function() {
    var move = { name: 'play', params: { card: this.props.name } };
    this.props.makeMove(move);
  },
  onPurchaseClick: function() {
    var move = { name: 'buy', params: { card: this.props.name } };
    this.props.makeMove(move);
  },
  render: function() {
    var htmlFriendlyName = this.props.name.replace(/ /g,"_");
    var idName = (this.props.isPile) ? 'supply-' + htmlFriendlyName : '';
    var className = 'card ' + htmlFriendlyName;

    var purchaseClass = 'circle-badge purchase' + ((!this.isPurchasable()) ? ' hide' : ''); 
    var playableClass = 'circle-badge play' + ((!this.isPlayable()) ? ' hide': '');
    
    return (
      <div id={idName} className={className}>
        <div className="circle-badge count">{this.props.count}</div>
        <div className="circle-badge cost">{this.props.cost}</div>
        <div className={purchaseClass} onClick={this.onPurchaseClick}>+</div>
        <div className={playableClass} onClick={this.onPlayClick}>Play</div>
      </div>
    );
  }
});

module.exports = Card;
