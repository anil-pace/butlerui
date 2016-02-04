var React = require('react');

var ActiveNavigation = React.createClass({
    render: function() {
        var server_message = this.props.data.description;
        var compData = this.props.data;
        var level;
        return (
            	<div className="active-navigation">
            		<div className= "action">
            		  {server_message}         
            		</div>
            	</div>
        )
    }
});

module.exports = ActiveNavigation;