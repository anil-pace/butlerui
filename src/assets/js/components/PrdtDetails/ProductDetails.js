var React = require('react');

var ProductInfo = require('./ProductInfo');
var ProductImage = require('./ProductImage');

var product_info_locale = {};
var ProductDetails = React.createClass({

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
            if(key != 'display_data' && key != 'product_local_image_url' ){
              keyValue = value[0][key] + ' ';
             }
          }
          value[0].display_data.map(
            function(data_locale, index1){
             if(data_locale.locale == locale){
                if(data_locale.display_name != 'product_local_image_url' ){
                  product_info_locale[data_locale.display_name] = keyValue;
                }
              }
            
            }

          )
          
        });
      
    },
    render: function() {
        this.displayLocale(this.props.productInfo);
        return (
            <div className="productTableInfo">
				<ProductImage srcURL={this.props.productInfo.product_local_image_url}/>
                <div className="productHeader">
                    {_("Details")}
                </div>
                <ProductInfo infoDetails = {product_info_locale} />
			</div>
        );
    }
});

module.exports = ProductDetails;
