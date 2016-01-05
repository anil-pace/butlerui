var React = require('react');
var ActionCreators = require('../../actions/CommonActions');

var Notification = React.createClass({
    render: function() {
            return (
                <div className="notify" role="alert">
                	<div className="success-icon">
                		<div className="border-glyp">
                			<span className="glyphicon glyphicon-ok"></span>
                		</div>
                	</div>
                	{this.props.notification.description}
                </div>
            );              
    }
});

module.exports = Notification;