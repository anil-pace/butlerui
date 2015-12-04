
var React = require('react');
var mainstore = require('../stores/mainstore');
var todoActions = require('../actions/Actions');
var PutBack = require('./PutBack');
var Header = require('./Header');
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
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
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
        <Header />
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