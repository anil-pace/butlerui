var React = require("react")
var $ = require("jquery")

var CustomisedStore = function (infoDetails, flowIndicator, arr1) {
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
                <span
                  style={{ fontSize: "25px", color: "blue" }}
                  className="detailsDispName "
                >
                  {" "}
                  {key + ":"}{" "}
                </span>

                <span
                  style={{ fontSize: "25px", color: "red", fontWeight: 700 }}
                  className="detailsDispVal"
                >
                  {value}
                </span>
              </div>
            </div>
          )
        }
        return arr1
      })
}

// var CustomisedStore = function () {
//   return (
//     <div>
//       Sudivya Thakkar12324o234oo
//       <span>Arvind San</span>
//     </div>
//   )
// }

module.exports = CustomisedStore
