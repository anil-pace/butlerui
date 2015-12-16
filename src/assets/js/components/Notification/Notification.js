var React = require('react');
var ActionCreators = require('../../actions/CommonActions');

var Notification = React.createClass({
    render: function() {
            return (
                <div className="notify" role="alert">
                	<div className="glyphicon glyphicon-info-sign success-icon"></div>
                	{this.props.notification.description}
                </div>
            );              
    }
});

module.exports = Notification;