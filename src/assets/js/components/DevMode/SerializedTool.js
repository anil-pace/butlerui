var React = require("react");

var DevModeUtils = require("./DevModeUtils");

var makeid = DevModeUtils.makeid;
var getCompositeBarcode = DevModeUtils.getCompositeBarcode;

var SerializedTool = React.createClass({
  createSerials() {
    console.log("Creating Serials");
    var srid = makeid();
    var toteid = makeid();
    var serials = [];
    var length = parseInt($("#pd_qty").val());
    for (var i = 0; i < length; i++) {
      serials.push({
        package_name: "Item",
        package_serials: [makeid()]
      });
    }
    console.log(srid + " " + toteid);
    var data = {
      externalServiceRequestId: srid,
      type: "PUT",
      attributes: {
        tote_id: toteid
      },
      expectations: {
        containers: [
          {
            products: [
              {
                productQuantity: parseInt($("#pd_qty").val()),
                productAttributes: {
                  pdfa_values: {
                    product_sku: $("#pd_sku").val()
                  },
                  package_name: $("#pkg_name").val(),
                  skipSerialValidationLabels: [$("#pkg_name").val()],
                  serialized_content: serials
                }
              }
            ]
          }
        ]
      }
    };

    PlatformResponseCallBack = function(response, responseStatus, xhr) {
      console.log("got response: " + response + ", status: " + responseStatus);
    };

    console.log("Sending Data to Platform : " + JSON.stringify(data));
    console.log(toteid);
    console.log(getCompositeBarcode(serials));
    PlatformEndPoint =
      configConstants.PLATFORM_IP +
      "/api-gateway/sr-service/platform-srms/service-request";
    $.ajax({
      url: PlatformEndPoint,
      type: "post",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      dataType: "json",
      success: PlatformResponseCallBack
    });
  },

  render() {
    return (
      <div className="toolcontent">
        <form className="tool-form">
          <label htmlFor="pd_qty">Product Quantity </label>{" "}
          <input type="text" defaultValue="10" id="pd_qty" />
          <label htmlFor="pd_qty_percase"> Product Quantity in each Case</label>
          <input type="text" defaultValue="10" id="pd_qty_percase" />
          <label htmlFor="pd_sku">Product SKU </label>{" "}
          <input type="text" id="pd_sku" defaultValue="XPO6" />
          <label htmlFor="pd_uid">Product UID </label>{" "}
          <input type="text" id="pd_uid" defaultValue="68" />
          <label htmlFor="pkg_name">Package Name</label>{" "}
          <input type="text" id="pkg_name" defaultValue="Case" />
          <br />
        </form>
        <button
          className="devtoolBtn"
          id="serialBtn"
          onClick={this.createSerials}
        >
          Create Tote with Serialized Container
        </button>
      </div>
    );
  }
});
module.exports = SerializedTool;
