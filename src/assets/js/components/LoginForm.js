
var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Router = require('react-router');
var mainstore = require('../stores/mainstore');
var loginstore = require('../stores/loginstore');
var CommonActions = require('../actions/CommonActions');
var Operator = require('../components/Operator');

function getState(){
  return {
      flag: loginstore.getFlag(),
      seatList : loginstore.seatList(),
      username : 'kerry',
      password : 'gorapj'
  }
}
var LoginForm = React.createClass({
  mixins:[LinkedStateMixin],
  getInitialState: function(){
    return getState();
  },
  handleLogin: function(newItem){
      var data = {
        'data_type': 'auth',
        'data': {
              'username': this.state.username,
              'password': this.state.password,
              'seat_name': this.refs.seat_name.value
          }
      }
    CommonActions.login(data);

  },
  componentDidMount: function(){
    mainstore.addChangeListener(this.onChange);
    loginstore.addChangeListener(this.onChange);
    CommonActions.webSocketConnection(); 
    CommonActions.listSeats(); 
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
    loginstore.removeChangeListener(this.onChange);
  },
  onChange: function(){
    this.setState({
      flag: loginstore.getFlag(),
      seatList : loginstore.seatList()
    });

  },
 
  render: function(){
      var seatData;
      var display = this.state.flag === true ? 'block' : 'none';
      if(this.state.seatList.length > 0){
          seatData = this.state.seatList[0].map(function(data, index){ 
            if(data.hasOwnProperty('seat_type')){
               return (
                  <option key={'pps' + index} value={data.seat_type+'_'+data.pps_id} >PPS {data.seat_type} {data.pps_id}</option>
                )
            }else{console.log(data);
                 return( <option key={index} value={data} >{data}</option>)
            }
          });
      }
      if(this.state.flag === false){
        return (
          <div className='container'>
            <form className="form-signin">
              <h2 className="form-signin-heading">Please sign in</h2>
              <select className='form-control' ref='seat_name'>
                {seatData}
              </select>   
              <input type="email"  valueLink={this.linkState('username')} className="form-control" placeholder="Username"   />
              <input type="password" valueLink={this.linkState('password')} className="form-control" placeholder="Password" />
              <input type="button" className="btn btn-default" onClick={this.handleLogin} value="Login" />
            </form>

          </div>
        )
    }
    else{ 
      return(
         <div className="main">
            <Operator />
          </div>
        
      )
    }
  }
});


module.exports = LoginForm;