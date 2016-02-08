var React = require('react');
var PriceComponent = React.createClass({
    render: function() {

        return (

        	<div className="">
	        	<div className="row itemName">
	        		{this.props.title}
	        		ABCD
	        	</div>
	        	<div className="row itemPrice">
	        		$ {this.props.price}
	        	</div>
           	</div>
        )
    }
});

module.exports = PriceComponent;  