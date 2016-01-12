var React = require('react');

var ProductInfo = React.createClass({
    render: function() {
        var infoDetails = this.props.infoDetails;
        var arr1 = [];
        $.each(infoDetails, function(key, value) {
            if(key != "product_local_image_url" )
            return arr1.push(
                <tr>
	  				<td className="key"> {key.toUpperCase()} </td>
	  				<td className="value">{value} </td>
  				</tr>

            );
        });

        return (
            <div className="table-wrapper">
				<table className="table">									
					<tbody>
						{arr1}
					</tbody>
				</table>
			</div>
        );
    }
});

module.exports = ProductInfo;
