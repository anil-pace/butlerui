
var React = require('react');
var mainstore = require('../stores/mainstore');
var PutBack = require('./PutBack');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Bins = require("./Bins/Bins.react");
var PutBackNav = require('./PutBackNav');
var SampleData = require('../sample_data/sample');

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
    var d = [
        {
          "id":"1",
          "type":"passive",
          "action":"Pick",
          "image":"assets/images/nav3.png"
        },
        {
          "id":"2",
          "type":"active",
          "action":"Stage Bins or Scan the Item(s)",
          "image":"assets/images/nav2.png",
          "showImage":true
        },
        {
          "id":"3",
          "type":"passive",
          "action":"Pick",
          "image":"assets/images/nav3.png"
        }
      ];

    var moduleToLoad,navigation;

     if(this.state.ppsMode === 'put' && this.state.seatType === 'back'){console.log('o');
        moduleToLoad =  <PutBack />
        navigation = <PutBackNav />
     }
    
    return (
      <div className="main">
        <Header />
        <Navigation navData = {d} />
        <Bins binsData = {SampleData.PutBack_1.state_data} />
      </div> 
     
    )
  }
});

module.exports = Operator;