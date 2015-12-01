
var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Router = require('react-router');
var store = require('../stores/store');
var Actions = require('../actions/Actions');
var Operator = require('../components/Operator');


var LoginForm = React.createClass({
  mixins:[LinkedStateMixin],
  getInitialState: function(){
    return {
      flag: store.getFlag(),
      data1 : '',
      username : 'kerry',
      password : 'gorapj',
      seat_name : 'pps_front_20'
    }
  },
  handleLogin: function(newItem){
      var data = {
        'data_type': 'auth',
        'data': {
              'username': this.state.username,
              'password': this.state.password,
              'seat_name': this.state.seat_name
          }
      }
    Actions.login(data);

  },
  componentDidMount: function(){
    store.addChangeListener(this.onChange);
    Actions.webSocketConnection();
  },
  componentWillUnmount: function(){
    store.removeChangeListener(this.onChange);
  },
  onChange: function(){
    this.setState({
      flag: store.getFlag(),
      data1 : store.getReceiveKeys()
    });
  },
  render: function(){
      var display = this.state.flag === true ? 'block' : 'none';
      if(this.state.flag === false){
        return (
          <div className='container'>
            <form className="form-signin">
              <h2 className="form-signin-heading">Please sign in</h2>
              <input type="email"  valueLink={this.linkState('username')} className="form-control" placeholder="Username"   />
              <input type="password" valueLink={this.linkState('password')} className="form-control" placeholder="Password" />
              <input type="button" className="btn btn-default" onClick={this.handleLogin} value="Login" />
            </form>

          </div>
        )
    }
    else{ 
      return(
         <div>
            <Operator />
          </div>
        
      )
    }
  }
});


module.exports = LoginForm;