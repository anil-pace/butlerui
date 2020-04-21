var React = require('react');

var ProductInfo = React.createClass({
    render: function() {
        var infoDetails = this.props.infoDetails;
        var imageurl = this.props.hasOwnProperty('imageurl') ? this.props.imageurl : '-';
        var PutContainerFlag = this.props.putContainerFlag;
        var arr1 = [];
        $.each(infoDetails, function(key, value) {
            return arr1.push(
                <tr>
	  				<td className="key"> {key} </td>
	  				<td className="value">{value} </td>
  				</tr>

            );
        });

        return (
            <div className="packingBoxTableInfo" style={{width: "480px",
                height: "549px",
                marginLeft: "18%", display:"block"}}>
                    {imageurl !== '-' ? 
            <div className="packingBoxImage">
            <ProductImage srcURL={imageurl} />
            </div> : ''}
            {arr1}
        </div>
        );
    }
});

module.exports = ProductInfo;
