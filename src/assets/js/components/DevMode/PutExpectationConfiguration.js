var React = require("react");

var ToolName = React.createClass({
  itemTypeChange(e) {
    switch (e.target.value) {
      case "serialized":
        Globals.serializedPutEnabled = true;
        break;
      case "nonserialized":
        Globals.serializedPutEnabled = false;
    }
  },
  insertSerialsCBChange(e) {
    Globals.serialCoreInsertionEnabled = e.target.checked;
  },
  render() {
    return (
      <div className="toolcontent">
        <form className="tool-form">
          <label>Item Type</label>
          <div>
            <input
              type="radio"
              name="itemtype"
              value="nonserialized"
              onChange={this.itemTypeChange}
            />{" "}
            Non Serialized
          </div>
          <br />
          <div>
            <input
              type="radio"
              name="itemtype"
              value="serialized"
              onChange={this.itemTypeChange}
            />{" "}
            Serialized
          </div>
          <br />
          <div>
            <input
              type="checkbox"
              value="insertSerials"
              onChange={this.insertSerialsCBChange}
            />{" "}
            Insert Serials to Core
          </div>
          <br />
        </form>
      </div>
    );
  }
});
module.exports = ToolName;
