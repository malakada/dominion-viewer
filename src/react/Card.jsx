var React = require('react');

var Card = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    type: React.PropTypes.object,
    cost: React.PropTypes.number,
    isPile: React.PropTypes.bool,  
  },
  render: function() {
    var idName = (this.props.isPile) ? 'supply-' + this.props.name : '';
    var className = 'card ' + this.props.name;

    return (
      <div id={idName} className={className}></div>
    );
  }
});

module.exports = Card;
