var React = require("react");
var DevModeUtils = require("./DevModeUtils");

var ToolName = React.createClass({
  getInitialState: function() {
    return {
      configKey: "platform_baseurl"
    };
  },
  confKeyChange(e) {
    this.setState({
      configKey: e.target.value
    });
  },
  readConfig() {
    var CallBack = function(response, responseStatus, xhr) {
        devlog("Got response: " + responseStatus);
        devlog(JSON.stringify(response));
      };
    DevModeUtils.coreCall("config_tools", "get_env", [this.state.configKey], CallBack);
  },
  render() {
    return (
      <form className="toolcontent tool-form">
        <label>Config Key</label>
        <input
          type="text"
          onChange={this.confKeyChange}
          defaultValue={this.state.configKey}
        />
        <br />
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Read Config"
          onClick={this.readConfig}
        />
      </form>
    );
  }
});
module.exports = ToolName;
