var React = require("react")
var ProductImage = require("../PrdtDetails/ProductImage")
var CustomisedStore = require("../../stores/customisedStore")

var ProductInfo = React.createClass({
  customizedJSX: false,
  validateCustomizedJSX: function (CustomisedStore) {
    const isValid =
      typeof CustomisedStore === "function" &&
      React.isValidElement(<CustomisedStore />)
    if (isValid && CustomisedStore) {
      return { customJSX: true, CustomisedStore: CustomisedStore }
    } else {
      return { customJSX: false }
    }
  },
  componentDidMount() {
    this.customizedJSX =
      CustomisedStore && this.validateCustomizedJSX(CustomisedStore)
  },

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

    // Customised the Product Info component as per the client
    // Valid JSX to be received if customization needed

    if (this.customizedJSX && this.customizedJSX.customJSX) {
      arr1.push(
        this.customizedJSX.CustomisedStore(
          infoDetails,
          flowIndicator,
          arr1,
          PutContainerFlag
        )
      )
    } else {
      flowIndicator === "Pick"
        ? $.each(infoDetails, function (key, value) {
            return arr1.push(
              <tr>
                <td className="key"> {key} </td>
                <td className="value">{value} </td>
              </tr>
            )
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
                    <span className="detailsDispName "> {key + ":"} </span>
                    <span className="detailsDispVal">{value}</span>
                  </div>
                </div>
              )
            }
            return arr1
          })
    }

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
          width: widthpatch !== "" ? widthpatch : "520px",
          height: heightpatch !== "" ? heightpatch : "549px",
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
