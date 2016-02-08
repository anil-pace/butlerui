var React = require('react');

var ActiveNavigation = React.createClass({
    render: function() {
        var server_message = this.props.serverNavData.description;
        var navMessagesJson = this.props.navMessagesJson;
        var compData = this.props.data;
        var message_args  = this.props.serverNavData.details.slice(0);
        var errorCode = this.props.serverNavData.code;
        var navId = this.props.navId;
        var level;
        var exceptionImg=(<img src={compData.image} />);

        if(compData.level == null){
            level ='' ;
        }else{
            level = (<div className="index"><span>{compData.level}</span></div>); 
        }
        return (
            	<div className="active-navigation">
                    {
                        (function(){
                            if(compData.showImage)
                            return (
                                    <div className = "nav-detail">
                                    {level}
                                    {(function(){
                                        if(navId !== "put_back_invalid_tote_item")
                                            return exceptionImg;
                                    })()}
                                    </div>
                                );
                        })()
                    }
            		<div className = "action">
                    {(function(){
                        if(navId == "put_back_invalid_tote_item")
                            return (<img className="exceptionImg" src={compData.image} />);
                        })()}
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