var React = require('react');
var mainstore = require('../../stores/mainstore');
var CommonActions = require('../../actions/CommonActions');
var PopUp = require('./PopUp');

function getPopUpState(){
  return {        
        popupVisible : mainstore.getPopUpVisible()
        
      };
}
var ProductInfo = React.createClass({
  getInitialState: function(){
    return getPopUpState();
  },
  showPopUp: function(){
    if(this.state.popupVisible === false){
        CommonActions.updateCardVisible(true);
    }
    else 
      CommonActions.updateCardVisible(false);

  },
  componentWillMount: function(){
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState({
      popupVisible : mainstore.getPopUpVisible()
    });
  },
   showPopUp: function(){
    
    console.log("hello u therre" + this.state.popupVisible);
    if(this.state.popupVisible === false)
        CommonActions.updatePopupVisible(true);
    else 
      CommonActions.updatePopupVisible(false);
    
  },
  render: function(data){ 
    console.log(this.state.popupVisible);
    var d1 = 
        {
          "heading":"DETAILS",
          "img_src":"assets/images/logo.png",
          "product_name":"abc",
          "product_type":"active",
          "product_serial_no":"1234",
          "heading1":"DETAILS",
          "img_src1":"assets/images/nav2.png",
          "product_name1":"abc",
          "product_type1":"active",
          "product_serial_no1":"1234"         
        };
        
      
      return (       
        
           <div className="imgContainer">
             <img src={d1.img_src} />
             <div className="imgFooter" data-toggle="modal" data-target="#myModal" onClick={this.showPopUp}>
              <div className="popUpContainer">
                <PopUp popupVisible = {this.state.popupVisible} popupData = {d1} />
              </div>
                <span> View More </span>                
                <span className="glyphicon glyphicon-info-sign"></span>
             </div>
             
            </div>
    )
  }
});

module.exports = ProductInfo;