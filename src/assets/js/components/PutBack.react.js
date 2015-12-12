
var React = require('react');
var PutBackStore = require('../stores/PutBackStore');
var Header = require('./Header');
var Navigation = require("./Navigation/Navigation.react");
var Bins = require("./Bins/Bins.react");
var KQ = require('./ProductDetails/KQ');
var ProductInfo = require('./ProductDetails/ProductInfo');
var PopUp = require('./ProductDetails/PopUp');
var appConstants = require('../constants/appConstants');

var _componentBin, _componentProduct, _componentKQ;
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
          _componentBin = <Bins binsData={this.state.PutBackStateData}/>;
          _componentProduct = <ProductInfo />;
        break;
      case appConstants.PUT_BACK_SCAN:
          _componentBin = <Bins binsData={this.state.PutBackStateData}/>;
          _componentProduct = <ProductInfo />;
          _componentKQ = <KQ />
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
        <div className='grid-container'>
          {_componentBin}
          {_componentProduct}
          {_componentKQ}
          
        </div>
      </div> 
     
    )
  }
});

module.exports = Operator;