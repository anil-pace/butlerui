var React = require("react");

var ConfigTool = React.createClass({
  render() {
    return (
      <div className="toolcontent">
        <textarea id="devconsole_ta" rows="4" cols="55" />
      </div>
    );
  }
});
module.exports = ConfigTool;
