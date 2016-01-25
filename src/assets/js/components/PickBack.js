
var React = require('react');
var PickBackStore = require('../stores/PickBackStore');
var mainstore = require('../stores/mainstore');
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
var Exception = require('./Exception/Exception');


function getStateData(){
  /*return {
           PickBackNavData : PickBackStore.getNavData(),
           PickBackNotification : PickBackStore.getNotificationData(),
           PickBackBinData: PickBackStore.getBinData(),
           PickBackScreenId:PickBackStore.getScreenId(),
           PickBackServerNavData : PickBackStore.getServerNavData(),
           PickBackToteDetails : PickBackStore.getToteDetails()

    };*/
    return mainstore.getScreenData();
}

var PickBack = React.createClass({
  _component:'',
  _notification:'',
  _navigation:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    if(this.state.PickBackToteDetails != null){
        this.showModal(this.state.PickBackToteDetails)
    }
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){ 
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
    if(this.state.PickBackToteDetails != null){
        this.showModal(this.state.PickBackToteDetails)
    }
  },
  getExceptionComponent:function(){
      var _rightComponent = '';
      this._navigation = '';
      return (
              <div className='grid-container exception'>
                <Modal />
                <Exception data={this.state.PickBackExceptionData} action={true}/>
                <div className="exception-right"></div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Exception"} module ={appConstants.PICK_BACK} action={appConstants.CANCEL_EXCEPTION}  color={"black"}/>
                </div>
              </div>
            );
  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PICK_BACK_BIN:
       if(this.state.PickBackExceptionStatus == false){
        this._navigation = (<Navigation navData ={this.state.PickBackNavData} serverNavData={this.state.PickBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                    <Bins binsData={this.state.PickBackBinData} screenId = {this.state.PickBackScreenId} />
                </div>
              </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }

        break;
      case appConstants.PICK_BACK_SCAN:
         if(this.state.PickBackExceptionStatus == false){
          this._navigation = (<Navigation navData ={this.state.PickBackNavData} serverNavData={this.state.PickBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                    <Bins binsData={this.state.PickBackBinData} screenId = {this.state.PickBackScreenId} />
                </div>
              </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
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
          {this._navigation}
          {this._component}
          {this._notification}
        </div> 
       
      )
  }
});

module.exports = PickBack;