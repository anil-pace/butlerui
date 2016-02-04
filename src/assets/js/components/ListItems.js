var React = require('react');
var ImageComponent = require('./ImageComponent'); 
var PriceCommponent = require('./PriceCommponent');
var Description = require('./Description');


var ListItems = React.createClass({
    render: function() {
        var tableStructure = this.props.ListItems.map(function(data, index){ 
              return(
                <div  className='row'>
                    <ImageComponent imageSrc={data.img}/>
                    <PriceCommponent title={data.title} price={data.price} />
                    <Description description={data.description} />  
                </div>    
              )
          });
        return (
            <div className='bins'>
                {tableStructure}
            </div>    
        )
    }
});

module.exports = ListItems;