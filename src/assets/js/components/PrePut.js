
var React = require('react');
var mainstore = require('../stores/mainstore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var BinsFlex = require("./Bins/BinsFlexArrange.react");
var Button1 = require("./Button/Button");
var appConstants = require('../constants/appConstants');
var Modal = require('./Modal/Modal');
var Exception = require('./Exception/Exception');
var ExceptionHeader = require('./ExceptionHeader');
var Reconcile = require("./Reconcile");
var MtuNavigation = require("./mtuNavigation")

function getStateData(){
    return mainstore.getScreenData();

}
var PrePut = React.createClass({
  _component:'',
  _notification:'',
  _exception:'',
  _navigation:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    //PrePutStore.addChangeListener(this.onChange);
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    //PrePutStore.removeChangeListener(this.onChange);
    mainstore.addChangeListener(this.onChange);
  },
  onChange: function(){ 
    if(this.refs.prePut){
      this.setState(getStateData());
    }
  },
  getExceptionComponent:function(){
      var _rightComponent = '';
      this._navigation = '';
      return (
              <div className='grid-container exception'>
                <Modal />
                <Exception data={this.state.PrePutExceptionData} action={true}/>
                <div className="exception-right"></div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Exception")} module ={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION}  color={"black"}/>
                </div>
              </div>
            );
  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PRE_PUT_STAGE:
         if(this.state.PrePutExceptionStatus == false){
          this._navigation = (<Navigation navData ={this.state.PrePutNavData} serverNavData={this.state.PrePutServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          var binComponent ="";
          if (this.state.OrigBinUse){
            binComponent =(  <BinsFlex binsData={this.state.PrePutBinData} screenId = {this.state.PrePutScreenId} seatType = {this.state.SeatType}/>)
          }else{
              binComponent = ( <div className='main-container'>
                    <Bins binsData={this.state.PrePutBinData} screenId = {this.state.PrePutScreenId} />
                </div>)
          }          
          this._component = (
              <div className='grid-container'>
               <MtuNavigation data={[1,0,0]}/>
                <Modal />
               {binComponent}
                <div className = 'staging-action' >
                  <Button1 disabled = {!this.state.ReleaseActive} text = {_("Release MTU")} module ={appConstants.PRE_PUT} action={appConstants.RELEASE_MTU} color={"orange"}/>
                </div>
              </div>
            );
          }else{
          this._component = this.getExceptionComponent();
        }

        break;
      case appConstants.PRE_PUT_SCAN:
          if(this.state.PrePutExceptionStatus == false){
          var binComponent = "";
          if (this.state.OrigBinUse){
            binComponent =(  <BinsFlex binsData={this.state.PrePutBinData} screenId = {this.state.PrePutScreenId} seatType = {this.state.SeatType}/>)
          }else{
              binComponent = ( <div className='main-container'>
                    <Bins binsData={this.state.PrePutBinData} screenId = {this.state.PrePutScreenId} />
                </div>)
          }          
          this._navigation = (<Navigation navData ={this.state.PrePutNavData} serverNavData={this.state.PrePutServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                <MtuNavigation data={[0,1,0]}/>
                <Modal />
                {binComponent}
                <div className = 'staging-action' >
                  <Button1 disabled = {!this.state.ReleaseActive} text = {_("Release MTU")} module ={appConstants.PRE_PUT} action={appConstants.RELEASE_MTU} color={"orange"}/>
                </div>                
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {_("Cancel Scan")} module ={appConstants.PRE_PUT} action={appConstants.CANCEL_SCAN} barcode={this.state.PrePutToteid} color={"black"}/>
                </div>
              </div>
            );
        }else{
          this._component = this.getExceptionComponent();
        }
        break;
      case appConstants.PRE_PUT_RELEASE:
          if(this.state.PrePutExceptionStatus == false){
          var binComponent = "";
          if (this.state.OrigBinUse){
            binComponent =(  <BinsFlex binsData={this.state.PrePutBinData} screenId = {this.state.PrePutScreenId} seatType = {this.state.SeatType}/>)
          }else{
              binComponent = ( <div className='main-container'>
                    <Bins binsData={this.state.PrePutBinData} screenId = {this.state.PrePutScreenId} />
                </div>)
          }          
          this._navigation = (<Navigation navData ={this.state.PrePutNavData} serverNavData={this.state.PrePutServerNavData} navMessagesJson={this.props.navMessagesJson}/>);
          this._component = (
              <div className='grid-container'>
                <MtuNavigation data={[0,0,1]}/>            
                <Modal />
                {binComponent}
                <div className = 'staging-action' >
                  <Button1 disabled = {false} text = {_("Release MTU")} module ={appConstants.PRE_PUT} action={appConstants.RELEASE_MTU} color={"orange"}/>
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

  getNotificationComponent:function(){
    if(this.state.PrePutNotification != undefined)
      this._notification = <Notification notification={this.state.PrePutNotification} navMessagesJson={this.props.navMessagesJson}/>
    else
      this._notification = "";
  },
  render: function(data){ 
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PrePutScreenId);
      return (
        <div ref="prePut" className="main">
          <Header />
          {this._navigation}
          {this._component}
          {this._notification}
        </div> 
       
      )
  }
});

module.exports = PrePut;