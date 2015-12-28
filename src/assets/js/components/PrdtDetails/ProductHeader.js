var React = require('react');

var ProductHeader = React.createClass({
	render:function(){
		var details = this.props.details;

		return(
			<div className="productHeader">
				{details}
			</div>
			);
	}
});

module.exports = ProductHeader;