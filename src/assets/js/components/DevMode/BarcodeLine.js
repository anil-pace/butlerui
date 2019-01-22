var React = require("react");

var DevModeUtils = require("./DevModeUtils");

var BarcodeLine = React.createClass({
  getInitialState: function() {
    return {
      lineId: this.props.lineId,
      barcode: DevModeUtils.makeid()
    };
  },
  getLineDetails(){
    return this.state
  },
  barcodeChange(e){
    this.setState({
      barcode: e.target.value
    });
  },
  render() {
    return (
      <form className="tool-form toolline-border">
        <label>Barcode</label>
        <input type="text" onChange = {this.barcodeChange} defaultValue = {this.state.barcode} />
      </form>
    );
  }
});
module.exports = BarcodeLine;
