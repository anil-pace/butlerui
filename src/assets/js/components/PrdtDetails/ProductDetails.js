var React = require('react');

var ProductInfo = require('./ProductInfo');
var ProductImage = require('./ProductImage');

var product_info_locale = {};
var image_url = {};
var ProductDetails = React.createClass({

    displayLocale : function(data){
        product_info_locale = {};
        image_url = {};
        var language_locale = sessionStorage.getItem('localeData');
        var locale;
        if(language_locale == 'null' || language_locale == null){
          locale = 'en-US';
        }else{
          locale = JSON.parse(language_locale)["data"]["locale"]; 
        }
        data.map(function(value, index){
          var keyValue ="";
          var imageKey;
          for (var key in value[0]) { 
            if (key === "product_dimensions") {
              var dimension = value[0][key];
              for (var i = 0; i < dimension.length; i++) {
                if(i === 0) {
                  keyValue = dimension[i] + "";
                }
                else {
                  keyValue = keyValue + " X " + dimension[i]
                }
              }
              
            }
            else if(key != 'display_data' && key != 'product_local_image_url' ){
              keyValue = value[0][key] + ' ';
             }else if(key != 'display_data' && key == 'product_local_image_url' ){
              imageKey = value[0][key];
             }
          }
          value[0].display_data.map(
            function(data_locale, index1){
             if(data_locale.locale == locale){
                if(data_locale.display_name != 'product_local_image_url' ){
                  product_info_locale[data_locale.display_name] = keyValue;
                }
              }
              if(data_locale.display_name == 'product_local_image_url' ){
                  if(imageKey === "outer_each" || imageKey === "inner_each" || imageKey === "outer_inner"){
                    image_url[data_locale.display_name] = "assets/images/" + imageKey + ".gif";
                  }
                  else if(imageKey === "outer" || imageKey === "inner"){
                    image_url[data_locale.display_name] = "assets/images/" + imageKey + ".png";
                  }
                  else
                    image_url[data_locale.display_name] = imageKey;
              }
            
            }

          )
          
        });
      
    },
    displayCode:function(data){
      var language_locale = sessionStorage.getItem('localeData');
      var locale;
      if(language_locale == 'null' || language_locale == null){
        locale = 'en-US';
      }else{
        locale = JSON.parse(language_locale)["data"]["locale"]; 
      }
      var code=[];
     data.map(function(value,index){
       var obj={};
      var arrKeyNames=Object.keys(value[0]);
      if(arrKeyNames.indexOf("product_barcodes")>-1){
        arrKeyNames.map(function(eachValueName,index){
          value[0][eachValueName].map(function(nestedName,index){
          if((value[0][eachValueName]).constructor!=="Array"){obj.displayvalue=nestedName}
          if(nestedName.locale==locale){
            obj.displayName=nestedName.display_name;
          }
          })
         
          })
          code.push(obj);
      }
     })
     return code;
    },
    render: function() {
      var flag=this.props.QLCodeDetails;
      var barcodeArr=this.displayCode(this.props.productInfo);
       this.displayLocale(this.props.productInfo);

        return (
            <div className={flag?"productTableInfo qlDetails":"productTableInfo"}>
				<ProductImage srcURL={image_url.product_local_image_url}/>        
{flag?(
  <div className="detailsOuterWrapper">
  <div className="detailsInnerWrapper">
   <span className="detailsDispName">{barcodeArr[0].displayName}</span>
   <span className="detailsDispVal">{barcodeArr[0].displayvalue}</span>
   </div>
   <div className="detailsDispValShort"><span>{(barcodeArr[0].displayvalue).substr((barcodeArr[0].displayvalue.length)-3)}</span></div>
    </div>
):(
  <div>
<div className="productHeader">
{_("Details")}
</div>
<ProductInfo infoDetails = {product_info_locale} flag="codeDetails"/>
</div>
)
}
                
			</div>
        );
    }
});

module.exports = ProductDetails;
