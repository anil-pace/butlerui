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
var CommonActions = require('../actions/CommonActions');

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
           PickFrontCurrentBin:PickFrontStore.getCurrentSelectedBin(),
           PickFrontItemUid : PickFrontStore.getItemUid(),
           PickFrontSlotDetails :PickFrontStore.getCurrentSlot(),
           PickFrontChecklistDetails :PickFrontStore.getChecklistDetails(),
           PickFrontChecklistIndex : PickFrontStore.getChecklistIndex(),
           PickFrontChecklistOverlayStatus :PickFrontStore.getChecklistOverlayStatus()
    };
};

var PickFront = React.createClass({
  _notification:'',
  _component:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    if(this.state.PickFrontScreenId === appConstants.PICK_FRONT_MORE_ITEM_SCAN || this.state.PickFrontScreenId === appConstants.PICK_FRONT_PPTL_PRESS){
        this.showModal(this.state.PickFrontChecklistDetails,this.state.PickFrontChecklistIndex);
    }
    PickFrontStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    PickFrontStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
	this.setState(getStateData());
   if(this.state.PickFrontScreenId === appConstants.PICK_FRONT_MORE_ITEM_SCAN || this.state.PickFrontScreenId === appConstants.PICK_FRONT_PPTL_PRESS){
        this.showModal(this.state.PickFrontChecklistDetails,this.state.PickFrontChecklistIndex);
    }else{
      $('.modal').modal('hide');
      $('.modal-backdrop').remove();
    }
  },
  getNotificationComponent:function(){
    if(this.state.PickFrontNotification != undefined)
      this._notification = <Notification notification={this.state.PickFrontNotification} navMessagesJson={this.props.navMessagesJson} />
    else
      this._notification = "";
  },
  showModal:function(data,index){
    var data ={
      'checklist_data' : data,
      "checklist_index" : index
    };
    if(this.state.PickFrontChecklistOverlayStatus === true ){
    setTimeout((function(){CommonActions.showModal({
              data:data,
              type:'pick_checklist'
      });
      $('.modal').modal({backdrop: 'static', keyboard: false});
      return false;
      }),0)

    }
    else {
      $('.modal').modal('hide');
      $('.modal-backdrop fade in').remove();
    }

  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
     
      case appConstants.PICK_FRONT_WAITING_FOR_MSU:
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Spinner />
                 </div>
              </div>
            );
      break;

      case appConstants.PICK_FRONT_LOCATION_SCAN:
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Rack rackData = {this.state.PickFrontRackDetails}/>
                 </div>
              </div>
            );
      break;

      case appConstants.PICK_FRONT_ITEM_SCAN:
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Rack rackData = {this.state.PickFrontRackDetails}/>
                     <PrdtDetails productInfo={this.state.PickFrontProductDetails} />
                 </div>
              </div>
            );
      break;


       case appConstants.PICK_FRONT_CONTAINER_SCAN:
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <BoxSerial boxData = {this.state.PickFrontBoxDetails} />
                    <Rack rackData = {this.state.PickFrontRackDetails}/>
                 </div>
              </div>
            );
      break;

      case appConstants.PICK_FRONT_MORE_ITEM_SCAN:
        if(this.state.PickFrontScanDetails.current_qty > 0 && this.state.PickFrontChecklistDetails.length > 0){
          var editButton = ( <Button1 disabled = {false} text = {"Edit Details"} module ={appConstants.PICK_FRONT} action={appConstants.EDIT_DETAILS} color={"orange"} /> );
        }else{
          var editButton ='';
        }
        this._component = (
              <div className='grid-container'>
                <Modal />             
                <CurrentSlot slotDetails={this.state.PickFrontSlotDetails} />
                <div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_SCAN_ITEM_AND_PLACE_IN_BIN}/>
                  <Wrapper scanDetails={this.state.PickFrontScanDetails} productDetails={this.state.PickFrontProductDetails} itemUid={this.state.PickFrontItemUid}/>
                </div>
                <div className = 'actions'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} color={"black"}/>
                   {editButton}
                </div>
              </div>
            );
      break;

      case appConstants.PICK_FRONT_PPTL_PRESS:
        if(this.state.PickFrontScanDetails.current_qty > 0 && this.state.PickFrontChecklistDetails.length > 0){
          var editButton = ( <Button1 disabled = {false} text = {"Edit Details"} module ={appConstants.PICK_FRONT} action={appConstants.EDIT_DETAILS} color={"orange"} /> );
        }else{
          var editButton ='';
        }
        this._component = (
              <div className='grid-container'>
                <Modal />
                <CurrentSlot slotDetails={this.state.PickFrontSlotDetails} />
                <div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PRESS_PPTL_TO_CONFIRM}/>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} color={"black"}/> 
                    {editButton}
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
			<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>
			{this._component}
      {this._notification}
	  </div>   
	  )
  }
});

module.exports = PickFront;