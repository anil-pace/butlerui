var React = require('react');

var ItemTable = React.createClass({ 
    _tableRows:[],
    getTableRows:function(data){
    	var rowData =[];
    	for(var i=0;i<data.length;i++){
            var tableData=[],locationCell=[],UOMCell=[],childData=data[i].UOM;
            tableData.push(<span className="itemCell cellData">{data[i].eventName}</span>);
            var expectationKeys=Object.keys(data[i].expectation)
            tableData.push(<div className="itemCell"><div className="cellHeader">{expectationKeys}</div><div className="cellData">{data[i].expectation[expectationKeys[0]]}</div></div>);
            data[i].location.forEach(function(x){
                locationCell.push(<span className="cellData">{x}</span>)
                })
                tableData.push(<div className="itemCell">{locationCell}</div>)

                while(childData.hasOwnProperty('child')){
                   DataItem=childData.child;
                    UOMCell.push(<div className="itemCell"><div className="cellHeader">{DataItem.childId}</div><div className="cellData">{DataItem.childValue}</div></div>)
                    childData=childData.child;
            }
            // data[i].UOM.forEach(function(datum){
            //         UOMCell.push(<div className=""><span className="">{Object.keys(datum)}</span><span className="">{datum[Object.keys(datum)]}</span></div>)
            // })
            tableData.push(UOMCell);
            rowData.push(<div className="rowData">{tableData}</div>);
        }
        return rowData;
    },

    render: function() {

    	var rowDataItem=this.getTableRows(this.props.data);

        // var size = this.props.size=="double"?classes = classes + "double ":"";
        // var size = this.props.size=="triple"?classes = classes + "triple ":"";
        return (  
                <div>
                    {rowDataItem}
      		    </div>
        );
    },
});

module.exports = ItemTable;