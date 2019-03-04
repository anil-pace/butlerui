var React = require("react");
var DevModeUtils = require("./DevModeUtils");
var makeid = DevModeUtils.makeid;

var PutExpectationLine = React.createClass({
  getInitialState: function() {
    return {
      lineId: this.props.lineId,
      sku: Globals.putLineDefaultSKU,
      qty: Globals.putLineDefaultQty,
      package_name: Globals.putLineDefaultPkgName,
      skipSerialValidationLabels: [Globals.putLineDefaultPkgName],
      serials: [],
      qtyineachcase: Globals.putLineDefaultQtyInEachCase,
      uid: Globals.putLineDefaultUid
    };
  },
  getLineDetails() {
    if (Globals.serializedPutEnabled) {
      var serials = [];
      var qty = parseInt(this.state.qty);
      for (var i = 0; i < qty; i++) {
        serials.push({
          package_name: "Item",
          package_serials: [makeid()]
        });
      }
      this.state.serials = serials;
    }
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
  pqtyineachcaseChange(e) {
    this.setState({
      qtyineachcase: e.target.value
    });
  },
  uidChange(e) {
    this.setState({
      uid: e.target.value
    });
  },
  pkgNameChange(e) {
    this.setState({
      package_name: e.target.value,
      skipSerialValidationLabels: [e.target.value]
    });
  },
  render() {
    const isSerializedEnabled = Globals.serializedPutEnabled;
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
        <label>Package Name</label>
        <input
          type="text"
          defaultValue={this.state.package_name}
          onChange={this.pkgNameChange}
        />
        {isSerializedEnabled ? (
          <div>
            <label>Product Quantity in each Case</label>
            <input
              type="text"
              defaultValue={this.state.qtyineachcase}
              onChange={this.pqtyineachcaseChange}
            />
            <label>Product UID </label>
            <input
              type="text"
              defaultValue={this.state.uid}
              onChange={this.uidChange}
            />
          </div>
        ) : null}
      </form>
    );
  }
});
module.exports = PutExpectationLine;
