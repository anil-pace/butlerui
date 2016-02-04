var React = require('react');
var ImageComponent = React.createClass({
    render: function() {

        return (
           <div  className='column'>
                <img src={this.props.imageSrc} />
            </div>  
        )
    }
});

module.exports = ImageComponent;