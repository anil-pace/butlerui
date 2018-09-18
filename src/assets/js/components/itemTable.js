var React = require('react');

var ItemTable = React.createClass({ 
    _tableRows:[],noofCOlumn:0,
    headerName:['Event','Expectation Id','Item Location','UOM Details','Quantity'],
    //rowconfig:this.props.rowconfig||[],
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
            this.noofCOlumn= Object.keys(data[i]).length;
            var tableData=[],locationCell=[],UOMCell=[],childData=data[i].UOM;
            tableData.push(<div className="outerCell" style={rowconfig[0]}><div  className="itemCell cellData">{data[i].eventName}</div></div>);
            var expectationKeys=Object.keys(data[i].expectation)
            tableData.push(<div className="outerCell" style={rowconfig[1]}><div  className="itemCell"><div className="cellHeader">{expectationKeys}</div><div className="cellData">{data[i].expectation[expectationKeys[0]]}</div></div></div>);
            data[i].location.forEach(function(x,i){
                if(i>0){locationCell.push(<span className="itemSeparator">{">"}</span>)}
                locationCell.push(<span className="cellData">{x}</span>)
                })
                tableData.push(<div className="outerCell" style={rowconfig[2]} ><div className="itemCell">{locationCell}</div></div>)

                while(childData.hasOwnProperty('child')){
                   DataItem=childData.child;
                  
                    UOMCell.push(<div className="itemCell"><div className="cellHeader">{DataItem.childId}</div><div className="cellData">{DataItem.childValue}</div></div>)
                    
                    childData=childData.child;
                    childData.hasOwnProperty('child')?UOMCell.push(<span className="itemSeparator">{">"}</span>):""
            }
            // data[i].UOM.forEach(function(datum){
            //         UOMCell.push(<div className=""><span className="">{Object.keys(datum)}</span><span className="">{datum[Object.keys(datum)]}</span></div>)
            // })
            tableData.push(<div className="outerCell" style={rowconfig[3]} ><div className="longCell">{UOMCell}</div></div>);
            tableData.push(<div className="outerCell" style={rowconfig[4]} ><span className="itemCell cellData">{data[i].quantity}</span></div>);
            rowData.push(<div className="rowData">{tableData}</div>);
        }
        return rowData;
    },

    render: function() {

        var rowDataItem=this.getTableRows(this.props.data,this.props.rowconfig);
        var headerDataItem=this.getTableHeaders(this.props.data,this.props.rowconfig);

        // var size = this.props.size=="double"?classes = classes + "double ":"";
        // var size = this.props.size=="triple"?classes = classes + "triple ":"";
        return ( 
            <div>
                {headerDataItem}
                <div>
                    {rowDataItem}
      		    </div>
                  </div>
        );
    },
});

module.exports = ItemTable;