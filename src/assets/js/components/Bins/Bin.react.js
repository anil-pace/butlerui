var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');
var PopUp = require('../ProductDetails/PopUp');

var Bin = React.createClass({

     getInitialState: function(){
        return {        
        popupVisible : mainstore.getPopUpVisible()
        };
    },

    _toggleBinSelection:function(bin_id){
        ActionCreators.toggleBinSelection(bin_id);
    },

    showPopUp: function(){
    if(this.state.popupVisible === false)
        ActionCreators.updatePopupVisible(true);
    else 
      ActionCreators.updatePopupVisible(false);
    
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
                    <span className="glyphicon glyphicon-info-sign info-icon" data-toggle="modal" data-target="#myModal" onClick={this.showPopUp}></span>
                    <div className="popUpContainer">
                        <PopUp popupVisible = {this.state.popupVisible} popupData = {this.props.productDetails} />
                    </div>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && (compData.selected_state == true || compData.selected_state == "true") && this.props.screenId == "put_back_scan")
            return (
                <div className = "bin selected">
                    <span className="glyphicon glyphicon-info-sign info-icon" data-toggle="modal" data-target="#myModal" onClick={this.showPopUp}></span>
                    <div className="popUpContainer">
                        <PopUp popupVisible = {this.state.popupVisible} popupData = {this.props.productDetails} />
                    </div>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && this.props.screenId == "put_back_stage" )
            return (
                <div className = "bin use" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <span className="glyphicon glyphicon-info-sign info-icon" data-toggle="modal" data-target="#myModal" onClick={this.showPopUp}></span>
                    <div className="popUpContainer">
                        <PopUp popupVisible = {this.state.popupVisible} popupData = {this.props.productDetails} />
                    </div>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && this.props.screenId == "put_back_scan" )
            return (
                <div className = "bin use" >
                    <span className="glyphicon glyphicon-info-sign info-icon" data-toggle="modal" data-target="#myModal" onClick={this.showPopUp}></span>
                    <div className="popUpContainer">
                        <PopUp popupVisible = {this.state.popupVisible} popupData = {this.props.productDetails} />
                    </div>
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