var React = require('react');

var ProductInfo = React.createClass({
    render: function() {
        var infoDetails = this.props.infoDetails;
        var arr1 = [];
        $.each(infoDetails, function(key, value) {
            if(key === "QlcodeDigits"){
                arr1.push(
                    <div className="detailsOuterWrapper">
                    <div className="detailsInnerWrapper">
                     <span className="detailsDispValShort">{value}</span> 
                     </div>
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
            <div className="packingBoxTableInfo">
            <div className="packingBoxImage">
               <img className="img-responsive" src={"./assets/images/packing_box.png"} />
            </div>
            {arr1}
        </div>
        );
    }
});

module.exports = ProductInfo;
