var React = require('react');

var TableRow = React.createClass({ 
	_component:[],
    getComponent:function(){
    	var comp = [];
    	this.props.data.cols.map(function(value,index){
    		var classes = "table-col ";
    		var border = value.border == true ? classes = classes + "border-left " : "";
    		var grow = value.grow == true ? classes = classes + "flex-grow ":"";
    		var selected = value.selected == true ? classes = classes + "selected ":"";
    		var large = value.size == "large" ? classes = classes + "large ":"small";
    		var bold = value.bold == true ? classes = classes + "bold ":"";
    		comp.push((<div className={classes}>{value.text}</div>));
    	});
    	this._component = comp;
    },
    render: function() {
    	this.getComponent();
        return (
            <div className="table-row">
               {this._component}
      		</div>
        );
    },
});

module.exports = TableRow;