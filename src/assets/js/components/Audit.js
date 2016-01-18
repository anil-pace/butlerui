
var React = require('react');
var AuditStore = require('../stores/AuditStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var SystemIdle = require("./SystemIdle");
var Notification = require("./Notification/Notification");
var Button1 = require("./Button/Button");
var appConstants = require('../constants/appConstants');
var Modal = require('./Modal/Modal');
var TabularData = require('./TabularData');
var Button1 = require('./Button/Button.js');
var Img = require('./PrdtDetails/ProductImage.js');
var Rack = require('./Rack/MsuRack.js');
var Spinner = require("./Spinner/LoaderButler");
var Reconcile = require("./Reconcile");
var utils = require("../utils/utils.js");
var ActionCreators = require('../actions/CommonActions');
var KQ = require('./ProductDetails/KQ.js');
var CurrentSlot = require('./CurrentSlot');


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
           AuditCancelScanStatus:AuditStore.getCancelScanStatus(),
           AuditScanDetails:AuditStore.getScanDetails(),
           AuditSlotDetails :AuditStore.getCurrentSlot()

    };
}


var Audit = React.createClass({
  _component:'',
  _notification:'',
  _cancelStatus:'',
  _boxSerial:'',
  _currentBox:'',
  _looseItems:'',
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
          if(this.state.AuditCancelScanStatus == true){
            this._cancelStatus = (
              <div className = 'cancel-scan'>
                <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.AUDIT} action={appConstants.CANCEL_SCAN}  color={"black"}/>
              </div>
            );
          }else{
            this._cancelStatus = '';
          }
          if(this.state.AuditBoxSerialData.length > 0 ){
            _boxSerial = (<TabularData data = {this.state.AuditBoxSerialData}/>);
          }else{
            _boxSerial = '';
          }
          if(this.state.AuditCurrentBoxSerialData.length > 1 ){
            _currentBox = (<TabularData data = {this.state.AuditCurrentBoxSerialData} size="double"/>);
          }else{
            _currentBox = '';
          }
          if(this.state.AuditLooseItemsData.length > 1 ){
            _looseItems = (<TabularData data = {this.state.AuditLooseItemsData} size="triple"/>);
          }else{
            _looseItems = '';
          }
          this._component = (
              <div className='grid-container'>
                <CurrentSlot slotDetails={this.state.AuditSlotDetails} />
                <div className='main-container'>
                  <div className="audit-scan-left">
                      <TabularData data = {this.state.AuditBoxSerialData}/>
                      <TabularData data = {this.state.AuditLooseItemsData} />
                  </div>
                  <div className="audit-scan-middle">
                   <Img />
                   <TabularData data = {this.state.AuditItemDetailsData}/>
                  </div>
                  <div className="audit-scan-right">
                    <KQ scanDetails = {this.state.AuditScanDetails}/>
                   <div className = 'finish-scan'>
                    <Button1 disabled = {!this.state.AuditCurrentBoxSerialData.tableRows[1][0].disabled} text = {"Finish"} module ={appConstants.AUDIT} action={appConstants.GENERATE_REPORT}  color={"orange"}/>
                  </div>
                  </div>
                </div>
                {this._cancelStatus}
              </div>
            );

        break;
      case appConstants.AUDIT_RECONCILE:
          console.log("jiiiii");
          var subComponent='';
          var messageType = 'large';
          if(this.state.AuditReconcileBoxSerialData.tableRows.length>1 || this.state.AuditReconcileLooseItemsData.tableRows.length>1 ){
            subComponent=(
                <div className='main-container'>
                  <div className="audit-reconcile-left">
                    <TabularData data = {this.state.AuditReconcileBoxSerialData}/>
                  </div>
                  <div className="audit-reconcile-right">
                   <TabularData data = {this.state.AuditReconcileLooseItemsData} size="triple"/>
                  </div>
                </div>
              );
            messageType = "small";
          }
          this._component = (
              <div className='grid-container audit-reconcilation'>
                <div className={messageType=="small"?"reconcilation-message":"reconcilation-message large"}>
                  <Reconcile message={(this.state.AuditReconcileBoxSerialData.tableRows.length>1 || this.state.AuditReconcileLooseItemsData.tableRows.length>1) ? "Reconcile the below Item":"No Items to renconcile"}/>
                </div>
                {subComponent}
                 <div className = 'staging-action' >
                  <Button1 disabled = {false} text = {"Back"} module ={appConstants.AUDIT} action={appConstants.CANCEL_FINISH_AUDIT} color={"black"}/>
                  <Button1 disabled = {false} text = {"OK"} module ={appConstants.AUDIT} action={appConstants.FINISH_CURRENT_AUDIT} color={"orange"} />  
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