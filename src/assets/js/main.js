global.jQuery = global.$ = require("jquery");
var React = require('react');
var ReactDOM = require('react-dom');

var Operator = require('./components/Operator'); 
var App = React.createClass({
  getInitialState: function(){
    return null;
  },
  render: function(){
    return (
      <div className="body-container container">
        <Operator />
      </div>
    );
  }
});


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
