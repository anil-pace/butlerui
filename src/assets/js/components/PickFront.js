var React = require('react');
var PickFrontStore = require('../stores/PickFrontStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Spinner = require("./Spinner/LoaderButler");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');
var Rack = require('./Rack/MsuRack.js');
var BoxSerial = require('./BoxSerial.js');
var Modal = require('./Modal/Modal');
var CurrentSlot = require('./CurrentSlot');
var PrdtDetails = require('./PrdtDetails/ProductDetails.js');

function getStateData(){
  return {
           PickFrontNavData : PickFrontStore.getNavData(),
           PickFrontNotification : PickFrontStore.getNotificationData(),
           PickFrontBinData: PickFrontStore.getBinData(),
           PickFrontScreenId:PickFrontStore.getScreenId(),
           PickFrontScanDetails : PickFrontStore.scanDetails(),
           PickFrontProductDetails : PickFrontStore.productDetails(),
           PickFrontRackDetails: PickFrontStore.getRackDetails(),
           PickFrontBoxDetails: PickFrontStore.getBoxDetails(),
          PickFrontServerNavData : PickFrontStore.getServerNavData(),
          PickFrontCurrentBin:PickFrontStore.getCurrentSelectedBin()

    };
};

var PickFront = React.createClass({
  _notification:'',
  _component:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    PickFrontStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    PickFrontStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
	this.setState(getStateData());
  },
  getNotificationComponent:function(){
    if(this.state.PickFrontNotification != undefined)
      this._notification = <Notification notification={this.state.PickFrontNotification} />
    else
      this._notification = "";
  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
     
      case appConstants.PICK_FRONT_WAITING_FOR_RACK:
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Spinner />
                 </div>
              </div>
            );
      break;

      case appConstants.PICK_FRONT_SCAN_SLOT_BARCODE:
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Rack rackData = {this.state.PickFrontRackDetails}/>
                 </div>
              </div>
            );
      break;

      case appConstants.PICK_FRONT_SCAN_ITEM_BARCODE:
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Rack rackData = {this.state.PickFrontRackDetails}/>
                     <PrdtDetails />
                 </div>
              </div>
            );
      break;


       case appConstants.PICK_FRONT_SCAN_BOX_BARCODE:
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <BoxSerial boxData = {this.state.PickFrontBoxDetails} />
                    <Rack rackData = {this.state.PickFrontRackDetails}/>
                 </div>
              </div>
            );
      break;

      case appConstants.PICK_FRONT_SCAN_ITEM_AND_PLACE_IN_BIN:
        this._component = (
              <div className='grid-container'>
                <Modal />             
                <CurrentSlot />
                <div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_SCAN_ITEM_AND_PLACE_IN_BIN}/>
                  <Wrapper scanDetails={this.state.PickFrontScanDetails} productDetails={this.state.PickFrontProductDetails} />
                </div>
                <div className = 'actions'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PickFrontProductDetails.product_sku} color={"black"}/>
                   <Button1 disabled = {false} text = {"Edit Details"} module ={appConstants.PICK_FRONT} action={appConstants.EDIT_DETAILS} color={"orange"} /> 
                </div>
              </div>
            );
      break;

      case appConstants.PICK_FRONT_PRESS_PPTL_TO_CONFIRM:
        this._component = (
              <div className='grid-container'>
                <Modal />
                <CurrentSlot />
                <div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PRESS_PPTL_TO_CONFIRM}/>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PickFrontProductDetails.product_sku} color={"black"}/> 
                </div>
              </div>
            );
      break;
     

      default:
        return true;
    }
  },
  render: function(data){ 
	  this.getNotificationComponent();
    this.getScreenComponent(this.state.PickFrontScreenId);
	
	return (
		<div className="main">
			<Header />
			<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} />
			{this._component}
	  </div>   
	  )
  }
});

module.exports = PickFront;