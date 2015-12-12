
var React = require('react');
var PutBackStore = require('../stores/PutBackStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Bins = require("./Bins/Bins.react");
var SampleData = require('../sample_data/sample');

function getStateData(){
  return {
           PutBackStateData:PutBackStore.getStateData()
    };
}

var Operator = React.createClass({
  getInitialState: function(){
    return getStateData();
  },
  componentWillMount: function(){
    PutBackStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    PutBackStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
  render: function(data){ 
    console.log(this.state.PutBackStateData);
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
    return (
      <div className="main">
        <Header />
        <Navigation navData = {d} />
        <Bins binsData = {this.state.PutBackStateData} />
      </div> 
     
    )
  }
});

module.exports = Operator;