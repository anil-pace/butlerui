var React = require('react');
var Header = require('./Header');
var Spinner = require("./Spinner/LoaderButler");
var Button1 = require("./Button/Button");
var appConstants = require('../constants/appConstants');
var Rack = require('./Rack/MsuRack.js');
var mainstore = require('../stores/mainstore');
var CommonActions = require('../actions/CommonActions');
var MessageNavigation = require("./MessageNavigation");
var ListItems = require("./ListItems");
var NotificationBar = require("./NotificationBar");
var ImageComponent = require('./ImageComponent.js');


function getStateData(){
  return {
           PutFrontNavData : mainstore.getNavData(),
           PutFrontNotificationData : mainstore.getNotificationData(),
           PutFrontScreenId:mainstore.getScreenId(),
           PutFrontRackDetails: mainstore.getRackDetails(),
           PutFrontServerNavData : mainstore.getServerNavData(),
           PutFrontItemUid : mainstore.getItemUid(),
           PickFrontRackDetails : mainstore.getRackDetails(),
           ListItems : mainstore.getListItems(),
    };
};

var PutFront = React.createClass({
  _notification:'',
  _component:'',
  _navigation:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
 

  getNotificationComponent:function(){
    if(this.state.PutFrontNotification != undefined)
      this._notification = <Notification notification={this.state.PutFrontNotification} navMessagesJson={this.props.navMessagesJson} />
    else
      this._notification = "";
  },

  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PUT_FRONT_WAITING_FOR_RACK:
          var imageComponents =[];
          this._navigation = (<MessageNavigation navData ={this.state.PutFrontNavData} />);
          this._notification = (<NotificationBar notificationData = {this.state.PutFrontNotificationData} />);
          imageComponents = this.state.ListItems.map(function(data,index){
                  return (
                        <div className="col-md-4 col-sm-4">
                         <ImageComponent imgURL={data.img}/>
                      </div>
                    );
                });
          this._component = (
              <div className="row">
                <div className="col-md-8 col-sim-8">
                    <div className="row">
                      {imageComponents}
                    </div>
                    <div className="row">
                        
                          <Button1 disabled={false} text = {"Complete Put"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PutFrontItemUid} color={"orange"} />
                        
                    </div>
                </div>
                <div className="col-md-4 col-sm-4">
                    <div className="row">
                      <Rack rackData = {this.state.PickFrontRackDetails} />
                    </div>
                    <div className="row">
                      <Button1 disabled={false} text = {"Complete Put"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PutFrontItemUid} color={"orange"} />
                    </div>
                </div>
              </div>
              );
        break;
      case appConstants.PUT_FRONT_SCAN:
          this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                  <Bins binsData={this.state.PutFrontBinData} screenId = {this.state.PutFrontScreenId}/>
                  <Wrapper scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
                </div>
              </div>
            );
        break;
      case appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK:
      if(this.state.PutFrontExceptionStatus == false){
          this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className="single-bin">
                    <Bins binsData={this.state.PutFrontCurrentBin} screenId = {this.state.PutFrontScreenId}/>
                      <div className="text">CURRENT BIN</div>
                </div>
                <div className='main-container'>
                  <Rack rackData = {this.state.PutFrontRackDetails}/>
                  <Wrapper scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PutFrontItemUid} color={"black"}/>
                </div>

              </div>
            );
           }else{
          this._component = this.getExceptionComponent();
        }
        break;
      case appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED:
          this._navigation = '';
          if(this.state.PutFrontExceptionScreen == "good"){
          this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PutFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container">
                    <div className = "kq-exception">
                      <div className="kq-header">{"Good Quantity"}</div>
                      <KQ scanDetails = {this.state.PutFrontGoodQuantity} action={"GOOD"} />
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {"NEXT"} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.GET_MISSING_AND_DAMAGED_QTY} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
          }else if(this.state.PutFrontExceptionScreen == "damaged_or_missing"){
            this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PutFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container">
                    <div className = "kq-exception">
                      <div className="kq-header">{"Missing Quantity"}</div>
                      <KQ scanDetails = {this.state.PutFrontMissingQuantity} action={"MISSING"} />
                    </div>
                    <div className = "kq-exception">
                      <div className="kq-header">{"Damaged Quantity"}</div>
                      <KQ scanDetails = {this.state.PutFrontDamagedQuantity} action={"DAMAGED"} />
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {"CONFIRM"} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
          }
        break; 
      case appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE:
           if(this.state.PutFrontExceptionScreen == "take_item_from_bin"){
              this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PutFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container exception2">
                    <div className = "kq-exception">
                      <div className="kq-header">{"Take the Items out from the Bin"}</div>
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {"NEXT"} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.GET_REVISED_QUANTITY} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
           }else if(this.state.PutFrontExceptionScreen == "revised_quantity"){
            this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PutFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container">
                    <div className = "kq-exception">
                      <div className="kq-header">{"Revised Quantit[y"}</div>
                      <KQ scanDetails = {this.state.PutFrontKQQuantity}  />
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {"CONFIRM"} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
           }
          
        break;
      default:
        return true; 
    }
  },

  render: function(data){
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PutFrontScreenId);
    return (
      <div className="main">
        <Header />
        {this._navigation}
        {this._notification}
        {this._component}
        
      </div> 
     
    );
  }

});

module.exports = PutFront;