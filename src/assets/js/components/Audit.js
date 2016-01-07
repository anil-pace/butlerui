
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
var Spinner = require("./Spinner/LoaderButler");


function getStateData(){
  console.log(AuditStore.getBoxSerialData());
  return {
           AuditNavData : AuditStore.getNavData(),
           AuditNotification : AuditStore.getNotificationData(),
           AuditScreenId:AuditStore.getScreenId(),
           AuditServerNavData : AuditStore.getServerNavData(),
           AuditBoxSerialData :AuditStore.getBoxSerialData(),
           AuditReconcileBoxSerialData :AuditStore.getReconcileBoxSerialData(),
           AuditCurrentBoxSerialData :AuditStore.getCurrentBoxSerialData(),
           AuditLooseItemsData:AuditStore.getLooseItemsData(),
           AuditReconcileLooseItemsData:AuditStore.getReconcileLooseItemsData(),
           AuditItemDetailsData:AuditStore.getItemDetailsData(),
           AuditRackDetails:AuditStore.getRackDetails(),
           AuditCancelScanStatus:AuditStore.getCancelScanStatus()

    };
}


var Audit = React.createClass({
  _component:'',
  _notification:'',
  _cancelStatus:'',
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
      case appConstants.AUDIT_WAITING_FOR_MSU:
          this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Spinner />
                 </div>
              </div>
            );
        break;
      case appConstants.AUDIT_SCAN:
          this._component = (
              <div className='grid-container'>
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
      case appConstants.AUDIT_RECONCILE:
          this._component = (
              <div className='grid-container audit-reconcilation'>
                <div className='main-container'>
                  <div className="audit-reconcile-left">
                    <TabularData data = {this.state.AuditReconcileBoxSerialData}/>
                  </div>
                  <div className="audit-reconcile-right">
                   <TabularData data = {this.state.AuditReconcileLooseItemsData} size="triple"/>
                  </div>
                </div>
                 <div className = 'staging-action' >
                  <Button1 disabled = {false} text = {"Back"} module ={appConstants.AUDIT} action={appConstants.AUDIT_BACK} color={"black"}/>
                  <Button1 disabled = {false} text = {"OK"} module ={appConstants.AUDIT} action={appConstants.AUDIT_OK} color={"orange"} />  
                </div>
              </div>
            );
        break;
      default:
        return true; 
    }
  },
  getCancelStatus:function(){
    if(this.state.AuditCancelScanStatus == true){
      this._cancelStatus = (
        <div className = 'cancel-scan'>
            <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.AUDIT} action={appConstants.CANCEL_SCAN}  color={"black"}/>
        </div>
      );
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
    this.getCancelStatus();
    this.getScreenComponent(this.state.AuditScreenId);
      return (
        <div className="main">
          <Header />
          <Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>
          {this._component}
          {this._notification}
          {this._cancelStatus}
        </div> 
       
      )
  }
});

module.exports = Audit;