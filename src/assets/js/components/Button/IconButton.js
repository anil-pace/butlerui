var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');

var IconButton = React.createClass({
    performAction:function(module,action){
        switch(module){
            case appConstants.AUDIT:
                switch(action){
                    case appConstants.FINISH_BOX:
                        ActionCreators.finishBox();
                        break;    
                     default:
                        return true; 
                }
            break;
             default:
                return true; 
        }
    },
    render: function() { 
            if(this.props.type == "finish")
                return (
                    <div className="success-icon" onClick={this.performAction.bind(this,this.props.module,this.props.action)}>
                        <div className="border-glyp">
                            <span className="glyphicon glyphicon-ok"></span>
                        </div>
                    </div>
                );
            else if(this.props.type == "edit")
                return (
                <div className="edit-icon" onClick={this.performAction.bind(this,this.props.module,this.props.action)}>
                        <div className="border-glyp">
                            <span className="glyphicon glyphicon-pencil"></span>
                        </div>
                </div>
            );              
    }
});

module.exports = IconButton;