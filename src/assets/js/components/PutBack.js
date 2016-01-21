
var React = require('react');
var PutBackStore = require('../stores/PutBackStore');
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
var Exception = require('./Exception/Exception');
var ExceptionHeader = require('./ExceptionHeader');
var KQ = require('./ProductDetails/KQ');
var Img = require('./PrdtDetails/ProductImage.js');


function getStateData(){
  return {
           StageActive:PutBackStore.getStageActiveStatus(),
           StageAllActive:PutBackStore.getStageAllActiveStatus(),
           PutBackNavData : PutBackStore.getNavData(),
           PutBackNotification : PutBackStore.getNotificationData(),
           PutBackBinData: PutBackStore.getBinData(),
           PutBackScreenId:PutBackStore.getScreenId(),
           PutBackScanDetails : PutBackStore.scanDetails(),
           PutBackProductDetails : PutBackStore.productDetails(),
           PutBackServerNavData : PutBackStore.getServerNavData(),
           PutBackItemUid : PutBackStore.getItemUid(),
           PutBackReconciliation : PutBackStore.getReconcileData(),
           PutBackToteId : PutBackStore.getToteId(),
           PutBackExceptionStatus:PutBackStore.getExceptionStatus(),
           PutBackExceptionData:PutBackStore.getExceptionData(),
           PutBackDamagedBarcodeScanDetails:PutBackStore.getScanDetails(),
           PutBackExceptionProductDetails:PutBackStore.getItemDetailsData()

    };

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
    PutBackStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    PutBackStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
  getExceptionComponent:function(){
      var _rightComponent = '';
      this._navigation = '';
      switch(this.state.PutBackExceptionData["activeException"]){
        case appConstants.DAMAGED_BARCODE:
          _rightComponent = (<div className="exception-right">{"DAMAGED_BARCODE"}</div>);
        break;
        case appConstants.OVERSIZED_ITEMS:
          _rightComponent = (<div className="exception-right">{"OVERSIZED_ITEMS"}</div>)
        break;
        case appConstants.EXCESS_ITEMS_IN_PPS_BINS:
          _rightComponent = (<div className="exception-right">{"EXCESS_ITEMS_IN_PPS_BINS"}</div>)
        break;
        default:
          _rightComponent = '';
       }
      return (
              <div className='grid-container exception'>
                <Modal />
                <Exception data={this.state.PutBackExceptionData} action={true}/>
                {_rightComponent}
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION}  color={"black"}/>
                </div>
              </div>
            );
  },
  getScreenComponent : function(screen_id){
    this._navigation = (<Navigation navData ={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
    switch(screen_id){
      case appConstants.PUT_BACK_STAGE:
      case appConstants.PUT_BACK_SCAN_TOTE:
         if(this.state.PutBackExceptionStatus == false){
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                    <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId} />
                </div>
                <div className = 'staging-action' >
                  <Button1 disabled = {!this.state.StageActive} text = {"Stage"} module ={appConstants.PUT_BACK} action={appConstants.STAGE_ONE_BIN} color={"orange"}/>
                  <Button1 disabled = {!this.state.StageAllActive} text = {"Stage All"} module ={appConstants.PUT_BACK} action={appConstants.STAGE_ALL} color={"black"} />  
                </div>
              </div>
            );
          }else{
          this._component = this.getExceptionComponent();
        }

        break;
      case appConstants.PUT_BACK_SCAN:
          if(this.state.PutBackExceptionStatus == false){
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                    <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId}/>
                    <Wrapper scanDetails={this.state.PutBackScanDetails} productDetails={this.state.PutBackProductDetails} itemUid={this.state.PutBackItemUid}/>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_SCAN} barcode={this.state.PutBackItemUid} color={"black"}/>
                </div>
              </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
        break;
      case appConstants.PUT_BACK_TOTE_CLOSE:
          if(this.state.PutBackExceptionStatus == false){
          var subComponent='';
          var messageType = 'large';
            subComponent=(
                <div className='main-container'>
                  <div className="audit-reconcile-left">
                    <TabularData data = {this.state.PutBackReconciliation}/>
                  </div>
                </div>
              );
            messageType = "small";
          this._component = (
              <div className='grid-container audit-reconcilation'>
                {subComponent}
                 <div className = 'staging-action' >
                  <Button1 disabled = {false} text = {"BACK"} module ={appConstants.PUT_BACK} toteId={this.state.PutBackToteId} status={false} action={appConstants.CANCEL_TOTE} color={"black"}/>
                  <Button1 disabled = {false} text = {"CLOSE"} module ={appConstants.PUT_BACK} toteId={this.state.PutBackToteId} status={true} action={appConstants.CLOSE_TOTE} color={"orange"} />  
                </div>
              </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
        break; 
      case appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE:
          this._navigation = '';
          this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PutBackExceptionData}/>
                <div className="exception-right">
                  <ExceptionHeader text={this.state.PutBackServerNavData["description"]} />
                  <KQ scanDetails = {this.state.PutBackDamagedBarcodeScanDetails} />
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {"FINISH"} color={"orange"} module ={appConstants.PUT_BACK} action={appConstants.SEND_DAMAGED_BARCODE_QTY} />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
        break; 
       case appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS:
          this._navigation = '';
          this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PutBackExceptionData}/>
                <div className="exception-right">
                  <ExceptionHeader text={this.state.PutBackServerNavData["description"]} />
                  <div className="main-container exception1">
                    <Img />
                    <TabularData data = {this.state.PutBackExceptionProductDetails}/>
                    <KQ scanDetails = {this.state.PutBackDamagedBarcodeScanDetails} />
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
        break; 
       case appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS:
          this._navigation = '';
          this._component = (
              <div className='grid-container exception'>
                <Exception data={this.state.PutBackExceptionData}/>
                <div className="exception-right">
                   <ExceptionHeader text={this.state.PutBackServerNavData["description"]} />
                    <div className="main-container exception1">
                      <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId}/>
                   </div>
                  <div className = "finish-damaged-barcode">
                    <Button1 disabled = {false} text = {"FINISH"} color={"orange"}  />  
                  </div>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER}  color={"black"}/>
                </div>
              </div>
            );
        break; 
      default:
        return true; 
    }
  },

  getNotificationComponent:function(){
    if(this.state.PutBackNotification != undefined)
      this._notification = <Notification notification={this.state.PutBackNotification} navMessagesJson={this.props.navMessagesJson}/>
    else
      this._notification = "";
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