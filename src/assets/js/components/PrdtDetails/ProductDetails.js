var React = require('react');

var ProductInfo = require('./ProductInfo');
var ProductImage = require('./ProductImage');

var ProductDetails = React.createClass({
    render: function() {

        var prodDetails = [{
            "product_info": {
                "product_description": "APPLE IPHONE 5S",
                "product_local_image_url": null,
                "product_dimension": 32.4,
                "product_sku": null,
                "product_name": null,
                "product_weight": null
            }
        }];

        var obj = prodDetails[0].product_info;




        return (
            <div className="productTableInfo">
				<ProductImage srcURL={prodDetails[0].product_info.product_local_image_url} details = {prodDetails[0].product_info.product_description} />
				<ProductInfo infoDetails = {obj} />
                <div className="productHeader">
                    {this.prop.details}
                </div>
				<div className="table-wrapper">
					<table className="table">									
						<tbody>
							<ProductInfo infoDetails = {obj} />
						</tbody>
					</table>
				</div>
			</div>
        );
    }
});

module.exports = ProductDetails;
