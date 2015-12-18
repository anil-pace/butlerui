
var React = require('react');
var PutFrontStore = require('../stores/PutFrontStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');


function getStateData(){
  return {
           PutFrontNavData : PutFrontStore.getNavData(),
           PutFrontNotification : PutFrontStore.getNotificationData()
    };

};

var Operator = React.createClass({
  _notification:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    PutFrontStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    PutFrontStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
 

  getNotificationComponent:function(){
    if(this.state.PutFrontNotification.description != "")
      this._notification = <Notification notification={this.state.PutFrontNotification} />
    else
      this._notification = "";
  },

  render: function(data){
    this.getNotificationComponent();
   
    return (
      <div className="main">
        <Header />
        <Navigation navData ={this.state.PutFrontNavData} />
        {this._notification}
      </div> 
     
    );
  }

});

module.exports = Operator;