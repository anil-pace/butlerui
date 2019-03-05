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
    
    var TotalLineJSON;
    var data;
    var OrderCreationEndpoint;

    if(Globals.orderCreationTarget === "core"){
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
    }else{
        TotalLineJSON = OrderLineAggregate.map(
            lineData => ({
                externalServiceRequestId: lineData.lineId,
                type: "PICK_LINE",
                expectations: {
                containers: [{
                    products: [{
                    productQuantity: parseInt(lineData.qty),
                    productAttributes: {
                        filter_parameters: ["product_sku = '" + lineData.sku + "'"]
                    }
                    }]
                }]
                }
            })
        );
    }
    
    if(Globals.orderCreationTarget === "core"){ 
        data = {
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
        OrderCreationEndpoint =
            configConstants.CORE_IP + "/api/orders/new";
    }else{
        data = {
            externalServiceRequestId: $("#slo_order_id").val(),
            serviceRequests: TotalLineJSON,
            type: "PICK",
            attributes: {
                order_options: {
                    priority: 1
                },
            },
        };
        OrderCreationEndpoint =
            configConstants.PLATFORM_IP + "/api-gateway/sr-service/platform-srms/service-request";
    }
    postUrl(OrderCreationEndpoint, JSON.stringify(data), DevModeUtils.stdCallBack);
  },
  randomize() {
    $("#slo_order_id").val(Math.floor(Math.random() * 10000000000)); // TODO: Make integers only in case of core target
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
