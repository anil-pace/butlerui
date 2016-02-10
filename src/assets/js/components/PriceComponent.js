var React = require('react');
var PriceComponent = React.createClass({
    render: function() {

        return (

        	<div className="">
	        	<div className="row itemName">
	        		{this.props.data["Item_Name"]}
	        	</div>
	        	<div className="row itemPrice">
	        		$ {this.props.data["Item_Price"].toFixed(2)}
	        	</div>
           	</div>
        )
    }
});

module.exports = PriceComponent;  