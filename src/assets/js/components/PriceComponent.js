var React = require('react');
var PriceComponent = React.createClass({
    render: function() {

        return (

        	<div className="">
	        	<div className="row itemName">
	        		{this.props.data.title}
	        	</div>
	        	<div className="row itemPrice">
	        		$ {this.props.data.price}
	        	</div>
           	</div>
        )
    }
});

module.exports = PriceComponent;  