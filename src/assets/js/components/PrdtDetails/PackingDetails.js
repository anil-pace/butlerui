var React = require('react');

var PackingDetails = React.createClass({
  
  render: function(data){ 
    var boxTypeInfo = this.props.boxTypeInfo||"";
    if(boxTypeInfo.length > 5){
      boxTypeInfo = boxTypeInfo.substr(-3);
    }else{
      boxTypeInfo=<span>&nbsp;</span>
    }

    return (
        <div className="packingBoxTableInfo">
            <div className="packingBoxImage">
               <img className="img-responsive" src={"./assets/images/packing_box.png"} />
            </div>
            <div className="detailsOuterWrapper">
                <div className="detailsInnerWrapper">
                  <span className="detailsDispName"> {_("Box Type: ")} </span>
                  <span className="detailsDispVal">{this.props.boxTypeInfo}</span>
                </div>
                <div className="detailsDispValShort">{boxTypeInfo}</div>
            </div>
        </div>
    );
  }

});

module.exports = PackingDetails;

