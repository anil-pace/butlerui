global.jQuery = global.$ = require("jquery");
var React = require('react');
var ReactDOM = require('react-dom');

var LoginForm = require('./components/LoginPage/LoginPage');

var DevMode = require('./components/DevMode');

var Operator = require('./components/Operator');


var Operator = require('./components/Operator');
var ActionCreators = require('./actions/CommonActions');
var App = React.createClass({
  getInitialState: function(){
    return null;
  },
  componentWillMount: function(){
    ActionCreators.getBOIConfig();
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

ReactDOM.render(
  <DevMode interfaceEnabled={true}/>,
  document.getElementById('devmode')
)