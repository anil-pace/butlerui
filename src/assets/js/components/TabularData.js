var React = require('react');
var TableRow = require('./TableRow');
var TableHeader = require('./TableHeader');

var TabularData = React.createClass({ 
    _tableRows:[],
    getTableRows:function(){
    	var comp =[];
    	this.props.data.tableRows.map(function(value,index){
    		comp.push((<TableRow data={value} />));
    	})
    	this._tableRows = comp;
    },
    render: function() {
    	this.getTableRows();
        return (
            <div className="tabular-data">
                <TableHeader data={this.props.data.header}/>
                {this._tableRows}
      		</div>
        );
    },
});

module.exports = TabularData;