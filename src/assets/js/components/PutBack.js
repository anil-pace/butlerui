
var React = require('react');
var PutBackStore = require('../stores/PutBackStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');

function getStateData(){
  return {
           StageActive:PutBackStore.getStageActiveStatus(),
           StageAllActive:PutBackStore.getStageAllActiveStatus(),
           PutBackNavData : PutBackStore.getNavData(),
           PutBackNotification : PutBackStore.getNotificationData(),
           PutBackBinData: PutBackStore.getBinData(),
           PutBackScreenId:PutBackStore.getScreenId(),
           PutBackScanDetails : PutBackStore.scanDetails(),
           PutBackProductDetails : PutBackStore.productDetails()
    };
}

var Operator = React.createClass({
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
                <div className='main-container'>
                    <Bins binsData={this.state.PutBackBinData} screenId = {this.state.PutBackScreenId}/>
                    <Wrapper scanDetails={this.state.PutBackScanDetails} productDetails={this.state.PutBackProductDetails} />
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_SCAN} barcode={this.state.PutBackProductDetails.product_sku} color={"black"}/>
                </div>
              </div>
            );
        break;
      default:
        return true; 
    }
  },

  getNotificationComponent:function(){
    if(this.state.PutBackNotification.description != "")
      this._notification = <Notification notification={this.state.PutBackNotification} />
    else
      this._notification = "";
  },
  render: function(data){
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PutBackScreenId);
    return (
      <div className="main">
        <Header />
        <Navigation navData ={this.state.PutBackNavData}/>
        {this._component}
        {this._notification}
      </div> 
     
    )
  }
});

module.exports = Operator;