var React = require("react");

var DevModeUtils = require("./DevModeUtils");

var makeid = DevModeUtils.makeid;
var stdCallBack = DevModeUtils.stdCallBack;

var ToolLineContainer = require("./ToolLineContainer");

var PutExpectationTool = React.createClass({
  getInitialState: function() {
    return {
      lineContainerRef: undefined
    };
  },
  ns_createtote() {
    LineAggregate = this.state.lineContainerRef.getLineAggregate();
    var tote_id = $("#nstote_toteid").val();
    ProductsJSON = LineAggregate.map(lineData => ({
      productQuantity: parseInt(lineData.qty),
      productAttributes: {
        pdfa_values: {
          product_sku: lineData.sku
        }
      }
    }));
    var data = {
      externalServiceRequestId: tote_id,
      type: "PUT",
      attributes: {
        tote_id: tote_id
      },
      expectations: {
        containers: [
          {
            products: ProductsJSON
          }
        ]
      }
    };
    var PlatformSRURL =
      configConstants.PLATFORM_IP +
      "/api-gateway/sr-service/platform-srms/service-request";
    $.ajax({
      url: PlatformSRURL,
      type: "post",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      dataType: "json",
      success: stdCallBack
    });
  },

  randomize() {
    $("#nstote_toteid").val(makeid());
  },

  render() {
    return (
      <div className="toolcontent">
        <div className="tool-form">
          <label>Tote ID / SR ID</label>
          <input type="text" defaultValue="" id="nstote_toteid" />
        </div>
        <br />
        <ToolLineContainer
          lineName="putline"
          ref={t => (this.state.lineContainerRef = t)}
        />
        <br />
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Create tote"
          id="totbtn"
          onClick={this.ns_createtote}
        />
        &emsp;
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
