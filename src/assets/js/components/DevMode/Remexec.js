var React = require("react");

var ToolLineContainer = require("./ToolLineContainer");

var ToolName = React.createClass({
  getInitialState: function() {
    return {
      moduleName: "pps_organiser",
      functionName: "restart_pps"
    };
  },
  render() {
    return (
      <div className="toolcontent">
        <div className="tool-form">
          <label>Module Name</label>
          <input type="text" defaultValue={this.state.moduleName} />
          <label>Function Name</label>
          <input type="text" defaultValue={this.state.functionName} />
        </div>
        <br />
        <ToolLineContainer
          lineName="argline"
          ref={t => (this.state.lineContainerRef = t)}
        />
        <br />
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Execute"
          onClick={this.execute}
        />
      </div>
    );
  }
});
module.exports = ToolName;
