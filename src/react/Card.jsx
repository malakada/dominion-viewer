var React = require('react');

var Card = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    type: React.PropTypes.object,
    cost: React.PropTypes.number,
    isPile: React.PropTypes.bool,  
  },
  render: function() {
    var idName = self.props.isPile ? 'supply-' + self.props.name : '';

    return (
      <div id={idName} className="card {self.props.name}"></div>
    );
  }
});

module.exports = Card;
