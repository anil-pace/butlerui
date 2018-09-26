var React = require('react');

var ItemTable = React.createClass({ 
    _tableRows:[],noofCOlumn:0,
    headerName:[_("Event"),_("Expectation Id"),_("Item Location"),_("UOM Details"),_("Quantity")],
    getTableHeaders:function(data,rowconfig){
        var headerData =[];
        for(var i=0;i<this.noofCOlumn;i++){
        var headerCellData =[];
        headerData.push(<div style={rowconfig[i]} className="itemCell headerCell"><span>{this.headerName[i]}</span></div>)
        }
        return headerData;
    },
    getTableRows:function(data,rowconfig){
        var rowconfig=rowconfig||[];
    	var rowData =[];
    	for(var i=0;i<data.length;i++){
            let location=data[i].location||[];
            this.noofCOlumn= Object.keys(data[i]).length;
            var tableData=[],locationCell=[],UOMCell=[],childData=data[i].uom;
            tableData.push(data[i].eventType?<div className="outerCell" style={rowconfig[0]}><div  className="itemCell cellData">{data[i].eventType}</div></div>:<div className="outerCell" style={rowconfig[0]}><div  className="itemCell">{"--"}</div></div>);
            var expectationKeys=data[i].requestId;
            tableData.push(expectationKeys?<div className="outerCell" style={rowconfig[1]}><div  className="itemCell"><div className="cellHeader">{expectationKeys.label}{":"}</div><div className="cellData">{expectationKeys.value}</div></div></div>:<div className="outerCell" style={rowconfig[1]}><div  className="itemCell"><div className="cellData">{"--"}</div></div></div>);
            location.length?data[i].location.forEach(function(x,i){
                if(i>0){locationCell.push(<span className="itemSeparator">{">"}</span>)}
                locationCell.push(<span className="cellData">{x}</span>)
                }):locationCell.push(<span className="cellData">{"--"}</span>);
                tableData.push(<div className="outerCell" style={rowconfig[2]} ><div className="itemCell">{locationCell}</div></div>)
                if(childData)
                while(childData.hasOwnProperty('child')){
                   DataItem=childData.child;
                    UOMCell.push(<div className="itemCell"><div className="cellHeader">{DataItem.childLabel}{":"}</div><div className="cellData">{DataItem.childValue}</div></div>)
                    childData=childData.child;
                    childData.hasOwnProperty('child')?UOMCell.push(<span className="itemSeparator">{">"}</span>):""
            }
            else{
                UOMCell.push(<div className="itemCell"><div className="cellData">{"--"}</div></div>)
            }

            tableData.push(<div className="outerCell" style={rowconfig[3]} ><div className="longCell">{UOMCell}</div></div>);
            tableData.push(data[i].quantity?<div className="outerCell" style={rowconfig[4]} ><span className="itemCell cellData">{data[i].quantity}</span></div>:<div className="outerCell" style={rowconfig[4]} ><span className="itemCell cellData">{"--"}</span></div>);
            rowData.push(<div className="rowData">{tableData}</div>);
        }
        return rowData;
    },

    render: function() {
        var tableData=this.props.data||[];
        var rowDataItem=this.getTableRows(tableData,this.props.rowconfig);
        var headerDataItem=this.getTableHeaders(tableData,this.props.rowconfig);
return ( 
            <div>
            {tableData.length>0?
            <div>
                {headerDataItem}
                <div>
                    {rowDataItem}
      		    </div>
                  </div>:<div className="itemNotFound">{_("NO ITEM FOUND")}</div>
            }
            </div>
        );
    },
});

module.exports = ItemTable;