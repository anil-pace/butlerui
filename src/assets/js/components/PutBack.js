
var React = require('react');
var PutBackStore = require('../stores/PutBackStore');
var mainstore = require('../stores/mainstore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var BinsFlex = require("./Bins/BinsFlexArrange.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var WrapperSplitRoll = require('./ProductDetails/WrapperSplitRoll');
var appConstants = require('../constants/appConstants');
var Modal = require('./Modal/Modal');
var SystemIdle = require('./SystemIdle');
var TabularData = require('./TabularData');
var Exception = require('./Exception/Exception');
var ExceptionHeader = require('./ExceptionHeader');
var KQ = require('./ProductDetails/KQ');
var Img = require('./PrdtDetails/ProductImage.js');
var Reconcile = require("./Reconcile");
var MtuNavigation = require("./mtuNavigation");
var allSvgConstants = require('../constants/svgConstants');
var CommonActions = require('../actions/CommonActions');
var serverMessages = require('../serverMessages/server_messages');
var utils = require('../utils/utils.js');
function getStateData(){
  return mainstore.getScreenData();
}

var PutBack = React.createClass({
  _component:'',
  _notification:'',
  _exception:'',
  _navigation:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    //PutBackStore.addChangeListener(this.onChange);
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    //PutBackStore.removeChangeListener(this.onChange);
    mainstore.addChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
  openKeyboard: function() {
        $("#actionMenu").hide();
        $(".form-control").blur();
         virtualKeyBoard_header = $('#invoiceNumber').keyboard({
            layout: 'custom',
             customLayout: {
        'default': ['! @ # $ % ^ & * + _', '1 2 3 4 5 6 7 8 9 0 {b}', 'q w e r t y u i o p', 'a s d f g h j k l', '{shift} z x c v b n m . {shift}','{space}', '{a} {c}'],
        'shift':   ['( ) { } [ ] = ~ ` -', '< > | ? / " : ; , \' {b}', 'Q W E R T Y U I O P', 'A S D F G H J K L', '{shift} Z X C V B N M . {shift}','{space}', '{a} {c}']
      },
            css: {
                container: "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad"
            },
            reposition: true,
            alwaysOpen: false,
            initialFocus: true,           
            visible : function(e, keypressed, el){
                el.value = '';
            },
            accepted: function(e, keypressed, el) {
                if (e.target.value.trim() === '') {
                } else {
                    var data = {
                        "event_name": "process_barcode",
                        "event_data": {
                            "barcode": e.target.value.trim(),
                        }
                    }
                    CommonActions.postDataToInterface(data);
                }
            }
        })
        $('#invoiceNumber').data('keyboard').reveal();
    },    
  getExceptionComponent:function(){
    var _rightComponent = '';
    this._navigation = '';
    return (
      <div className='grid-container exception'>
      <Modal />
      <Exception data={this.state.PutBackExceptionData} action={true}/>
      <div className="exception-right"></div>
      <div className = 'cancel-scan'>
      <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION}  color={"black"}/>
      </div>
      </div>
      );
  },

  

  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PUT_BACK_STAGE:
      case appConstants.PUT_BACK_SCAN_TOTE:
      var invoiceStringArgExitBtn = [], invoiceStringArg = [];
      invoiceStringArgExitBtn[0] = this.state.InvoiceType;
      invoiceStringArg[0] = this.state.InvoiceType;
      if(this.state.PutBackExceptionStatus == false){
        this._navigation = (<Navigation navData ={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        var binComponent ="";
        if (this.state.OrigBinUse){
          binComponent =(  <BinsFlex binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId} seatType = {this.state.SeatType}/>)
        }else{
          binComponent = ( <div className='main-container'>
            <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId} />
            </div>)
        }
        this._component = (
          <div className='grid-container'>
          {(this.state.InvoiceRequired && this.state.InvoiceRequired.invoiceFlag)?(<div className="gor-invoice-put-back">{utils.frntStringTransform("FRNT.PBI.03",invoiceStringArg)} <span className="gor-invoice-put-back-h2">{this.state.InvoiceRequired.invoiceId}</span></div>):""}
          <Modal/>
          {binComponent}
          <div className = 'staging-action' >
          <Button1 disabled = {!this.state.StageActive} text = {_("Stage")} module ={appConstants.PUT_BACK} action={appConstants.STAGE_ONE_BIN} color={"orange"}/>
          <Button1 disabled = {!this.state.StageAllActive} text = {_("Stage All")} module ={appConstants.PUT_BACK} action={appConstants.STAGE_ALL} color={"black"} />  
          </div>
          {(this.state.InvoiceRequired && this.state.InvoiceRequired.invoiceFlag) && (!(screen_id===appConstants.PUT_BACK_STAGE && this.state.ToteId))?
          <div className = 'cancel-scan'>
            <Button1 disabled = {false} text = {utils.frntStringTransform("FRNT.PBI.02",invoiceStringArgExitBtn)} module ={appConstants.PUT_BACK} action={appConstants.EXIT_INVOICE} color={"black"}/>
          </div>:""}
          </div>
          );
      }else{
        this._component = this.getExceptionComponent();
      }
      break;


      case appConstants.PUT_BACK_WAREHOUSE_FULL_IRT_SCAN:
      this._navigation = (<Navigation navData ={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
      this._component = (
          <div className='grid-container'>
          <div className='main-container'>
            <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId} />
            </div>
          </div>
          );         
      break;

      case appConstants.PUT_BACK_INVOICE:
      var invoiceStringArg = [];
      invoiceStringArg[0] = this.state.InvoiceType;
      var componentModalString = utils.frntStringTransform("FRNT.PBI.01",invoiceStringArg);
      this._navigation = '';
      this._component = (
        <div className='grid-container gor-invoice-wrap'>
            <Modal/>
          <div className='gor-invoice-input-wrap'>
            <div className='gor-invoice-h1-wrap'>{componentModalString}</div>
            <div className='gor-invoice-input-keyboard-wrap' onClick={this.openKeyboard}> 
                <input type="text" className="form-control gor-invoice-input-box-wrap" id="invoiceNumber" placeholder={componentModalString} ref='invoiceNumber'/> 
            </div> 
          </div>
        </div>);
      break;
      case appConstants.PUT_BACK_SCAN:
      var invoiceStringArg = [];
      invoiceStringArg[0] = this.state.InvoiceType;
      if(this.state.PutBackExceptionStatus == false){
        var binComponent = "";
        if(this.state.OrigBinUse){
           binComponent = (<div className="binsFlexWrapperContainer">
            <BinsFlex binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId} seatType = {this.state.SeatType}/>
            <WrapperSplitRoll scanDetails={this.state.PutBackScanDetails} productDetails={this.state.PutBackProductDetails} itemUid={this.state.PutBackItemUid} />
            </div>);
        }else{

          binComponent = (<div className='main-container'>
            <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId}/>
            <Wrapper scanDetails={this.state.PutBackScanDetails} productDetails={this.state.PutBackProductDetails} itemUid={this.state.PutBackItemUid}/>
            </div>);

        }
        this._navigation = (<Navigation navData ={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        this._component = (
          <div className='grid-container'>
          {(this.state.InvoiceRequired && this.state.InvoiceRequired.invoiceFlag)?(<div className="gor-invoice-put-back">{utils.frntStringTransform("FRNT.PBI.03",invoiceStringArg)} <span className="gor-invoice-put-back-h2">{this.state.InvoiceRequired.invoiceId}</span></div>):""}
          <Modal />
          {binComponent}

          <div className = 'cancel-scan'>
          <Button1 disabled = {false} text = {_("Cancel Scan")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_SCAN} barcode={this.state.PutBackItemUid} color={"black"}/>
          </div>
          </div>
          );
      }else{
        this._component = this.getExceptionComponent();
      }
      break;
      case appConstants.PUT_BACK_TOTE_CLOSE:
      if(this.state.PutBackExceptionStatus == false){
        this._navigation = (<Navigation navData ={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        var subComponent='';
        var messageType = 'large';
        var m = {
          "details": [],
          "code": "PtB.E.020",
          "description": "Tote Match successfully",
          "level": "info"
        };
        if(this.state.PutBackReconciliation["tableRows"].length > 1 )
          subComponent=(
            <div className='main-container'>
            <div className="audit-reconcile-left">
            <TabularData data = {this.state.PutBackReconciliation}/>
            </div>
            </div>
            );
        else
          subComponent=(
            <Reconcile navMessagesJson={this.props.navMessagesJson} message={m} />
            );
        messageType = "small";
        this._component = (
          <div className='grid-container audit-reconcilation'>
              <Modal/>
          {subComponent}
          <div className = 'staging-action' >
          <Button1 disabled = {false} text = {_("BACK")} module ={appConstants.PUT_BACK} toteId={this.state.PutBackToteId} status={false} action={appConstants.CANCEL_TOTE} color={"black"}/>
          <Button1 disabled = {false} text = {_("CLOSE")} module ={appConstants.PUT_BACK} toteId={this.state.PutBackToteId} status={true} action={appConstants.CLOSE_TOTE} color={"orange"} />  
          </div>
          </div>
          );
      }else{
        this._component = this.getExceptionComponent();
      }
      break;
      case appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE:
      this._navigation = '';
      
      if(this.state.PutBackExceptionScreen == "damaged")
        this._component = (
          <div className='grid-container exception'>
              <Modal/>
          <Exception data={this.state.PutBackExceptionData}/>
          <div className="exception-right">
          <ExceptionHeader data={this.state.PutBackServerNavData} />
          <KQ scanDetailsGood = {this.state.PutBackKQDetails} />
          <div className = "finish-damaged-barcode">
          <Button1 disabled = {this.state.PutBackKQDetails.current_qty==0 || (!Number.isInteger(this.state.PutBackKQDetails.current_qty))} text = {_("NEXT")} color={"orange"} module ={appConstants.PUT_BACK} action={appConstants.FINISH_DAMAGED_ENTITY_DATA} />  
          </div>
          </div>
          <div className = 'cancel-scan'>
          <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
          </div>
          </div>
          );
      break; 
       case appConstants.PUT_BACK_PHYSICALLY_DAMAGED_ITEMS:
          this._navigation = '';
          if(this.state.PutBackExceptionScreen === appConstants.ENTITY_DAMAGED)
          this._component = (
              <div className='grid-container exception'>
                  <Modal/>
                <Exception data={this.state.PutBackExceptionData}/>
                <div className="exception-right">
                  <ExceptionHeader data={this.state.PutBackServerNavData} />
                  <div className="main-container exception1">
                    <Img srcURL= {this.state.PutBackExceptionProductDetails.image_url}/>

                     <TabularData  data = {this.state.PutBackExceptionProductDetails}/>

                    <KQ scanDetails = {this.state.PutBackKQDetails} />
                  </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {this.state.PutBackKQDetails.current_qty==0 || (!Number.isInteger(this.state.PutBackKQDetails.current_qty))} text = {_("NEXT")} color={"orange"} module ={appConstants.PUT_BACK} action={appConstants.FINISH_EXCEPTION_ENTITY_DAMAGED} />
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
        break; 
       case appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS:
          this._navigation = '';
          if(this.state.PutBackExceptionScreen == "oversized")
          this._component = (
              <div className='grid-container exception'>
                  <Modal/>
                <Exception data={this.state.PutBackExceptionData}/>
                <div className="exception-right">
                  <ExceptionHeader data={this.state.PutBackServerNavData} />
                  <div className="main-container exception1">
                    <Img srcURL= {this.state.PutBackExceptionProductDetails.image_url}/>
          <TabularData  data = {this.state.PutBackExceptionProductDetails}/>

          <KQ scanDetails = {this.state.PutBackKQDetails} />
          </div>
          <div className = "finish-damaged-barcode">
          <Button1 disabled = {this.state.PutBackKQDetails.current_qty==0 || (!Number.isInteger(this.state.PutBackKQDetails.current_qty))} text = {_("NEXT")} color={"orange"} module ={appConstants.PUT_BACK} action={appConstants.FINISH_EXCEPTION_ITEM_OVERSIZED} />
          </div>
          </div>
          <div className = 'cancel-scan'>
          <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
          </div>
          </div>
          );
      break; 
      case appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS:
      this._navigation = '';
      var binComponent="";
      if(this.state.OrigBinUse){
        binComponent=(<div className="exception1">
          <BinsFlex binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId} seatType = {this.state.SeatType}/>
          </div>)
      }else{
       binComponent=(<div className="main-container exception1">
        <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId}/>
        </div>)
     }
     this._component = (
      <div className='grid-container exception'>
          <Modal/>
      <Exception data={this.state.PutBackExceptionData}/>
      <div className="exception-right">
      <ExceptionHeader data={this.state.PutBackServerNavData} />
      {binComponent}
      <div className = "finish-damaged-barcode">
      <Button1 disabled = {this.state.PutBackNextButtonState} text = {_("NEXT")} color={"orange"} module ={appConstants.PUT_BACK} action={appConstants.SEND_EXCESS_ITEMS_BIN}  />  
      </div>
      </div>
      <div className = 'cancel-scan'>
      <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
      </div>
      </div>
      );
     break; 
     case appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE:
     this._navigation = '';
     if(this.state.PutBackExceptionScreen == "extra_quantity")
      this._component = (
        <div className='grid-container exception'>
            <Modal/>
        <Exception data={this.state.PutBackExceptionData}/>
        <div className="exception-right">
        <ExceptionHeader data={this.state.PutBackServerNavData} />
        <div className="main-container exception1">
        <Img srcURL= {this.state.PutBackExceptionProductDetails.image_url}/>
        <TabularData data = {this.state.PutBackExceptionProductDetails}/>
        <KQ scanDetails = {this.state.PutBackKQDetails} />
        </div>
        <div className = "finish-damaged-barcode">
        <Button1 disabled = {this.state.PutBackKQDetails.current_qty==0 || (!Number.isInteger(this.state.PutBackKQDetails.current_qty))} text = {_("NEXT")} color={"orange"} module ={appConstants.PUT_BACK} action={appConstants.FINISH_EXCEPTION_EXTRA_ITEM} />  
        </div>
        </div>
        <div className = 'cancel-scan'>
        <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
        </div>
        </div>
        );
    break; 

         case appConstants.PUT_BACK_EXCEPTION_ENITY_IRT_BIN:
          var selected_screen;
          var messageIRTenable,messageIRTdisable;
          if(this.state.GetExceptionType==appConstants.PHYSICALLY_DAMAGED)
          {
              messageIRTenable=(<div className="gor-exceptionConfirm-text">{_("Please put damaged entities in IRT bin and scan the bin")}</div>);
              messageIRTdisable=(<div className="gor-exceptionConfirm-text">{_("Please put damaged entities in exception area")}</div>);
          }
          else if(this.state.GetExceptionType==appConstants.EXTRA_ITEMS)
          {
              messageIRTenable=(<div className="gor-exceptionConfirm-text">{_("Please put extra entities in IRT bin and scan the bin")}</div>);
              messageIRTdisable=(<div className="gor-exceptionConfirm-text">{_("Please put extra entities in exception area.")}</div>);
          }
          else if(this.state.GetExceptionType==appConstants.ITEM_SCANNABLE)
          {
               messageIRTenable=(<div className="gor-exceptionConfirm-text">{_("Please put unscannable entities in IRT bin and scan the bin")}</div>);
              messageIRTdisable=(<div className="gor-exceptionConfirm-text">{_("Please put unscannable entities in exception area")}</div>);
          }
          else if(this.state.GetExceptionType==appConstants.ITEM_OVERSIZED)
          {
              messageIRTenable=(<div className="gor-exceptionConfirm-text">{_("Please put oversized entities in IRT bin and scan the bin")}</div>);
              messageIRTdisable=(<div className="gor-exceptionConfirm-text">{_("Please put oversized entities in exception area")}</div>);
          }

          if(!this.state.GetIRTScanStatus)
          {
        selected_screen=(
  <div className="exception-right">
                   <div className="gor-exception-align">
                    {messageIRTdisable}
                  <div className = "finish-damaged-barcode align-button">
                    <Button1 disabled = {false} text = {_("Confirm")} color={"orange"} module ={appConstants.PUT_BACK} action={appConstants.PUT_FINISH_EXCEPTION_ENTITY} />  
                  </div>
                  </div>
              </div>
          );
      }else
      {
         selected_screen=(
  <div className="exception-right">
                   <div className="gor-exception-align">
                    {messageIRTenable}
                  </div>
              </div>
          );
      }
            this._component = (
              <div className='grid-container exception'>
              <Modal />
                <Exception data={this.state.PutBackExceptionData}/>
                  {selected_screen}
              <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL}  color={"black"}/>
                </div>
              </div>
            );
        break;


    case appConstants.PUT_BACK_EXCEPTION_PUT_EXTRA_ITEM_IN_IRT_BIN:
    this._navigation = '';
    this._component = (
      <div className='grid-container exception'>
          <Modal/>
      <Exception data={this.state.PutBackExceptionData}/>
      <div className="exception-right">
      <ExceptionHeader data={this.state.PutBackServerNavData} />
      <div className = "finish-damaged-barcode">
      <Button1 disabled = {false} text = {_("FINISH")} color={"orange"} module ={appConstants.PUT_BACK} action={appConstants.CONFIRM_ITEM_PLACE_IN_IRT} />  
      </div>
      </div>
      <div className = 'cancel-scan'>
      <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
      </div>
      </div>
      );
    break;

    case appConstants.PUT_BACK_INVALID_TOTE_ITEM:
    this._navigation = (<Navigation navData ={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>)
    
    this._component = (
      <div className='grid-container audit-reconcilation'>
          <Modal/>
      <Reconcile navMessagesJson={this.props.navMessagesJson} message={this.state.PutBackToteException} />
      <div className = 'staging-action' >
      <Button1 disabled = {false} text = {_("Cancel")} module ={appConstants.PUT_BACK} status={true} action={appConstants.CANCEL_TOTE_EXCEPTION} color={"black"} /> 
      <Button1 disabled = {false} text = {_("Confirm")} module ={appConstants.PUT_BACK} status={true} action={appConstants.CONFIRM_TOTE_EXCEPTION} color={"orange"} />  
      </div>
      </div>
      );
    break;
    case appConstants.PPTL_MANAGEMENT:
    case appConstants.SCANNER_MANAGEMENT:
    this._navigation = (<Navigation navData ={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>)
    var _button;
    if(this.state.PutBackScreenId == appConstants.SCANNER_MANAGEMENT){
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
      <div className="row scannerHeader">
      <div className="col-md-6">
      <div className="ppsMode"> PPS Mode : {this.state.PutBackPpsMode.toUpperCase()} </div>
      </div>
      <div className="col-md-6">
      <div className="seatType"> Seat Type : {this.state.PutBackSeatType.toUpperCase()}</div>
      </div>
      </div>
      <TabularData data = {this.state.utility}/>
      {_button}
      <Modal /> 
      </div>
      );
    break;      
    default:
    return true; 
  }
},

getNotificationComponent:function(){
  if(this.state.PutBackNotification != undefined){
    this._notification = <Notification notification={this.state.PutBackNotification} navMessagesJson={this.props.navMessagesJson}/>
  }
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
      else if($(".modal.in").is(":visible")){
        setTimeout((function(){
            if($('.modal.in').find("div").hasClass("modal-footer")){
                //check when errorcode is true and modal has buttons
                $('.modal.in').data('bs.modal').options.backdrop='static';
            }
            else{
                //check when errorcode is true and modal has NO buttons
                $('.modal.in').data('bs.modal').options.backdrop=true;
            }
        }),0)
        return null
        }
      this._notification = "";
  }
},
render: function(data){ 
  this.getNotificationComponent();
  this.getScreenComponent(this.state.PutBackScreenId);
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

module.exports = PutBack;