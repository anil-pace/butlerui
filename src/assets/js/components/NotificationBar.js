var React = require('react');

var NotificationBar = React.createClass({
    render: function() {
        return (
            	<div className="row">
           		   <div className="notificationBar">
           				   <div className="col-md-6 col-sm-6 col-xs-12 notifier">
                          <div className="">
                              {this.props.notificationData.description}
                          </div>
                     </div>
           		   </div>
           	</div>
        );
    },
});

module.exports = NotificationBar;