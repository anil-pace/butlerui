
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
var ExceptionHeader = require('./ExceptionHeader');
var KQExceptionMissing = require('./ProductDetails/KQExceptionMissing');


function getStateData(){
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
      if(this.state.AuditScreenId != appConstants.AUDIT_RECONCILE && this.state.AuditScreenId != appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE && this.state.AuditScreenId != appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION && this.state.AuditScreenId != appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION ){
        if(this.state.AuditShowModal["showModal"] !=undefined && this.state.AuditShowModal["showModal"] == true /*&& !$('.modal').hasClass('in')*/){
          var self = this;
          this.state.AuditShowModal["showModal"] = false;
          var r = self.state.AuditShowModal.message;
          setTimeout((function(){
            ActionCreators.showModal({
              data:{
              "message":r
            },
            type:"message"
          });
        $('.modal').modal("show");
      //return false;
      }),0);
       }
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
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION}  color={"black"}/>
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
                  <Modal />
                 <div className='main-container'>
                    <Spinner />
                 </div>
              </div>
            );
           }else{
          this._component = this.getExceptionComponent();
        }
        break;


      case appConstants.AUDIT_LOCATION_SCAN:
      if(this.state.AuditSRStatus){
        this._navigation = (<Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                   <div className="gor-mpu"/>                  
              </div>
            );

      }
      else
      {
         if(this.state.AuditExceptionStatus == false){
        this._navigation = (<Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        this._component = (
              <div className='grid-container'>
                  <Modal />
                 <div className='main-container'>
                    <Rack rackData = {this.state.AuditRackDetails}/>
                 </div>
              </div>
            );
      }else{
          this._component = this.getExceptionComponent();
        }
      }
        
      break;

      case appConstants.AUDIT_SCAN:
       if(this.state.AuditExceptionStatus == false){
           this._navigation = (<Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          if(this.state.AuditCancelScanStatus == true){
            this._cancelStatus = (
              <div className = 'cancel-scan'>
                <Button1 disabled = {false} text = {_("Cancel Scan")} module ={appConstants.AUDIT} action={appConstants.CANCEL_SCAN}  color={"black"}/>
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
                   <Img srcURL= {this.state.AuditItemDetailsData.image_url}/>
                   <TabularData data = {this.state.AuditItemDetailsData}/>
                  </div>
                  <div className="audit-scan-right">
                                    
                   <div className = 'finish-scan'>
                    <Button1 disabled = {!this.state.AuditFinishFlag} text = {_("Finish")} module ={appConstants.AUDIT} action={appConstants.GENERATE_REPORT}  color={"orange"}/>
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
//SR Audit


      case appConstants.AUDIT_SCAN_SR:
       if(this.state.AuditExceptionStatus == false){
           this._navigation = (<Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          if(this.state.AuditCancelScanStatus == true){
            this._cancelStatus = (
              <div className = 'cancel-scan'>
                <Button1 disabled = {false} text = {_("Cancel Scan")} module ={appConstants.AUDIT} action={appConstants.CANCEL_SCAN}  color={"black"}/>
              </div>
            );
          }else{
            this._cancelStatus = '';
          }
          if(this.state.AuditPackData["tableRows"].length > 0){
            this._packData = (<TabularData data = {this.state.AuditPackData}/>);
          }else{
            this._packData = '';
          }
          if(this.state.AuditSubPackData["tableRows"].length > 0){
            this._subPackData = (<TabularData data = {this.state.AuditSubPackData} />);
          }else{
            this._subPackData = '';
          }

          this._component = (
              <div className='grid-container'>
                <Modal />
                
                <div className='main-container space-left'>
                  <div className="audit-scan-left">
                      {this._packData}
                      {this._subPackData}
                  </div>
                  <div className="audit-scan-middle">
                   <Img srcURL= {this.state.AuditItemDetailsData.image_url}/>
                   <TabularData data = {this.state.AuditItemDetailsData}/>
                  </div>
                  <div className="audit-scan-right">
                    <KQExceptionMissing scanDetailsMissing={this.state.AuditSRKQQuantity}
                                                            type={appConstants.UNSCANNABLE}
                                                            action={appConstants.UNSCANNABLE}/>
                                    
                   <div className = 'finish-scan'>
                    <Button1 disabled = {!this.state.AuditFinishFlag} text = {_("Finish")} module ={appConstants.AUDIT} action={appConstants.GENERATE_REPORT}  color={"orange"}/>
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
          this._navigation = (<Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>);  
          var subComponent='';
          var messageType = 'large';
          var BoxSerialData = '';
          var ItemInBoxData = '';
          var LooseItemsData = '';
          var AuditMessage = '';
          var PackData='';
          var SubPackData='';
          var displayStyle;
          var mm = {
            "details": [],
            "code": "Audit.A.012",
            "description": "No Items To Reconcile",
            "level": "info"
          };
           var SRmessage = {
            "details": [],
            "code": "Audit.A.013",
            "description": "No Sub-pack To Reconcile",
            "level": "info"
          };
          if(this.state.AuditReconcileBoxSerialData["tableRows"].length == 0  && this.state.AuditReconcileItemInBoxData["tableRows"].length == 0 && this.state.AuditReconcileLooseItemsData["tableRows"].length == 0 && !this.state.AuditSRStatus)
            AuditMessage=(<Reconcile navMessagesJson={this.props.navMessagesJson} message={mm} />);
       if(this.state.AuditReconcilePackData["tableRows"].length == 0  && this.state.AuditReconcileSubPackData["tableRows"].length == 0 && this.state.AuditSRStatus)
            AuditMessage=(<Reconcile navMessagesJson={this.props.navMessagesJson} message={SRmessage} />);
          if(this.state.AuditReconcileBoxSerialData["tableRows"].length != 0 )
              BoxSerialData = (<TabularData data = {this.state.AuditReconcileBoxSerialData}/>);
          if(this.state.AuditReconcileItemInBoxData["tableRows"].length != 0 )
              ItemInBoxData = (<TabularData data = {this.state.AuditReconcileItemInBoxData}/>);
          if(this.state.AuditReconcileLooseItemsData["tableRows"].length != 0 )
              LooseItemsData = (<TabularData data = {this.state.AuditReconcileLooseItemsData}/>);
          if(this.state.AuditReconcilePackData["tableRows"].length != 0 )
              PackData = (<TabularData data = {this.state.AuditReconcilePackData}/>);
          if(this.state.AuditReconcileSubPackData["tableRows"].length != 0 )
              SubPackData = (<TabularData data = {this.state.AuditReconcileSubPackData}/>);
            subComponent=(
                <div className='main-container'>
                  <div className="audit-reconcile-left">
                    {AuditMessage}
                    {BoxSerialData}
                    {ItemInBoxData}
                    {LooseItemsData}
                    {PackData}
                    {SubPackData}
                  </div>
                </div>
              );
            messageType = "small";
          this._component = (
              <div className='grid-container audit-reconcilation'>
                  <Modal />
                  <CurrentSlot slotDetails={this.state.AuditSlotDetails}/>
                {subComponent}
                 <div className = 'staging-action' >
                  <Button1 disabled = {false} text = {_("Back")} module ={appConstants.AUDIT} action={appConstants.CANCEL_FINISH_AUDIT} color={"black"}/>
                  <Button1 disabled = {false} text = {_("OK")} module ={appConstants.AUDIT} action={appConstants.FINISH_CURRENT_AUDIT} color={"orange"} />  
                </div>
              </div>
            );
          }else{
          this._component = this.getExceptionComponent();
        }
        break;
      case appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE:
      case appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION:
      case appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION:
          this._navigation = '';
          if(this.state.AuditExceptionScreen == "first_screen"){
          /**
           * T2803: Next button disable issue in Audit
           */
          this._disableNext = this.state.AuditKQDetails.current_qty ? false : true;
          this._component = (
              <div className='grid-container exception'>
                  <Modal/>
                <Exception data={this.state.AuditExceptionData}/>
                <div className="exception-right">
                  <ExceptionHeader data={this.state.AuditServerNavData} />
                  <KQ scanDetailsGood = {this.state.AuditKQDetails} />
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {this._disableNext} text = {_("NEXT")} color={"orange"} module ={appConstants.AUDIT} action={appConstants.AUDIT_NEXT_SCREEN} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.AUDIT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
          }
          else if(this.state.AuditExceptionScreen == "second_screen"){
              this._component = (
              <div className='grid-container exception'>
                  <Modal/>
                <Exception data={this.state.AuditExceptionData}/>
                <div className="exception-right">
                  <div className="main-container exception2">
                    <div className = "kq-exception">
                      <div className="kq-header">{_("Please put entities in exception area and confirm")}</div>
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode"> 
                    <Button1 disabled = {false} text = {_("FINISH")} color={"orange"} module ={appConstants.AUDIT} action={appConstants.SEND_KQ_QTY} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.AUDIT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
           }
        break; 

      case appConstants.PPTL_MANAGEMENT:
      case appConstants.SCANNER_MANAGEMENT:
          this._navigation = (<Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>)
          var _button;
          if(this.state.AuditScreenId == appConstants.SCANNER_MANAGEMENT){
          _button = (<div className = 'staging-action' >                          
                          <Button1 disabled = {false} text = {_("BACK")} module ={appConstants.PERIPHERAL_MANAGEMENT} status={true} action={appConstants.CANCEL_ADD_SCANNER} color={"black"} />
                          <Button1 disabled = {false} text = {_("Add Scanner")} module ={appConstants.PERIPHERAL_MANAGEMENT} status={true} action={appConstants.ADD_SCANNER} color={"orange"} />
                      </div>)
          }
          else{
            _button = (<div className = 'staging-action' ><Button1 disabled = {false} text = {_("BACK")} module ={appConstants.PERIPHERAL_MANAGEMENT} status={true} action={appConstants.CANCEL_PPTL} color={"black"} /></div>)
          }
          this._component = (
              <div className='grid-container audit-reconcilation'>
                  <Modal />
                  <div className="row scannerHeader">
                    <div className="col-md-6">
                      <div className="ppsMode"> PPS Mode : {this.state.AuditPpsMode.toUpperCase()} </div>
                    </div>
                    <div className="col-md-6">
                      <div className="seatType"> Seat Type : {this.state.AuditSeatType.toUpperCase()}</div>
                    </div>
                  </div>
                  <TabularData data = {this.state.utility}/>
                  {_button}
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
    else{
        if($(".modal.notification-error").is(":visible")){
            setTimeout((function(){
                $('.modal.notification-error').data('bs.modal').options.backdrop=true
                $(".modal-backdrop").remove()
                $(".modal.notification-error").modal("hide");
                $(".modal").removeClass("notification-error")

            }),0)

            return null
        }
        this._notification = "";
    }
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