var React = require('react');
var OperatorStore = require('../stores/OperatorStore');
var PutBack = require('./PutBack.react');
var PutFront = require('./PutFront');
var PickBack = require('./PickBack');
var PickFront = require('./PutFront');
var appConstants = require('../constants/appConstants');

var _currentSeat;
function getState(){
  return {
      currentSeat: OperatorStore.getCurrentSeat()
  }
}
var Operator = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentWillMount: function(){
     OperatorStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    OperatorStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
   this.setState(getState());
  
  },
  getSeatType:function(seat){
     switch(seat){
      case appConstants.PUT_BACK:
          _currentSeat = <PutBack />;
        break;
      case appConstants.PUT_FRONT:
          _currentSeat = <PutFront />;
        break;
      case appConstants.PICK_BACK:
          _currentSeat = <PickBack />;
        break;
      case appConstants.PICK_FRONT:
          _currentSeat = <PickFront />;
        break;
      default:
        return true; 
      }
  },

  render: function(data){ 
     this.getSeatType(this.state.currentSeat);
    return (
      <div>
        {_currentSeat}
      </div> 

    )
  }
});

module.exports = Operator;