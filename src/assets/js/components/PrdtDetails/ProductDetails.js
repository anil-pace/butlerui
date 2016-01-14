var React = require('react');

var ProductInfo = require('./ProductInfo');
var ProductImage = require('./ProductImage');

var ProductDetails = React.createClass({
    render: function() {
        return (
            <div className="productTableInfo">
				<ProductImage srcURL={this.props.productInfo.product_local_image_url} details = {this.props.productInfo.product_description} />
                <div className="productHeader">
                    {_("Details")}
                </div>
                <ProductInfo infoDetails = {this.props.productInfo} />
			</div>
        );
    }
});

module.exports = ProductDetails;
