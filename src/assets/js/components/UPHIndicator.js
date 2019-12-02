/**
 * Created by Sudivya
 */
var React = require("react")
var appConstants = require("../constants/appConstants")
var mainstore = require("../stores/mainstore")

function getState() {
  return {
    uphCount: mainstore.getUPHCount()
  }
}
var UPHIndicator = React.createClass({
  dangerZone: false,
  dangerZoneValue: "",
  getInitialState: function() {
    return getState()
  },
  componentDidMount: function() {
    mainstore.addChangeListener(this.onChange)
  },
  onChange: function() {
    const { uphCount, lowerThreshold, upperThreshold } = this.props
    if (uphCount < lowerThreshold) {
      this.setState({ dangerZone: true, dangerZoneValue: uphCount })
    } else if (uphCount > lowerThreshold - 1 && uphCount < upperThreshold) {
      this.setState({ warningZone: true, warningZoneValue: uphCount })
    } else {
      this.setState({ comfortZone: true, comfortZoneValue: uphCount })
    }
  },
  render: function(props) {
    const { lowerThreshold, upperThreshold } = this.props
    const {
      dangerZoneValue,
      warningZoneValue,
      comfortZoneValue,
      dangerZone,
      warningZone,
      comfortZone
    } = this.state

    return (
      <div className="uphIndicator-wrapper">
        <div className="zoneWrapper">
          <div className="uph-label">
            <span>UPH Indicator</span>
          </div>
          <div
            className={"zones dangerZone " + (dangerZone ? "zoneValue" : "")}
          >
            {dangerZoneValue}
          </div>
          <div
            className={"zones warningZone " + (warningZone ? "zoneValue" : "")}
          >
            {warningZoneValue}
          </div>
          <div
            className={"zones comfortZone " + (comfortZone ? "zoneValue" : "")}
          >
            {comfortZoneValue}
          </div>
        </div>
        <div className="threshold-wrapper">
          <span className="lowerThreshold">{lowerThreshold}</span>
          <span className="upperThreshold">{upperThreshold}</span>
        </div>
      </div>

      // </div>
    )
  }
})
module.exports = UPHIndicator
