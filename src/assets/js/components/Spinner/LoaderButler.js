var React = require("react")
var SpinnerButler = require("./SpinnerButler")
var mainstore = require("../../stores/mainstore")

var LoaderButler = React.createClass({
  formatTime: function(arg) {
    var result
    if (typeof arg === "object" && arg.constructor !== Array) {
      result = _("MSU busy at PPS") + " " + arg.pps_id
    } else if (typeof arg === "number") {
      result = {}
      var hrs = Math.floor(arg / 3600)
      var min = Math.floor((arg - hrs * 3600) / 60)
      var seconds = arg - hrs * 3600 - min * 60
      seconds = Math.round(seconds * 100) / 100

      result["hrs"] = hrs
      result["min"] = min
      result["seconds"] = seconds
    } else if (Number(arg)  === NaN) {
      result = _("Estimated time for MSU arrival is") + " " + _("unknown")
    } else {
      result = ""
    }
    return result
  },
  render: function() {
    var eta = mainstore._getMsuEstimatedArrival()
    var formattedEta = this.formatTime(eta)
    if (typeof formattedEta === "object") {
      formattedEta = (
        <span style={{ fontSize: "4rem", fontWeight: "normal" }}>
          <span> {_("Estimated time for MSU arrival is")} </span>
          {formattedEta.hrs > 0 ? (
            <span>
              <span style={{ fontWeight: "bold" }}>
                {" " + formattedEta.hrs + " "}
                <span>{_("hr")}</span>
              </span>
            </span>
          ) : (
            ""
          )}
          {formattedEta.min > 0 ? (
            <span>
              <span style={{ fontWeight: "bold" }}>
                {" " + formattedEta.min + " "}
              </span>
              <span>{_("min")}</span>
            </span>
          ) : (
            ""
          )}
          {formattedEta.seconds > 0 ? (
            <span>
              <span style={{ fontWeight: "bold" }}>
                {" " + formattedEta.seconds + " "}
              </span>
              <span>{_("sec")}</span>
            </span>
          ) : (
            ""
          )}
        </span>
      )
    }
    return (
      <div className="loaderButler">
        <div>
          <SpinnerButler />
        </div>
        <div
          style={{
            bottom: "5vh",
            fontSize: "4rem",
            fontWeight: "normal",
            position: "absolute",
            color: "#F36F36"
          }}
        >
          {formattedEta}
        </div>
      </div>
    )
  }
})

module.exports = LoaderButler
