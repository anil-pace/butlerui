var React = require('react');

var ProductImage = React.createClass({
	render:function(){
		var srcURL = this.props.srcURL;
		var details = this.props.details;

		return(
			<div className="productImage">
				<img className="img-responsive" src={srcURL} />
			</div>
			);
	}
});

module.exports = ProductImage;