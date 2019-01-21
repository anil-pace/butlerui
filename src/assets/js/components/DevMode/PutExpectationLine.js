var React = require("react");

var PutExpectationLine = React.createClass({
  getInitialState: function() {
    return {
      lineId: this.props.lineId,
      sku: "a1",
      qty: "2"
    };
  },
  getLineDetails() {
    return this.state;
  },
  skuChange(e) {
    this.setState({
      sku: e.target.value
    });
  },
  qtyChange(e) {
    this.setState({
      qty: e.target.value
    });
  },
  render() {
    return (
      <form className="tool-form toolline-border">
        <label>Product SKU</label>
        <input
          type="text"
          onChange={this.skuChange}
          defaultValue={this.state.sku}
        />
        <label>Product Quantity</label>
        <input
          type="text"
          onChange={this.qtyChange}
          defaultValue={this.state.qty}
        />
      </form>
    );
  }
});
module.exports = PutExpectationLine;
