
var React = require('react');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/Actions');
var PutBack = require('./PutBack');
var PutBackNav = require('./PutBackNav');
var Operator = React.createClass({
  getInitialState: function(){
    return {
      ppsMode : 'put',
      seatType : 'back'
    }
  },
 /* showRKlinetable : function(index){
  	this.setState({
  	   index : index
  	});
  },
  openForm: function(){
  	this.setState({
  		stageLevel: 3
  	})
  },
  generalFunctions : function(arg, e){
      if(arg === 'scan_barcode'){
        var receivekeySelected = this.props.receivedData[0].receive_keys[this.state.index].receive_key;
         todoActions.scanBarcode(this.refs.barcode.getDOMNode().value, receivekeySelected);
      }else if(arg === 'search_receive_key'){ console.log(e);
        if(e.keyCode == 13){
         
        }
      } 

  },
 
  searchReceiveKey : function(event){
    console.log(event);
  },
   */
  componentWillMount: function(){
    todoStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    todoStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
 /*   this.setState({
      itemData :todoStore.scanBarcode(),
      boxData :todoStore.boxData()
    });*/
  },
  render: function(data){ 
    var moduleToLoad,navigation;

     if(this.state.ppsMode === 'put' && this.state.seatType === 'back'){console.log('o');
        moduleToLoad =  <PutBack />
        navigation = <PutBackNav />
     }
    
    return (
      <div>
        <nav className='navbar'>
        </nav>
        <div className='row'>
        {navigation}
        </div>
      	<div className="container">
          {moduleToLoad}
        </div>
      </div> 
     
    )
  }
});

module.exports = Operator;