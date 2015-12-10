var React = require('react');

var ActiveNavigation = React.createClass({
    render: function() {
        var compData = this.props.data;
        return (
            	<div className="active-navigation">
                    {
                        (function(){
                            if(compData.showImage)
                            return (
                                    <div className = "nav-detail">
                                        <div className="index"><span>{compData.id}</span></div>
                                        <img src={compData.image} />
                                    </div>
                                );
                        })()
                    }
            		<div className = "action">
            			{compData.action}
            		</div>
            	</div>
        );
    },
});

module.exports = ActiveNavigation;