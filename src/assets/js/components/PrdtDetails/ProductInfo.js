var React = require("react")
var ProductImage = require("../PrdtDetails/ProductImage")

var ProductInfo = React.createClass({
  render: function () {
    var infoDetails = this.props.infoDetails
    let flowIndicator = this.props.flowIndicator
    var imageurl = this.props.hasOwnProperty("imageurl")
      ? this.props.imageurl
      : "-"
    var PutContainerFlag = this.props.putContainerFlag
    var arr1 = []
    let widthpatch = this.props.widthpatch 

    flowIndicator === "Pick"
      ? $.each(infoDetails, function (key, value) {
          return arr1.push(
            <tr>
              <td className="key"> {key} </td>
              <td className="value">{value} </td>
            </tr>
          )
          return arr1
        })
      : $.each(infoDetails, function (key, value) {
          if (
            key === "QlcodeDigits" &&
            value !== "" &&
            PutContainerFlag === true
          ) {
            arr1.push(
              <div className="detailsOuterWrapper">
                <span className="detailsDispValShort">{value}</span>
              </div>
            )
          } else if (key !== "QlcodeDigits") {
            arr1.push(
              <div className="detailsOuterWrapper">
                <div className="detailsInnerWrapper">
                  <span className="detailsDispName"> {key + ":"} </span>
                  <span className="detailsDispVal">{value}</span>
                </div>
              </div>
            )
          }
          return arr1
        })

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
          height: "549px",
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

module.exports = ProductInfo
