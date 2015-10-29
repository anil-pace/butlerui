var React = require('react');

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


React.render(
    <App />,
    document.getElementById('app')
)
