var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var Modal = require('../Modal/Modal');
var appConstants = require('../../constants/appConstants');
var MainStore = require('../../stores/mainstore');

var Bin = React.createClass({
    _toggleBinSelection: function (bin_id, e) {
        ActionCreators.toggleBinSelection(bin_id);
        e.stopPropagation();
        return false;
    },
    pressPptl: function (bin_id, binState) {
        var data = {
            "event_name": "",
            "event_data": {}
        };
        data["event_name"] = "process_ppsbin_event";
        data["event_data"]["ppsbin_id"] = bin_id;
        data["event_data"]["ppsbin_state"] = binState;
        data["event_data"]["ppsbin_event"] = MainStore.getPPTLEvent();
        ActionCreators.postDataToInterface(data);
    },
    showModal: function (data, type, e) {
        ActionCreators.showModal({
            data: data,
            type: type
        });
        $('.modal').modal();
        e.stopPropagation();
        return false;
    },
    render: function () {
        var compData = this.props.binData;
        if (this.props.screenId == appConstants.PICK_BACK_EXCEPTION_REPRINT) {
            var tote = '';
            if (compData["totes_associated"] != undefined && (compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            return (<div
                className={"bin "+(compData['pps_blink_state'] ? 'selected blink1 ' : 'no-excess-item')}>
                {tote}
                <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                <div
                    className={"pptl "+(compData['pps_blink_state'] ? 'selected blink ' : 'no-excess-item')}
                    style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
            </div>);
        }
        else if ((this.props.screenId == appConstants.PUT_BACK_STAGE || this.props.screenId == appConstants.PUT_BACK_SCAN_TOTE) && compData.ppsbin_state == 'error') {
            return (
                <div className={"bin selected binError "+(compData['pps_blink_state'] ? 'blink1 ' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected binError "+(compData['pps_blink_state'] ? 'blink ' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if ((this.props.screenId == appConstants.PRE_PUT_SCAN || this.props.screenId == appConstants.PRE_PUT_STAGE || this.props.screenId == appConstants.PRE_PUT_RELEASE )) {
            var tote = '';
            if (compData.totes_associated == true) {
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            }
            return (
                <div className={"bin "+(compData['pps_blink_state'] ? 'blink1 ' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl "+(compData['pps_blink_state'] ? 'blink ' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }

        else if ((this.props.screenId == appConstants.PUT_FRONT_PPTL_PRESS) && compData.selected_state == true && compData.ppsbin_count > 0) {
            var tote = '';
            if ((compData.totes_associated == true) || (compData.totes_associated == "true")) {
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                    <span className="glyphicon glyphicon-info-sign info-icon"
                          onClick={this.showModal.bind(this, compData.bin_info, "bin-info")}>
                        </span>
                </div>);
            }
            return (
                <div className={"bin selected "+(compData['pps_blink_state'] ? 'blink1 ' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected "+(compData['pps_blink_state'] ? 'blink ' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if (this.props.screenId == appConstants.PUT_FRONT_PPTL_PRESS && compData.selected_state == true) {
            var tote = '';
            if ((compData.totes_associated == true) || (compData.totes_associated == "true")) {
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            }
            return (
                <div className={"bin pick_processed " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{"-"}</div>
                    {tote}
                    <div className={"pptl pick_processed " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if (this.props.screenId == appConstants.PUT_FRONT_PPTL_PRESS) {
            if ((compData.totes_associated == true) || (compData.totes_associated == "true")) {
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            }
            return (
                <div className={"bin " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    {tote}
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if (this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING) {
            var tote = '';
            if (compData["totes_associated"] != undefined && (compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            if (compData["ppsbin_blue_state"] != undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true") && compData.ppsbin_state != 'error') {
                return (<div
                    className={"bin selected " + (compData["selected_for_staging"] ? "excess-select " : "") + (compData['pps_blink_state'] ? 'blink1 ' : '')}
                    onClick={this._toggleBinSelection.bind(this, compData.ppsbin_id)}
                    style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected "+(compData['pps_blink_state'] ? 'blink ' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>);
            } else {
                return (<div className={"bin no-excess-item "+(compData['pps_blink_state'] ? 'blink1 ' : '')}
                             style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count}</div>
                    <div className={"pptl no-excess-item "+(compData['pps_blink_state'] ? 'blink ' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>);
            }
        }
        else if (this.props.screenId == appConstants.PICK_BACK_EXCEPTION_OVERRIDE_TOTE) {
            var tote = '';
            if (compData["totes_associated"] != undefined && (compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            if (compData["ppsbin_blue_state"] != undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true") && compData.ppsbin_state != 'error') {
                if (compData["totes_associated"] == true || compData["totes_associated"] == "true") {
                    return (<div className={"bin excess-item "+(compData['pps_blink_state'] ? 'blink1 ' : '')}
                                 style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                        {tote}
                        <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                        <div className={"pptl excess-item "+(compData['pps_blink_state'] ? 'blink1 ' : '')}
                             style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                    </div>);
                } else {
                    return (<div
                        className={"bin selected " + (compData["selected_for_staging"] ? "excess-select " : "") + (compData['pps_blink_state'] ? 'blink1 ' : '')}
                        onClick={this._toggleBinSelection.bind(this, compData.ppsbin_id)}
                        style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                        {tote}
                        <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                        <div className={"pptl selected "+(compData['pps_blink_state'] ? 'blink ' : '')}
                             style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                    </div>);
                }
            } else {
                return (<div className={"bin no-excess-item "+(compData['pps_blink_state'] ? 'blink1 ' : '')}
                             style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl no-excess-item "+(compData['pps_blink_state'] ? 'blink ' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>);
            }
        }
        else if (this.props.screenId == appConstants.PICK_BACK_EXCEPTION_DIS_ASSOCIATE_TOTE) {
            var tote = '';
            if (compData["totes_associated"] != undefined && (compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            if (compData["totes_associated"] != undefined && (compData.totes_associated == true || compData.totes_associated == "true") && compData.ppsbin_state != 'error') {
                return (<div
                    className={"bin excess-item " + (compData["selected_for_staging"] ? "excess-select " : "") + (compData['pps_blink_state'] ? 'blink1 ' : '')}
                    style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}
                    onClick={this._toggleBinSelection.bind(this, compData.ppsbin_id)}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl excess-item "+(compData['ppsbin_blink_state'] ? 'blink' : '')} style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>);
            } else {
                return (<div className={"bin no-excess-item "+(compData['ppsbin_blink_state'] ? 'blink1' : '')}
                             style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl no-excess-item "+(compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>);
            }
        }
        else if (this.props.screenId == appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS && compData.ppsbin_count > 0)
            return (
                <div className={"bin no-excess-item " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        else if (this.props.screenId == appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS && compData.ppsbin_count == 0 && compData.ppsbin_state != 'error')
            return (
                <div
                    className={"bin excess-item " + (compData["selected_for_staging"] ? "excess-select " : "") + (compData['pps_blink_state'] ? 'blink1 ' : '')}
                    onClick={this._toggleBinSelection.bind(this, compData.ppsbin_id)}
                    style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        else if (compData.ppsbin_state == "staged")
            return (
                <div className={"bin staged " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        else if (compData.ppsbin_state == "completed")
            return (
                <div className={"bin completed " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl completed " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );

        else if (compData.ppsbin_count > 0 && (compData["selected_for_staging"] != undefined && compData["selected_for_staging"] == true ) && (this.props.screenId == appConstants.PUT_BACK_STAGE || this.props.screenId == appConstants.PUT_BACK_SCAN_TOTE) && compData.ppsbin_state != 'error')
            return (
                <div className={"bin use selected-staging " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     onClick={this._toggleBinSelection.bind(this, compData.ppsbin_id)}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );


        else if ((this.props.screenId == appConstants.PICK_BACK_SCAN || this.props.screenId == appConstants.PICK_BACK_BIN ) && ((compData["ppsbin_blink_state"] != undefined && (compData.ppsbin_blink_state == true || compData.ppsbin_blink_state == "true")) )) {
            var tote = '';
            var binClass = 'bin ';
            if ((compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            return (
                <div className="bin  selected blink1"
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className="pptl selected blink"
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );

        }


        else if ((this.props.screenId == appConstants.PICK_BACK_SCAN || this.props.screenId == appConstants.PICK_BACK_BIN ) && (compData["ppsbin_blue_state"] != undefined && (compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true"))) {
            var tote = '', binClass = '';
            binClass = compData.ppsbin_state == "error" ? " binError" : "";
            if ((compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            return (
                <div className={"bin selected " + (compData['ppsbin_blink_state'] ? 'blink1' : '') + binClass}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected " + (compData['ppsbin_blink_state'] ? 'blink' : '') + binClass}
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }

        else if ((this.props.screenId == appConstants.PICK_BACK_SCAN || this.props.screenId == appConstants.PICK_BACK_BIN )) {
            var tote = '';
            if ((compData.totes_associated == true || compData.totes_associated == "true"))
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            return (
                <div className={"bin " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if ((compData.selected_state == true || compData.selected_state == "true") && (this.props.screenId == appConstants.PICK_FRONT_PPTL_PRESS )) {

            return (
                <div className={"bin selected " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                 <span className="glyphicon glyphicon-info-sign info-icon grey-icon"
                       onClick={this.showModal.bind(this, compData.bin_info, "bin-info")}>
                 </span>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if ((compData.selected_state == true || compData.selected_state == "true") && (this.props.screenId == appConstants.PICK_FRONT_MORE_ITEM_SCAN )) {

            return (
                <div className={"bin selected " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                 <span className="glyphicon glyphicon-info-sign info-icon grey-icon"
                       onClick={this.showModal.bind(this, compData.bin_info, "bin-info")}>
                 </span>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if ((compData.selected_state == true || compData.selected_state == "true") && (this.props.screenId == appConstants.PICK_FRONT_MORE_ITEM_SCAN )) {

            return (
                <div className={"bin selected " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                 <span className="glyphicon glyphicon-info-sign info-icon grey-icon"
                       onClick={this.showModal.bind(this, compData.bin_info, "bin-info")}>
                 </span>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if ((compData.selected_state == true || compData.selected_state == "true") && (this.props.screenId == appConstants.PICK_FRONT_PACKING_BOX )) {

            return (
                <div className={"bin selected " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                 <span className="glyphicon glyphicon-info-sign info-icon grey-icon"
                       onClick={this.showModal.bind(this, compData.bin_info, "bin-info")}>
                 </span>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if ((compData.selected_state == false || compData.selected_state == "false") && ((this.props.screenId == appConstants.PICK_FRONT_PPTL_PRESS || this.props.screenId == appConstants.PICK_FRONT_MORE_ITEM_SCAN) && (compData.ppsbin_state == 'pick_processed' || compData.ppsbin_state == 'pick_allowed' || compData.ppsbin_state == 'order_front_complete'))) {

            return (
                <div className={"bin pick_processed " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl pick_processed " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }

        else if ((compData.selected_state == true || compData.selected_state == "true") && this.props.screenId == appConstants.PUT_BACK_SCAN) {

            return (
                <div className={"bin selected " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if ((compData.selected_state == true || compData.selected_state == "true") && (this.props.screenId == appConstants.PUT_FRONT_SCAN || this.props.screenId == appConstants.PICK_FRONT_MORE_ITEM_SCAN || this.props.screenId == appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK || this.props.screenId == appConstants.PICK_FRONT_SCAN_ITEM_AND_PLACE_IN_BIN )) {
            var tote = '';
            var applyClassNameOnTote = '';
            if ((compData.totes_associated == true) || (compData.totes_associated == "true")) {
              applyClassNameOnTote = 'bin-icon tote-icon'
            }
            if(this.props.binCoordinatePlotting == true || this.props.binCoordinatePlotting == "true"){
              applyClassNameOnTote = 'bin-icon tote-icon bin-coordinate-plotting-enabled'
            }
            tote = (<div className="tote">
                      <span className={applyClassNameOnTote}></span>
                      <span className="glyphicon glyphicon-info-sign info-icon"
                        onClick={this.showModal.bind(this, compData.bin_info, "bin-info")}>
                      </span>
                    </div>);
            return (
                <div
                    className={(compData.ppsbin_count > 0 ? "bin selected " : "bin empty ") + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                    style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div
                        className={(compData.ppsbin_count > 0 ? "pptl selected " : "pptl ") + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                        style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if (compData.ppsbin_count > 0 && (this.props.screenId == appConstants.PUT_BACK_STAGE || this.props.screenId == appConstants.PUT_BACK_SCAN_TOTE) && compData.ppsbin_state != 'error')
            return (
                <div className={"bin use " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     onClick={this._toggleBinSelection.bind(this, compData.ppsbin_id)}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <span className="glyphicon glyphicon-info-sign info-icon"
                          onClick={this.showModal.bind(this, compData.bin_info, "bin-info")}>
                    </span>
                    <div className="item-count">{compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        else if ((compData.ppsbin_blue_state == true || compData.ppsbin_blue_state == "true") && (this.props.screenId == appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING) && compData.ppsbin_state != 'error')
            return (
                <div className={"bin selected " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}
                     onClick={this._toggleBinSelection.bind(this, compData.ppsbin_id)}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        else if (compData.ppsbin_count > 0 && (this.props.screenId == appConstants.PUT_BACK_SCAN || this.props.screenId == appConstants.PUT_FRONT_SCAN || this.props.screenId == appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK)) {
            var tote = '';
            var applyClassNameOnTote = '';
            if ((compData.totes_associated == true) || (compData.totes_associated == "true")) {
              applyClassNameOnTote = 'bin-icon tote-icon'
            }
            if(this.props.binCoordinatePlotting == true || this.props.binCoordinatePlotting == "true"){
              applyClassNameOnTote = 'bin-icon tote-icon bin-coordinate-plotting-enabled'
            }
            tote = (<div className="tote">
                      <span className={applyClassNameOnTote}></span>
                    </div>);
            return (
                <div className={"bin use " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <span className="glyphicon glyphicon-info-sign info-icon"
                          onClick={this.showModal.bind(this, compData.bin_info, "bin-info")}>
                    </span>
                    <div className="item-count">{compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }else if ((compData.selected_state && (this.props.screenId === appConstants.PICK_FRONT_BIN_PRINTOUT|| this.props.screenId === appConstants.PICK_FRONT_ROLLCAGE_PRINTOUT))) {

            return (
                <div className={"bin selected " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl selected " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else if (compData.ppsbin_count == 0 || compData.ppsbin_state == "empty") {
            var tote = '';
            if ((compData.totes_associated == true) || (compData.totes_associated == "true")) {
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            }
            return (
                <div className={"bin empty " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }else if (compData.selected_state && this.props.screenId === appConstants.PUT_FRONT_BIN_WAREHOUSE_FULL) {
            if ((compData.totes_associated === true) || (compData.totes_associated === "true")) {
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"/>
                </div>);
            }
            return (
                <div className={"bin " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    <div className="item-count">{compData.ppsbin_count}</div>
                    {tote}
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         onClick={this.pressPptl.bind(this, compData.ppsbin_id, compData.ppsbin_state)}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }
        else {
            var tote = '';
            if ((compData.totes_associated == true) || (compData.totes_associated == "true")) {
                tote = (<div className="tote">
                    <span className="bin-icon tote-icon"></span>
                </div>);
            }
            return (
                <div className={"bin empty " + (compData['ppsbin_blink_state'] ? 'blink1' : '')}
                     style={compData["ppsbin_light_color"] ? {borderColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>
                    {tote}
                    <div className="item-count">{compData.ppsbin_count<1?'-':compData.ppsbin_count}</div>
                    <div className={"pptl " + (compData['ppsbin_blink_state'] ? 'blink' : '')}
                         style={compData["ppsbin_light_color"] ? {backgroundColor: appConstants.BIN_LIGHT_COLOR[compData["ppsbin_light_color"]]} : {}}>{compData.ppsbin_id}</div>
                </div>
            );
        }

    }
});

module.exports = Bin;
