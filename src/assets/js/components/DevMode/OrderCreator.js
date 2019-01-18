var React = require("react");

var DevModeUtils = require("./DevModeUtils");


var ToolLineContainer = require("./ToolLineContainer");

var ToolName = React.createClass({
  getInitialState: function() {
    return {
      lineContainerRef: undefined
    };
  },
  createOrder() {
    OrderLineAggregate = this.state.lineContainerRef.getLineAggregate() 
    console.log("Creating Order at Core");
    var order_id = parseInt($("#slo_order_id").val());
    TotalLineJSON = OrderLineAggregate.map(
      lineData => ({
        id: parseInt(lineData.lineId),
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
                      product_uid: lineData.uid,
                      relative_priority: 1
                    }
                  ],
                  uidType: null,
                  productQuantity: parseInt(lineData.qty),
                  productAttributes: {
                    filter_parameters: ["product_sku = '" + lineData.sku + "'"]
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
      })
    );
    var data = {
      id: order_id,
      externalServiceRequestId: "1003",
      serviceRequests: TotalLineJSON,
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
        <div className = "tool-form">
        <label>Order ID</label>
        <input type="text" defaultValue="" id="slo_order_id" />
        </div>
        <br />
        <ToolLineContainer lineName = "orderline" ref = {t => (this.state.lineContainerRef = t)}/>
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
