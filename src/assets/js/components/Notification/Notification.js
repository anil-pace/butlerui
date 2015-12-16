var React = require('react');
var ActionCreators = require('../../actions/CommonActions');

var Notification = React.createClass({
    render: function() {
            return (
                <div className="alert alert-success notify" role="alert">{this.props.notification.description}</div>
            );              
    }
});

module.exports = Notification;