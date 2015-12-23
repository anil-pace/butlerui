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
var CurrentSlot = require('./CurrentSlot');

function getStateData(){
  return {
           //StageActive:PickFrontStore.getStageActiveStatus(),
           //StageAllActive:PickFrontStore.getStageAllActiveStatus(),
           PickFrontNavData : PickFrontStore.getNavData(),
           PickFrontNotification : PickFrontStore.getNotificationData(),
           PickFrontBinData: PickFrontStore.getBinData(),
           PickFrontScreenId:PickFrontStore.getScreenId(),
           PickFrontScanDetails : PickFrontStore.scanDetails(),
           PickFrontProductDetails : PickFrontStore.productDetails(),
           //PickFrontSysIdle : PickFrontStore.getSystemIdleState(),
          //PickFrontServerNavData : PickFrontStore.getServerNavData()
          PickFrontCurrentBin:PickFrontStore.getCurrentSelectedBin(),

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
     
      case appConstants.PICK_FRONT_ITEM_SCAN:
      break;


      case appConstants.PICK_FRONT_PLACE_ITEMS_IN_BINS:
          this._component = (
              <div className='grid-container'>                    
                
                <div className='main-container'>
                  
                  <Wrapper scanDetails={this.state.PickFrontScanDetails} productDetails={this.state.PickFrontProductDetails} />
                </div>
                <div className = 'staging-action' >
                  <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PickFrontProductDetails.product_sku} color={"black"}/>
                  <Button1 disabled = {false} text = {"Edit Details"} module ={appConstants.PICK_FRONT} action={appConstants.EDIT_DETAILS} color={"orange"} />  
                </div>

              </div>
            );
        break;

      case appConstants.PICK_FRONT_PPTL_PRESS:
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
			<Navigation navData ={this.state.PickFrontNavData} />
      <CurrentSlot />
			{this._component}
			
	  </div>   
	  )
  }
});

module.exports = PickFront;