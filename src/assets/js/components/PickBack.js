
var React = require('react');
var mainstore = require('../stores/mainstore');
var PutBack = React.createClass({
  getInitialState: function(){
    return {
      
    }
  },
  componentWillMount: function(){
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
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