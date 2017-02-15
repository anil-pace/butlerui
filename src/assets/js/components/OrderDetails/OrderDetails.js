var React = require("react");
var allresourceConstants = require('../../constants/resourceConstants');
var OrderRow = require('./OrderRow');

var OrderDetails = React.createClass({
	render : function(){

		var orderData =this.props.orderData;
		var orderRowArr = [];

		for(var k in orderData){
			orderRowArr.push((<OrderRow orderKey={k} orderValue={orderData[k]} />))
		}
		return (
				<div className="orderDetailsWrapper">
					{orderRowArr}
				</div>
			);
	}
});

module.exports  = OrderDetails;