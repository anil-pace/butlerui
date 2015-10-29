var React = require('react');
var ReactDOM = require('react-dom');

var ModComponents = require('./components/LoginForm'); 

var App = React.createClass({
  getInitialState: function(){
    return null;
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <ModComponents />
        </div>
      </div>
    );
  }
});


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
