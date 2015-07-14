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
  },
  updateCardInfo: function(name) {
    var info = this.props.getCardInfo(name);
    return {
      type: info.type,
      cost: info.cost,
      count: info.count, 
    };
  },
  render: function() {
    var htmlFriendlyName = this.props.name.replace(/ /g,"_");
    var idName = (this.props.isPile) ? 'supply-' + htmlFriendlyName : '';
    var className = 'card ' + htmlFriendlyName;
    
    if (this.props.isMini) {
      className += ' mini';
    }

    return (
      <div id={idName} className={className}>
        <div className="count">{this.state.count}</div>
      </div>
    );
  }
});

module.exports = Card;
