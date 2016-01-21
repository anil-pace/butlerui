
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
var Modal = require('./Modal/Modal');


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
           AuditSlotDetails :AuditStore.getCurrentSlot(),
           AuditFinishFlag:AuditStore.getFinishAuditFlag(),
           AuditShowModal:AuditStore.getModalStatus()

    };
}


var Audit = React.createClass({
  _component:'',
  _notification:'',
  _cancelStatus:'',
  _boxSerial:'',
  _currentBox:'',
  _looseItems:'',
  showModal: function() {
        if(this.state.AuditShowModal["showModal"] !=undefined && this.state.AuditShowModal["showModal"] == true){
          var self = this;

          setTimeout((function(){ActionCreators.showModal({
              data:{
              "message":self.state.AuditShowModal.message
            },
            type:"message"
          });
        $('.modal').modal();
      return false;
      }),0)

       }
  },
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    //this.showModal();
    AuditStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    AuditStore.removeChangeListener(this.onChange);
  },
  componentDidMount:function(){
    this.showModal();
    AuditStore.addChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
     this.showModal();
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
          if(this.state.AuditBoxSerialData["tableRows"].length > 0 ){
            this._boxSerial = (<TabularData data = {this.state.AuditBoxSerialData}/>);
          }else{
            this._boxSerial = '';
          }
          if(this.state.AuditLooseItemsData["tableRows"].length > 0 ){
            this._looseItems = (<TabularData data = {this.state.AuditLooseItemsData} />);
          }else{
            this._looseItems = '';
          }
          this._component = (
              <div className='grid-container'>
                <Modal />
                <CurrentSlot slotDetails={this.state.AuditSlotDetails} />
                <div className='main-container space-left'>
                  <div className="audit-scan-left">
                      {this._boxSerial}
                      {this._looseItems}
                  </div>
                  <div className="audit-scan-middle">
                   <Img />
                   <TabularData data = {this.state.AuditItemDetailsData}/>
                  </div>
                  <div className="audit-scan-right">
                    <KQ scanDetails = {this.state.AuditScanDetails}/>
                   <div className = 'finish-scan'>
                    <Button1 disabled = {!this.state.AuditFinishFlag} text = {"Finish"} module ={appConstants.AUDIT} action={appConstants.GENERATE_REPORT}  color={"orange"}/>
                  </div>
                  </div>
                </div>
                {this._cancelStatus}
              </div>
            );

        break;
      case appConstants.AUDIT_RECONCILE:
          var subComponent='';
          var messageType = 'large';
          if(this.state.AuditReconcileBoxSerialData.tableRows.length>1 || this.state.AuditReconcileLooseItemsData.tableRows.length>1 ){
            subComponent=(
                <div className='main-container'>
                  <div className="audit-reconcile-left">
                    <TabularData data = {this.state.AuditReconcileBoxSerialData}/>
                    <TabularData data = {this.state.AuditReconcileLooseItemsData} />
                  </div>
                </div>
              );
            messageType = "small";
          }
          this._component = (
              <div className='grid-container audit-reconcilation'>
                 <CurrentSlot slotDetails={this.state.AuditSlotDetails} />
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