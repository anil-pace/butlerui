var React = require('react');
var CommonActions = require('../actions/CommonActions');

var ImageComponent = React.createClass({

	selectItem:function(order_Id, orderline_id, productSku){
		var data = {
                    "orders": [{
                        "order_id": order_Id,
                        "orderlines": [{
                            "orderline_id": orderline_id,
                            "qty": 1,
                            "filter_parameters": [
                               productSku
                            ],
                            "preference_params": [{
                                "param_name": "order by",
                                "param_value": "product_weight",
                                "extra_key": "ASC"
                            }]

                        }]
                    }]
            };
                console.log("data");
                console.log(data["event_data"]);
		CommonActions.postDataToInterface(data);
	},

    render: function() {
        var order_Id,orderline_id,productSku,orderIndex;
        orderIndex = this.props.orderIndex;
        order_Id = "ORD-00" + orderIndex ;
        orderline_id = order_Id + "_" + orderIndex ;
        
        existingId = "product_sku = '2001'";
        productSku = existingId .replace(/(\d+)+/g, function(match, number) {
               return parseInt(number) + orderIndex ;
        });

        return (
            <div className="itemImage" onClick={ this.props.imageClickable== true ? this.selectItem.bind(this, order_Id, orderline_id, productSku ) : ""}>
           		<img className="img-responsive" src={this.props.data["Image_url"]} alt="PLACEHOLDER" />
           	</div>
        );
    }
});

module.exports = ImageComponent;