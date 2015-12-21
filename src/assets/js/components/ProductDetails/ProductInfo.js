var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var PopUp = require('./PopUp');
var Modal = require('../Modal/Modal');
var mainstore = require('../../stores/mainstore');


function getPopUpState(){
  return {        
        popupVisible : mainstore.getPopUpVisible()
  };
}
var ProductInfo = React.createClass({
  getInitialState: function(){
    return getPopUpState();
  },
  showModal: function(data,type) {
         CommonActions.showModal({
            data:data,
            type:type
         });
         $('.modal').modal();
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
    this.setState(getPopUpState());
  },
   showPopUp: function(){
    if(this.state.popupVisible === false)
        CommonActions.updatePopupVisible(true);
    else 
      CommonActions.updatePopupVisible(false);
    
  },
  render: function(data){ 
    console.log(this.state.popupVisible);
    return (       
            <div className="product-details-wrapper">
              <div className="img-container">
                  <img src={this.props.productDetails.product_local_image_url}  />
              </div>
              <div className="view-more-link" data-toggle="modal" data-target="#myModal" onClick={this.showModal.bind(this,this.props.productDetails,"product-detail")}>
                <span> View More </span>                
                <i className="glyphicon glyphicon-info-sign"></i>
              </div>              
            </div>
    )
  }
});

module.exports = ProductInfo;