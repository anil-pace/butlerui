
var React = require('react');
var AuditStore = require('../stores/AuditStore');
var mainstore = require('../stores/mainstore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Exception = require('./Exception/Exception');
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
 /* return {
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

    };*/
     return mainstore.getScreenData();
}


var Audit = React.createClass({
  _component:'',
  _notification:'',
  _cancelStatus:'',
  _boxSerial:'',
  _currentBox:'',
  _looseItems:'',
  _navigation:'',
  showModal: function() {
        if(this.state.AuditShowModal["showModal"] !=undefined && this.state.AuditShowModal["showModal"] == true && !$('.modal').hasClass('in')){
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
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  componentDidMount:function(){
    this.showModal();
    AuditStore.addChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
     this.showModal();
  },
  getExceptionComponent:function(){
      var _rightComponent = '';
      this._navigation = '';
      return (
              <div className='grid-container exception'>
                <Modal />
                <Exception data={this.state.AuditExceptionData} action={true}/>
                <div className="exception-right"></div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION}  color={"black"}/>
                </div>
              </div>
            );
  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.AUDIT_WAITING_FOR_MSU:
         if(this.state.AuditExceptionStatus == false){
          this._navigation = (<Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Spinner />
                 </div>
              </div>
            );
           }else{
          this._component = this.getExceptionComponent();
        }
        break;
      case appConstants.AUDIT_SCAN:
       if(this.state.AuditExceptionStatus == false){
           this._navigation = (<Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
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
           }else{
          this._component = this.getExceptionComponent();
        }

        break;
      case appConstants.AUDIT_RECONCILE:
          if(this.state.AuditExceptionStatus == false){
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
          }else{
          this._component = this.getExceptionComponent();
        }
        break;
      case appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE:
      case appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_BARCODE:
      case appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION:
          this._navigation = '';
          this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.AuditExceptionData}/>
                <div className="exception-right">
                  <ExceptionHeader text={this.state.AuditServerNavData["description"]} />
                  <KQ scanDetails = {this.state.AuditKQDetails} />
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {"FINISH"} color={"orange"} module ={appConstants.AUDIT} action={appConstants.SEND_KQ_QTY} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.AUDIT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
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
          {this._navigation}
          {this._component}
          {this._notification}
        </div> 
       
      )
  }
});

module.exports = Audit;