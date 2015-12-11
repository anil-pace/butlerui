
var React = require('react');
var mainstore = require('../stores/mainstore');
var PutBack = require('./PutBack');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Bins = require("./Bins/Bins.react");
var PutBackNav = require('./PutBackNav');
var MsuRack = require('./Rack/MsuRack');
var SampleData = require('../sample_data/sample');
var appConstants = require('../constants/appConstants');

function getState(){
  return {
      seatData: mainstore.seatData(),
      seatType : null,
      mode : null
  }
}
var Operator = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentWillMount: function(){
     mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
   this.setState({
      seatData :mainstore.seatData()
    });
  },
  checkSeatType : function(){
    if(this.state.seatData.seat_type === appConstants.BACK){}
  },
  render: function(data){ console.log(this.state.seatData);

    var d = [
        {
          "id":"1",
          "type":"passive",
          "action":"Pick",
          "image":"assets/images/nav3.png"
        },
        {
          "id":"2",
          "type":"active",
          "action":"Stage Bins or Scan the Item(s)",
          "image":"assets/images/nav2.png",
          "showImage":true
        },
        {
          "id":"3",
          "type":"passive",
          "action":"Pick",
          "image":"assets/images/nav3.png"
        }
      ];

    var moduleToLoad,navigation;

     
    
    return (
      <div className="main">
        <Header />
        <Navigation navData = {d} />
        <MsuRack />
      </div> 
     
    )
  }
});

module.exports = Operator;