
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
var CommonActions = require('../actions/CommonActions');


function getStateData(){
  return {
           PickBackNavData : PickBackStore.getNavData(),
           PickBackNotification : PickBackStore.getNotificationData(),
           PickBackBinData: PickBackStore.getBinData(),
           PickBackScreenId:PickBackStore.getScreenId(),
           PickBackServerNavData : PickBackStore.getServerNavData(),
           PickBackToteDetails : PickBackStore.getToteDetails()

    };
}

var PickBack = React.createClass({
  _component:'',
  _notification:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    if(this.state.PickBackToteDetails != null){
        this.showModal(this.state.PickBackToteDetails)
    }
    PickBackStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){ console.log('test');
    PickBackStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
    if(this.state.PickBackToteDetails != null){
        this.showModal(this.state.PickBackToteDetails)
    }
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
  showModal: function(data) { 
    if(data.tote_status === true){ 
      setTimeout((function(){CommonActions.showModal({
              data:data,
              type:'scan_bin_barcode'
      });
      $('.modal').modal();
      return false;
      }),0)
    }else{ 
      $('.modal').modal('hide');
    }
  },
  getNotificationComponent:function(){
    if(this.state.PickBackNotification != undefined)
      this._notification = <Notification notification={this.state.PickBackNotification} navMessagesJson={this.props.navMessagesJson} />
    else
      this._notification = "";
  },
  render: function(data){
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PickBackScreenId);
      return (
        <div className="main">
          <Header />
          <Navigation navData ={this.state.PickBackNavData} serverNavData={this.state.PickBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>
          {this._component}
          {this._notification}
        </div> 
       
      )
  }
});

module.exports = PickBack;