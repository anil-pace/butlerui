
var React = require('react');
var PutFrontStore = require('../stores/PutFrontStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Spinner = require("./Spinner/LoaderButler");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');
var Rack = require('./Rack/MsuRack.js');
var Modal = require('./Modal/Modal');
var mainstore = require('../stores/mainstore');
var Exception = require('./Exception/Exception');
var KQ = require('./ProductDetails/KQ');


function getStateData(){
  /*return {
           PutFrontNavData : PutFrontStore.getNavData(),
           PutFrontNotification : PutFrontStore.getNotificationData(),
           PutFrontScreenId:PutFrontStore.getScreenId(),
           PutFrontBinData: PutFrontStore.getBinData(),
           PutFrontScanDetails : PutFrontStore.scanDetails(),
           PutFrontProductDetails : PutFrontStore.productDetails(),
           PutFrontRackDetails: PutFrontStore.getRackDetails(),
           PutFrontCurrentBin:PutFrontStore.getCurrentSelectedBin(),
           PutFrontServerNavData : PutFrontStore.getServerNavData(),
           PutFrontItemUid : PutFrontStore.getItemUid()
          
    };*/
     return mainstore.getScreenData();
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

  getExceptionComponent:function(){
      var _rightComponent = '';
      this._navigation = '';
      return (
              <div className='grid-container exception'>
                <Modal />
                <Exception data={this.state.PutFrontExceptionData} action={true}/>
                <div className="exception-right"></div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION}  color={"black"}/>
                </div>
              </div>
            );
  },

  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PUT_FRONT_WAITING_FOR_RACK:
        if(this.state.PutFrontExceptionStatus == false){
          this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Spinner />
                 </div>
              </div>
            );
           }else{
          this._component = this.getExceptionComponent();
        }

        break;
      case appConstants.PUT_FRONT_SCAN:
         if(this.state.PutFrontExceptionStatus == false){
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
           }else{
          this._component = this.getExceptionComponent();
        }
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
                  <div className="main-container">
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
                      <div className="kq-header">{"Revised Quantity"}</div>
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
        {this._component}
        {this._notification}
      </div> 
     
    );
  }

});

module.exports = PutFront;