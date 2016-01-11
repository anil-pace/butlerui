
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
           PutBackReconciliation : PutBackStore.getReconcileData()

    };
}

var PutBack = React.createClass({
  _component:'',
  _notification:'',
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
  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PUT_BACK_STAGE:
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

        break;
      case appConstants.PUT_BACK_SCAN:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                    <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId}/>
                    <Wrapper scanDetails={this.state.PutBackScanDetails} productDetails={this.state.PutBackProductDetails} itemUid={this.state.PutBackItemUid}/>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_SCAN} barcode={this.state.PutBackProductDetails.product_sku} color={"black"}/>
                </div>
              </div>
            );
        break;
      case appConstants.PUT_BACK_TOTE_CLOSE:
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
                  <Button1 disabled = {false} text = {"BACK"} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_SCAN} color={"black"}/>
                  <Button1 disabled = {false} text = {"CLOSE"} module ={appConstants.PUT_BACK} action={appConstants.FINISH_CURRENT_AUDIT} color={"orange"} />  
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
  render: function(data){ console.log(this.state.PutBackReconciliation);
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PutBackScreenId);
      return (
        <div className="main">
          <Header />
          <Navigation navData ={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>
          {this._component}
          {this._notification}
        </div> 
       
      )
  }
});

module.exports = PutBack;