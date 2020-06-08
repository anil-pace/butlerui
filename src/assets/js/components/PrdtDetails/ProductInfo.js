var React = require('react');

var ProductInfo = React.createClass({
<<<<<<< HEAD
    render: function() {
        var infoDetails = this.props.infoDetails;
        var arr1 = [];
        $.each(infoDetails, function(key, value) {
            return arr1.push(
                <tr>
	  				<td className="key"> {key} </td>
	  				<td className="value">{value} </td>
  				</tr>
=======
  render: function () {
    var infoDetails = this.props.infoDetails
    let flowIndicator = this.props.flowIndicator
    var imageurl = this.props.hasOwnProperty("imageurl")
      ? this.props.imageurl
      : "-"
    var PutContainerFlag = this.props.putContainerFlag
    var arr1 = []
    let widthpatch = this.props.widthpatch 
    let heightpatch = this.props.heightpatch 
>>>>>>> e16764346... BSS-24252: [UDP flow]- The information box is coming distorted on put front screen.

            );
        });

<<<<<<< HEAD
        return (
            <div className="table-wrapper" style={{overflow:"scroll" }}>
				<table className="table">									
					<tbody>
						{arr1}
					</tbody>
				</table>
			</div>
        );
    }
});
=======
    return flowIndicator === "Pick" ? (
      <div className="table-wrapper">
        <table className="table">
          <tbody>{arr1}</tbody>
        </table>
      </div>
    ) : (
      <div
        className="packingBoxTableInfo"
        style={{
           width:   widthpatch!== '' ? widthpatch : "520px",
           height:  heightpatch!== '' ? heightpatch : "549px",
          display: "block",
          marginLeft: "0",
        }}
      >
        {imageurl !== "-" ? (
          <div className="packingBoxImage">
            <ProductImage srcURL={imageurl} />
          </div>
        ) : (
          ""
        )}
        {arr1}
      </div>
    )
  },
})
>>>>>>> e16764346... BSS-24252: [UDP flow]- The information box is coming distorted on put front screen.

module.exports = ProductInfo;
