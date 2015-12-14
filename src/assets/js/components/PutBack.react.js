
var React = require('react');
var PutBackStore = require('../stores/PutBackStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Bins = require("./Bins/Bins.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var appConstants = require('../constants/appConstants');

var _componentBin, _componentWrapper,_component;
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
  getScreenId : function(screen_id){console.log(screen_id);
    switch(screen_id){
      case appConstants.PUT_BACK_STAGE:
          _component = (
              <div className='grid-container'>
                <div className='main-container'>
                    <Bins binsData={this.state.PutBackStateData}/>
                </div>
                <div className = 'staging-action' >
                  <Button1 disabled = {false} text = {"Stage"}/>
                  <Button1 disabled = {true} text = {"Stage All"}/>  
                </div>
              </div>
            );
        break;
      case appConstants.PUT_BACK_SCAN:
          _component = (
              <div className='grid-container'>
                <div className='main-container'>
                    <Bins binsData={this.state.PutBackStateData}/>
                    <Wrapper />
                </div>
              </div>
            );
        break;
      default:
        return true; 
    }
  },
  render: function(data){ 
    this.getScreenId(this.state.PutBackStateData.screen_id);
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
        <Navigation navData ={d}/>
        {_component}
      </div> 
     
    )
  }
});

module.exports = Operator;