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
var Bins = require("./Bins/Bins.react");

var listItemsArray = [
            {
             "Item_ID"    : 01,
             "Image_url"  : "assets/images/image2.png",
             "Item_Name"  : "ICE LEMON TEA",
             "Item_Price" : 1.00,
             "Item_Desc"  : "There's nothing better than an ice cold lemon tea on a hot summer's day. But this lemon tea is not cold. And there's definitely no ice in there. So why is it called Ice Lemon Tea? Take a sip and chill out on a chair. Maybe you'll find out."         
            },
            {
             "Item_ID"    : 02,
             "Image_url"  : "assets/images/image1.png",
             "Item_Name"  : "RIBENA",
             "Item_Price" : 1.20,
             "Item_Desc"  : "Did you know that Ribena was distributed to children during WW2 as vitamin C supplements when fruits such as oranges were difficult to obtain? But now with the war against obesity, Ribena has been banned from TESCO in the UK for its high sugar content. Not to worry, you can still get it here."         
            },{
             "Item_ID"    : 03,
             "Image_url"  : "assets/images/image3.png",
             "Item_Name"  : "MILO",
             "Item_Price" : 0.80,
             "Item_Desc"  : "Are you a Horlicks or Milo person? You can only pick one side. Horlicks fan? Too bad. There's none for you here. And if you're an Ovaltine fan, it's time to explore the real thing. Tak kiu jit bao!"         
            }
                  ];


function getStateData(){
  return {
           PickFrontNavData : mainstore.getNavData(),
           PickFrontNotificationData : mainstore.getNotificationData(),
           PickFrontScreenId: mainstore.getScreenId(),
           PickFrontRackDetails: mainstore.getRackDetails(),
           PickFrontServerNavData : mainstore.getServerNavData(),
           PickFrontItemUid : mainstore.getItemUid(),
           ListItems : mainstore.getListItems(),
           PickFrontSlotDetails : mainstore.getCurrentSlot(),
           PickFrontBinData: mainstore.getBinData()
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
  },
  getNotificationComponent:function(){
/*    if(this.state.PickFrontNotification != undefined)
      this._notification = <Notification notification={this.state.PickFrontNotification} navMessagesJson={this.props.navMessagesJson} />
    else
      this._notification = "";*/
  },
 
  getScreenComponent : function(screen_id){
    switch(screen_id){
     
      case appConstants.PICK_FRONT_WAITING_FOR_MSU:
        this._navigation = (<MessageNavigation navData ={this.state.PickFrontNavData} screenId={appConstants.PICK_FRONT_WAITING_FOR_MSU} />);
        this._notification = (<NotificationBar notificationData = {this.state.PickFrontNotificationData} screenId={appConstants.PICK_FRONT_WAITING_FOR_MSU} />);
        this._component = (<ListItems imageClickable={true} listItemsArray={listItemsArray} />);
      break;

      case appConstants.PICK_FRONT_ITEM_SCAN:
       this._navigation = (<MessageNavigation  screenId={appConstants.PICK_FRONT_ITEM_SCAN} navData ={this.state.PickFrontNavData} color={"lightGreen"}  />);
        this._notification = (<NotificationBar screenId={appConstants.PICK_FRONT_ITEM_SCAN} notificationData = {this.state.PickFrontNotificationData} />);
        this._component = ( 
            <div className="row grid-container">
                <div className="mainRackContainer">
                  <Rack rackData = {this.state.PickFrontRackDetails} rackSlotColor={true} />
                </div>
                <div className="confirmShelfButton">
                    <CommonButton disabled={false}  module ={appConstants.PICK_FRONT} action={appConstants.CONFIRM_TO_CONTINUE} text={"Confirm"} color={"orange"} />
                  </div>
            </div>
          );
      break;

      case appConstants.PICK_FRONT_PPTL_PRESS:
        this._navigation = (<MessageNavigation screenId={appConstants.PICK_FRONT_PPTL_PRESS} navData ={this.state.PickFrontNavData} color={"lightGreen"}  />);
         this._notification = (<NotificationBar screenId={appConstants.PICK_FRONT_PPTL_PRESS} notificationData = {this.state.PickFrontNotificationData} />);
        this._component = (
              <div className='grid-container'>
               
                <div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PPTL_PRESS}/>
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