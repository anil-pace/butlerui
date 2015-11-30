
var React = require('react');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/Actions');
var PutBack = React.createClass({
  getInitialState: function(){
    return {
      ppsMode : null,
      seatType : null,
    }
  },
  componentWillMount: function(){
    todoStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    todoStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
  },
  render: function(data){ 
    
      return (
        <div className='row row-offcanvas row-offcanvas-right'>
        	<div className="col-xs-12 col-sm-12">
              <div className='row'>
                Body area
              </div>
          </div>
        </div>  
      )
  }
});

module.exports = PutBack;