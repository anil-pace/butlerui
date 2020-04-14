var React = require('react');
var ProductImage = require("../PrdtDetails/ProductImage")

var ProductInfo = React.createClass({
    render: function() {
        var infoDetails = this.props.infoDetails;
        var imageurl = this.props.imageurl;
        var arr1 = [];
        $.each(infoDetails, function(key, value) {
            if(key === "QlcodeDigits"){
                arr1.push(
                    <div className="detailsOuterWrapper">
                     <span className="detailsDispValShort">{value}</span> 
                     </div>
                     );
            }
            else if(key !== 'QlcodeDigits'){
                arr1.push(
                    <div className="detailsOuterWrapper">
                    <div className="detailsInnerWrapper">
                     <span className="detailsDispName"> {key + ':'} </span>
                      <span className="detailsDispVal">{value}</span>
                    </div>
                    </div>
    
                );
            }   
            return  arr1
        });

        return (
            <div className="packingBoxTableInfo" style={{width: "480px",
                height: "370px",
                marginLeft: "18%", display:"block"}}>
            <div className="packingBoxImage">
            <ProductImage srcURL={imageurl} />
            </div>
            {arr1}
        </div>
        );
    }
});

module.exports = ProductInfo;
