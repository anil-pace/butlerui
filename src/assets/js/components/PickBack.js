
var React = require('react');
var PickBackStore = require('../stores/PickBackStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');
var Modal = require('./Modal/Modal');
var SystemIdle = require('./SystemIdle');


function getStateData(){
  return {
           PickBackNavData : PickBackStore.getNavData(),
           PickBackNotification : PickBackStore.getNotificationData(),
           PickBackBinData: PickBackStore.getBinData(),
           PickBackScreenId:PickBackStore.getScreenId(),
           PickBackServerNavData : PickBackStore.getServerNavData()

    };
}

var PickBack = React.createClass({
  _component:'',
  _notification:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    PickBackStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    PickBackStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PICK_BACK_BIN:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                    <Bins binsData={this.state.PickBackBinData} screenId = {this.state.PickBackScreenId} />
                </div>
              </div>
            );

        break;
      case appConstants.PICK_BACK_SCAN:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                    <Bins binsData={this.state.PickBackBinData} screenId = {this.state.PickBackScreenId} />
                </div>
              </div>
            );
        break;
      default:
        return true; 
    }
  },

  getNotificationComponent:function(){
    if(this.state.PickBackNotification != undefined)
      this._notification = <Notification notification={this.state.PickBackNotification} />
    else
      this._notification = "";
  },
  render: function(data){
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PickBackScreenId);
      return (
        <div className="main">
          <Header />
          <Navigation navData ={this.state.PickBackNavData} serverNavData={this.state.PickBackServerNavData}/>
          {this._component}
          {this._notification}
        </div> 
       
      )
  }
});

module.exports = PickBack;