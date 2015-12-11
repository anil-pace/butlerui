var React = require('react');
var mainstore = require('../stores/mainstore');
var PutBack = require('./PutBack.react');
var PutFront = require('./PutFront');
var PickBack = require('./PickBack');
var PickFront = require('./PutFront');
var Header = require('./Header');
var appConstants = require('../constants/appConstants');

var currentSeat;
console.log(currentSeat);
function getState(){
  return {
      seatData: mainstore.seatData()
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
   this.setState(getState());
   this.checkSeatType();
  },
  checkSeatType : function(){
    switch(this.state.seatData.mode){
      case appConstants.PUT:
        if(this.state.seatData.seat_type === appConstants.BACK){
          currentSeat = <PutBack data={this.state.seatData}/>;
        }else{
          currentSeat = <PutFront data={this.state.seatData}/>;
        }
        break;
      case appConstants.PICK:
        if(this.state.seatData.seat_type === appConstants.BACK){
          currentSeat = <PickBack data={this.state.seatData} />;
        }else{
          currentSeat = <PickFront data={this.state.seatData}/>;
        }
        break; 
      default:
        return true;   
    }
    this.forceUpdate();
  },
  render: function(data){ 
    return (
      <div>
        {currentSeat}
      </div> 

    )
  }
});

module.exports = Operator;