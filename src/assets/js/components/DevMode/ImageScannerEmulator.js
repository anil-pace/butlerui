var React = require("react");

var DevModeUtils = require("./DevModeUtils");

var makeid = DevModeUtils.makeid;
var stdCallBack = DevModeUtils.stdCallBack;

var ToolLineContainer = require("./ToolLineContainer");

var ImageScannerEmulator = React.createClass({
  getInitialState: function() {
    return {
      lineContainerRef: undefined
    };
  },
  sendBarcodes() {
    var ScannerId = $("#scanner_id").val();
    var LineAggregate = this.state.lineContainerRef.getLineAggregate();
    var ProductsJSON = LineAggregate.map(lineData => ({
      controller_id: "513",
      peripheral_id: ScannerId,
      peripheral_type: "scanner",
      event_name: "multiscan",
      event_data: {
        barcode: lineData.barcode,
        payload: "",
        last_seen_at: "11/11/2016 15:47:50:949387"
      }
    }));
    var Endpoint = $("#multiscan_endpoint").val()
    PpsID = $("#pps_id").val()
    var Endpoint = configConstants.CORE_IP + "/pps/" + PpsID + "/api/action"
    ProductsJSON.map(PayLoad =>
    postUrl(Endpoint, JSON.stringify(PayLoad), stdCallBack)
    )
  },

  render() {
    return (
      <div className="toolcontent">
        <div className="tool-form">
          <label>PPS ID</label>
          <input
            type="text"
            defaultValue="2"
            id="pps_id"
          />
          <label>Peripheral/Scanner ID</label>
          <input
            type="text"
            defaultValue="1A1746PP540478"
            id="scanner_id"
          />
        </div>
        <br />
        <ToolLineContainer
          lineName="barcodeline"
          ref={t => (this.state.lineContainerRef = t)}
        />
        <br />
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Burst Barcodes"
          id="totbtn"
          onClick={this.sendBarcodes}
        />
      </div>
    );
  }
});
module.exports = ImageScannerEmulator;
