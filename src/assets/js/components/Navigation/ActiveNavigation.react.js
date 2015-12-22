var React = require('react');

var ActiveNavigation = React.createClass({
    render: function() {
        var compData = this.props.data;
        var message_args  = compData.message.slice(0);
        console.log(this.props.serverNavData);
       /* console.log(message_args);
       var m = message_args.unshift(compData.message[this.props.serverNavData.code]);
       console.log(m);*/
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
            			{this.props.serverNavData.description}
            		</div>
            	</div>
        );
    },
});

module.exports = ActiveNavigation;