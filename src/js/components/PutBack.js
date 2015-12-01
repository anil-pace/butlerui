
var React = require('react');
var store = require('../stores/store');
var todoActions = require('../actions/Actions');
var PutBack = React.createClass({
  getInitialState: function(){
    return {
      
    }
  },
  componentWillMount: function(){
    store.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    store.removeChangeListener(this.onChange);
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