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
          this._navigation = (<MessageNavigation navData ={this.state.PutFrontNavData} />);
          this._notification = (<NotificationBar notificationData = {this.state.PutFrontNotificationData} />);
          imageComponents = this.state.ListItems.map(function(data,index){
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
                    <div className="row">
                        {imageComponents}
                    </div>
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