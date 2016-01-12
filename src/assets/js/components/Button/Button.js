var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');

var Button1 = React.createClass({
    _checklistClass : '',
    performAction:function(module,action){
        switch(module){
            case appConstants.PUT_BACK:
                switch(action){
                    case appConstants.STAGE_ONE_BIN: 
                        ActionCreators.stageOneBin();
                        break;
                    case appConstants.STAGE_ALL:
                        ActionCreators.stageAllBins();
                        break;
                    case appConstants.CANCEL_SCAN:
                        ActionCreators.cancelScan(this.props.barcode);
                        break;
                    case appConstants.CANCEL_TOTE:
                    case appConstants.CLOSE_TOTE:
                        var data = {
                            "close_value" : this.props.status,
                            "toteId" : this.props.toteId
                        }
                        console.log(data);
                        ActionCreators.toteAction(data);
                        break;            
                     default:
                        return true; 
                }
            break;
            case appConstants.PUT_FRONT:
                switch(action){
                    case appConstants.CANCEL_SCAN:
                        ActionCreators.cancelScan(this.props.barcode);
                        break;    
                     default:
                        return true; 
                }
            break;
            case appConstants.PICK_FRONT:
                switch(action){
                    case appConstants.CANCEL_SCAN:
                        ActionCreators.cancelScanAll();
                        break;   
                    case appConstants.CHECKLIST_SUBMIT:
                        var checklist_index = this.props.checkListData.checklist_index;
                        var checkList = this.props.checkListData;
                        checkList.checklist_data.map(function(data, index){
                            if(checkList.checklist_index != null){
                                if(index === checkList.checklist_index - 1){
                                    var keyvalue = Object.keys(data);
                                    checkList.checklist_data[index][keyvalue]["value"] = document.getElementById("checklist_field"+index).value;
                                }
                            }else{
                                var keyvalue = Object.keys(data);
                                checkList.checklist_data[index][keyvalue]["value"] = document.getElementById("checklist_field"+index).value;
                            }   
                        
                        });
                       ActionCreators.checkListSubmit(checkList);
                        break;       
                     default:
                        return true; 
                }
            break;
            case appConstants.PICK_BACK:
                switch(action){
                    case appConstants.CANCEL_SCAN:
                        ActionCreators.cancelScan(this.props.barcode);
                        break;    
                     default:
                        return true; 
                }
            break;
            case appConstants.AUDIT:
                switch(action){
                    case appConstants.CANCEL_SCAN:
                        ActionCreators.cancelScanAll();
                        break;    
                    case appConstants.GENERATE_REPORT:
                        ActionCreators.generateReport();
                        break;    
                     case appConstants.CANCEL_FINISH_AUDIT:
                        ActionCreators.cancelFinishAudit();
                        break;   
                     case appConstants.FINISH_CURRENT_AUDIT:
                        ActionCreators.finishCurrentAudit();
                        break;   
                     default:
                        return true; 
                }
            break;

             default:
                return true; 
        }
    },
    render: function() { console.log(this.props.checkListData);
       if(this.props.buttonChecklist != undefined){
            _checklistClass = 'checklistButtonSubmit';
       }else{
            _checklistClass = '';
       }
        if(this.props.disabled == false)
            return (
                <a className={this.props.color == "orange"? "custom-button orange "+_checklistClass : "custom-button black "+_checklistClass}  onClick={this.performAction.bind(this,this.props.module,this.props.action)}>{this.props.text}</a>
            );        
        else
            return (
                <a className={this.props.color == "orange"? "custom-button disabled orange" : "custom-button disabled black"}>{this.props.text}</a>
            );        
    }
});

module.exports = Button1;