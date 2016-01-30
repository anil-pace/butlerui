var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var Modal = require('../Modal/Modal');
var appConstants = require('../../constants/appConstants');
var MainStore = require('../../stores/mainstore');

var Bin = React.createClass({

    _toggleBinSelection:function(bin_id,e){
        ActionCreators.toggleBinSelection(bin_id);
        e.stopPropagation();
        return false;
    },
    pressPptl : function(bin_id, binState){
        var data = {
            "event_name":"",
            "event_data":{}
        };
        data["event_name"] = "process_ppsbin_event";
        data["event_data"]["ppsbin_id"] = bin_id;
        data["event_data"]["ppsbin_state"] = binState;
        data["event_data"]["ppsbin_event"] = MainStore.getPPTLEvent();
        ActionCreators.postDataToInterface(data);
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
        /*if(this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING || this.props.screenId == appConstants.PICK_BACK_EXCEPTION_REPRINT){
            var binClass = 'bin ';
            var tote = '';
            var pptlClass = 'pptl ';
            if(compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true")){
                binClass = binClass + "selected ";
                pptlClass = pptlClass + "selected ";
            }
            if(compData["selected_for_staging"] !=undefined && (compData.selected_for_staging == true || compData.selected_for_staging == "true"))
                binClass = binClass + "excess-select ";
            if( compData["totes_associated"] !=undefined && (compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                        <span className="text">TOTE</span>
                        <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                        </span>
                    </div>);

            if(this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING){
                return (<div className = {binClass} onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                     <div className="tote">
                        <span className="text">TOTE</span>
                        <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                        </span>
                    </div>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className={(compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true"))?"pptl selected":"pptl"} >{compData.ppsbin_id}</div>
                </div>)
            }

        }*/
        /*else*/ if(this.props.screenId == appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS && compData.ppsbin_count > 0 )
            return (
                <div className = "bin no-excess-item" >
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else  if(this.props.screenId == appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS && compData.ppsbin_count == 0 )
            return (
                <div className = {(compData["selected_for_staging"]!=undefined && compData["selected_for_staging"] == true)?"bin excess-item excess-select":"bin excess-item"} onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)} >
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_state == "staged" )
            return (
                <div className = "bin staged" >
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_state == "completed" )
            return (
                <div className = "bin completed" >
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl completed">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && (compData["selected_for_staging"]!=undefined && compData["selected_for_staging"] == true ) && (this.props.screenId == appConstants.PUT_BACK_STAGE ))
            return (
                <div className = "bin use selected-staging" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );

        else if((compData["selected_for_staging"]!=undefined && compData["selected_for_staging"] == true ) && (this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING  ) && ( compData["totes_associated"] !=undefined && (compData.totes_associated == true || compData.totes_associated == "true")))
            return (
                <div className = "bin excess-select" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                     <div className="tote">
                        <span className="text">TOTE</span>
                        <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                        </span>
                    </div>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className={(compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true"))?"pptl selected":"pptl"} >{compData.ppsbin_id}</div>
                </div>
            );

         else if(( (this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING  )) && ( compData["totes_associated"] !=undefined && (compData.totes_associated == true || compData.totes_associated == "true")))
            return (
                <div className = {(compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true"))?"bin selected":"bin"} onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                     <div className="tote">
                        <span className="text">TOTE</span>
                        <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                        </span>
                    </div>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className={(compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true"))?"pptl selected":"pptl"} onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}>{compData.ppsbin_id}</div>
                </div>
            );

       

        else if((compData["selected_for_staging"]!=undefined && compData["selected_for_staging"] == true ) && (this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING  ))
            return (
                <div className = "bin excess-select" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected">{compData.ppsbin_id}</div>
                </div>
            );


        else if((this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING  ) && ( compData["totes_associated"] !=undefined && (compData.totes_associated == true || compData.totes_associated == "true")))
            return (
                <div className = {(compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true"))?"bin selected":"bin"} onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                     <div className="tote">
                        <span className="text">TOTE</span>
                        <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                        </span>
                    </div>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className={(compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true"))?"pptl selected":"pptl"} >{compData.ppsbin_id}</div>
                </div>
            );


        else if((this.props.screenId == appConstants.PICK_BACK_SCAN || this.props.screenId == appConstants.PICK_BACK_BIN ) && ((compData["ppsbin_blink_state"] !=undefined && (compData.ppsbin_blink_state == true || compData.ppsbin_blink_state == "true")) )){
            var tote = '';
            if((compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                        <span className="text">TOTE</span>
                        <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                        </span>
                    </div>);
            return (
                <div className = "bin  selected blink1">
                    {tote}
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected blink" onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}>{compData.ppsbin_id}</div>
                </div>
            );

        }
        

        else if((this.props.screenId == appConstants.PICK_BACK_SCAN || this.props.screenId == appConstants.PICK_BACK_BIN ) && (compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true")))
            return (
                <div className = "bin selected">
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected" onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}>{compData.ppsbin_id}</div>
                </div>
            );

         else if((this.props.screenId == appConstants.PICK_BACK_EXCEPTION_REPRINT || this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING ) && ((compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true")) && compData["totes_associated"] !=undefined && (compData.totes_associated == true || compData.totes_associated == "true")))
            return (
                <div className = "bin selected">
                     <div className="tote">
                        <span className="text">TOTE</span>
                        <span className="glyphicon glyphicon-info-sign info-icon"  >
                        </span>
                    </div>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected" >{compData.ppsbin_id}</div>
                </div>
            );


        else if((this.props.screenId == appConstants.PICK_BACK_EXCEPTION_REPRINT || this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING) && ((compData["ppsbin_blink_state"] !=undefined && (compData.ppsbin_blink_state == true || compData.ppsbin_blink_state == "true")) )){
             var tote = '';
            if((compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                        <span className="text">TOTE</span>
                        <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                        </span>
                    </div>);
            return (
                <div className = "bin  selected blink1">
                    {tote}
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected blink" >{compData.ppsbin_id}</div>
                </div>
            );
        }

        else if((this.props.screenId == appConstants.PICK_BACK_EXCEPTION_REPRINT ) && (compData["ppsbin_blue_state"] !=undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true")))
            return (
                <div className = "bin selected">
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected" >{compData.ppsbin_id}</div>
                </div>
            );
       
        else if((compData.selected_state == true || compData.selected_state == "true") && (this.props.screenId == appConstants.PUT_BACK_SCAN || this.props.screenId == appConstants.PICK_FRONT_PRESS_PPTL_TO_CONFIRM )){

            return (
                <div className = "bin selected">
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected" onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if((compData.selected_state == true || compData.selected_state == "true") && (this.props.screenId == appConstants.PUT_FRONT_SCAN  || this.props.screenId == appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK ||  this.props.screenId == appConstants.PICK_FRONT_SCAN_ITEM_AND_PLACE_IN_BIN ))
            return (
                <div className = {compData.ppsbin_count > 0 ? "bin selected" :"bin empty"}>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className={compData.ppsbin_count > 0 ? "pptl selected" :"pptl"}>{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && this.props.screenId == appConstants.PUT_BACK_STAGE )
            return (
                <div className = "bin use" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")} >
                    </span>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else if((compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true") && this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING )
            return (
                <div className = "bin selected" onClick={this._toggleBinSelection.bind(this,compData.ppsbin_id)}>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl selected">{compData.ppsbin_id}</div>
                </div>
            );
        else if(compData.ppsbin_count > 0 && (this.props.screenId == appConstants.PUT_BACK_SCAN || this.props.screenId == appConstants.PUT_FRONT_SCAN || this.props.screenId == appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK) )
            return (
                <div className = "bin use" >
                   <span className="glyphicon glyphicon-info-sign info-icon" onClick={this.showModal.bind(this,compData.bin_info,"bin-info")}  >
                    </span>
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
    	else if(compData.ppsbin_count == 0 || compData.ppsbin_state == "empty")
            return (
                <div className = "bin empty">
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
            );
        else 
            return (
                <div className = "bin empty">
                    <div className ="item-count">{compData.ppsbin_count}</div>
                    <div className="pptl">{compData.ppsbin_id}</div>
                </div>
                );
        
    }
});

module.exports = Bin;