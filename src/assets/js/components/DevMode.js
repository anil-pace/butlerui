var React = require("react");

var Tool = require("./DevMode/Tool.js");
var DevModeUtils = require("./DevMode/DevModeUtils");

var ToolConfigs = require("./DevMode/ToolConfig");

var DevMode = React.createClass({
  toggleInterface() {
    if (this.state.interfaceEnabled) {
      $("#interface").hide();
      this.state.interfaceEnabled = false;
    } else {
      $("#interface").show();
      this.state.interfaceEnabled = true;
    }
  },

  getInitialState: function() {
    DevModeUtils.devModeInit();
    toolList = ToolConfigs.toolList;
    return {
      interfaceEnabled: this.props.interfaceEnabled,
      toolList: toolList,
      tools: {}
    };
  },

  isSharedTool(toolName) {
    return (toolName in ToolConfigs &&
    "tags" in ToolConfigs[toolName] &&
    ToolConfigs[toolName]["tags"].indexOf("shared") >= 0
      ? true
      : false);
  },

  toolSelect(event) {
    if (this.isSharedTool(event.target.value)) {
      this.state.tools[event.target.value].show();
    } else {
      for (toolName in this.state.tools) {
        var IsTargetTool = toolName == event.target.value;
        var IsSharedTool = this.isSharedTool(toolName);
        if (IsTargetTool) {
          this.state.tools[toolName].show();
        } else if (!IsSharedTool) {
          this.state.tools[toolName].closeTool();
        }
      }
    }
  },

  render() {
    return (
      <div id="CP">
        <img
          className="imgLogo"
          src="assets/images/GO_White_Horizontal.svg"
          width="400px"
        />
        <br />
        <input
          type="button"
          className="devtoolBtn"
          onClick={this.toggleInterface}
          defaultValue="Toggle Interface"
          id="toggleinterface"
        />

        <div id="interface">
          <select className="devmode-select" onChange={this.toolSelect} required value="">
            <option value="" disabled hidden>
              Select a tool to add
            </option>
            {this.state.toolList.map(toolName => (
              <option key={toolName} value={toolName}>
                {toolName}
              </option>
            ))}
          </select>
          {this.state.toolList.map(toolName => (
            <Tool
              key={toolName}
              name={toolName}
              ref={t => (this.state.tools[toolName] = t)}
            />
          ))}
        </div>
      </div>
    );
  }
});
module.exports = DevMode;
