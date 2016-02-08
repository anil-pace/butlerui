var React = require('react');
var mainstore = require('../stores/mainstore');
var Header = require('./Header');
var Button1 = require("./Button/Button");
var appConstants = require('../constants/appConstants');
var Rack = require('./Rack/MsuRack.js');
var CommonActions = require('../actions/CommonActions');
var MessageNavigation = require("./MessageNavigation");
var ListItems = require("./ListItems");
var NotificationBar = require("./NotificationBar");
var Spinner = require('./Spinner/Overlay');
var LoaderButler = require('./Spinner/LoaderButler');
var CommonButton = require("./CommonButton");

function getStateData(){
  return {
           PickFrontNavData : mainstore.getNavData(),
           PickFrontNotificationData : mainstore.getNotificationData(),
           PickFrontScreenId: mainstore.getScreenId(),
           PickFrontRackDetails: mainstore.getRackDetails(),
           PickFrontServerNavData : mainstore.getServerNavData(),
           PickFrontItemUid : mainstore.getItemUid(),
           ListItems : mainstore.getListItems(),
    };
};

var PickFront = React.createClass({
  _notification:'',
  _component:'',
  _navigation:'',
  _showModal:false,
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
   if(this.state.PickFrontScreenId === appConstants.PICK_FRONT_MORE_ITEM_SCAN || this.state.PickFrontScreenId === appConstants.PICK_FRONT_PPTL_PRESS){
        this.showModal(this.state.PickFrontChecklistDetails,this.state.PickFrontChecklistIndex);
    }else{
      $('.modal').modal('hide');
      $('.modal-backdrop').remove();
    }
  },
  getNotificationComponent:function(){
/*    if(this.state.PickFrontNotification != undefined)
      this._notification = <Notification notification={this.state.PickFrontNotification} navMessagesJson={this.props.navMessagesJson} />
    else
      this._notification = "";*/
  },
 
  getScreenComponent : function(screen_id){
    console.log(this.state.ListItems);
    switch(screen_id){
     
      case appConstants.PICK_FRONT_WAITING_FOR_MSU:
        this._navigation = (<MessageNavigation navData ={this.state.PickFrontNavData} />);
        this._notification = (<NotificationBar notificationData = {this.state.PickFrontNotificationData} />);
        this._component = (<ListItems ListItems={this.state.ListItems}/>);
      break;

      case appConstants.PICK_FRONT_LOCATION_SCAN:
        this._navigation = (<MessageNavigation navData ={this.state.PickFrontNavData} />);
        this._notification = (<NotificationBar notificationData = {this.state.PickFrontNotificationData} />);
        this._component = ( 
            <div className="row grid-container">
                <div className="mainRackContainer">
                  <Rack rackData = {this.state.PickFrontRackDetails}/>
                </div>
                <div className="confirmShelfButton">
                    <CommonButton text={"Confirm"} module ={appConstants.PICK_FRONT} action={appConstants.CONFIRM} />
                  </div>
            </div>
          );
      break;

      case appConstants.PICK_FRONT_ITEM_SCAN:
      this._navigation = (<MessageNavigation navData ={this.state.PickFrontNavData} />);
        this._notification = (<NotificationBar notificationData = {this.state.PickFrontNotificationData} />);
        this._component = ( 
                <div className="grid-container">
                <div className="main-container">
                  <Rack rackData = {this.state.PickFrontRackDetails}/>
                  <Button1 disabled = {true} text = {"Confirm"} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} color={"black"}/>
                </div>
            </div>
          );
      break;


       case appConstants.PICK_FRONT_CONTAINER_SCAN:
       this._navigation = (<MessageNavigation navData ={this.state.PickFrontNavData} />);
        this._notification = (<NotificationBar notificationData = {this.state.PickFrontNotificationData} />);
        this._component = (<LoaderButler />);
      break;

      default:
        return true;
    }
  },
  
  render: function(data){ 
	  this.getNotificationComponent();
    this.getScreenComponent(this.state.PickFrontScreenId);
	
	return (
    <div className="">
      <Header/>
      {this._navigation}
      {this._notification}
      {this._component}
    </div>   
	  )
  }
});

module.exports = PickFront;