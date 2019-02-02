var React = require("react");
var DevModeUtils = require("./DevModeUtils.js");

var PPSModeManager = React.createClass({
  getInitialState: function() {
    return {
      targetMode: "pick",
      pps_id: "1"
    };
  },
  logModeList() {
    DevModeUtils.devlog("PPS Mode List");
    GetModeEndpoint = configConstants.INTERFACE_IP + "/api/pps/pps_mode";
    ModeListCallback = function(response, responseStatus, xhr){
        DevModeUtils.devlog(JSON.stringify(response, null, 4))
    },
    DevModeUtils.getUrl(GetModeEndpoint, ModeListCallback)
  },
  ppsChange(e) {
    this.setState({
      pps_id: e.target.value
    });
  },
  modeSelect(e) {
    this.setState({
      targetMode: e.target.value
    });
  },
  changeMode() {
    DevModeUtils.devlog(
      "Changing mode of PPS " +
        this.state.pps_id +
        " to " +
        this.state.targetMode
    );
    var ModeChangeEndpoint = configConstants.INTERFACE_IP + "/api/pps/2/pps_mode";
    var Data = {
        "requested_pps_mode": this.state.targetMode
    }
    $.ajax({
        url: ModeChangeEndpoint,
        type: "put",
        data: JSON.stringify(Data),
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": $("#tokenText").val()
        },
        dataType: "json",
        success: DevModeUtils.stdCallBack
      });
  },
  render() {
    return (
      <div className="toolcontent">
        <form className="tool-form">
          <input
            type="button"
            className="devtoolBtn fullwidth"
            defaultValue="Get Mode List"
            onClick={this.logModeList}
          />
          <label>PPS ID</label>
          <input type="text" defaultValue={this.state.pps_id} onChange={this.ppsChange} />
          <br />
          <select
            className="devmode-select"
            onChange={this.modeSelect}
            required
            value={this.state.targetMode}
          >
            <option value="pick">pick</option>
            <option value="put">put</option>
            <option value="audit">audit</option>
            <option value="search">search</option>
          </select>
          <br />
          <input
            type="button"
            className="devtoolBtn fullwidth"
            defaultValue="Change Mode"
            onClick={this.changeMode}
          />
        </form>
      </div>
    );
  }
});
module.exports = PPSModeManager;
