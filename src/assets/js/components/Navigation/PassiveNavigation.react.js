var React = require('react');

var PassiveNavigation = React.createClass({
    render: function() {
        return (
            	<div className="passive-navigation">
                    <div className = "nav-detail">
                        <div className="index"><span>{this.props.data.id}</span></div>
                        <img src={this.props.data.image} />
                        <div className = "info">{this.props.data.action}</div>
                    </div>
                </div>
        );
    },
});

module.exports = PassiveNavigation;