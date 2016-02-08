var React = require('react');
var mainstore = require('../stores/mainstore');
var PutFront = require('./PutFront');
var PickFront = require('./PickFront');
var appConstants = require('../constants/appConstants');
var Spinner = require('./Spinner/Overlay');
var SystemIdle = require('./SystemIdle');
var CommonActions = require('../actions/CommonActions');

function getState(){
  return {
      currentSeat: mainstore.getCurrentSeat(),
      spinner : mainstore.getSpinnerState(),
      navMessages : mainstore.getServerMessages(),
      flag : mainstore.getFlag()
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
     var data = {
        'data_type': 'auth',
        'data': {
              'username': 'kerry',
              'password': 'gorapj',
              'seat_name': 'front_10'
          }
    }
    CommonActions.webSocketConnection();
    CommonActions.login(data);
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
      case appConstants.PICK_FRONT:
          this._currentSeat = <PickFront navMessagesJson={this.state.navMessages}/>;
        break; 
      case appConstants.PUT_FRONT:
          this._currentSeat = <PutFront navMessagesJson={this.state.navMessages}/>;
        break;
      default:
        return true; 
      }
  },

  render: function(data){ 

      if(this.state.spinner === true){
       this._spinner = <Spinner />
      }else{
        this._spinner ='';
      }
       if(this.state.flag === true){
        console.log(this.state.currentSeat);
        this.getSeatType(this.state.currentSeat);
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
       }else{
        return (<div className="main">
          {this._spinner}
        </div>) 
       }
      
     
  }
});

module.exports = Operator;