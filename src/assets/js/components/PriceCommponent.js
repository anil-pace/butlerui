var React = require('react');
var PriceCommponent = React.createClass({
    render: function() {

        return (
           <div  className='column'>
                <h1> {this.props.title} </h1>
                <h1>{this.props.price} </h1>
            </div> 
        )
    }
});

module.exports = PriceCommponent;  