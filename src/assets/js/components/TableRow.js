var React = require('react');

var TableRow = React.createClass({ 
	_component:[],
    getComponent:function(){
    	var comp = [];
    	this.props.data.map(function(value,index){
    		var classes = "table-col ";
    		var border = value.border == true ? classes = classes + "border-left " : "";
    		var grow = value.grow == true ? classes = classes + "flex-grow ":"";
    		var selected = value.selected == true ? classes = classes + "selected ":"";
    		var large = value.size == "large" ? classes = classes + "large ":classes = classes + "small ";
    		var bold = value.bold == true ? classes = classes + "bold ":"";
    		var disabled = value.disabled == true ? classes = classes + "disabled ":"";
    		var center = value.centerAlign == true ? classes = classes + "center-align ":"";
            var complete = value.status == "complete" ? classes = classes + "complete ":"";
            var missing = value.status == "missing" ? classes = classes + "missing ":"";
            var extra = value.status == "extra" ? classes = classes + "extra ":"";
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