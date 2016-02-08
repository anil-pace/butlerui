var React = require('react');

var ImageComponent = React.createClass({
    render: function() {
        return (
            <div className="itemImage">
           		<img className="img-responsive" src={this.props.imgURL} alt="PLACEHOLDER" />
           	</div>
        );
    }
});

module.exports = ImageComponent;