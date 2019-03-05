var React = require("react");

var Tool = require("./DevMode/Tool.js");
var DevModeUtils = require("./DevMode/DevModeUtils");
Globals = require("./DevMode/Globals");
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
      tools: {},
      latestTool: undefined
    };
  },

  isSharedTool(toolName) {
    return toolName in ToolConfigs &&
      "tags" in ToolConfigs[toolName] &&
      ToolConfigs[toolName]["tags"].indexOf("shared") >= 0
      ? true
      : false;
  },

  toolSelect(event) {
    var SelectionName = event.target.value;
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
    this.setState({ latestTool: SelectionName });
  },

  render() {
    return (
      <div id="CP">
        <div id="versionBox" align = "right">v0.75.0 beta (by Hritik)</div>
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
          defaultValue="Toggle Devtools"
          id="toggleinterface"
        />

        <div id="interface">
          <select
            className="devmode-select"
            onChange={this.toolSelect}
            defaultValue={this.state.latestTool ? "" : this.state.latestTool}
          >
            <option value="" hidden>
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
