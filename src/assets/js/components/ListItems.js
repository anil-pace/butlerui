var React = require('react');

var ListItems = React.createClass({
    render: function() {
        var tableStructure = this.props.ListItems.map(function(data, index){ 
              return(
                <div  className='row'>
                    <div  className='column'>
                        <img src={data.img} />
                    </div>
                    <div  className='column'>
                        <h1> Test </h1>
                        <h1> 1$ </h1>
                    </div>
                    <div  className='column'>
                        <p> test t1usshshshs </p>
                    </div>    
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