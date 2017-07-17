
var React = require('react');
var PutFrontStore = require('../stores/PutFrontStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Spinner = require("./Spinner/LoaderButler");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var BinsFlex = require("./Bins/BinsFlexArrange.react");
var NumericIndicator = require('./ProductDetails/NumericIndicator');
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var WrapperSplitRoll = require('./ProductDetails/WrapperSplitRoll');
var appConstants = require('../constants/appConstants');
var allresourceConstants = require('../constants/resourceConstants');
var Rack = require('./Rack/MsuRack.js');
var Modal = require('./Modal/Modal');
var mainstore = require('../stores/mainstore');
var Exception = require('./Exception/Exception');
var ExceptionHeader = require('./ExceptionHeader');
var KQ = require('./ProductDetails/KQ');
var KQExceptionMissing = require('./ProductDetails/KQExceptionMissing');
var KQExceptionDamaged = require('./ProductDetails/KQExceptionDamaged');
var TabularData = require('./TabularData');
var BinMap = require('./BinMap');
var SplitPPS = require('./SplitPPS');


function getStateData(){
 return mainstore.getScreenData();
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

  getExceptionComponent:function(){
    var _rightComponent = '';
    this._navigation = '';
    return (
      <div className='grid-container exception'>
      <Modal />
      <Exception data={this.state.PutFrontExceptionData} action={true}/>
      <div className="exception-right"></div>
      <div className = 'cancel-scan'>
      <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL}  color={"black"}/>
      </div>
      </div>
      );
  },
  
  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PUT_FRONT_WAITING_FOR_RACK:
      if(this.state.PutFrontExceptionStatus == false){
        this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson} showSpinner={this.state.MobileFlag}/>);
        this._component = (
          <div className='grid-container'>
          <div className='main-container'>
          {this.state.MobileFlag?<SplitPPS groupInfo = {this.state.BinMapDetails} undockAwaited = {this.state.UndockAwaited} docked = {this.state.DockedGroup}/>:<Spinner />}
          </div>
          </div>
          );
      }else{
        this._component = this.getExceptionComponent();
      }

      break;
      case appConstants.PUT_FRONT_SCAN:
      if(this.state.PutFrontExceptionStatus == false){
       if (this.state.OrigBinUse){
        binComponent = ( <div className="binsFlexWrapperContainer">
          <BinsFlex binsData={this.state.PutFrontBinData} screenId = {this.state.PutFrontScreenId} seatType = {this.state.SeatType}/>
          <WrapperSplitRoll scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
          </div>)

      }else{
        binComponent =(<div className='main-container'>
          <Bins binsData={this.state.PutFrontBinData} screenId = {this.state.PutFrontScreenId}/>
          <Wrapper scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
          </div>)
      }
      this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
      this._component = (
        <div className='grid-container'>
        <Modal />
        {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='putFrontFlow'/>}
        {binComponent}
        </div>
        );
    }else{
      var _rightComponent = '';
        this._navigation = '';
      this._component =(
          <div className='grid-container exception'>
              <Exception data={this.state.PutFrontExceptionData} action={true}/>
              <div className="exception-right"></div>
              <div className = 'cancel-scan'>
              <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
              </div>
              </div>
        );
    }
    break;
    case appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK:
    if(this.state.PutFrontExceptionStatus == false){
      this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          //need to check this case, if we need flexible bins here?
          this._component = (
            <div className='grid-container'>
            <Modal />
            {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='putFrontFlow'/>}
            <div className={"single-bin"+(this.state.SplitScreenFlag?' gor-fixed-position':'')+(this.state.SplitScreenFlag?'':' fix-top')}>
            <Bins binsData={this.state.PutFrontCurrentBin} screenId = {this.state.PutFrontScreenId}/>
            <div className="text">{_("CURRENT BIN")}</div>
            </div>
            <div className='main-container'>
            <Rack isDrawer = {this.state.isDrawer} slotType={this.state.SlotType} rackData = {this.state.PutFrontRackDetails}/>
            <Wrapper scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
            </div>
            <div className = 'cancel-scan'>
            <Button1 disabled = {false} text = {_("Cancel Scan")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PutFrontItemUid} color={"black"}/>
            </div>

            </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
        break;
        case appConstants.PUT_FRONT_WAITING_UNDOCK:
        if(this.state.PutFrontExceptionStatus == false){
          this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson} subMessage={allresourceConstants.UNDOCK_PUSH}/>);
          this._component = (
            <div className='grid-container'>
            <div className='main-container'>
            <SplitPPS  groupInfo = {this.state.BinMapDetails} undockAwaited = {this.state.UndockAwaited} docked = {this.state.DockedGroup}/>
            </div>
            </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
        break;

        case appConstants.PUT_FRONT_WRONG_UNDOCK:
        if(this.state.PutFrontExceptionStatus == false){
          this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson} subMessage={allresourceConstants.WRONG_UNDOCK}/>);
          this._component = (
            <div className='grid-container'>
            <div className='main-container'>
            <SplitPPS  groupInfo = {this.state.BinMapDetails} wrongUndock={this.state.WrongUndock}/>
            </div>
            </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
        break;

        case appConstants.PUT_FRONT_EXCEPTION_WAREHOUSE_FULL:
        var _button;
        _button = (<div className = "staging-action">                          
          <Button1 disabled = {this.state.PutFrontExceptionFlag} text = {_("Confirm")} module ={appConstants.PUT_FRONT} action={appConstants.WAREHOUSEFULL_EXCEPTION} color={"orange"} />
          </div>);
        this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        this._component = (
          <div className='grid-container'>
          {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='putFrontFlow'/>}
          <div className = "kq-exception">
          <div className="gor-info-text">{_("Empty the rollcage to undock")}</div>
          </div>
          {_button}
          </div>
          );
        break;

        case appConstants.PUT_FRONT_PPTL_PRESS:
        if(this.state.PutFrontExceptionStatus == false){
         if (this.state.OrigBinUse){
          binComponent = (<BinsFlex binsData={this.state.PutFrontBinData} screenId = {this.state.PutFrontScreenId} seatType = {this.state.SeatType}/>);
        }else{
          binComponent =(<div className='main-container'>
            <Bins binsData={this.state.PutFrontBinData} screenId = {this.state.PutFrontScreenId}/>
            </div>)
        }
        this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        this._component = (
          <div className='grid-container'>
          <Modal />
          {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='putFrontFlow'/>}
          {binComponent}
          </div>
          );
      }else{
        this._component = this.getExceptionComponent();
      }
      break;

        case appConstants.PUT_FRONT_BIN_WAREHOUSE_FULL:
        if(this.state.PutFrontExceptionStatus == false){
         if (this.state.OrigBinUse){
          binComponent = (<BinsFlex binsData={this.state.PutFrontBinData} screenId = {this.state.PutFrontScreenId} seatType = {this.state.SeatType}/>);
        }else{
          binComponent =(<div className='main-container'>
            <Bins binsData={this.state.PutFrontBinData} screenId = {this.state.PutFrontScreenId}/>
            </div>)
        }
        this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
        this._component = (
          <div className='grid-container'>
          <Modal />
          {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='putFrontFlow'/>}
          {binComponent}
          </div>
          );
      }else{
        this._component = this.getExceptionComponent();
      }
      break;
      case appConstants.PUT_FRONT_PLACE_UNMARKED_ENTITY_IN_RACK:
      if(this.state.PutFrontExceptionStatus == false){
        this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          //need to check this case, if we need flexible bins here?
          this._component = (
            <div className='grid-container'>
            <Modal />
            {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='putFrontFlow'/>}
            <div className={"single-bin"+(this.state.SplitScreenFlag?' gor-fixed-position':' fix-top')}>
            <Bins binsData={this.state.PutFrontCurrentBin} screenId = {this.state.PutFrontScreenId}/>
            <div className="text">{_("CURRENT BIN")}</div>
            </div>
            <div className='main-container'>
            <Rack isDrawer = {this.state.isDrawer} slotType={this.state.SlotType} rackData = {this.state.PutFrontRackDetails}/>
            <Wrapper scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
            </div>
            </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
        break;
        case appConstants.PUT_FRONT_SCAN_RACK_FOR_UNMARKED_ENTITY:
        if(this.state.PutFrontExceptionStatus == false){
          this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          //need to check this case, if we need flexible bins here?
          this._component = (
            <div className='grid-container'>
            <Modal />
            {this.state.SplitScreenFlag && <BinMap mapDetails = {this.state.BinMapDetails} selectedGroup={this.state.BinMapGroupDetails} screenClass='putFrontFlow'/>}
            <div className={"single-bin"+(this.state.SplitScreenFlag?'':' fix-top')}>
            <Bins binsData={this.state.PutFrontCurrentBin} screenId = {this.state.PutFrontScreenId}/>
            <div className="text">{_("CURRENT BIN")}</div>
            </div>
            <div className='main-container'>
            <Rack isDrawer = {this.state.isDrawer} slotType={this.state.SlotType} rackData = {this.state.PutFrontRackDetails}/>
            <Wrapper scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
            </div>
            <div className = 'cancel-scan'>
            <Button1 disabled = {false} text = {_("Cancel")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PutFrontItemUid} color={"black"}/>
            </div>

            </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
        break;
        case appConstants.PUT_FRONT_EXCEPTION_DAMAGED_ENTITY:
          var _button,isUnmarked = this.state.isUnmarkedContainer,unmarkedContainer,confirmDisabled,kqHeadMessage;
          confirmDisabled = this.state.PutFrontDamagedQuantity.current_qty > 0 ? false :true;
          _button = (<div className = "staging-action">                          
                          <Button1 disabled = {confirmDisabled} text = {_("Confirm")} module ={appConstants.PUT_FRONT} action={appConstants.UNMARKED_DAMAGED} color={"orange"} />
                    </div>);
          if(isUnmarked){
            unmarkedContainer = (                           
                         <KQExceptionDamaged scanDetailsDamaged = {this.state.PutFrontDamagedQuantity} action={"DAMAGED"} />
                    )
            kqHeadMessage = _("Damaged Quantity");
          }
          else{
            unmarkedContainer = (<div>
               <TabularData data={this.state.PutFrontDamagedItems}  className='limit-height' />
            </div>)
            kqHeadMessage = _("Scan damaged entity");
          }
          this._component = (
              <div className='grid-container exception'>
                <Modal />
                <Exception data={this.state.PutFrontExceptionData}/>
                <div className="exception-right">
                  <div className="main-container">
                    <div className = "kq-exception">
                      <div className="kq-header">{kqHeadMessage}</div>
                     {unmarkedContainer}
                      
                    </div>
                  </div>
                  <div className = "finish-damaged-barcode">
                  {_button}
                  </div>
                </div>
                 <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"}/>
                </div>
              </div>
          );      
        break;
            case appConstants.PUT_FRONT_MISSING_DAMAGED_UNSCANNABLE_ENTITY:
             var buttonActivateFlag=mainstore.getExeptionQuanity();
            var UnscannableNI;
            if(!this.state.UnmarkedContainer)
            {
              UnscannableNI=( <div className="gor-NI-wrapper">
                     <hr/>
                  <div className="exception-qty-title">{_("Unscannable quantity")}</div>
                  <NumericIndicator  execType = {appConstants.UNSCANNABLE_QUANTITY}/>
                    </div>);
            }
            else
            {
              UnscannableNI=(<div></div>);
            }
           this._component = (
              <div className='grid-container exception'>
              <Modal />
                <Exception data={this.state.PutFrontExceptionData}/>
                <div className="exception-right">
                  <ExceptionHeader data={this.state.PutFrontServerNavData} />

                  <div className="main-container exception1 displayBlocked">

                    <div className="gor-NI-wrapper">
                    <hr/>
                  <div className="exception-qty-title">{_("Good Quantity")}</div>
                  <NumericIndicator execType = {appConstants.GOOD_QUANTITY}/>
                    </div>
              
                     <div className="gor-NI-wrapper">
                     <hr/>
                  <div className="exception-qty-title">{_("Missing Quantity")}</div>
                  <NumericIndicator execType = {appConstants.MISSING_QUANTITY} />
                    </div>

                    {UnscannableNI} 

                    <div className="gor-NI-wrapper">
                     <hr/>
                  <div className="exception-qty-title">{_("Damaged Quantity")}</div>
                  <NumericIndicator execType = {appConstants.DAMAGED_QUANTITY}/>
                   <hr/>
                    </div>

                  </div>
                  <div className = "finish-damaged-barcode padding">
                    <Button1 disabled = {buttonActivateFlag} text = {_("Validate and Confirm")} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER} />
              
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL}  color={"black"}/>
                </div>
              </div>
            );
        break; 

          case appConstants.PUT_FRONT_ITEMS_TO_IRT_BIN:
            this._component = (
              <div className='grid-container exception'>
              <Modal />
                <Exception data={this.state.PutFrontExceptionData}/>
                <div className="exception-right">
                   <div className="gor-exception-align">
                    <div className="gor-exceptionConfirm-text">{_("Please put entitites which has issues in exception area")}</div>
                   
                  <div className = "finish-damaged-barcode align-button">
                    <Button1 disabled = {false} text = {_("Confirm")} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.PUT_FINISH_EXCEPTION_ENTITY} />  
                  </div>
                  </div>
             
                
              </div>
              <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL}  color={"black"}/>
                </div>
              </div>
            );
        break;

          case appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE:
          if(this.state.PutFrontExceptionScreen == "take_item_from_bin"){
            this._component = (
              <div className='grid-container exception'>
              <Exception data={this.state.PutFrontExceptionData}/>
              <div className="exception-right">
              <div className="main-container exception2">
              <div className = "kq-exception">
              <div className="kq-header">{_("Take the Items out from the Slot")}</div>
              </div>
              </div>
              <div className = "finish-damaged-barcode">
              <Button1 disabled = {false} text = {_("NEXT")} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.GET_REVISED_QUANTITY} />  
              </div>
              </div>
              <div className = 'cancel-scan'>
              <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
              </div>
              </div>
              );
          }else if(this.state.PutFrontExceptionScreen == "revised_quantity"){
            this._component = (
              <div className='grid-container exception'>
              <Exception data={this.state.PutFrontExceptionData}/>
              <div className="exception-right">
              <div className="main-container">
              <div className = "kq-exception">
              <div className="kq-header">{_("Space Available For")}</div>
              <KQ scanDetailsGood = {this.state.PutFrontKQQuantity}  />
              </div>
              </div>
              <div className = "finish-damaged-barcode">
              <Button1 disabled = {false} text = {_("CONFIRM")} color={"orange"} module ={appConstants.PUT_FRONT} action={appConstants.VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER} />  
              </div>
              </div>
              <div className = 'cancel-scan'>
              <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
              </div>
              </div>
              );
          }
          
          break;
          case appConstants.PUT_FRONT_EXCESS_ITEMS_PPSBIN:
            this._component = (
                  <div className='grid-container exception'>
                    <Modal />
                    <Exception data={this.state.PutFrontExceptionData}/>
                    <div className="exception-right">
                      <div className="main-container exception2">
                        <div className = "kq-exception">
                          <div className="kq-header">{_("Please scan bin which has excess item")}</div>
                        </div>
                      </div>
                    </div>
                     <div className = 'cancel-scan'>
                       <Button1 disabled = {false} text = {_("Cancel exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"}/>
                    </div>
                  </div>
              );      
            break; 
          case appConstants.PUT_FRONT_EXCEPTION_EXCESS_TOTE:
          this._component = (
            <div className='grid-container exception'>
            <Modal />
            <Exception data={this.state.PutFrontExceptionData}/>
            <div className="exception-right">
            <div className="main-container exception2">
            <div className = "kq-exception">
            <div className="kq-header">{_("Please scan tote which has excess item")}</div>
            </div>
            </div>
            </div>
            <div className = 'cancel-scan'>
            <Button1 disabled = {false} text = {_("Cancel exception")} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"}/>
            </div>
            </div>
            );      
          break;         
          case appConstants.PUT_FRONT_EXCEPTION_EXCESS_ITEMS:
          var _button;
          _button = (<div className = "staging-action">                          
            <Button1 disabled = {this.state.PutFrontExceptionFlag} text = {_("Confirm")} module ={appConstants.PUT_FRONT} action={appConstants.SEND_EXCESS_ITEMS_BIN} color={"orange"} />
            </div>);
          this._component = (
            <div className='grid-container exception'>
            <Modal />
            <Exception data={this.state.PutFrontExceptionData}/>
            <div className="exception-right">
            <div className="main-container">
            <div className = "kq-exception">
            <div className="kq-header">{_("Scan excess item quantity")}</div>
            <TabularData data={this.state.PutFrontExcessItems}  className='limit-height' />
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
          case appConstants.PPTL_MANAGEMENT:
          case appConstants.SCANNER_MANAGEMENT:
          this._navigation = (<Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>)
          var _button;
          if(this.state.PutFrontScreenId == appConstants.SCANNER_MANAGEMENT){
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
            <div className="ppsMode"> PPS Mode : {this.state.PutFrontPpsMode.toUpperCase()} </div>
            </div>
            <div className="col-md-6">
            <div className="seatType"> Seat Type : {this.state.PutFrontSeatType.toUpperCase()}</div>
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

      render: function(data){
        this.getNotificationComponent();
        this.getScreenComponent(this.state.PutFrontScreenId);
        return (
          <div className="main">
          <Header />
          {this._navigation}
          {this._component}
          {this._notification}
          </div> 
          
          );
      }

    });

module.exports = PutFront;