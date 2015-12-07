var React = require('react');
var ReactDOM = require('react-dom');

var LoginForm = require('./components/LoginForm'); 

var App = React.createClass({
  getInitialState: function(){
    return null;
  },
  render: function(){
    return (
      <div className="body-container">
        <LoginForm />
      </div>
    );
  }
});


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
