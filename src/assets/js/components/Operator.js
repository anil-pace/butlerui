var React = require('react');
var mainstore = require('../stores/mainstore');
var PutBack = require('./PutBack');
var PutFront = require('./PutFront');
var PickBack = require('./PickBack');
var PickFront = require('./PutFront');
var appConstants = require('../constants/appConstants');
var Spinner = require('./Spinner/Overlay');
var SystemIdle = require('./SystemIdle');


function getState(){
  return {
      currentSeat: mainstore.getCurrentSeat(),
      spinner : mainstore.getSpinnerState(),
      systemIsIdle : mainstore.getSystemIdleState()
  }
}
var Operator = React.createClass({
  _spinner : null,
  _currentSeat:'',
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
      if(this.state.spinner === true){
       this._spinner = <Spinner />
      }else{
        this._spinner ='';
      }
       if(this.state.systemIsIdle === true){
          return (
            <div className="main">
              <SystemIdle />
            </div> 
          )
        }else{
          return (
            <div>
              {this._spinner}
              {this._currentSeat}
            </div> 

          )
       }
      
     
  }
});

module.exports = Operator;