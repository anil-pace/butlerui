var React = require('react');
var ImageComponent = require('./ImageComponent.js');
var PriceComponent = require('./PriceComponent.js');
var Description = require('./Description.js');


var ListItems = React.createClass({
    render: function() {
       var imageClickable = this.props.imageClickable;
        var tableStructure = this.props.ListItems.map(function(data, index){ 
              return(
                <div className="row">
                  <div className="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10">
                      <div className="listItems">
                         <div className="row itemContainer"> 
                                  <div className="col-md-3 col-sm-4 col-xs-6">
                                    <ImageComponent data={data} imageClickable={imageClickable} />
                                  </div>
                                  <div className="col-md-3 col-sm-2 col-xs-6">
                                      <PriceComponent data={data} />
                                  </div>
                                  <div className="col-md-6 col-sm-6 xs-hidden">
                                    <Description data={data} />
                                  </div>
                              
                         </div>
                      </div>
                    </div>
                  </div>
            );
          });
        return (
            <div className='listItemContainer'>
                {tableStructure}
            </div>    
        )
    },
});

module.exports = ListItems;