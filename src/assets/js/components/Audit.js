
var React = require('react');
var AuditStore = require('../stores/PickBackStore');
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
    
  },

  getNotificationComponent:function(){
  },
  render: function(data){
      return (
        <div className="main">
          <Header />
          <Navigation navData ={this.state.PickBackNavData} serverNavData={this.state.PickBackServerNavData} navMessagesJson={this.props.navMessagesJson}/>
        </div> 
       
      )
  }
});

module.exports = PickBack;