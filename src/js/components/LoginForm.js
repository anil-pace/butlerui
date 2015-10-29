
var React = require('react');
var Router = require('react-router');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');
var BoxDiv = require('./BoxDiv');

var url_root = "http://192.168.2.103:5000/api";


var LoginForm = React.createClass({
  getInitialState: function(){
    return {
      flag: todoStore.getFlag(),
      data1 : ''
    }
  },
  handleLogin: function(newItem){
      var data = {
          "username" : this.refs.username.getDOMNode().value,
          "password" : this.refs.password.getDOMNode().value 
        };
      this.refs.username.getDOMNode().value = '';
      this.refs.password.getDOMNode().value=''; 
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
              <input type="email" ref="username" onChange={this.onChange} className="form-control" placeholder="Username" value="admin"   />
              <input type="password" ref="password" onChange={this.onChange} className="form-control" placeholder="Password" value="apj0702"  />
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