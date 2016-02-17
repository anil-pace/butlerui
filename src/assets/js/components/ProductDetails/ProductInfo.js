var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var PopUp = require('./PopUp');
var Modal = require('../Modal/Modal');
var mainstore = require('../../stores/mainstore');
var allresourceConstants = require('../../constants/resourceConstants');


function getPopUpState(){
  return {        
        popupVisible : mainstore.getPopUpVisible()
  };
}
var product_info_locale = {};
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
  displayLocale : function(data){
    product_info_locale = {};
    var language_locale = sessionStorage.getItem('localeData');
    var locale;
    if(language_locale == 'null' || language_locale == null){
      locale = 'en-US';
    }else{
      locale = JSON.parse(language_locale)["data"]["locale"]; 
    } 
    data.map(function(value, index){
      var keyValue;
      for (var key in value[0]) {
        if(key != 'display_data'){
          keyValue = value[0][key];
        }
      }
      value[0].display_data.map(
        function(data_locale, index1){
         if(data_locale.locale == locale){
            product_info_locale[data_locale.display_name] = keyValue;
          }
        
        }

      )
      
    });
  },
  render: function(data){ 
    this.displayLocale(this.props.productDetails);
    return (       
            <div className="product-details-wrapper">
              <div className="img-container">
                  <img src={product_info_locale.product_local_image_url}  />
              </div>
              <div className="view-more-link" data-toggle="modal" data-target="#myModal" onClick={this.showModal.bind(this,product_info_locale,"product-detail")}>
                <span> {allresourceConstants.VIEW_MORE} </span>                
                <i className="glyphicon glyphicon-info-sign"></i>
              </div>              
            </div>
    )
  }
});

module.exports = ProductInfo;