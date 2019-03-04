var React = require("react");

var Argline = React.createClass({
  getInitialState: function() {
    return {
      lineId: this.props.lineId,
      argType: "binary",
      arg: "1",
    };
  },

  getLineDetails() {
    return this.state;
  },

  fieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  },

  render() {
    return (
      <form className="tool-form toolline-border">
        <label>Arg Type</label>

        <label>Arg</label>
        <input
          type="text"
          name="arg"
          onChange={this.fieldChange}
          defaultValue={this.state.arg}
        />
      </form>
    );
  }
});
module.exports = Argline;
