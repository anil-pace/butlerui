var React = require('react');
var utils  = require('../utils/utils.js');

var CheckList = React.createClass({

    getTableRows:function(){
        var checklistData = this.props.checklistData;
        var checklistIndex = this.props.checklistIndex;
        var eachRow = [];
        var dataToDisplay = ""; var iconToDisplay = ""; var applyClass = "boldText"; var localeInd=0;
        if(checklistData){
            var selectedLocale=utils.getCurrentLang();
            checklistData.map(function(key, index) {
                if(checklistData[index]["action_parameters"]){
                let findOutLocale=(checklistData[index]["action_parameters"]["display_data"]).map(function(keyArray,indexValue){
                    if(keyArray.locale===selectedLocale) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                        localeInd= indexValue;
                    }
                })
            }

                if(index === parseInt(checklistIndex, 10)){ 
                     dataToDisplay = checklistData[index]["action_results"] && checklistData[index]["action_results"]["value"]?checklistData[index]["action_results"]["value"]:""
                     if(checklistData[index]["action_results"] && checklistData[index]["action_results"]["errors"] && checklistData[index]["action_results"]["errors"] !== null) /* error is present */{
                        iconToDisplay = <img className="img-responsive" src="assets/images/error_checklist.png"/>;
                    }
                    else{
                        iconToDisplay = <img className="img-responsive" src="assets/images/current_checklist.png"/>;
                    }
                }
                else if(index < parseInt(checklistIndex, 10)){
                    if(checklistData[index]["action_results"] && checklistData[index]["action_results"]["errors"] && checklistData[index]["action_results"]["errors"] !== null) /* error is present */{
                        dataToDisplay = "";
                        iconToDisplay = <img className="img-responsive" src="assets/images/error_checklist.png"/>;
                    }
                    else{
                        dataToDisplay =  checklistData[index]["action_results"]["value"];
                        iconToDisplay = <img className="img-responsive" src="assets/images/done_checklist.png"/>;
                    }
                }
                else{
                    dataToDisplay=checklistData[index]["action_results"] && checklistData[index]["action_results"]["value"]?checklistData[index]["action_results"]["value"]:"";
                    iconToDisplay = <img className="img-responsive" src="assets/images/toBeDone_checklist.png"/>;
                    applyClass = "greyText";
                }
                eachRow.push(
                    <tr>
                        <td className={applyClass}> {checklistData[index]["action_parameters"]?checklistData[index]["action_parameters"]["display_data"][localeInd].display_name+": " + dataToDisplay:dataToDisplay} </td>
                        <td className="value"> {iconToDisplay} </td>
                    </tr>
                );
            });
            return eachRow;
        }
    },

    render: function() {
        var tableData = this.getTableRows();
        return (
            <div className="table-wrapper-checklist">
                <table className="table">                 
                  <tbody>
                    {tableData}
                  </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CheckList;