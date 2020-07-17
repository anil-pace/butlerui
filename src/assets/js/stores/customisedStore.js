let arr1 = []
function customizePickingInstructions() {
  $.each(infoDetails, function (key, value) {
    if (key === "QlcodeDigits" && value !== "" && PutContainerFlag === true) {
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
              style={{ color: "blue", fontSize: "20px" }}
              className="detailsDispName"
            >
              {key + ":"}
            </span>
            <span
              style={{ color: "red", fontSize: "20px" }}
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
