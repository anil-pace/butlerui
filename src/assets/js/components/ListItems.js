var React = require('react');
var ImageComponent = require('./ImageComponent.js');
var PriceComponent = require('./PriceComponent.js');
var Description = require('./Description.js');


var ListItems = React.createClass({
    render: function() {
        var tableStructure = this.props.ListItems.map(function(data, index){ 
              return(
                <div className="row">
                  <div className="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10">
                      <div className="listItems">
                         <div className="row">
                              <div className="ItemContainer">
                                <div className="col-md-12">
                                  <div className="col-md-3 col-sm-4 col-xs-6">
                                    <ImageComponent />
                                  </div>
                                  <div className="col-md-3 col-sm-2 col-xs-6">
                                      <PriceComponent />
                                  </div>
                                  <div className="col-md-6 col-sm-6 col-xs-12">
                                    <Description />
                                  </div>
                                </div>
                              </div>
                         </div>
                      </div>
                    </div>
                  </div>
            );
          });
        return (
            <div className='bins'>
                {tableStructure}
            </div>    
        )
    }
});

module.exports = ListItems;