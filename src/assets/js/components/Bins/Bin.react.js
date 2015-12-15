var React = require('react');
var ActionCreators = require('../../actions/CommonActions');

var Bin = React.createClass({
    _toggleBinSelection:function(bin_id){
        ActionCreators.toggleBinSelection(bin_id);
    },
   
    render: function() {
        var compData = this.props.binData;
    	if(compData.bin_info.length > 0 && compData.selected_state == false )
    		return (
                <div className = "bin use" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
    	else if(compData.bin_info.length == 0)
            return (
                <div className = "bin empty">
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.bin_info.length > 0 && compData.selected_state == true)
            return (
                <div className = "bin use selected" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
    }
});

module.exports = Bin;