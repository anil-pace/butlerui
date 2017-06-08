var React = require('react');
var PickFrontStore = require('../stores/PickFrontStore');
var mainstore = require('../stores/mainstore');
var Header = require('./Header');
var KQ = require('./ProductDetails/KQ');
var ExceptionHeader = require('./ExceptionHeader');
var KQExceptionMissing = require('./ProductDetails/KQExceptionMissing');
var KQExceptionDamaged = require('./ProductDetails/KQExceptionDamaged');
var NumericIndicator = require('./ProductDetails/NumericIndicator');
var Navigation = require("./Navigation/Navigation.react");
var Spinner = require("./Spinner/LoaderButler");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var BinsFlex = require("./Bins/BinsFlexArrange.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var WrapperSplitRoll = require('./ProductDetails/WrapperSplitRoll');
var appConstants = require('../constants/appConstants');
var Rack = require('./Rack/MsuRack.js');
var BoxSerial = require('./BoxSerial.js');
var Modal = require('./Modal/Modal');
var Modal1 = require('./Modal/Modal1');
var CurrentSlot = require('./CurrentSlot');
var BinMap = require('./BinMap');
var PrdtDetails = require('./PrdtDetails/ProductDetails.js');
var CommonActions = require('../actions/CommonActions');
var Exception = require('./Exception/Exception');
var TabularData = require('./TabularData');
var OrderDetails = require('./OrderDetails/OrderDetails.js');

var checkListOpen = false;

function getStateData(){
      var screenData = mainstore.getScreenData();
      var splitPPSData ={
        groupInfo : mainstore._getBinMapDetails()
    }
      return Object.assign({},screenData,splitPPSData);
};

var PickFront = React.createClass({
  _notification:'',
  _component:'',
  _navigation:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){   
    if(this.state.PickFrontScreenId === appConstants.PICK_FRONT_MORE_ITEM_SCAN || this.state.PickFrontScreenId === appConstants.PICK_FRONT_PPTL_PRESS){
        this.showModal(this.state.PickFrontChecklistDetails,this.state.PickFrontChecklistIndex);
    }
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
	this.setState(getStateData());
   if(this.state.PickFrontScreenId === appConstants.PICK_FRONT_MORE_ITEM_SCAN || this.state.PickFrontScreenId === appConstants.PICK_FRONT_PPTL_PRESS){
        this.showModal(this.state.PickFrontChecklistDetails,this.state.PickFrontChecklistIndex);
    }
  },
  getNotificationComponent:function(){
    if(this.state.PickFrontNotification != undefined)
      this._notification = <Notification notification={this.state.PickFrontNotification} navMessagesJson={this.props.navMessagesJson} />
    else
      this._notification = "";
  },
  showModal:function(data,index,manual){
    if(manual==true)
      checkListOpen = false;
    var data ={
      'checklist_data' : data,
      "checklist_index" : index,
      "product_details" : this.state.PickFrontProductDetails
    };
    console.log(this.state.PickFrontChecklistOverlayStatus, checkListOpen);
    if(this.state.PickFrontChecklistOverlayStatus === true && checkListOpen == false){
      checkListOpen = true;
      setTimeout((function(){CommonActions.showModal({
              data:data,
              type:'pick_checklist'
      });
      $('.modal').modal();
      //$('.modal').data('bs.modal').escape(); // reset keyboard
      $('.modal').data('bs.modal').options.backdrop = 'static';
      return false;
      }),0)

      

    }
    else if(this.state.PickFrontChecklistOverlayStatus === false && checkListOpen == true) { 
      setTimeout((function (){
          $( ".modal" ).modal('hide');
          
            $('.modal').data('bs.modal').escape(); // reset keyboard
            $('.modal').data('bs.modal').options.backdrop = true;
            $('button.close', $('.modal')).show();
          
      }), 0)
      checkListOpen = false;
   
    }
    

  },
  getExceptionComponent:function(){
      var _rightComponent = '';
      this._navigation = '';
      return (
              <div className='grid-container exception'>
                <Modal />
                <Exception data={this.state.PickFrontExceptionData} action={true}/>
                <div className="exception-right"></div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION}  color={"black"}/>
                </div>
              </div>
            );
  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
     
      case appConstants.PICK_FRONT_WAITING_FOR_MSU:
       if(this.state.PickFrontExceptionStatus == false){
        this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
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
      case appConstants.PICK_FRONT_LOCATION_CONFIRM:
      case appConstants.PICK_FRONT_LOCATION_SCAN:
         var locationBtnEnable = this.state.PickFrontLocationButtonEnable ? false : true;
        var locationButton = (<Button1 disabled = {locationBtnEnable} text = {_("Confirm")} module ={appConstants.PICK_FRONT} action={appConstants.CONFIRM_LOCATION} color={"orange"} />);
         if(this.state.PickFrontExceptionStatus == false){
        this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Rack isDrawer={this.state.isDrawer} slotType={this.state.SlotType} rackData = {this.state.PickFrontRackDetails}/>
                 </div>
                 {locationButton}
              </div>
            );
      }else{
          this._component = this.getExceptionComponent();
        }
      break;

      case appConstants.PICK_FRONT_ITEM_SCAN:
       if(this.state.PickFrontExceptionStatus == false){
         this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Rack isDrawer={this.state.isDrawer} slotType={this.state.SlotType} rackData = {this.state.PickFrontRackDetails}/>
                     <PrdtDetails productInfo={this.state.PickFrontProductDetails} />
                 </div>
              </div>
            );
         }else{
          this._component = this.getExceptionComponent();
        }
      break;


       case appConstants.PICK_FRONT_CONTAINER_SCAN:
        if(this.state.PickFrontExceptionStatus == false){
           this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <BoxSerial boxData = {this.state.PickFrontBoxDetails} />
                    <Rack rackData = {this.state.PickFrontRackDetails} slotType={this.state.SlotType}/>
                 </div>
              </div>
            );
         }else{
          this._component = this.getExceptionComponent();
        }
      break;

      case appConstants.PICK_FRONT_MORE_ITEM_SCAN:
        if(this.state.PickFrontExceptionStatus == false){
         this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        if(this.state.PickFrontScanDetails.current_qty > 0 && this.state.PickFrontChecklistDetails.length > 0){
          var editButton = ( <Button1 disabled = {false} text = {_("Edit Details")} module ={appConstants.PICK_FRONT} action={appConstants.EDIT_DETAILS} color={"orange"} /> );
        }else{
          var editButton ='';
        }
        var BinFull = ( <Button1 disabled = {false} text = {_("Bin full")} module ={appConstants.PICK_FRONT} action={appConstants.BIN_FULL} color={"black"} /> );
        var binComponent="";
        if (this.state.OrigBinUse){
            binComponent = (<div className="binsFlexWrapperContainer">
                            <BinsFlex binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_MORE_ITEM_SCAN} seatType = {this.state.SeatType}/>
                            <WrapperSplitRoll scanDetails={this.state.PickFrontScanDetails} productDetails={this.state.PickFrontProductDetails} itemUid={this.state.PickFrontItemUid}/>
                            </div>)
          }else{
            binComponent = (<div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_MORE_ITEM_SCAN}/>
                  <Wrapper scanDetails={this.state.PickFrontScanDetails} productDetails={this.state.PickFrontProductDetails} itemUid={this.state.PickFrontItemUid}/>
                </div>);
          }

        this._component = (
              <div className='grid-container'>
                <Modal />  
                       
                <CurrentSlot slotDetails={this.state.PickFrontSlotDetails} />

               {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='frontFlow'/>}
                {binComponent}
                <div className = 'actions'>
                   <Button1 disabled = {false} text = {_("Cancel Scan")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} color={"black"}/>
                   {editButton}
                   {(this.state.PickFrontButtonStatus == true && this.state.PickFrontButtonType == "bin_full")? BinFull:''}
                </div>
              
              </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
      break;
                  
      case appConstants.PICK_FRONT_PPTL_PRESS:
         var cancelScanFlag = this.state.PickFrontCancelScan;
         var cancelScanDisabled = (cancelScanFlag || cancelScanFlag === undefined) ? false : true;
         var cancelButton;
         var BinFull = ( <Button1 disabled = {false} text = {_("Bin full")} module ={appConstants.PICK_FRONT} action={appConstants.BIN_FULL} color={"black"} /> );
         if(this.state.PickFrontExceptionStatus == false){
          
         this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        if(this.state.PickFrontScanDetails.current_qty > 0 && this.state.PickFrontChecklistDetails.length > 0){
          var editButton = ( <Button1 disabled = {false} text = {_("Edit Details")} module ={appConstants.PICK_FRONT} action={appConstants.EDIT_DETAILS} color={"orange"} /> );
        }else{
          var editButton ='';
        }
        if(!cancelScanDisabled){
          cancelButton = (<div ><Button1  disabled = {false} text = {_("Cancel Scan")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} color={"black"}/> {editButton}</div>);
         }
         else{
          cancelButton = (<div ></div>);
         }
         var binComponent ="";
          if (this.state.OrigBinUse){

            binComponent=(<BinsFlex binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PPTL_PRESS} seatType = {this.state.SeatType}/>)
          }else{
            binComponent =(<div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PPTL_PRESS}/>
                </div>)
          }
        this._component = (
              <div className='grid-container'>
                <Modal />
               
                <CurrentSlot slotDetails={this.state.PickFrontSlotDetails} />
                {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='frontFlow'/>}
                {binComponent}
                <div className = 'actions'>
                  {cancelButton}
                   {(this.state.PickFrontButtonStatus == true && this.state.PickFrontButtonType == "bin_full")? BinFull:''}
                  
                </div>
              </div>
            );
         }else{
          this._component = this.getExceptionComponent();
        }
      break;
      case appConstants.PICK_FRONT_NO_FREE_BIN:
         if(this.state.PickFrontExceptionStatus == false){
         this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
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
            case appConstants.PICK_FRONT_EXCEPTION_DAMAGED_ENTITY:
          var _button;
          _button = (<div className = "staging-action">                          
                          <Button1 disabled = {this.state.PickFrontExceptionFlag} text = {_("Confirm")} module ={appConstants.PICK_FRONT} action={appConstants.CONFIRM_PHYSICALLY_DAMAGED_ITEMS} color={"orange"} />
                    </div>);

          this._component = (
              <div className='grid-container exception'>
                <Modal />
                <Exception data={this.state.PickFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container">
                    <div className = "kq-exception">
                      <div className="kq-header">{_("Scan damaged entity")}</div>
                      <TabularData data={this.state.PickFrontDamagedItems}  className='limit-height' />
                      {_button}
                    </div>
                  </div>
                </div>
                 <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"}/>
                </div>
              </div>
          );      
        break; 
///Raja
            case appConstants.PICK_FRONT_MISSING_DAMAGED_UNSCANNABLE_ENTITY:
          var buttonActivateFlag=mainstore.getExeptionQuanity();
           this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PickFrontExceptionData}/>
                <div className="exception-right">
                  <ExceptionHeader data={this.state.PickFrontServerNavData} />

                  <div className="main-container exception1 displayBlocked">

                    <div className="test">
                    <hr/>
                  <div className="exception-qty-title">{_("Good quantity")}</div>
                  <NumericIndicator props = {"good_quntity"}/>
                    </div>
              
                     <div className="test">
                     <hr/>
                  <div className="exception-qty-title">{_("Missing quantity")}</div>
                  <NumericIndicator props = {"Missing_quntity"} />
                    </div>

                    <div className="test">
                     <hr/>
                  <div className="exception-qty-title">{_("Unscannable quantity")}</div>
                  <NumericIndicator  props = {"Unscannable_quntity"}/>
                    </div>

                    <div className="test">
                     <hr/>
                  <div className="exception-qty-title">{_("Damaged quantity")}</div>
                  <NumericIndicator props = {"Damaged_quntity"}/>
                   <hr/>
                    </div>

                  </div>
                  <div className = "finish-damaged-barcode padding">
                    <Button1 disabled = {buttonActivateFlag} text = {_("Validate and Confirm")} color={"orange"} module ={appConstants.PICK_FRONT} action={appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER} />
              
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
      
        break; 

        case appConstants.PICK_FRONT_IRT_BIN_CONFIRM:
            this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PickFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container exception2">
                    <div className = "kq-exception">
                      <div className="kq-header">{_("Please put entitites which has issues in exception area")}</div>
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {_("Confirm")} color={"orange"} module ={appConstants.PICK_FRONT} action={appConstants.PICK_FINISH_EXCEPTION_ENTITY} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
        break;

      case appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED:
          this._navigation = '';
          /**
          * { T2715: confirm button disabled if missing/unscannable quantity is zero }
          */
            this._disableNext = (this.state.PickFrontMissingQuantity.current_qty > 0 || this.state.PickFrontGoodQuantity.current_qty > 0 )? false : true;          
            this._disableConfirm = (this.state.PickFrontMissingQuantity.current_qty > 0 || this.state.PickFrontDamagedQuantity.current_qty > 0 )? false : true;      
          if(this.state.PickFrontExceptionScreen == "good"){
          this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PickFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container">
                    <div className = "kq-exception">
                      <div className="kq-header">{_("Good Quantity")}</div>
                      <KQ scanDetailsGood = {this.state.PickFrontGoodQuantity} action={"GOOD"} />
                    </div>
                    <div className = "kq-exception">
                      <div className="kq-header">{_("Missing Quantity")}</div>
                      <KQExceptionMissing scanDetailsMissing = {this.state.PickFrontMissingQuantity} action={"MISSING"} />
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {this._disableNext} text = {_("NEXT")} color={"orange"} module ={appConstants.PICK_FRONT} action={appConstants.GET_MISSING_AND_DAMAGED_QTY} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
          }else if(this.state.PickFrontExceptionScreen == "damaged_or_missing"){
             var btnComp;
             
            if(this.state.PickFrontDamagedQuantity.current_qty > 0 ){
               btnComp = ( <Button1 disabled = {false} text = {_("NEXT")} color={"orange"} module ={appConstants.PICK_FRONT} action={appConstants.PLACE_ITEM_BACK} />  );
            }else{
              btnComp = ( <Button1 disabled = {this._disableConfirm} text = {_("CONFIRM")} color={"orange"} module ={appConstants.PICK_FRONT} action={appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER} /> );
            }
            this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PickFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container">
                    <div className = "kq-exception">
                      <div className="kq-header">{_("Unscannable Quantity")}</div>
                      <KQExceptionDamaged scanDetailsDamaged = {this.state.PickFrontDamagedQuantity} action={"DAMAGED"} />
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                    {btnComp} 
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
          }else if(this.state.PickFrontExceptionScreen == "pick_front_quantity"){
              this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PickFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container exception2">
                    <div className = "kq-exception">
                      <div className="kq-header">{_("Please put unscannable entities in exception area.")}</div>
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode"> 
                    <Button1 disabled = {false} text = {_("CONFIRM")} color={"orange"} module ={appConstants.PICK_FRONT} action={appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER} /> 
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
           }
        break;      
        case appConstants.PICK_FRONT_EXCEPTION_MISSING_BOX:
          this._navigation = '';
          if(this.state.PickFrontExceptionScreen == "box_serial"){
          this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PickFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container">
                     <div className = "kq-exception">
                      <div className="kq-header">{_("Missing Boxes")}</div>
                      <BoxSerial boxData = {this.state.PickFrontBoxDetails} />
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {_("NEXT")} color={"orange"} module ={appConstants.PICK_FRONT} action={appConstants.CONFIRM_FROM_USER} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
          }else if(this.state.PickFrontExceptionScreen == "confirm_from_user"){
              this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PickFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container exception2">
                    <div className = "kq-exception">
                      <div className="kq-header">{"Are You sure Given Boxes are not present in Slot ? "}</div>
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode"> 
                    <Button1 disabled = {false} text = {_("CONFIRM")} color={"orange"} module ={appConstants.PICK_FRONT} action={appConstants.SEND_MISSING_BOX_EXCEPTION} /> 
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
           }
          break;

      case appConstants.PPTL_MANAGEMENT:
      case appConstants.SCANNER_MANAGEMENT:
          this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>)
          var _button;
          if(this.state.PickFrontScreenId == appConstants.SCANNER_MANAGEMENT){
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
                      <div className="ppsMode"> PPS Mode : {this.state.PickFrontPpsMode.toUpperCase()} </div>
                    </div>
                    <div className="col-md-6">
                      <div className="seatType"> Seat Type : {this.state.PickFrontSeatType.toUpperCase()}</div>
                    </div>
                  </div>
                  <TabularData data = {this.state.utility}/>
                  {_button}
                  <Modal /> 
              </div>
            );
        break;  

        case appConstants.PICK_FRONT_PACKING_BOX:
         if(this.state.PickFrontExceptionStatus == false){
         this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        
          var binComponent ="";
          if (this.state.OrigBinUse){

            binComponent=(<BinsFlex binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PACKING_BOX} seatType = {this.state.SeatType}/>)
          }else{
            binComponent =(<div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PACKING_BOX}/>
                </div>)
          }
        this._component = (
              
              <div className='grid-container'>
              <Modal />
                 <div className='main-container'>
                    {binComponent}
                     
                     <OrderDetails orderData = {this.state.PickFrontBoxOrderDetails} />
                 </div>
                 
              </div>
            );
         }else{
          this._component = this.getExceptionComponent();
        }
        break;
        case appConstants.PICK_FRONT_PACKING_CONTAINER_SCAN:
          if(this.state.PickFrontExceptionStatus == false){
         this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
         var _button = (<div className = 'staging-action' >                          
                          <Button1 disabled = {false} text = {_("BACK")} module ={appConstants.PICK_FRONT} status={true} action={appConstants.CANCEL_BOX_FULL} color={"black"} />
                          <Button1 disabled = {false} text = {_("Box Full")} module ={appConstants.PICK_FRONT} status={true} action={appConstants.BOX_FULL} color={"black"} />
                      </div>);
        this._component = (
              
              <div className='grid-container'>
              <Modal />

                 <div className='main-container'>
                    <Rack isDrawer={this.state.isDrawer} slotType={this.state.SlotType} rackData = {this.state.PickFrontRackDetails}/>
                     <BoxSerial boxData = {this.state.PickFrontBoxDetails} />
                     <OrderDetails orderData = {this.state.PickFrontBoxOrderDetails} />
                 </div>
                 
              </div>
            );
         }else{
          this._component = this.getExceptionComponent();
        }
        break;
        case appConstants.PICK_FRONT_PACKING_ITEM_SCAN:
           if(this.state.PickFrontExceptionStatus == false){
         this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        if(this.state.PickFrontScanDetails.current_qty > 0 && this.state.PickFrontChecklistDetails.length > 0){
          var editButton = ( <Button1 disabled = {false} text = {_("Edit Details")} module ={appConstants.PICK_FRONT} action={appConstants.EDIT_DETAILS} color={"orange"} /> );
        }else{
          var editButton ='';
        }
        var BinFull = ( <Button1 disabled = {false} text = {_("Bin full")} module ={appConstants.PICK_FRONT} action={appConstants.BIN_FULL} color={"black"} /> );
        var binComponent="";
        if (this.state.OrigBinUse){
            binComponent = (<div className="binsFlexWrapperContainer">
                            <BinsFlex binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_MORE_ITEM_SCAN} seatType = {this.state.SeatType}/>
                            <WrapperSplitRoll scanDetails={this.state.PickFrontScanDetails} productDetails={this.state.PickFrontProductDetails} itemUid={this.state.PickFrontItemUid}/>
                            
                            </div>)
          }else{
            binComponent = (<div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_MORE_ITEM_SCAN}/>
                  <Wrapper scanDetails={this.state.PickFrontScanDetails} productDetails={this.state.PickFrontProductDetails} itemUid={this.state.PickFrontItemUid}/>

                </div>);
          }
        var btnId = this.state.PickFrontPackingButtonType,btnName,actionBtn,action,actionBtnStatus,cancelButton='',
        cancelButtonStatus = this.state.PickFrontPackingCancelStatus;
        if(btnId){
          btnName = btnId === "box_discard" ? _("Box Full") : _("Box Full");
          action = btnId === "box_discard" ? appConstants.DISCARD_PACKING_BOX :appConstants.BOX_FULL;
          actionBtnStatus = this.state.PickFrontPackingButtonDisable ? false : true;
          actionBtn = (<Button1 disabled = {actionBtnStatus} text = {btnName} module ={appConstants.PICK_FRONT} action={action} color={"black"}/>)
        }
        if(cancelButtonStatus){
          cancelButton =  <Button1 disabled = {false} text = {_("Cancel Scan")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} color={"black"}/>
        }
        this._component = (
              <div className='grid-container gor-pck-itm-scn'>
                <Modal />  
                       
                <CurrentSlot slotDetails={this.state.PickFrontSlotDetails} />
                <OrderDetails orderData = {this.state.PickFrontBoxOrderDetails} />
               {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='frontFlow'/>}
                {binComponent}
                <div className = 'actions'>
                   
                  {cancelButton}
                   {actionBtn}
                   {editButton}
                   {this.state.PickFrontBinFullStatus && BinFull}
                </div>
               
              </div>
              
            );
        }else{
          this._component = this.getExceptionComponent();
        }
      break;
        case appConstants.PICK_FRONT_PACKING_PPTL_PRESS:
         var cancelScanFlag = this.state.PickFrontCancelScan;
         var cancelScanDisabled = (cancelScanFlag || cancelScanFlag === undefined) ? false : true;
         var cancelButton;
         
         if(this.state.PickFrontExceptionStatus == false){
          
         this._navigation = (<Navigation navData ={this.state.PickFrontNavData} serverNavData={this.state.PickFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        if(this.state.PickFrontScanDetails.current_qty > 0 && this.state.PickFrontChecklistDetails.length > 0){
          var editButton = ( <Button1 disabled = {false} text = {_("Edit Details")} module ={appConstants.PICK_FRONT} action={appConstants.EDIT_DETAILS} color={"orange"} /> );
        }else{
          var editButton ='';
        }
        if(!cancelScanDisabled){
          cancelButton = (<div className = 'cancel-scan'><Button1  disabled = {false} text = {_("Cancel Scan")} module ={appConstants.PICK_FRONT} action={appConstants.CANCEL_SCAN} color={"black"}/> {editButton}</div>);
         }
         else{
          cancelButton = (<div className = 'cancel-scan'></div>);
         }
         var binComponent ="";
          if (this.state.OrigBinUse){

            binComponent=(<BinsFlex binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PPTL_PRESS} seatType = {this.state.SeatType}/>)
          }else{
            binComponent =(<div className='main-container'>
                  <Bins binsData={this.state.PickFrontBinData} screenId = {appConstants.PICK_FRONT_PPTL_PRESS}/>
                </div>)
          }
           var btnId = this.state.PickFrontPackingButtonType,btnName,actionBtn,action,actionBtnStatus;
        if(btnId){
          btnName = btnId === "box_discard" ? _("Box Full") : _("Box Full");
          action = btnId === "box_discard" ? appConstants.DISCARD_PACKING_BOX :appConstants.BOX_FULL;
          actionBtnStatus = this.state.PickFrontPackingButtonDisable ? false : true;
          actionBtn = (<Button1 disabled = {actionBtnStatus} text = {btnName} module ={appConstants.PICK_FRONT} action={action} color={"black"}/>)
        }
        this._component = (
              <div className='grid-container'>
                <Modal />
               
                <CurrentSlot slotDetails={this.state.PickFrontSlotDetails} />
                {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='frontFlow'/>}
                {binComponent}

               {cancelButton}
                {actionBtn}
              </div>
            );
         }else{
          this._component = this.getExceptionComponent();
        }

      default:
        return true;
    }
  },
  
  render: function(data){ 
	  
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PickFrontScreenId);
	
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

module.exports = PickFront;