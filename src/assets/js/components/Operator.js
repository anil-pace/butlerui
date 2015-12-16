var React = require('react');
var OperatorStore = require('../stores/OperatorStore');
var mainstore = require('../stores/mainstore');
var PutBack = require('./PutBack.react');
var PutFront = require('./PutFront');
var PickBack = require('./PickBack');
var PickFront = require('./PutFront');
var Header = require('./Header');
var appConstants = require('../constants/appConstants');
var Spinner = require('./Spinner/Overlay');


function getState(){
  return {
      currentSeat: OperatorStore.getCurrentSeat()
  }
}
var Operator = React.createClass({
  _currentSeat:'',
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
          this._currentSeat = <PutBack />;
        break;
      case appConstants.PUT_FRONT:
          this._currentSeat = <PutFront />;
        break;
      case appConstants.PICK_BACK:
          this._currentSeat = <PickBack />;
        break;
      case appConstants.PICK_FRONT:
          this._currentSeat = <PickFront />;
        break;
      default:
        return true; 
      }
  },

  render: function(data){ 
     this.getSeatType(this.state.currentSeat);
      if(this.state.currentSeat === undefined){
        return (
          <div>
            <Spinner />
          </div> 

        )
     }else{
        return (
          <div>
            {this._currentSeat}
          </div> 

        )
     }
  }
});

module.exports = Operator;