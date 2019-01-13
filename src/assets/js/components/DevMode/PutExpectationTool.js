var React = require("react");

var DevModeUtils = require("./DevModeUtils");

var makeid = DevModeUtils.makeid;
var stdCallBack = DevModeUtils.stdCallBack;

var PutExpectationTool = React.createClass({
  ns_createtote() {
    console.log("Sending");
    var tote_id = $("#nstote_toteid").val();
    var sku = $("#nstote_sku").val();
    var qty = parseInt($("#nstote_quantity").val());
    var data = {
      externalServiceRequestId: tote_id,
      type: "PUT",
      attributes: {
        tote_id: tote_id
      },
      expectations: {
        containers: [
          {
            products: [
              {
                productQuantity: qty,
                productAttributes: {
                  pdfa_values: {
                    product_sku: sku
                  }
                }
              }
            ]
          }
        ]
      }
    };
    var PlatformSRURL =
      configConstants.PLATFORM_IP + "/platform-srms/service-request";
    postUrl(PlatformSRURL, JSON.stringify(data), stdCallBack);
  },

  randomize() {
    $("#nstote_toteid").val(makeid());
  },

  render() {
    return (
      <div className="toolcontent">
        <form className="tool-form">
          <label>Tote ID / SR ID</label>
          <input type="text" defaultValue="" id="nstote_toteid" />

          <label>Product SKU</label>
          <input type="text" id="nstote_sku" defaultValue="a1" />
          <label>Product Quantity</label>
          <input type="text" id="nstote_quantity" defaultValue="2" />
        </form>
        <br/>
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Create tote"
          id="totbtn"
          onClick={this.ns_createtote}
        />&emsp;
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Randomize Tote"
          id="nstote_rndbtn"
          onClick={this.randomize}
        />
      </div>
    );
  }
});
module.exports = PutExpectationTool;
