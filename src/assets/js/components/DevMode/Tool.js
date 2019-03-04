var React = require("react");

// Tool Imports
// Must import the tool here whenever creating a new tool
var CommonTool = require("./CommonTool.js");
var DevConsoleTool = require("./DevConsoleTool.js");
var ConfigTool = require("./ConfigTool.js");
var SerializedTool = require("./SerializedTool.js");
var PutExpectionTool = require("./PutExpectationTool.js");
var OrderCreator = require("./OrderCreator.js");
var ImageScannerEmulator = require("./ImageScannerEmulator.js");
var PPSModeManager = require("./PPSModeManager.js");
var SysConfig = require("./SysConfig.js");
var PutExpecationConfiguration = require("./PutExpectationConfiguration.js");
var Remexec = require("./Remexec.js");
var OrderConfig = require("./OrderConfig.js");

var ToolConfigs = require("./ToolConfig");

var Tool = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name,
      visible:
        this.props.name in ToolConfigs &&
        "visible" in ToolConfigs[this.props.name]
          ? ToolConfigs[this.props.name]["visible"]
          : false
    };
  },

  get_tool_markup(toolname) {
    switch (toolname) {
      case "devconsole":
        return <DevConsoleTool />;
      case "serialized":
        return <SerializedTool />;
      case "put_expectation":
        return <PutExpectionTool />;
      case "common":
        return <CommonTool />;
      case "config":
        return <ConfigTool />;
      case "order_creator":
        return <OrderCreator />;
      case "pps_mode_manager":
        return <PPSModeManager />;
      case "image_scanner":
        return <ImageScannerEmulator />;
      case "sys_config":
        return <SysConfig />;
      case "put_config":
        return <PutExpecationConfiguration />;
      case "remexec":
        return <Remexec />;
      case "order_config":
        return <OrderConfig/>;
    }
  },

  show() {
    this.state.visible = true;
    this.setState(this.state);
  },

  closeTool() {
    this.state.visible = false;
    this.setState(this.state);
  },

  render() {
    toolClasses = "tool";
    toolClasses = this.state.visible ? toolClasses : toolClasses + " hidden";
    return (
      <div className={toolClasses}>
        <input
          type="image"
          src="assets/images/devtools/close-icon.png"
          className="tool_close_btn"
          onClick={this.closeTool}
        />
        {this.get_tool_markup(this.state.name)}
      </div>
    );
  }
});
module.exports = Tool;
