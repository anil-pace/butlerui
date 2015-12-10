var React = require('react');

var Bin = React.createClass({
    _selectBin:function(){
        console.log("ashish");
    },
    render: function() {
        var compData = this.props.binData;
    	if(compData.ppsbin_state == "IN USE")
    		return (
                <div className = "bin use" onClick={this._selectBin}>
                    <div className ="item-count">{compData.all_items.length}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
    	else if(compData.ppsbin_state == "empty")
            return (
                <div className = "bin empty">
                    <div className ="item-count">{compData.all_items.length}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_state == "selected")
            return (
                <div className = "bin use selected">
                    <div className ="item-count">{compData.all_items.length}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
    }
});

module.exports = Bin;