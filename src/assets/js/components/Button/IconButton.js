var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');

var IconButton = React.createClass({
    performAction:function(module,action){
        switch(module){
            case appConstants.AUDIT:
            break;
             default:
                return true; 
        }
    },
    render: function() { 
        if(this.props.disabled == false)
            return (
                <a className={this.props.color == "orange"? "custom-button orange" : "custom-button black"} onClick={this.performAction.bind(this,this.props.module,this.props.action)}>{this.props.text}</a>
            );        
        else
            return (
                <a className={this.props.color == "orange"? "custom-button disabled orange" : "custom-button disabled black"}>{this.props.text}</a>
            );        
    }
});

module.exports = IconButton;