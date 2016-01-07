
var React = require('react');
var AuditStore = require('../stores/AuditStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');
var Modal = require('./Modal/Modal');
var SystemIdle = require('./SystemIdle');
var TabularData = require('./TabularData');
var Button1 = require('./Button/Button.js');
var Img = require('./PrdtDetails/ProductImage.js');
var Rack = require('./Rack/MsuRack.js');
var Reconcile = require('./Reconcile.js');


function getStateData(){
  console.log(AuditStore.getBoxSerialData());
  return {
           AuditNavData : AuditStore.getNavData(),
           AuditNotification : AuditStore.getNotificationData(),
           AuditScreenId:AuditStore.getScreenId(),
           AuditServerNavData : AuditStore.getServerNavData(),
           AuditBoxSerialData :AuditStore.getBoxSerialData(),
           AuditCurrentBoxSerialData :AuditStore.getCurrentBoxSerialData(),
           AuditLooseItemsData:AuditStore.getLooseItemsData(),
           AuditItemDetailsData:AuditStore.getItemDetailsData(),
           AuditRackDetails:AuditStore.getRackDetails()

    };
}


var Audit = React.createClass({
  _component:'',
  _notification:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    AuditStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    AuditStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.AUDIT_SCAN:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                  <div className="audit-scan-left">
                    <Rack rackData = {this.state.AuditRackDetails} type="small"/>
                    <TabularData data = {this.state.AuditBoxSerialData}/>
                  </div>
                  <div className="audit-scan-middle">
                    <TabularData data = {this.state.AuditCurrentBoxSerialData} size="double"/>
                   <TabularData data = {this.state.AuditLooseItemsData} size="triple"/>
                  </div>
                  <div className="audit-scan-right">
                    <Img />
                   <TabularData data = {this.state.AuditItemDetailsData}/>
                   <div className = 'finish-scan'>
                    <Button1 disabled = {false} text = {"Finish"} module ={appConstants.AUDIT} action={appConstants.FINISH_SCAN}  color={"orange"}/>
                  </div>
                  </div>
                </div>
              </div>
            );

        break;
      case appConstants.AUDIT_STATUS:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                </div>
              </div>
            );
        break;
      default:
        return true; 
    }
  },

  getNotificationComponent:function(){
    if(this.state.AuditNotification != undefined)
      this._notification = <Notification notification={this.state.AuditNotification} navMessagesJson={this.props.navMessagesJson} />
    else
      this._notification = "";
  },
  render: function(data){
    this.getNotificationComponent();
    this.getScreenComponent(this.state.AuditScreenId);
      return (
        <div className="main">
          <Header />
          <Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>
            {this._component}
            {this._notification}          
        </div> 
       
      )
  }
});

module.exports = Audit;