var React = require('react');
var Description = React.createClass({
    render: function() {

        return (
           <div  className='column'>
                <p>{this.props.description}</p>
            </div> 
        )
    }
});

module.exports = Description;  