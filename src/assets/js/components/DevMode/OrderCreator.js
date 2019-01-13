var React = require("react");

var DevModeUtils = require("./DevModeUtils");

var makeid = DevModeUtils.makeid;

var ToolName = React.createClass({
  createOrder() {
    console.log("Creating Order at Core");
    var order_id = parseInt($("#slo_order_id").val());
    var uid = $("#slo_uid").val();
    var sku = $("#slo_sku").val();
    var qty = parseInt($("#slo_quantity").val());
    var data = {
      id: order_id,
      externalServiceRequestId: "1003",
      serviceRequests: [
        {
          id: 0,
          externalServiceRequestId: "1004",
          serviceRequests: null,
          type: "PICK_LINE",
          actuals: null,
          expectations: {
            containers: [
              {
                id: 43,
                state: null,
                type: "VIRTUAL",
                barcode: null,
                products: [
                  {
                    id: 35,
                    uid: null,
                    possibleUids: [
                      {
                        quantity_per_unit: 1,
                        product_uid: uid,
                        relative_priority: 1
                      }
                    ],
                    uidType: null,
                    productQuantity: qty,
                    productAttributes: {
                      filter_parameters: ["product_sku = '" + sku + "'"]
                    },
                    createdOn: "2018-05-14T11:25:45.22",
                    updatedOn: "2018-05-14T11:25:45.22"
                  }
                ],
                containers: null,
                containerAttributes: null,
                createdOn: "2018-05-14T11:25:45.219",
                updatedOn: "2018-05-14T11:25:45.219"
              }
            ]
          },
          receivedOn: "2018-05-14T11:25:45.218",
          status: "CREATED",
          state: "created",
          attributes: null,
          createdOn: "2018-05-14T11:25:45.218",
          updatedOn: "2018-05-14T11:25:45.218"
        }
      ],
      type: "PICK",
      actuals: null,
      expectations: null,
      receivedOn: "2018-05-14T11:25:45.217",
      status: "CREATED",
      state: "created",
      attributes: {
        pick_after_time: null,
        order_options: {
          priority: 1
        },
        pick_before_time: null
      },
      createdOn: "2018-05-14T11:25:45.217",
      updatedOn: "2018-05-14T11:25:45.217"
    };
    var CoreOrderURL =
      configConstants.CORE_IP + "/api/orders/new";
    postUrl(CoreOrderURL, JSON.stringify(data), DevModeUtils.stdCallBack);
  },
  randomize() {
    $("#slo_order_id").val(Math.floor(Math.random() * 1000000));
  },
  render() {
    return (
      <div className="toolcontent">
        <form className="tool-form">
          <label>Order Id</label>
          <input type="text" defaultValue="" id="slo_order_id" />

          <label>Product SKU</label>
          <input type="text" id="slo_sku" defaultValue="a1" />
          <label>Product UID</label>
          <input type="text" id="slo_uid" defaultValue="70" />
          <label>Order Quantity</label>
          <input type="text" id="slo_quantity" defaultValue="2" />
        </form>
        <br />
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Create Order"
          onClick={this.createOrder}
        />
        &emsp;
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Randomize Order Id"
          onClick={this.randomize}
        />
      </div>
    );
  }
});
module.exports = ToolName;
