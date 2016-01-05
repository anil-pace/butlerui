
var React = require('react');
var AuditStore = require('../stores/AuditStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');
var Modal = require('./Modal/Modal');
var SystemIdle = require('./SystemIdle');
var TableHeader = require('./TableHeader');
var TableRow = require('./TableRow');


function getStateData(){
  return {
           AuditNavData : AuditStore.getNavData(),
           AuditNotification : AuditStore.getNotificationData(),
           AuditScreenId:AuditStore.getScreenId(),
           AuditServerNavData : AuditStore.getServerNavData()

    };
}

var rowData = {
  cols:[
    {
      text:"ashish",
      status:"enabled",
      selected:true,
      size:"large",
      border:false,
      grow:true,
      bold:false
    },
    {
      text:"ashish",
      status:"enabled",
      selected:false,
      size:"large",
      border:true,
      grow:false,
      bold:false
    }
  ]
}


var Audit = React.createClass({
  _component:'',
  _notification:'',
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    AuditStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    AuditStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.AUDIT_SCAN:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                  <div className="audit-scan-left">
                  <TableHeader data="Box Serial Numbers"/>
                  <TableRow data={rowData} />
                  </div>
                  <div className="audit-scan-middle">
                  <TableHeader data="SKU Box Serial Number"/>
                  kumar
                  </div>
                  <div className="audit-scan-right">
                  <TableHeader data="Product Details"/>
                  </div>
                </div>
              </div>
            );

        break;
      case appConstants.AUDIT_STATUS:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                </div>
              </div>
            );
        break;
      default:
        return true; 
    }
  },

  getNotificationComponent:function(){
    if(this.state.AuditNotification != undefined)
      this._notification = <Notification notification={this.state.AuditNotification} navMessagesJson={this.props.navMessagesJson} />
    else
      this._notification = "";
  },
  render: function(data){
    this.getNotificationComponent();
    this.getScreenComponent(this.state.AuditScreenId);
      return (
        <div className="main">
          <Header />
          <Navigation navData ={this.state.AuditNavData} serverNavData={this.state.AuditServerNavData} navMessagesJson={this.props.navMessagesJson}/>
          {this._component}
          {this._notification}
        </div> 
       
      )
  }
});

module.exports = Audit;