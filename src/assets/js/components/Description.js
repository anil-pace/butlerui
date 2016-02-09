var React = require('react');
var Description = React.createClass({
    render: function() {
        return (
        	<div className="itemDescription">
            	 {this.props.data.description}
            </div>
        );
    }
});

module.exports = Description;  