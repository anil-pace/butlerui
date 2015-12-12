var React = require('react');
var mainstore = require('../../stores/mainstore');
var KQ = require('./KQ');
var ProductInfo = require('./ProductInfo');
var PopUp = require('./PopUp');

var Wrapper = React.createClass({
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
        <div className='rightWrapper'>
           <ProductInfo />
            <KQ />
        </div>    
      )
  }
});

module.exports = Wrapper;