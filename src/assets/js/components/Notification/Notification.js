var React = require('react');
var ActionCreators = require('../../actions/CommonActions');

var Notification = React.createClass({
    render: function() {
        var navMessagesJson = this.props.navMessagesJson;
        var compData = this.props.notification;
        var message_args  = this.props.notification.details.slice(0);
        var errorCode = this.props.notification.code;
            if(this.props.notification.level!=undefined && this.props.notification.level == "error")
                return (
                    <div className="notify-error" role="alert">
                    	<div className="error-icon">
                    		<div className="border-glyp">
                    			<span className="glyphicon glyphicon-remove"></span>
                    		</div>
                    	</div>
                    	{(function(){

                            if(navMessagesJson != undefined){
                                message_args.unshift(navMessagesJson[errorCode]);
                                var notification_message = _.apply(null, message_args);
                                return notification_message;
                               // return compData.description;
                            }
                           
                            }
                        )()}
                    </div>
                );  
            else
                return (
                    <div className="notify" role="alert">
                        <div className="success-icon">
                            <div className="border-glyp">
                                <span className="glyphicon glyphicon-ok"></span>
                            </div>
                        </div>
                        {(function(){

                            if(navMessagesJson != undefined){
                                message_args.unshift(navMessagesJson[errorCode]);
                                var notification_message = _.apply(null, message_args);
                                return notification_message;
                                //return compData.description;
                            }
                           
                            }
                        )()}
                    </div>
                );  

    }
});

module.exports = Notification;