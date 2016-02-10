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
var CommonButton = require("./CommonButton");

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

var listItemsArray = [
            {
             "Item_ID"    : 01,
             "Image_url"  : "http://www.garnier.in/~/media/garnier%20local/en-in/prd-haircare/haircare_brands_fructis_triplenutrition/275x360productshot_shampoo.png?h=360&la=en-IN&w=275",
             "Item_Name"  : "Garnier",
             "Item_Price" : 20,
             "Item_Desc"  : "Garnier hair care and skin care products is one of the highest luxury brands used in Asia, China, Japan & India. In the Brand Trust Report 2012, Garnier was ranked 73rd among India's most trusted brands and subsequently, according to the Brand Trust Report 2013, Garnier was ranked 47th among India's most trusted brands."         
            },
            {
             "Item_ID"    : 02,
             "Image_url"  : "http://images.fonearena.com/blog/wp-content/uploads/2015/07/Motorola-Moto-X-Play2.jpg",
             "Item_Name"  : "Moto X Play",
             "Item_Price" : 20,
             "Item_Desc"  : "Garnier hair care and skin care products is one of the highest luxury brands used in Asia, China, Japan & India. In the Brand Trust Report 2012, Garnier was ranked 73rd among India's most trusted brands and subsequently, according to the Brand Trust Report 2013, Garnier was ranked 47th among India's most trusted brands."         
            },{
             "Item_ID"    : 03,
             "Image_url"  : "http://blogs-images.forbes.com/jasonevangelho/files/2015/01/325753-apple-macbook-air-13-inch-mid-2013.jpg",
             "Item_Name"  : "Apple MacBook",
             "Item_Price" : 20,
             "Item_Desc"  : "Garnier hair care and skin care products is one of the highest luxury brands used in Asia, China, Japan & India. In the Brand Trust Report 2012, Garnier was ranked 73rd among India's most trusted brands and subsequently, according to the Brand Trust Report 2013, Garnier was ranked 47th among India's most trusted brands."         
            }
                  ];

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

      case appConstants.PUT_BACK_STAGE:
        this._navigation = (<MessageNavigation navData ={this.state.PutFrontNavData}  />);
        this._notification = (<NotificationBar notificationData = {this.state.PutFrontNotificationData} />);
        this._component = (<ListItems imageClickable={true} listItemsArray={listItemsArray} />);
      break;


      case appConstants.PUT_FRONT_WAITING_FOR_RACK:
          var imageComponents =[];
          this._navigation = (<MessageNavigation navData ={this.state.PutFrontNavData} color={"lightBlue"} />);
          this._notification = (<NotificationBar notificationData = {this.state.PutFrontNotificationData} color={"lightGray"} />);
          imageComponents = listItemsArray.map(function(data,index){
                  return (
                        <div className="col-md-4 col-sm-4">
                          <div className="row">
                             <ImageComponent data={data} imageClickable={false}/>
                          </div>
                          <div className="row">
                              <div className="inputBox">
                                <input type="text" placeholder=""/>
                              </div>
                          </div>
                      </div>
                    );
                });
          this._component = (
              <div className="row imageQuantityContainer">
                <div className="col-md-8 col-sm-8 imageContainer">
                    <div className="row">
                        {imageComponents}
                    </div>
                    <div className="row">
                      <div className="confirmShelfButton">
                          <CommonButton disabled={false} text={"Complete Put"} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.COMPLETE_PUT} />
                      </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4">
                    <div className="row">
                      <Rack rackData = {this.state.PickFrontRackDetails} />
                      <div className="overlayRack"></div>
                    </div>
                    <div className="row">
                      <div className="confirmShelfButton">
                          <CommonButton disabled={true} text={"Finished"} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.PUT_FINISHED} />
                      </div>
                    </div>
                </div>
              </div>
              );
        break;

      case appConstants.PUT_FRONT_SCAN:
          var imageComponents =[];
          this._navigation = (<MessageNavigation navData ={this.state.PutFrontNavData} color={"lightBlue"} />);
          this._notification = (<NotificationBar notificationData = {this.state.PutFrontNotificationData} color={"lightGray"} />);
          imageComponents = listItemsArray.map(function(data,index){
                  return (
                        <div className="col-md-4 col-sm-4">
                          <div className="row">
                             <ImageComponent data={data} imageClickable={false}/>
                          </div>
                          <div className="row">
                             <div className="inputBox">
                                <input type="text" min="1" max="3" placeholder="" />
                              </div>
                          </div>
                      </div>
                    );
                });
          this._component = (
              <div className="row imageQuantityContainer">
                <div className="col-md-8 col-sm-8 imageContainer">
                    <div className="row imagecomp">
                        {imageComponents}
                    </div>
                    <div className="overlayImgComp"></div>
                    <div className="row">
                      <div className="confirmShelfButton">
                          <CommonButton disabled={true} text={"Complete Put"} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.COMPLETE_PUT} />
                      </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4">
                    <div className="row">
                      <Rack rackData = {this.state.PickFrontRackDetails} />
                    </div>
                    <div className="row">
                      <div className="confirmShelfButton">
                          <CommonButton disabled={false} text={"Finished"} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.PUT_FINISHED} />
                      </div>
                    </div>
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