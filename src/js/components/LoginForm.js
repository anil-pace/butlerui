
var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Router = require('react-router');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');
var BoxDiv = require('./BoxDiv');

var url_root = "http://192.168.2.103:5000/api";


var LoginForm = React.createClass({
  mixins:[LinkedStateMixin],
  getInitialState: function(){
    return {
      flag: todoStore.getFlag(),
      data1 : '',
      username : '',
      password : ''
    }
  },
  handleLogin: function(newItem){
      var data = {
          "username" : this.state.username,
          "password" : this.state.password 
        };
      todoActions.login(data);

  },
  componentDidMount: function(){
    todoStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    todoStore.removeChangeListener(this.onChange);
  },
  onChange: function(){
    this.setState({
      flag: todoStore.getFlag(),
      data1 : todoStore.getReceiveKeys()
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
              <input type="submit" className="btn btn-default" onClick={this.handleLogin} value="Login" />
            </form>
          </div>
        )
    }
    else{ 
      return(
        <div>
          
          <BoxDiv receivedData={this.state.data1} />
        </div>
      )
    }
  }
});


module.exports = LoginForm;