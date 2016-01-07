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
            return (
                <div className="success-icon" onClick={this.performAction.bind(this,this.props.module,this.props.action)}>
                        <div className="border-glyp">
                            <span className="glyphicon glyphicon-ok"></span>
                        </div>
                </div>
            );           
    }
});

module.exports = IconButton;