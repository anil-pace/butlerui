var React = require('react');

var ProductInfo = React.createClass({
    render: function() {
        var infoDetails = this.props.infoDetails;
        var arr1 = [];
        $.each(infoDetails, function(key, value) {
            return arr1.push(
                <tr>
	  				<td className="key"> {key !== 'QlcodeDigits' ? key : ''} </td>
	  				<td className="value" ><span style={key === 'QlcodeDigits' ? {fontWeight: 400, fontSize: '90px', color: "#4D5055", width: "385px" } : {}}>{value}</span> </td>
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
