var React = require('react');
var mainstore = require('../stores/mainstore');
var PutBack = require('./PutBack');
var PutFront = require('./PutFront');
var PickBack = require('./PickBack');
var PickFront = require('./PickFront');
var Audit = require('./Audit');
var appConstants = require('../constants/appConstants');
var Spinner = require('./Spinner/Overlay');
var SystemIdle = require('./SystemIdle');
var SplitPPS = require('./SplitPPS');



function getState(){
  return {
      currentSeat: mainstore.getCurrentSeat(),
      spinner : mainstore.getSpinnerState(),
      systemIsIdle : mainstore.getSystemIdleState(),
      navMessages : mainstore.getServerMessages(),
      groupInfo : mainstore.getBinMapDetails(),
      undockAwaited : mainstore.getUndockAwaitedDetails(),
      docked : mainstore.getDockedDetails()
  }
}
var Operator = React.createClass({
  _spinner : null,
  _currentSeat:'',
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function(){
    mainstore.addChangeListener(this.onChange);
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
          this._currentSeat = <PutBack navMessagesJson={this.state.navMessages}/>;
        break;
      case appConstants.PUT_FRONT:
          this._currentSeat = <PutFront navMessagesJson={this.state.navMessages}/>;
        break;
      case appConstants.PICK_BACK:
          this._currentSeat = <PickBack navMessagesJson={this.state.navMessages}/>;
        break;
      case appConstants.PICK_FRONT:
          this._currentSeat = <PickFront navMessagesJson={this.state.navMessages}/>;
        break;
      case appConstants.AUDIT:
          this._currentSeat = <Audit navMessagesJson={this.state.navMessages}/>;
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
              <SplitPPS groupInfo = {this.state.groupInfo} undockAwaited = {this.state.undockAwaited} docked = {this.state.docked}/>
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