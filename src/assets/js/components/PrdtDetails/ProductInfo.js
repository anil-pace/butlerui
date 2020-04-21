var React = require('react');
var ProductImage = require("../PrdtDetails/ProductImage")

var ProductInfo = React.createClass({
    render: function() {
        var infoDetails = this.props.infoDetails;
        var imageurl = this.props.hasOwnProperty('imageurl') ? this.props.imageurl : '-';
        var PutContainerFlag = this.props.putContainerFlag;
        var arr1 = [];
        $.each(infoDetails, function(key, value) {
            if(key === "QlcodeDigits" && value !== '' && PutContainerFlag === true){
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
                height: "549px",
                marginLeft: "18%", display:"block"}}>
                    {imageurl !== '-' ? 
            <div className="packingBoxImage">
            <ProductImage srcURL={imageurl} />
            </div> : ''}
            {arr1}
        </div>
        );
    }
});

module.exports = ProductInfo;
