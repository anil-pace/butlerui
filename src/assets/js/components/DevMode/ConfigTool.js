var React = require("react");

var ConfigTool = React.createClass({
  saveConfig() {
    console.log("saving new config");
    configConstants.WEBSOCKET_IP = $("#websocket_ip_tb").val();
    configConstants.INTERFACE_IP = $("#interface_ip_tb").val();
    configConstants.PLATFORM_IP = $("#platform_ip_tb").val();
    configConstants.CORE_IP = $("#core_ip_tb").val();
    sessionStorage.setItem("configConstants", JSON.stringify(configConstants));
  },
  render() {
    return (
      <div className="toolcontent">
        <form className="tool-form">
          <label>WEBSOCKET_IP</label>
          <input
            id="websocket_ip_tb"
            type="text"
            defaultValue={configConstants.WEBSOCKET_IP}
          />
          <label>INTERFACE_IP</label>
          <input
            id="interface_ip_tb"
            type="text"
            defaultValue={configConstants.INTERFACE_IP}
          />
          <label>PLATFORM_IP</label>
          <input
            id="platform_ip_tb"
            type="text"
            defaultValue={configConstants.PLATFORM_IP}
          />
          <label>CORE_IP</label>
          <input
            id="core_ip_tb"
            type="text"
            defaultValue={configConstants.CORE_IP}
          />
        </form>
        <br/>
        <button className="devtoolBtn" onClick={this.saveConfig}>
          Save
        </button>
      </div>
    );
  }
});
module.exports = ConfigTool;
