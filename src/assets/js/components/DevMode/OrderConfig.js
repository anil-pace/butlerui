var React = require("react");

var ToolName = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  targetChange(e) {
    Globals.orderCreationTarget = e.target.value;
  },
  render() {
    return (
      <div className="toolcontent">
        <form className="tool-form">
          <label>Order creation target</label>
          <div>
            <input
              type="radio"
              name="createTarget"
              value="core"
              onChange={this.targetChange}
            />
            Core
          </div>
          <br />
          <div>
            <input type="radio" name="createTarget" value="platform" onChange = {this.targetChange}/>{" "}
            Platform
          </div>
          <br />
        </form>
      </div>
    );
  }
});
module.exports = ToolName;
