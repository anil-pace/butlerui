var React = require('react');

var PackingDetails = React.createClass({
  
  render: function(data){ 
    var boxTypeInfo = this.props.boxTypeInfo;
    if(this.props.boxTypeInfo.length > 6){
      boxTypeInfo = boxTypeInfo.substr(-3);
    };

    return (
        <div className="productTableInfoXPO">
            <div className="productImageXPO">
               <img className="img-responsive" src={"./assets/images/packing_box.png"} />
            </div>
            <div className="detailsouterWrapper">
                <div className="detailsinnerWrapper">
                  <span className="detailsDispName"> {_("Box Type: ")} </span>
                  <span className="detailsDispVal">{boxTypeInfo}</span>
                </div>
                <div className="detailsDispValShort">{boxTypeInfo}</div>
            </div>
        </div>
    );
  }

});

module.exports = PackingDetails;

