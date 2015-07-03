var React = require('react');

var Card = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    type: React.PropTypes.object,
    cost: React.PropTypes.number,
    isPile: React.PropTypes.bool,  
  },
  render: function() {
    var htmlFriendlyName = this.props.name.replace(/ /g,"_");
    var idName = (this.props.isPile) ? 'supply-' + htmlFriendlyName : '';
    var className = 'card ' + htmlFriendlyName;

    return (
      <div id={idName} className={className}></div>
    );
  }
});

module.exports = Card;
