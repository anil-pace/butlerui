var React = require("react")
var allresourceConstants = require("../constants/resourceConstants")
var mainstore = require("../stores/mainstore")
var ActionCreators = require("../actions/CommonActions")

var SplitPPS = React.createClass({
  showModal: function (data, type, e) {
    ActionCreators.showModal({
      data: data,
      type: type
    })
    $(".modal").modal()
    e.stopPropagation()
    return false
  },
  processData: function () {
    let groupInfo =
      this.props.groupInfo && this.props.groupInfo.ppsBinIds
        ? this.props.groupInfo.ppsBinIds
        : this.props.groupInfo
    var data = Object.assign({}, groupInfo || {})
    var binColors = Object.assign({}, groupInfo.ppsBinIdColors || {})
    var binInfo = Object.assign({}, this.props.groupInfo.ppsBinInfo || {})
    var leftCol = [],
      dockedGroup = this.props.docked || [],
      undockAwaited = this.props.undockAwaited || [],
      printReady = this.props.printReady || [],
      wrongUndock = this.props.wrongUndock || [],
      selectedBin = this.props.selectedbin || [],
      rightCol = [],
      centerCol = [],
      maxBlockCount = 0,
      maxLeftCount = 0,
      maxRightCount = 0,
      maxBlockHeight = 0,
      maxCenterCount = 0,
      style = null,
      maxWidth = 0
    dockedGroup = dockedGroup.filter(val => !selectedBin.includes(val))
    for (var key in data) {
      if (data[key] === allresourceConstants.BIN_GROUP_LEFT) {
        maxLeftCount++
      } else if (data[key] === allresourceConstants.BIN_GROUP_RIGHT) {
        maxRightCount++
      } else if (
        data[key] === allresourceConstants.BIN_GROUP_CENTER ||
        data[key] === allresourceConstants.BIN_GROUP_CENTER_TOP
      ) {
        maxCenterCount++
      }
    }

    maxBlockCount =
      maxCenterCount > 1
        ? maxCenterCount
        : maxLeftCount > maxRightCount
          ? maxLeftCount
          : maxRightCount

    maxBlockHeight =
      maxCenterCount > 0 ? 75 / maxBlockCount : 50 / maxBlockCount;
    maxWidth = ((maxBlockHeight / 100) * 360).toFixed(3);

    style = {
      height: (maxBlockHeight >= 50 ? 25 : maxBlockHeight) + "%",
      width: (maxWidth <= 100 ? maxWidth : 100) + "px"
    }
    if (this.props.displayBinId) {
      fontSize =
        maxCenterCount > 0
          ? (70 / 28) * maxBlockHeight + "px"
          : (50 / 28) * maxBlockHeight + "px"
      padding = "0%"

      /* Start =>special condition for pick_front_slot_scan to limit font size when only one bin is there */
      if (parseInt(fontSize, 10) > parseInt("88px", 10)) {
        ; (fontSize = 62.5 + "px"), (padding = 0 + "%")
      }
      /* End */

      style = Object.assign({}, style, {
        color: "#fff",
        fontSize: fontSize,
        padding: padding
      })
    }
    var dockedclassName =
      this.props.ruleset === "withBorder"
        ? "dockedCont bottomBorderLeft"
        : "dockedCont"
    var undockclassName =
      this.props.ruleset === "withBorder"
        ? "undockedCont bottomBorderLeft"
        : "undockedCont"
    var printReadyclassName =
      this.props.ruleset === "withBorder"
        ? "printReadyCont bottomBorderLeft"
        : "printReadyCont"
    var wrongUndockclassName =
      this.props.ruleset === "withBorder"
        ? "wrongUndockCont bottomBorderLeft"
        : "wrongUndockCont"
    var selectedbinclassName =
      this.props.ruleset === "withBorder"
        ? "selectedbinCont bottomBorderLeft"
        : "selectedbin"

    var dockedRightclassName =
      this.props.ruleset === "withBorder"
        ? "dockedCont bottomBorderRight"
        : "dockedCont"
    var undockRigtclassName =
      this.props.ruleset === "withBorder"
        ? "undockedCont bottomBorderRight"
        : "undockedCont"
    var printReadyRigtclassName =
      this.props.ruleset === "withBorder"
        ? "printReadyCont bottomBorderRight"
        : "printReadyCont"
    var wrongUndockRightclassName =
      this.props.ruleset === "withBorder"
        ? "wrongUndockCont bottomBorderRight"
        : "wrongUndockCont"
    var selectedbinRightclassName =
      this.props.ruleset === "withBorder"
        ? "selectedbinCont bottomBorderRight"
        : "selectedbin"

    var showBinIcon
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        if (Object.keys(binInfo).length > 0) {
          if (
            binInfo[k].length > 0 &&
            data[k] === allresourceConstants.BIN_GROUP_LEFT
          ) {
            showBinIcon = (
              <div
                className="tote"
                style={{
                  fontSize: "0.5em",
                  position: "absolute",
                  right: "0.1em"
                }}
              >
                <span
                  className="glyphicon glyphicon-info-sign info-icon"
                  onClick={this.showModal.bind(this, binInfo[k], "bin-info")}
                />
              </div>
            )
          }

          else if (
            binInfo[k].length > 0 &&
            data[k] === allresourceConstants.BIN_GROUP_RIGHT
          ) {
            showBinIcon = (
              <div
                className="tote"
                style={{
                  fontSize: "0.5em",
                  position: "absolute",
                  marginLeft: "0.1em"
                }}
              >
                <span
                  className="glyphicon glyphicon-info-sign info-icon"
                  onClick={this.showModal.bind(this, binInfo[k], "bin-info")}
                />
              </div>
            )
          } else if (
            binInfo[k].length > 0 &&
            (data[k] === allresourceConstants.BIN_GROUP_CENTER ||
              data[k] === allresourceConstants.BIN_GROUP_CENTER_TOP)
          ) {
            showBinIcon = (
              <div
                className="tote"
                style={{
                  fontSize: "0.5em",
                  position: "absolute",
                  marginLeft: "0.1em"
                }}
              >
                <span
                  className="glyphicon glyphicon-info-sign info-icon"
                  onClick={this.showModal.bind(this, binInfo[k], "bin-info")}
                />
              </div>
            )
          }
        } else {
          showBinIcon = ""
        }
        if (data[k] === allresourceConstants.BIN_GROUP_LEFT) {
          if (dockedGroup.indexOf(k) >= 0) {
            leftCol.push(
              <li key={k} style={style} className={dockedclassName}>
                {showBinIcon}
                <span
                  className={
                    this.props.ruleset === "withBorder" ? "" : "docked"
                  }
                >
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else if (undockAwaited.indexOf(k) >= 0) {
            leftCol.push(
              <li key={k} style={style} className={undockclassName}>
                {showBinIcon}
                <span
                  style={{ backgroundColor: binColors[k] }}
                  className="undock left"
                >
                  &nbsp;
                </span>
              </li>
            )
          } else if (printReady.indexOf(k) >= 0) {
            leftCol.push(
              <li key={k} style={style} className={printReadyclassName}>
                {showBinIcon}
                <span className="printReady left">&nbsp;</span>
              </li>
            )
          } else if (wrongUndock.indexOf(k) >= 0) {
            leftCol.push(
              <li key={k} style={style} className={wrongUndockclassName}>
                {showBinIcon}
                <span className="wrongUndock left">
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else if (selectedBin.indexOf(k) >= 0) {
            leftCol.push(
              <li key={k} style={style} className={selectedbinclassName}>
                {showBinIcon}
                <span className="selectedbin">
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else {
            leftCol.push(
              <li
                key={k}
                style={style}
                className={
                  this.props.ruleset === "withBorder"
                    ? "bottomBorderLeft padding noBackGround"
                    : "padding noBackGround"
                }
              >
                {showBinIcon}
                <span>{this.props.displayBinId ? k : null}</span>
              </li>
            )
          }
        } else if (data[k] === allresourceConstants.BIN_GROUP_RIGHT) {
          if (dockedGroup.indexOf(k) >= 0) {
            rightCol.push(
              <li key={k} style={style} className={dockedRightclassName}>
                {showBinIcon}
                <span
                  className={
                    this.props.ruleset === "withBorder" ? "" : "docked"
                  }
                >
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else if (undockAwaited.indexOf(k) >= 0) {
            rightCol.push(
              <li key={k} style={style} className={undockRigtclassName}>
                {showBinIcon}
                <span
                  style={{ backgroundColor: binColors[k] }}
                  className="undock right"
                >
                  &nbsp;
                </span>
              </li>
            )
          } else if (printReady.indexOf(k) >= 0) {
            rightCol.push(
              <li key={k} style={style} className={printReadyRigtclassName}>
                {showBinIcon}
                <span className="printReady right">&nbsp;</span>
              </li>
            )
          } else if (wrongUndock.indexOf(k) >= 0) {
            rightCol.push(
              <li key={k} style={style} className={wrongUndockRightclassName}>
                {showBinIcon}
                <span className="wrongUndock right">
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else if (selectedBin.indexOf(k) >= 0) {
            rightCol.push(
              <li key={k} style={style} className={selectedbinRightclassName}>
                {showBinIcon}
                <span className="selectedbin">
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else {
            rightCol.push(
              <li
                key={k}
                style={style}
                className={
                  this.props.ruleset === "withBorder"
                    ? "bottomBorderRight padding noBackGround"
                    : "padding noBackGround"
                }
              >
                {showBinIcon}
                <span>{this.props.displayBinId ? k : null}</span>
              </li>
            )
          }
        } else if (
          data[k] === allresourceConstants.BIN_GROUP_CENTER ||
          data[k] === allresourceConstants.BIN_GROUP_CENTER_TOP
        ) {
          if (dockedGroup.indexOf(k) >= 0) {
            centerCol.push(
              <li key={k} style={style} className="dockedCont">
                {showBinIcon}
                <span
                  className={
                    this.props.ruleset === "withBorder" ? "" : "docked"
                  }
                >
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else if (undockAwaited.indexOf(k) >= 0) {
            centerCol.push(
              <li key={k} style={style} className="undockedCont">
                {showBinIcon}
                <span>{this.props.displayBinId ? k : null}</span>
                <span
                  style={{ backgroundColor: binColors[k] }}
                  className="undock below"
                ></span>
              </li>
            )
          } else if (printReady.indexOf(k) >= 0) {
            centerCol.push(
              <li key={k} style={style} className="printReadyCont">
                {showBinIcon}
                <span>{this.props.displayBinId ? k : null}</span>
                <span className="printReady below"></span>
              </li>
            )
          } else if (wrongUndock.indexOf(k) >= 0) {
            centerCol.push(
              <li key={k} style={style} className={"wrongUndockCont"}>
                {showBinIcon}
                <span className="wrongUndock left">
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else if (selectedBin.indexOf(k) >= 0) {
            centerCol.push(
              <li key={k} style={style} className={"selectedbinCont"}>
                {showBinIcon}
                <span className="selectedbin">
                  {this.props.displayBinId ? k : null}
                </span>
              </li>
            )
          } else {
            centerCol.push(
              <li className="noBackGround" key={k} style={style}>
                <span>{this.props.displayBinId ? k : null}</span>
              </li>
            )
          }
        }
      }
    }

    return {
      leftCol: leftCol,
      rightCol: rightCol,
      centerCol: centerCol
    }
  },
  render: function () {
    var mapStructure = this.processData()
    var orientation = Number(this.props.orientation || 0)
    var transformStyle = {
      transform: "rotate(" + (orientation + "deg)")
    }
    var textTransform = {
      transform: "rotate(" + ((orientation > 90 ? 180 : 0) + "deg)")
    }
    var customizeClassSplitPPS = this.props.customizeClassSplitPPS

    const seatType = mainstore.getSeatType()
    if (seatType === "back") {
      return (
        <div
          className={
            customizeClassSplitPPS
              ? "splitPPSWrapperForPickBack " + customizeClassSplitPPS
              : "splitPPSWrapperForPickBack"
          }
          style={transformStyle}
        >
          <div className="mapCont">
            <div className={"col4 three"}>
              {mapStructure.centerCol.length >= 1 ? (
                <ul>{mapStructure.centerCol}</ul>
              ) : (
                  ""
                )}
            </div>

            <div className={"col1 three"}>
              {mapStructure.leftCol.length >= 1 ? (
                <ul
                  className={
                    this.props.ruleset === "withBorder" ? "withBorderLeft" : ""
                  }
                >
                  {mapStructure.leftCol}
                </ul>
              ) : (
                  ""
                )}
            </div>

            <div className="col2 spriteIcons"></div>
            <div className={"col3 three"}>
              {mapStructure.rightCol.length >= 1 ? (
                <ul
                  className={
                    this.props.ruleset === "withBorder" ? "withBorder" : ""
                  }
                >
                  {mapStructure.rightCol}
                </ul>
              ) : (
                  ""
                )}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div
          className={
            customizeClassSplitPPS
              ? "splitPPSWrapper " + customizeClassSplitPPS
              : "splitPPSWrapper"
          }
          style={transformStyle}
        >
          <div className="mapCont">
            <div className="msuSpace" style={textTransform}>
              &nbsp;
            </div>
            <div className={"col1 three"}>
              {mapStructure.leftCol.length >= 1 ? (
                <ul
                  className={
                    this.props.ruleset === "withBorder" ? "withBorderLeft" : ""
                  }
                >
                  {mapStructure.leftCol}
                </ul>
              ) : (
                  ""
                )}
            </div>
            <div className="col2 spriteIcons"></div>
            <div className={"col3 three"}>
              {mapStructure.rightCol.length >= 1 ? (
                <ul
                  className={
                    this.props.ruleset === "withBorder" ? "withBorder" : ""
                  }
                >
                  {mapStructure.rightCol}
                </ul>
              ) : (
                  ""
                )}
            </div>

            <div className={"col4 three"}>
              {mapStructure.centerCol.length >= 1 ? (
                <ul>{mapStructure.centerCol}</ul>
              ) : (
                  ""
                )}
            </div>
          </div>
        </div>
      )
    }
  }
})

module.exports = SplitPPS
