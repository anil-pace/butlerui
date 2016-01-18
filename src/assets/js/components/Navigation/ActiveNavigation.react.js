var React = require('react');

var ActiveNavigation = React.createClass({
    render: function() {
        var server_message = this.props.serverNavData.description;
        var navMessagesJson = this.props.navMessagesJson;
        var compData = this.props.data;
        var message_args  = this.props.serverNavData.details.slice(0);
        var errorCode = this.props.serverNavData.code;
        return (
            	<div className="active-navigation">
                    {
                        (function(){
                            if(compData.showImage)
                            return (
                                    <div className = "nav-detail">
                                        <div className="index"><span>{compData.level}</span></div>
                                        <img src={compData.image} />
                                    </div>
                                );
                        })()
                    }
            		<div className = "action">
            		{(function(){
                        if(navMessagesJson != undefined){
                            message_args.unshift(navMessagesJson[errorCode]);
                            if(message_args[0] == undefined){
                              return server_message;  
                            }else{
                            var header_message = _.apply(null, message_args);
                            return header_message;
                            }
                        }
                       
                        }
                    )()}         
            		</div>
            	</div>
        );
    },
});

module.exports = ActiveNavigation;