var React = require("react");

var Orderline = React.createClass({
  getInitialState: function() {
    return {
      lineId: this.props.lineId,
      sku: "a1",
      uid: "70",
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
  uidChange(e) {
    this.setState({
      uid: e.target.value
    });
  },
  qtyChange(e) {
    this.setState({
      qty: e.target.value
    });
  },
  render() {
    var isCoreTarget = Globals.orderCreationTarget == "core";
    return (
      <form className="tool-form toolline-border">
        <label>Product SKU</label>
        <input
          type="text"
          onChange={this.skuChange}
          defaultValue={this.state.sku}
        />
        {isCoreTarget ? (
          <div>
            <label>Product UID</label>
            <input
              type="text"
              onChange={this.uidChange}
              defaultValue={this.state.uid}
            />
          </div>
        ) : null}

        <label>Order Quantity</label>
        <input
          type="text"
          onChange={this.qtyChange}
          defaultValue={this.state.qty}
        />
      </form>
    );
  }
});
module.exports = Orderline;
