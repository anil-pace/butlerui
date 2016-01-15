var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');
var PickFrontStore = require('../../stores/PickFrontStore');

var Button1 = React.createClass({
            _checklistClass: '',
            performAction: function(module, action) {
                var data = {
                    "event_name": "",
                    "event_data": {}
                };
                switch (module) {
                    case appConstants.PUT_BACK:
                        switch (action) {
                            case appConstants.STAGE_ONE_BIN:
                                ActionCreators.stageOneBin();
                                break;
                            case appConstants.STAGE_ALL:
                                ActionCreators.stageAllBins();
                                break;
                            case appConstants.CANCEL_SCAN:
                                data["event_name"] = "cancel_barcode_scan";
                                data["event_data"]["barcode"] = this.props.barcode;
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_EXCEPTION:
                                ActionCreators.enableException(false);
                                break;
                            case appConstants.CANCEL_TOTE:
                            case appConstants.CLOSE_TOTE:
                                data["event_name"] = "confirm_close_tote";
                                data["event_data"]["close_value"] = this.props.status;
                                data["event_data"]["toteId"] = this.props.toteId;
                                ActionCreators.postDataToInterface(data);
                                break;
                            default:
                                return true;
                        }
                        break;
                    case appConstants.PUT_FRONT:
                        switch (action) {
                            case appConstants.CANCEL_SCAN:
                                data["event_name"] = "cancel_scan_all";
                                data["event_data"]["barcode"] = this.props.barcode;
                                ActionCreators.postDataToInterface(data);
                                break;
                            default:
                                return true;
                        }
                        break;
                    case appConstants.PICK_FRONT:
                        switch (action) {
                            case appConstants.CANCEL_SCAN:
                                data["event_name"] = "cancel_scan_all";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CHECKLIST_SUBMIT:
                                var checklist_index = this.props.checkListData.checklist_index;
                                var checkList = this.props.checkListData;
                                if (checklist_index != "all") {
                                    checkList.checklist_data[checklist_index - 1].map(function(value, index) {
                                        var keyvalue = Object.keys(value);
                                        checkList.checklist_data[checklist_index - 1][index][keyvalue[0]].value = document.getElementById("checklist_field" + index + "-" + (checklist_index - 1)).value;
                                    });
                                } else {
                                    checkList.checklist_data.map(function(value, index) {
                                        if(index < PickFrontStore.scanDetails()["current_qty"])
                                        value.map(function(value1, index1) {
                                            var keyvalue = Object.keys(value1);
                                            checkList.checklist_data[index][index1][keyvalue[0]].value = document.getElementById("checklist_field" + index1 + "-" + index ).value;
                                        })
                                    });
                                }
                                data["event_name"] = "pick_checklist_update";
                                data["event_data"]["pick_checklist"] = checkList;
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.EDIT_DETAILS:
                                data["event_name"] = "checklist_edit";
                                ActionCreators.postDataToInterface(data);
                                break;
                            default:
                                return true;
                        }
                        break;
                    case appConstants.PICK_BACK:
                        switch (action) {
                            case appConstants.CANCEL_SCAN:
                                data["event_name"] = "cancel_tote_scan";
                                data["event_data"]["barcode"] = this.props.barcode;
                                ActionCreators.postDataToInterface(data);
                                break;
                            default:
                                return true;
                        }
                        break;
                    case appConstants.AUDIT:
                        data["event_name"] = "audit_actions";
                        switch (action) {
                            case appConstants.CANCEL_SCAN:
                                data["event_data"]["type"] = "cancel_audit";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.GENERATE_REPORT:
                                data["event_data"]["type"] = "generate_report";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_FINISH_AUDIT:
                                data["event_data"]["type"] = "cancel_finish_audit";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.FINISH_CURRENT_AUDIT:
                                data["event_data"]["type"] = "finish_current_audit";
                                ActionCreators.postDataToInterface(data);
                                break;
                            default:
                                return true;
                        }
                        break;

                    default:
                        return true;
                }
            },
            render: function() {
                console.log(this.props.checkListData);
                if (this.props.buttonChecklist != undefined) {
                    _checklistClass = 'checklistButtonSubmit';
                } else {
                    _checklistClass = '';
                }
                if (this.props.disabled == false)
                    return ( < a className = {
                            this.props.color == "orange" ? "custom-button orange " + _checklistClass : "custom-button black " + _checklistClass
                        }
                        onClick = {
                            this.performAction.bind(this, this.props.module, this.props.action)
                        }  > {
                            this.props.text
                        } < /a>
                    );
                else
                    return ( < a className = {
                            this.props.color == "orange" ? "custom-button disabled orange" : "custom-button disabled black"
                        } > {
                            this.props.text
                        } < /a>);
                    }
            });

        module.exports = Button1;