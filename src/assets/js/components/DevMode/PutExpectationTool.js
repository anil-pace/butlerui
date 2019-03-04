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
    var LineAggregate = this.state.lineContainerRef.getLineAggregate();
    var tote_id = $("#nstote_toteid").val();
    var invList = []; // Used for pushing serials to core
    var compositeBarcodes = [];
    var ProductsJSON = LineAggregate.map(lineData => {
      var LineJson = {
        productQuantity: parseInt(lineData.qty),
        productAttributes: {
          pdfa_values: {
            product_sku: lineData.sku
          },
          package_name: lineData.package_name
        }
      };
      if (Globals.serializedPutEnabled) {
        LineJson["productAttributes"]["skipSerialValidationLabels"] =
          lineData.skipSerialValidationLabels;
        LineJson["productAttributes"]["serialized_content"] = lineData.serials;
        compositeBarcodes.push(
          this.getCompositeBarcode(lineData.sku, lineData.serials)
        );
        if (Globals.serialCoreInsertionEnabled) {
          for (var i2 = 0; i2 < parseInt(lineData.qty); i2++) {
            invList.push({
              barcodes: lineData.serials[i2].package_serials,
              event: "put_expectation_creation",
              location: "put_expectation",
              children: [],
              master_data_id: lineData.uid,
              master_data_type: "item",
              transaction_request: {
                service_request: tote_id
              },
              sub_location: {}
            });
          }
        }
      }
      return LineJson;
    });
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

    var Callback = undefined;
    if (Globals.serializedPutEnabled) {
      if (Globals.serialCoreInsertionEnabled) {
        Callback = function(response, responseStatus, xhr) {
          var serialInsertionURL =
            configConstants.CORE_IP +
            "/api/inventory_tracker/serialized_barcodes?create_partially=false";
          $.ajax({
            url: serialInsertionURL,
            type: "post",
            data: JSON.stringify(invList),
            headers: {
              "Content-Type": "application/json"
            },
            dataType: "json",
            success: stdCallBack
          });
          devlog("Got response: " + responseStatus);
          console.log(JSON.stringify(response));
        };
      } else {
        Callback = stdCallBack;
      }
      console.log(tote_id);
      console.log(compositeBarcodes);
    } else {
      Callback = stdCallBack;
    }

    $.ajax({
      url: PlatformSRURL,
      type: "post",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      dataType: "json",
      success: Callback
    });
  },
  getCompositeBarcode(sku, serials) {
    var Result = sku + ",4234234," + serials.length;
    for (var i = 0; i < serials.length; ++i) {
      Result += "," + serials[i].package_serials;
    }
    return Result;
  },
  getPostSrCreationCallBack() {
    if (Globals.serializedPutEnabled && Globals.serialCoreInsertionEnabled) {
      return stdCallBack;
    } else {
      return stdCallBack;
    }
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
