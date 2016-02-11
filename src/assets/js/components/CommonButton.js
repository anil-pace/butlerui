var React = require('react');
var CommonActions = require('../actions/CommonActions');
var appConstants = require('../constants/appConstants');
var mainstore = require('../stores/mainstore');


var CommonButton = React.createClass({

	performAction:function(module,action){
		var data = {
			"event_name": "",
            "event_data": {}
		};
		switch(module){
			case appConstants.PICK_FRONT :
				switch (action) {
					case appConstants.CONFIRM_TO_CONTINUE:
					data["event_name"] = "process_barcode";
                    data["event_data"]["barcode"] = mainstore.productDetails().product_barcode;
					CommonActions.postDataToInterface(data, "scan-item");
					break;
					default:
                    return true;
				}
				break;
			case appConstants.PUT_FRONT :
				switch (action) {
					case appConstants.CONFIRM:
					CommonActions.postDataToInterface(data);
					break;

					case appConstants.COMPLETE_PUT:
					CommonActions.postDataToInterface(data);
					break;

					case appConstants.PUT_FINISHED:
					CommonActions.postDataToInterface(data);
					break;

					default:
                    return true;
				}
				break;
				default:
            		return true;
		}
		  
	},

	render: function(){
		if (this.props.disabled == false){
		return (
			 	<a className = {this.props.color == "orange" ? "commonButton orange ": "commonButton black"} 
			 	onClick={this.performAction.bind(this, this.props.module, this.props.action)}>{this.props.text}</a>
			);
		}else 
		 return (
			<a className = {this.props.color == "orange" ? "commonButton disabled orange" : "commonButton disabled black"}>{this.props.text}</a>
		);
	}
});

module.exports = CommonButton;