var React = require("react");

var ConfigTool = React.createClass({
  render() {
    return (
      <div className="toolcontent tool-form">
        <textarea className="fullwidth" id="devconsole_ta" rows="4"/>
      </div>
    );
  }
});
module.exports = ConfigTool;
