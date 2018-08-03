var React = require('react');

var CheckList = React.createClass({

    getTableRows:function(){
        var checklistData = this.props.checklistData;
        var checklistIndex = this.props.checklistIndex;
        var eachRow = [];
        var dataToDisplay = ""; var iconToDisplay = ""; var applyClass = "boldText"; 
        if(checklistData && checklistIndex){
            checklistData.map(function(key, value) {
                if(key === parseInt(checklistIndex, 10)){ /* checklistData[key]["action_results"] === null */
                    iconToDisplay = <img className="img-responsive" src="assets/images/current_checklist.png"/>;
                }
                else if(key < parseInt(checklistIndex,10)){
                    dataToDisplay = ": " + checklistData[key]["action_results"]["value"];
                    iconToDisplay = <img className="img-responsive" src="assets/images/done_checklist.png"/>;
                }
                else{
                    iconToDisplay = <img className="img-responsive" src="assets/images/toBeDone_checklist.png"/>;
                    applyClass = "greyText";
                }
                eachRow.push(
                    <tr>
                        <td className={applyClass}> {checklistData[key]["action_parameters"]["key"] + dataToDisplay} </td>
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
