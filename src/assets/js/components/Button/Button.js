var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');

var Button1 = React.createClass({
    performAction:function(module,action){
        switch(action){
             case appConstants.PUT_BACK:
                switch(action){
                     case appConstants.STAGE_ONE_BIN:
                        ActionCreators.stageOneBin();
                        break;
                     case appConstants.STAGE_ALL:
                        ActionCreators.stageAllBins();
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
        if(this.props.disabled == false)
            return (
                <a className="custom-button active" onClick={this.performAction.bind(this,this.props.module,this.props.action)}>{this.props.text}</a>
            );        
        else
            return (
                <a className="custom-button disabled">{this.props.text}</a>
            );        
    }
});

module.exports = Button1;