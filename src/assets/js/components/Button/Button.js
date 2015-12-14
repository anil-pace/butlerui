var React = require('react');
var ActionCreators = require('../../actions/CommonActions');

var Button1 = React.createClass({
    render: function() {
        if(this.props.disabled == false)
            return (
                <a className="custom-button active">{this.props.text}</a>
            );        
        else
            return (
                <a className="custom-button disabled">{this.props.text}</a>
            );        
    }
});

module.exports = Button1;