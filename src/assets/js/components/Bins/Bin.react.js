var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var Modal = require('../Modal/Modal');

var Bin = React.createClass({

    _toggleBinSelection:function(bin_id,e){
        ActionCreators.toggleBinSelection(bin_id);
        e.stopPropagation();
        return false;
    },
    pressPptl : function(bin_id, binState){
        var data  ={
            'bin_id' : bin_id,
            'bin_state' : binState
        };
        ActionCreators.pptlPress(data);
    },
    showModal: function(data,type,e) {
         ActionCreators.showModal({
            data:data,
            type:type
         });
         $('.modal').modal();
         e.stopPropagation();
         return false;
     },
   
    render: function() {
        var compData = this.props.binData;
        console.log("ashu" + this.props.screenId);
        if(compData.ppsbin_state == "staged" )
            return (
                <div className = "bin staged" >
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && (compData["selected_for_staging"]!=undefined && compData["selected_for_staging"] == true ) && this.props.screenId == "put_back_stage")
            return (
                <div className = "bin use selected-staging" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );

        else if((compData.selected_state == true || compData.selected_state == "true") && (this.props.screenId == "put_back_scan" || this.props.screenId == "put_front_scan_stage"))
            return (
                <div className = "bin selected">
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected" onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}>{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && this.props.screenId == "put_back_stage" )
            return (
                <div className = "bin use" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                    </span>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && (this.props.screenId == "put_back_scan" || this.props.screenId == "put_front_scan_stage") )
            return (
                <div className = "bin use" >
                   <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")}  >
                    </span>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
    	else if(compData.ppsbin_count == 0)
            return (
                <div className = "bin empty">
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        
    }
});

module.exports = Bin;