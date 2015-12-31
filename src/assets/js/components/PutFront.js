
var React = require('react');
var PutFrontStore = require('../stores/PutFrontStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Spinner = require("./Spinner/LoaderButler");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');
var Rack = require('./Rack/MsuRack.js');
var Modal = require('./Modal/Modal');


function getStateData(){
  return {
           PutFrontNavData : PutFrontStore.getNavData(),
           PutFrontNotification : PutFrontStore.getNotificationData(),
           PutFrontScreenId:PutFrontStore.getScreenId(),
           PutFrontBinData: PutFrontStore.getBinData(),
           PutFrontScanDetails : PutFrontStore.scanDetails(),
           PutFrontProductDetails : PutFrontStore.productDetails(),
           PutFrontRackDetails: PutFrontStore.getRackDetails(),
           PutFrontCurrentBin:PutFrontStore.getCurrentSelectedBin(),
           PutFrontServerNavData : PutFrontStore.getServerNavData(),
           PutFrontItemUid : PutFrontStore.getItemUid()
    };

};

var PutFront = React.createClass({
  _notification:'',
  _component:'',
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
    if(this.state.PutFrontNotification != undefined)
      this._notification = <Notification notification={this.state.PutFrontNotification} />
    else
      this._notification = "";
  },

  getScreenComponent : function(screen_id){
    switch(screen_id){
      case appConstants.PUT_FRONT_WAITING_FOR_RACK:
          this._component = (
              <div className='grid-container'>
                 <div className='main-container'>
                    <Spinner />
                 </div>
              </div>
            );

        break;
      case appConstants.PUT_FRONT_SCAN:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className='main-container'>
                  <Bins binsData={this.state.PutFrontBinData} screenId = {this.state.PutFrontScreenId}/>
                  <Wrapper scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
                </div>
              </div>
            );
        break;
      case appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK:
          this._component = (
              <div className='grid-container'>
                <Modal />
                <div className="single-bin">
                    <Bins binsData={this.state.PutFrontCurrentBin} screenId = {this.state.PutFrontScreenId}/>
                      <div className="text">CURRENT BIN</div>
                </div>
                <div className='main-container'>
                  <Rack rackData = {this.state.PutFrontRackDetails}/>
                  <Wrapper scanDetails={this.state.PutFrontScanDetails} productDetails={this.state.PutFrontProductDetails} itemUid={this.state.PutFrontItemUid}/>
                </div>
                <div className = 'cancel-scan'>
                   <Button1 disabled = {false} text = {"Cancel Scan"} module ={appConstants.PUT_FRONT} action={appConstants.CANCEL_SCAN} barcode={this.state.PutFrontProductDetails.product_sku} color={"black"}/>
                </div>

              </div>
            );
        break;
      default:
        return true; 
    }
  },

  render: function(data){
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PutFrontScreenId);
    return (
      <div className="main">
        <Header />
        <Navigation navData ={this.state.PutFrontNavData} serverNavData={this.state.PutFrontServerNavData} navMessagesJson={this.props.navMessagesJson}/>
        {this._component}
        {this._notification}
      </div> 
     
    );
  }

});

module.exports = PutFront;