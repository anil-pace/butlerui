var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');

var Button1 = React.createClass({
    performAction:function(module,action){
        switch(module){
            case appConstants.PUT_BACK:
                switch(action){
                    case appConstants.STAGE_ONE_BIN: console.log(action);
                        ActionCreators.stageOneBin();
                        break;
                    case appConstants.STAGE_ALL:
                        ActionCreators.stageAllBins();
                        break;
                    case appConstants.CANCEL_SCAN:
                        ActionCreators.cancelScan(this.props.barcode);
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
                <a className={this.props.color == "orange"? "custom-button orange" : "custom-button black"} onClick={this.performAction.bind(this,this.props.module,this.props.action)}>{this.props.text}</a>
            );        
        else
            return (
                <a className={this.props.color == "orange"? "custom-button disabled orange" : "custom-button disabled black"}>{this.props.text}</a>
            );        
    }
});

module.exports = Button1;