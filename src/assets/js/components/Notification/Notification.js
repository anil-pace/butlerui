var React = require('react');
var ActionCreators = require('../../actions/CommonActions');

var Notification = React.createClass({
    render: function() {
            return (
                <div className="notify" role="alert">
                	<div className="glyphicon glyphicon-ok success-icon"></div>
                	{this.props.notification.description}
                </div>
            );              
    }
});

module.exports = Notification;