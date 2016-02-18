var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var SVGConstants = require('../constants/svgConstants');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');
var serverMessages = require('../serverMessages/server_messages');
var chinese = require('../serverMessages/chinese');
var english = require('../serverMessages/english');
var navConfig = require('../config/navConfig');
var resourceConstants = require('../constants/resourceConstants');

var CHANGE_EVENT = 'change';
var _seatData, _currentSeat, _seatMode, _seatType, _seatName, _utility, _pptlEvent, _binId, _cancelEvent, _messageJson, _screenId, _itemUid, _exceptionType, _action, _KQQty = 0,
    _logoutStatus,
    _activeException = "",
    _enableException = false,
    popupVisible = false,
    _showSpinner = true,
    _goodQuantity = 0,
    _damagedQuantity = 0,
    _putFrontExceptionScreen = "good",
    _pickFrontExceptionScreen = "good",
    _missingQuantity = 0,
    showModal = false,
    _finishAuditFlag = true;
var modalContent = {
    data: "",
    type: ""
};

function setPopUpVisible(status) {
    popupVisible = status;
    mainstore.emit(CHANGE_EVENT);
};
var mainstore = objectAssign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    getPopUpVisible: function(data) {
        return popupVisible;
    },
    showSpinner: function() {
        _showSpinner = true;
    },
    setLogoutState: function() {
        _logoutStatus = _seatData.logout_allowed;
    },
    getSpinnerState: function() {
        return _showSpinner;
    },

    getLogoutState: function() {
        if (_seatData.hasOwnProperty("logout_allowed"))
            return _seatData.logout_allowed;
    },

    toggleBinSelection: function(bin_id) {
        var flag = false;
        _seatData["ppsbin_list"].map(function(value, index) {
            if (value.ppsbin_id == bin_id) {
                if (value["selected_for_staging"] != undefined) {
                    flag = !value["selected_for_staging"];
                    value["selected_for_staging"] = !value["selected_for_staging"];
                } else {
                    value["selected_for_staging"] = true;
                    flag = true;
                }
            } else if (value["selected_for_staging"] != undefined) {
                value["selected_for_staging"] = false;
            }
        });
        if (_seatData.notification_list.length != 0) {
            _seatData.notification_list[0].code = (flag) ? resourceConstants.CLIENTCODE_001 : resourceConstants.CLIENTCODE_002;
            _seatData.notification_list[0].details[0] = bin_id;
            _seatData.notification_list[0].level = "info";
            //_seatData.notification_list[0].description = (flag) ? resourceConstants.BIN + ' ' + bin_id + ' ' + resourceConstants.SELECTED : resourceConstants.BIN + ' ' + bin_id + ' ' + resourceConstants.UNSELECTED;
        }
    },

    getStageActiveStatus: function() {
        if (_seatData.hasOwnProperty('ppsbin_list')) {
            var flag = false;
            _seatData["ppsbin_list"].map(function(value, index) {
                if (value["selected_for_staging"] != undefined && value["selected_for_staging"] == true)
                    flag = true;
            });
            return flag;
        }
    },

    getStageAllActiveStatus: function() {
        if (_seatData.hasOwnProperty('ppsbin_list')) {
            var flag = false;
            _seatData["ppsbin_list"].map(function(value, index) {
                if (value.ppsbin_count > 0 && value.ppsbin_state != "staged")
                    flag = true;
            });
            return flag;
        }
    },

    getPutQuantity: function() {
        if (_seatData.hasOwnProperty("put_quantity"))
            return _seatData.put_quantity;
    },
    setShowModal:function(data){
        showModal = false;
    },
    getNavData: function() {
        switch (_currentSeat) {
            case appConstants.PUT_BACK:
                if (_seatData.screen_id === appConstants.PUT_BACK_INVALID_TOTE_ITEM)
                    _NavData = navConfig.putBack[0];
                else if (_seatData.screen_id === appConstants.PPTL_MANAGEMENT){
                    _NavData = navConfig.utility[0];
                     _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_004;
                }
                else if (_seatData.screen_id === appConstants.SCANNER_MANAGEMENT){
                    _NavData = navConfig.utility[1];
                     _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_005;
                }
                else
                    _NavData = navConfig.putBack[1];
                break;
            case appConstants.PUT_FRONT:
                if (_seatData.screen_id === appConstants.PUT_FRONT_WAITING_FOR_RACK)
                    _NavData = navConfig.putFront[0];
               else if (_seatData.screen_id === appConstants.PPTL_MANAGEMENT){
                    _NavData = navConfig.utility[0];
                     _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_004;
                }
                else if (_seatData.screen_id === appConstants.SCANNER_MANAGEMENT){
                    _NavData = navConfig.utility[1];
                     _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_005;
                }
                else
                    _NavData = navConfig.putFront[1];
                break;
            case appConstants.PICK_BACK:
                if (_seatData.screen_id === appConstants.PPTL_MANAGEMENT){
                    _NavData = navConfig.utility[0];
                    _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_004;
                }
                else if (_seatData.screen_id === appConstants.SCANNER_MANAGEMENT){
                    _NavData = navConfig.utility[0];
                    _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_005;
                }
                else 
                    _NavData = navConfig.pickBack;
                break;
            case appConstants.PICK_FRONT:
                if (_seatData.screen_id === appConstants.PICK_FRONT_WAITING_FOR_MSU)
                    _NavData = navConfig.pickFront[0];
                else if (_seatData.screen_id === appConstants.PPTL_MANAGEMENT){
                    _NavData = navConfig.utility[0];
                     _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_004;
                }
                else if (_seatData.screen_id === appConstants.SCANNER_MANAGEMENT){
                    _NavData = navConfig.utility[1];
                     _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_005;
                }
                else
                    _NavData = navConfig.pickFront[1];
                break;
            case appConstants.AUDIT:
                if (_seatData.screen_id === appConstants.AUDIT_WAITING_FOR_MSU)
                    _NavData = navConfig.audit[0];
                else if (_seatData.screen_id === appConstants.PPTL_MANAGEMENT){
                    _NavData = navConfig.utility[0];
                     _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_004;
                }
                else if (_seatData.screen_id === appConstants.SCANNER_MANAGEMENT){
                    _NavData = navConfig.utility[1];
                     _seatData.header_msge_list[0].code = resourceConstants.CLIENTCODE_005;
                }
                else
                    _NavData = navConfig.audit[1];
                break;
            default:
                //return true; 
        }
        _NavData.map(function(data, index) {
            if (data.screen_id instanceof Array) {
                if (data.screen_id.indexOf(_seatData.screen_id) != -1) {
                    if (_seatData.screen_id == appConstants.PUT_BACK_TOTE_CLOSE)
                        _NavData[index].image = SVGConstants.tote;
                    else
                        _NavData[index].image = SVGConstants.scan;
                    _NavData[index].type = 'active';
                } else {
                    _NavData[index].type = 'passive';
                }
            } else if (_seatData.screen_id == data.screen_id) {
                _NavData[index].type = 'active';
            } else {
                _NavData[index].type = 'passive';
            }
        });
        return _NavData;
    },

    getModalStatus: function() {
        var data = {};
        data["showModal"] = "";
        data["message"] = "";
        if (_seatData.screen_id != appConstants.AUDIT_RECONCILE && showModal && _seatData["Current_box_details"].length > 0  && _seatData["Current_box_details"][0]["Box_serial"] == null && (_seatData["Current_box_details"][0]["Actual_qty"] > _seatData["Current_box_details"][0]["Expected_qty"])) {
            console.log("jindal");
            console.log(showModal);
            showModal = false;
            console.log(_seatData.Current_box_details[0]["Actual_qty"] - _seatData.Current_box_details[0]["Expected_qty"])
            return {
                "showModal": true,
                "message": "Place extra " /*+ (_seatData.Current_box_details[0]["Actual_qty"] - _seatData.Current_box_details[0]["Expected_qty"])*/ + " items in Exception area ."
            }
        } else if (_seatData.screen_id != appConstants.AUDIT_RECONCILE && showModal && _seatData["last_finished_box"].length > 0  && (_seatData["last_finished_box"][0]["Actual_qty"] > _seatData["last_finished_box"][0]["Expected_qty"])) {
            console.log("jindal");
            console.log(showModal);
            showModal = false;
            console.log(_seatData.last_finished_box[0]["Actual_qty"] - _seatData.last_finished_box[0]["Expected_qty"])
            return {
                "showModal": true,
                "message": "Place extra " + (_seatData.last_finished_box[0]["Actual_qty"] - _seatData.last_finished_box[0]["Expected_qty"]) + " items in Exception area ."
            }
        } 
        else{
            return data;
        }
    },

    getBoxSerialData: function() {
        var data = {};
        data["header"] = [];
        data["tableRows"] = [];
        var self = this;
        data["header"].push(new this.tableCol("Box Serial Numbers", "header", false, "small", false, true, true, false));
        if (_seatData["show_expected_qty"] != undefined && _seatData["show_expected_qty"] == true)
            data["header"].push(new this.tableCol("Expected", "header", false, "small", false, false, true, false, true));
        data["header"].push(new this.tableCol("Actual", "header", false, "small", false, false, true, false, true));
        data["header"].push(new this.tableCol("Finish", "header", false, "small", false, false, true, false, true));
        _finishAuditFlag = true;
        var d = [];
        _seatData.Box_qty_list.map(function(value, index) {
            d = [];
            if (value.Scan_status != "close") {
                d.push(new self.tableCol(value.Box_serial, "enabled", false, "large", false, true, false, false));
                if (_seatData["show_expected_qty"] != undefined && _seatData["show_expected_qty"] == true)
                    d.push(new self.tableCol(value.Expected_qty, "enabled", false, "large", true, false, false, false, true));
                d.push(new self.tableCol(value.Actual_qty, "enabled", value.Scan_status == "open", "large", true, false, false, false, true));
                d.push(new self.tableCol("0", "enabled", false, "large", true, false, false, false, true, "button", "finish", value.Scan_status == "open"));
                data["tableRows"].push(d);
            } else {
                d.push(new self.tableCol(value.Box_serial, "complete", false, "large", false, true, false, false));
                if (_seatData["show_expected_qty"] != undefined && _seatData["show_expected_qty"] == true)
                    d.push(new self.tableCol(value.Expected_qty, "complete", false, "large", true, false, false, false, true));
                d.push(new self.tableCol(value.Actual_qty, "complete", false, "large", true, false, false, false, true));
                d.push(new self.tableCol("0", "complete", false, "large", true, false, false, false, true, "button", "finish", value.Scan_status == "open"));
                data["tableRows"].push(d);
            }

            if (value.Scan_status == "open") {
                _finishAuditFlag = false;
            }
        });

        _seatData.Extra_box_list.map(function(value, index) {
            d = [];
            d.push(new self.tableCol(value.Box_serial, "extra", false, "large", false, true, false, false));
            if (_seatData["show_expected_qty"] != undefined && _seatData["show_expected_qty"] == true)
                d.push(new self.tableCol(value.Expected_qty, "enabled", false, "large", true, false, false, false, true));
            d.push(new self.tableCol(value.Actual_qty, "enabled", value.Scan_status == "open", "large", true, false, false, false, true));
            d.push(new self.tableCol("0", "enabled", false, "large", true, false, false, false, true, "button", "finish", value.Scan_status == "open"));
            data["tableRows"].push(d);
            if (value.Scan_status == "open") {
                _finishAuditFlag = false;
            }
        });

        return data;

    },


    getBoxDetails: function() {
        if (_seatData.hasOwnProperty('box_serials'))
            return _seatData.box_serials;
    },

    getChecklistDetails: function() {
        if (_seatData.hasOwnProperty('checklist_details')) {
            console.log(_seatData.checklist_details.pick_checklist.length + "jindal");
            if (_seatData.checklist_details.pick_checklist.length > 0) {
                return _seatData.checklist_details.pick_checklist;
            } else {
                return [];
            }

        } else {
            return [];
        }
    },

    getChecklistIndex: function() {
        if (_seatData.hasOwnProperty('checklist_details')) {
            if (_seatData.checklist_details.checklist_index != null) {
                return _seatData.checklist_details.checklist_index;
            } else {
                return null;
            }

        } else {
            return null;
        }
    },

    getChecklistOverlayStatus: function() {
        if (_seatData.hasOwnProperty('checklist_details')) {
            return _seatData.checklist_details.display_checklist_overlay;
        } else {
            return null;
        }
    },

    getServerNavData: function() {
        if (_seatData.header_msge_list.length > 0) {
            _serverNavData = _seatData.header_msge_list[0];
            return _serverNavData;
        } else {
            return null;
        }
    },

    getNotificationData: function() {
        return _seatData.notification_list[0];
    },

    getBinData: function() {
        var binData = {};
        binData["structure"] = _seatData.structure;
        binData["ppsbin_list"] = _seatData.ppsbin_list;
        return binData;
    },

    stageOneBin: function() {
        if (_seatData.hasOwnProperty('ppsbin_list')) {
            var data = {};
            _seatData.ppsbin_list.map(function(value, index) {
                if (value["selected_for_staging"] != undefined && value["selected_for_staging"] == true) {
                    data["event_name"] = "stage_ppsbin";
                    data["event_data"] = {};
                    data["event_data"]["ppsbin_id"] = value.ppsbin_id;
                }
            });

            utils.postDataToInterface(data, _seatData.seat_name);
        }
    },

    getSelectedBin: function() {
        if (_seatData.hasOwnProperty('ppsbin_list')) {
            var data = null;
            _seatData.ppsbin_list.map(function(value, index) {
                if (value["selected_for_staging"] != undefined && value["selected_for_staging"] == true) {
                    data = value.ppsbin_id;
                }
            });

            return data;
        } else
            return null;
    },

    getCurrentState: function() {
        if (_seatData.hasOwnProperty('ppsbin_list')) {
            var data = null;
            _seatData.ppsbin_list.map(function(value, index) {
                if (value["selected_for_staging"] != undefined && value["selected_for_staging"] == true) {
                    data = value.ppsbin_state;
                }
            });

            return data;
        } else
            return null;
    },

    stageAllBin: function() {
        var data = {};
        data["event_name"] = "stage_all";
        data["event_data"] = '';
        utils.postDataToInterface(data, _seatData.seat_name);
    },


    getExceptionData: function() {
        var data = {};
        data["activeException"] = this.getActiveException();
        data["list"] = [];
        data["header"] = "Exceptions";
        _seatData.exception_allowed.map(function(value, index) {
            if ((_seatData["exception_type"] != undefined && value.event == _seatData["exception_type"]) || value.exception_name == data["activeException"])
                data["list"].push({
                    "text": value.exception_name,
                    "selected": true,
                    "exception_id" : value.exception_id,
                    "details" : [],
                    "event": value["event"] != undefined ? value["event"] : ""
                });
            else
                data["list"].push({
                    "text": value.exception_name,
                    "selected": false,
                    "exception_id" : value.exception_id,
                    "details" : [],
                    "event": value["event"] != undefined ? value["event"] : ""
                });
        })
        return data;
    },
    getExceptionAllowed: function() {
        return _seatData.exception_allowed;
    },

    scanDetails: function() {
        _scanDetails = _seatData.scan_details;
        return _scanDetails;
    },

    productDetails: function() {
        _prodDetails = _seatData.product_info;
        return _prodDetails;
    },

    getItemUid: function() {
        return _seatData.item_uid;
    },

    getRackDetails: function() {
        if (_seatData.hasOwnProperty('rack_details')) {
            return _seatData.rack_details;
        }
    },

    getCurrentSelectedBin: function() {
        var binData = {};
        binData["structure"] = [1, 1];
        binData["ppsbin_list"] = [];
        _seatData.ppsbin_list.map(function(value, index) {
            if (value.selected_state == true)
                binData["ppsbin_list"].push(value);
        })
        return binData;
    },
    tableCol: function(text, status, selected, size, border, grow, bold, disabled, centerAlign, type, buttonType, buttonStatus, mode, text_decoration, color, actionButton, borderBottom, textbox, id, management) {
        this.text = text;
        this.status = status;
        this.selected = selected;
        this.size = size;
        this.border = border;
        this.grow = grow;
        this.bold = bold;
        this.disabled = disabled;
        this.centerAlign = centerAlign;
        this.type = type;
        this.buttonType = buttonType;
        this.buttonStatus = buttonStatus;
        this.borderBottom = borderBottom;
        this.mode = mode,
        this.text_decoration = text_decoration,
        this.color = color,
        this.actionButton = actionButton,
        this.textbox = textbox,
        this.id = id,
        this.management = management
    },
    getPptlData: function() {
        if (_seatData.hasOwnProperty('utility')) {
            var data = {};
            data["header"] = [];
            if(appConstants.PPTL_MANAGEMENT == _seatData.screen_id){
                data["header"].push(new this.tableCol("Bin ID", "header", false, "small", false, true, true, false, false, true, true, false, "peripheral"));
                data["header"].push(new this.tableCol("Barcode", "header", false, "small", true, true, true, false, false, true, true, false, "peripheral"));
                data["header"].push(new this.tableCol("Peripheral ID", "header", false, "small", true, true, true, false, false, true, true, false, "peripheral"));
                data["header"].push(new this.tableCol("Actions", "header", false, "small", true, true, true, false, true, true, true, false, "peripheral" )); 
                data["tableRows"] = [];
                var self = this;
                _seatData.utility.map(function(value, index) {
                    var barcode = '';
                    var peripheralId = '';
                    if(value.hasOwnProperty('barcode')){
                        barcode = value.barcode;
                    }
                    if(value.hasOwnProperty('peripheral_id')){
                        peripheralId = value.peripheral_id;
                    }
                    var buttonText = 'Update';
                    var deletButton = 'Delete';
                    if(barcode == '' && peripheralId  == ''){
                        buttonText = 'Add';
                        deletButton = '';
                    }
                    var textBox = false;
                    if((_action == 'Update' || _action == 'Add') && _binId == value.pps_bin_id){
                        textBox = true;
                        buttonText = 'Finish';
                    }
                    data["tableRows"].push([new self.tableCol(value.pps_bin_id, "enabled", false, "small", false, false, false, false, false, true, true, false, "peripheral"),
                    new self.tableCol(barcode, "enabled", false, "small", true, false, false, false,  false, 'barcodePptl', true, false, "peripheral", false, null, false, '',  textBox, value.pps_bin_id), 
                    new self.tableCol(peripheralId, "enabled", false, "small", true, false, false, false, false, 'peripheralId', true, false, "peripheral", false, null, false,'',  textBox, value.pps_bin_id),
                    new self.tableCol(buttonText, "enabled", false, "small", true, false, false, false, true, true, true, false, "peripheral", true, "blue", true, '',  false, value.pps_bin_id),
                    new self.tableCol(deletButton, "enabled", false, "small", true, false, false, false, true, true, true, false, "peripheral", true, "blue", true, '', false,value.peripheral_id)]); 

                });
            }else{
                data["header"].push(new this.tableCol("Scanner ID", "header", false, "small", false, true, true, false, false, true, true, false, "peripheral", false, null, false, '',  false, null, "scanner-id"));
                data["header"].push(new this.tableCol("Actions", "header", false, "small", true, true, true, false, true, true, true, false, "peripheral",false, null, false, '', false, null, "scanner-action")); 
                data["tableRows"] = [];
                var self = this;
                _seatData.utility.map(function(value, index) {
                    data["tableRows"].push([new self.tableCol(value.peripheral_id, "enabled", false, "small", false, false, false, false, false, true, true, false, "peripheral", false, null, false, '' ,false, null, "scanner-id"),
                    new self.tableCol("Delete", "enabled", false, "small", true, false, false, false, true, true, true, false, "peripheral", true, "blue", true, '', false,value.peripheral_id, "scanner-action")]); 

                }); 
            }
            return data;
        }
    },
    getReconcileData: function() {
        if (_seatData.hasOwnProperty('reconciliation')) {
            var data = {};
            data["header"] = [];
            data["header"].push(new this.tableCol("Box Serial Numbers", "header", false, "small", false, true, true, false));
            data["tableRows"] = [];
            var self = this;
            data["tableRows"].push([new this.tableCol("Product SKU", "enabled", false, "small", false, true, true, false), new this.tableCol("Expected Quantity", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Actual Quantity", "enabled", false, "small", true, false, true, false, true)]);
            _seatData.reconciliation.map(function(value, index) {
                data["tableRows"].push([new self.tableCol(value.product_sku, "enabled", false, "large", false, true, false, false), new self.tableCol(value.expected_quantity, "enabled", false, "large", true, false, false, false, true), new self.tableCol(value.actual_quantity, "enabled", false, "large", true, false, false, false, true)]);

            });
            return data;
        }
    },

    getCurrentBoxSerialData: function() {
        return _seatData.Current_box_details;
    },

    getCancelScanStatus: function() {
        return _seatData.Cancel_scan;
    },

    getReconcileBoxSerialData: function() {
        var data = {};
        data["header"] = [];
        data["tableRows"] = [];
        var self = this;
        var noScanMissing = 0;
        var missingDamagedBoxSerials = '';
        var extraBoxSerials = '';
        var countMissingDamagedBoxSerials = 0;
        _seatData.Box_qty_list.map(function(value, index) {
            if (value.Scan_status == "no_scan") {
                missingDamagedBoxSerials = missingDamagedBoxSerials + value.Box_serial + " , ";
                countMissingDamagedBoxSerials = countMissingDamagedBoxSerials + 1;
            }
        });
        missingDamagedBoxSerials = missingDamagedBoxSerials.replace(/,([^,]*)$/,'$1');
        _seatData.Extra_box_list.map(function(value, index) {
            extraBoxSerials = extraBoxSerials + value.Box_serial + " ";
        });
        if (missingDamagedBoxSerials != 0 || _seatData.Extra_box_list.length != 0) {
            data["header"].push(new this.tableCol("Box Serial Numbers", "header", false, "small", false, true, true, false));
            data["header"].push(new this.tableCol("Missing", "header", false, "small", false, false, true, false, true));
            data["header"].push(new this.tableCol("Extra", "header", false, "small", false, false, true, false, true));
            data["header"].push(new this.tableCol("Barcode Damage", "header", false, "small", false, false, true, false, true));
        }
        if (missingDamagedBoxSerials != 0)
            data["tableRows"].push([new self.tableCol(missingDamagedBoxSerials, "enabled", false, "large", false, true, false, false),
                new self.tableCol(Math.max(countMissingDamagedBoxSerials - _seatData["box_barcode_damage"], 0), "enabled", false, "large", true, false, false, false, true),
                new self.tableCol(0, "enabled", false, "large", true, false, false, false, true),
                new self.tableCol(_seatData["box_barcode_damage"], "enabled", false, "large", true, false, false, false, true)
            ]);
        if (_seatData.Extra_box_list.length != 0)
            data["tableRows"].push([new self.tableCol(extraBoxSerials, "enabled", false, "large", false, true, false, false),
                new self.tableCol(0, "enabled", false, "large", true, false, false, false, true),
                new self.tableCol(_seatData.Extra_box_list.length, "enabled", false, "large", true, false, false, false, true),
                new self.tableCol(0, "enabled", false, "large", true, false, false, false, true)
            ]);
        return data;
    },

    getItemInBoxReconcileData: function() {
        var data = {};
        data["header"] = [];
        data["tableRows"] = [];
        var self = this;
        _seatData.Box_qty_list.map(function(value, index) {
            if (value.Scan_status == "close") {
                var barcodeDamagedQty = 0;
                _seatData.item_in_box_barcode_damage.map(function(val, ind) {
                    if (value.Box_serial == val.Box_serial)
                        barcodeDamagedQty = val.Damage_qty;
                });
                if (Math.max(value.Expected_qty - value.Actual_qty, 0) != 0 || Math.max(value.Actual_qty - value.Expected_qty, 0) != 0 || barcodeDamagedQty != 0)
                    data["tableRows"].push([new self.tableCol(value.Box_serial, "enabled", false, "large", false, true, false, false),
                        new self.tableCol(Math.max(value.Expected_qty - value.Actual_qty - barcodeDamagedQty, 0), "enabled", false, "large", true, false, false, false, true),
                        new self.tableCol(Math.max(value.Actual_qty - value.Expected_qty, 0), "enabled", false, "large", true, false, false, false, true),
                        new self.tableCol(barcodeDamagedQty, "enabled", false, "large", true, false, false, false, true)
                    ]);
            }
        });
        if (data["tableRows"].length > 0) {
            data["header"].push(new this.tableCol("Item in Box Serial Numbers", "header", false, "small", false, true, true, false));
            data["header"].push(new this.tableCol("Missing", "header", false, "small", false, false, true, false, true));
            data["header"].push(new this.tableCol("Extra", "header", false, "small", false, false, true, false, true));
            data["header"].push(new this.tableCol("Barcode Damage", "header", false, "small", false, false, true, false, true));
        }
        return data;
    },

    getLooseItemsData: function() {
        var data = {};
        var disabledStatus;
        //if (_seatData.Current_box_details.length > 0) {
        disabledStatus = false;
        //}
        data["header"] = [];
        data["header"].push(new this.tableCol("Loose Items", "header", false, "small", false, true, true, false));
        if (_seatData["show_expected_qty"] != undefined && _seatData["show_expected_qty"] == true)
            data["header"].push(new this.tableCol("Expected", "header", false, "small", false, false, true, false, true));
        data["header"].push(new this.tableCol("Actual", "header", false, "small", false, false, true, false, true));
        data["tableRows"] = [];
        var self = this;
        var d = [];
        _seatData.Loose_sku_list.map(function(value, index) {
            d = [];
            d.push(new self.tableCol(value.Sku, "enabled", false, "large", false, true, false, disabledStatus));
            if (_seatData["show_expected_qty"] != undefined && _seatData["show_expected_qty"] == true)
                d.push(new self.tableCol(value.Expected_qty, "enabled", false, "large", true, false, false, disabledStatus, true));
            d.push(new self.tableCol(value.Actual_qty, "enabled", (_seatData.Current_box_details.length > 0 && _seatData.Current_box_details[0]["Box_serial"] == null) ? _seatData.Current_box_details[0]["Sku"] == value.Sku : false, "large", true, false, false, disabledStatus, true));
            data["tableRows"].push(d);
        });

        _seatData.extra_loose_sku_item_list.map(function(value, index) {
            d = [];
            d.push(new self.tableCol(value.Sku, "extra", false, "large", false, true, false, false));
            if (_seatData["show_expected_qty"] != undefined && _seatData["show_expected_qty"] == true)
                d.push(new self.tableCol(value.Expected_qty, "enabled", false, "large", true, false, false, false, true));
            d.push(new self.tableCol(value.Actual_qty, "enabled", (_seatData.Current_box_details.length > 0 && _seatData.Current_box_details[0]["Box_serial"] == null) ? _seatData.Current_box_details[0]["Sku"] == value.Sku : false, "large", true, false, false, false, true));
            data["tableRows"].push(d);
        });
        return data;
    },

    getFinishAuditFlag: function() {
        return _finishAuditFlag;
    },

    getReconcileLooseItemsData: function() {
        var data = {};
        data["header"] = [];
        data["tableRows"] = [];
        var self = this;
        var totalLooseItemsMissing = 0;
        var extraLooseItemsMissing = 0;
        var c = 0 ;
         _seatData.Loose_sku_list.map(function(value, index) {
            if (Math.max(value.Expected_qty - value.Actual_qty, 0) != 0 || Math.max(value.Actual_qty - value.Expected_qty, 0) != 0 || _seatData.loose_item_barcode_damage != 0)
                c=c+1;
        })
        _seatData.Loose_sku_list.map(function(value, index) {
            if (Math.max(value.Expected_qty - value.Actual_qty, 0) != 0 || Math.max(value.Actual_qty - value.Expected_qty, 0) != 0 || _seatData.loose_item_barcode_damage != 0)
            data["tableRows"].push([new self.tableCol(value.Sku, "enabled", false, "large", false, true, false, false),
                new self.tableCol(Math.max(value.Expected_qty - value.Actual_qty, 0), "enabled", false, "large", true, false, false, false, true),
                new self.tableCol(Math.max(value.Actual_qty - value.Expected_qty, 0), "enabled", false, "large", true, false, false, false, true),
                new self.tableCol(index==((c%2==0?c/2:((c+1)/2))-1)?_seatData.loose_item_barcode_damage:"", "enabled", false, "large", true, false, false, false, true,'','','','','','','',false)
            ]);

        });
         /*if (data["tableRows"].length > 0)
         data["tableRows"].push([new self.tableCol("Damaged Barcodes", "enabled", false, "large", false, true, true, false),
                new self.tableCol(_seatData.loose_item_barcode_damage, "enabled", false, "large", true, false, true, false, true)
            ]);*/
        if (data["tableRows"].length > 0) {
            data["header"].push(new this.tableCol("Loose Items Serial Numbers", "header", false, "small", false, true, true, false));
            data["header"].push(new this.tableCol("Missing", "header", false, "small", false, false, true, false, true));
            data["header"].push(new this.tableCol("Extra", "header", false, "small", false, false, true, false, true));
            data["header"].push(new this.tableCol("Barcode Damage", "header", false, "small", false, false, true, false, true));
        }
        return data;
    },



    getToteId: function() {
        if (_seatData.hasOwnProperty('tote_id')) {
            return _seatData.tote_id;
        } else {
            return null;
        }
    },


    getItemDetailsData: function() {
        var data = {};
        data["header"] = [];
        data["header"].push(new this.tableCol("Product Details", "header", false, "small", false, true, true, false));
        data["tableRows"] = [];
        var self = this;
        if (_seatData.product_info != undefined && Object.keys(_seatData.product_info).length > 0) {

            var product_info_locale = {};
            var language_locale = sessionStorage.getItem('localeData');
            var locale;
            if(language_locale == 'null' || language_locale == null){
              locale = 'en-US';
            }else{
              locale = JSON.parse(language_locale)["data"]["locale"]; 
            } 
            _seatData.product_info.map(function(value, index){
              var keyValue;
              
                for (var key in value[0]) { 
                    if(key != 'display_data' && key != 'product_local_image_url' ){
                      keyValue = value[0][key] + ' ';
                     }
                }
                value[0].display_data.map(
                    function(data_locale, index1){
                     if(data_locale.locale == locale){
                        if(data_locale.display_name != 'product_local_image_url' ){
                          product_info_locale[data_locale.display_name] = keyValue;
                        }
                      }                    
                    }
                )              
            });
            for (var key in product_info_locale) {
                if (product_info_locale.hasOwnProperty(key)) {
                    data["tableRows"].push([new self.tableCol(key, "enabled", false, "small", false, true, false, false), new self.tableCol(product_info_locale[key], "enabled", false, "small", false, true, false, false)]);
                }
            }
        } else {
            data["tableRows"].push([new self.tableCol("Product Name", "enabled", false, "small", false, true, false, false),
                new self.tableCol("--", "enabled", false, "small", false, true, false, false)
            ]);
            data["tableRows"].push([new self.tableCol("Product Desc", "enabled", false, "small", false, true, false, false),
                new self.tableCol("--", "enabled", false, "small", false, true, false, false)
            ]);
            data["tableRows"].push([new self.tableCol("Product SKU", "enabled", false, "small", false, true, false, false),
                new self.tableCol("--", "enabled", false, "small", false, true, false, false)
            ]);
            data["tableRows"].push([new self.tableCol("Product Type", "enabled", false, "small", false, true, false, false),
                new self.tableCol("--", "enabled", false, "small", false, true, false, false)
            ]);
        }

        return data;
    },


    getScanDetails: function() {
        if (_seatData["scan_details"] == undefined) {
            var data = {
                "scan_details": {
                    "current_qty": this.getkQQuanity(),
                    "total_qty": "0",
                    "kq_allowed": this.kQstatus()
                }
            };
            return data.scan_details;
        } else {
            return _seatData["scan_details"];
        }
    },
    kQstatus: function() {
        if (_seatData.hasOwnProperty('enable_kq')) {
            return _seatData.enable_kq;
        } else {
            return true;
        }
    },
    getGoodScanDetails: function() {
        if (_seatData["scan_details"] == undefined) {
            var data = {
                "scan_details": {
                    "current_qty": _goodQuantity,
                    "total_qty": "0",
                    "kq_allowed": true
                }
            };
            return data.scan_details;
        } else {
            return _seatData["scan_details"];
        }
    },

    getMissingScanDetails: function() {
        if (_seatData["scan_details"] == undefined) {
            var data = {
                "scan_details": {
                    "current_qty": _missingQuantity,
                    "total_qty": "0",
                    "kq_allowed": true
                }
            };
            return data.scan_details;
        } else {
            return _seatData["scan_details"];
        }
    },

    getDamagedScanDetails: function() {
        if (_seatData["scan_details"] == undefined) {
            var data = {
                "scan_details": {
                    "current_qty": _damagedQuantity,
                    "total_qty": "0",
                    "kq_allowed": true
                }
            };
            return data.scan_details;
        } else {
            return _seatData["scan_details"];
        }
    },

    setCurrentSeat: function(data) {
        //showModal = false;
        _action = undefined;
        _binId= undefined;
        _enableException = false;
        _KQQty = 0;
        _putFrontExceptionScreen = "good";
        _goodQuantity = 0;
        _damagedQuantity = 0;
        _missingQuantity = 0;
        _activeException = "";
        _showSpinner = false;
        _enableException = false;
        _seatData = data;
        _seatName = data.seat_name;
        _seatMode = data.mode;
        _seatType = data.seat_type;
        _currentSeat = data.mode + "_" + data.seat_type;
        _itemUid = data["item_uid"] != undefined ? data["item_uid"] : "";
        _exceptionType = data["exception_type"] != undefined ? data["exception_type"] : "";
        _screenId = data.screen_id;
        this.setServerMessages();
        if (_seatData.hasOwnProperty('utility')) {
            _utility = _seatData.utility;
        }
        if (_screenId == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED)
            _putFrontExceptionScreen = "good";
        else if (_screenId == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE)
            _putFrontExceptionScreen = "take_item_from_bin";
        else if (_screenId == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED)
            _pickFrontExceptionScreen = "good";
        else if (_screenId == appConstants.PICK_FRONT_EXCEPTION_MISSING_BOX)
            _pickFrontExceptionScreen = "box_serial";
        if((_seatData["last_finished_box"]!=undefined && _seatData["last_finished_box"].length > 0 && (_seatData["last_finished_box"][0]["Actual_qty"] > _seatData["last_finished_box"][0]["Expected_qty"])) || (_seatData["Current_box_details"]!=undefined && _seatData["Current_box_details"].length > 0 && (_seatData["Current_box_details"][0]["Actual_qty"]-_seatData["Current_box_details"][0]["Expected_qty"])>0))
            showModal = true;
        else
            showModal=false;

         /* $('.modal').hide();
          $('.modal-backdrop').remove();*/

    },
    getModalContent: function() {
        return modalContent.data;
    },
    getSystemIdleState: function() {
        if (_seatData != undefined) {
            return _seatData.is_idle;
        } else {
            return null;
        }
    },

    getItemUid: function() {
        return _itemUid;
    },
    getExceptionType: function() {
        return _exceptionType;
    },
    getModalType: function() {
        return modalContent.type;
    },
    setModalContent: function(data) {
        modalContent = data;
    },

    getPPTLEvent: function() {
        switch (_currentSeat) {
            case appConstants.PUT_BACK:
                _pptlEvent = 'secondary_button_press';
                break;
            case appConstants.PUT_FRONT:
                _pptlEvent = 'primary_button_press';
                break;
            case appConstants.PICK_BACK:
                _pptlEvent = 'secondary_button_press';
                break;
            case appConstants.PICK_FRONT:
                _pptlEvent = 'primary_button_press';
                break;
            default:
                //return true; 
        }
        return _pptlEvent;
    },
    getCurrentSeat: function() {
        return _currentSeat;
    },
    setServerMessages: function(data) {
        _messageJson = serverMessages;
    },
    getServerMessages: function() {
        return _messageJson;
    },
    changeLanguage: function(data) {

        var locale_data ={
            "data" :{
                "locale" : data
            }
        };
        switch (data) {
            case "ch":
                _.setTranslation(chinese);
                break;
            case "en-US":
                _.setTranslation(english);
                break;
            default:
                return true;
        }

        sessionStorage.setItem('localeData', JSON.stringify(locale_data));
    },
    postDataToInterface: function(data) {
        showModal = false;
        utils.postDataToInterface(data, _seatName);
    },
    logError: function(data) {
        utils.logError(data);
    },
    getScreenId: function() {
        console.log(_screenId);
        return _screenId;
    },
    getPpsMode: function(){
        return _seatMode;
    },
    getSeatType: function(){
        return _seatType;
    },
    enableException: function(data) {
        _KQQty = 0;
        _activeException = "";
        _enableException = data;
    },
    getExceptionStatus: function() {
        return _enableException;
    },

    setActiveException: function(data) {
        _activeException = data;
    },
    getActiveException: function() {
        return _activeException;
    },
    setKQQuanity: function(data) {
        _KQQty = data;
    },
    setGoodQuanity: function(data) {
        _goodQuantity = data;
    },
    setMissingQuanity: function(data) {
        _missingQuantity = data;
    },
    setDamagedQuanity: function(data) {
        _damagedQuantity = data;
    },
    getkQQuanity: function() {
        if (_seatData.hasOwnProperty('Current_box_details')) {
            if (_seatData.Current_box_details.length > 0) {
                _KQQty = _seatData.Current_box_details[0].Actual_qty;
            }
            return _KQQty;
        } else {
            return _KQQty;
        }
    },

    getToteDetails: function() {
        if (_seatData.hasOwnProperty('tote_details')) {
            return _seatData.tote_details
        } else {
            return null;
        }
    },

    setPutFrontExceptionScreen: function(data) {
        _putFrontExceptionScreen = data;
    },

    setPickFrontExceptionScreen: function(data) {
        if (data == "pick_front_quantity") {
            if ((_goodQuantity + _damagedQuantity + _missingQuantity) != _seatData["pick_quantity"]) {
                if (_seatData.notification_list.length == 0) {
                    var data = {};
                    data["code"] = "1234";
                    data["level"] = "error";
                    data["description"] = "Pick Quantity should be equal to damaged ,missing and good";
                    data["details"] = [];
                    _seatData.notification_list.push(data);
                    _pickFrontExceptionScreen = "good";
                } else {
                    _seatData.notification_list[0].description = "Pick Quantity should be equal to damaged ,missing and good";
                    _seatData.notification_list[0].level = "error";
                }
            } else {
                _pickFrontExceptionScreen = data;
            }
        } else {
            _pickFrontExceptionScreen = data;
        }
    },

    getPutFrontExceptionScreen: function() {
        return _putFrontExceptionScreen;
    },

    getPickFrontExceptionScreen: function() {
        return _pickFrontExceptionScreen;
    },

    getCurrentSlot: function() {
        if (_seatData.hasOwnProperty('rack_details')) {
            return _seatData.rack_details.slot_barcodes;
        } else {
            return null;
        }
    },

    validateAndSendDataToServer: function() {
        
        var flag = false;
        if (_seatData.screen_id == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED)
            flag = (_goodQuantity + _damagedQuantity + _missingQuantity) != _seatData.pick_quantity;
        else
            flag = (_goodQuantity + _damagedQuantity + _missingQuantity) != _seatData.put_quantity;
        if (flag) {
            if (_seatData.notification_list.length == 0) {
                var data = {};
                data["code"] = resourceConstants.CLIENTCODE_010;
                data["level"] = "error";
                data["details"] = [];
                _seatData.notification_list[0] = data;
                _putFrontExceptionScreen = "good";
            } else {
                _seatData.notification_list[0].code = resourceConstants.CLIENTCODE_010;
                _seatData.notification_list[0].level = "error";
            }
        } else {
            var data = {};
            if (_seatData.screen_id == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED)
                data["event_name"] = "put_front_exception";
            else if (_seatData.screen_id == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED)
                data["event_name"] = "pick_front_exception";
            data["event_data"] = {};
            data["event_data"]["action"] = "confirm_quantity_update";
            data["event_data"]["event"] = _seatData.exception_type;
            data["event_data"]["quantity"] = {};
            data["event_data"]["quantity"]["good"] = _goodQuantity;
            data["event_data"]["quantity"]["damaged"] = _damagedQuantity;
            data["event_data"]["quantity"]["missing"] = _missingQuantity;
            this.showSpinner();
            utils.postDataToInterface(data, _seatData.seat_name);
        }
    },



    validateAndSendSpaceUnavailableDataToServer: function() {
        if ((_KQQty) > _seatData.put_quantity) {
            if (_seatData.notification_list.length == 0) {
                var data = {};
                data["code"] = resourceConstants.CLIENTCODE_010;
                data["level"] = "error";
                data["details"] = [];
                _seatData.notification_list[0] = data;
            } else {
                _seatData.notification_list[0].code = resourceConstants.CLIENTCODE_010;
                _seatData.notification_list[0].level = "error";
            }
         
        } else {
            var data = {};
            data["event_name"] = "put_front_exception";
            data["event_data"] = {};
            data["event_data"]["action"] = "confirm_quantity_update";
            data["event_data"]["event"] = _seatData.exception_type;
            data["event_data"]["quantity"] = _KQQty;
            this.showSpinner();
            utils.postDataToInterface(data, _seatData.seat_name);
        }
    },
    getToteException: function() {
        if (_seatData.hasOwnProperty('exception_msg')) {
            return _seatData.exception_msg[0];
        } else {
            return null;
        }
    },
    getPeripheralData: function(data) {
        utils.getPeripheralData(data, _seatData.seat_name);
    },
    updateSeatData: function(data, type, status) {
        if (type === 'pptl') {
            _seatData["screen_id"] = appConstants.PPTL_MANAGEMENT;
        } else if (type === 'barcode_scanner') {
            _seatData["screen_id"] = appConstants.SCANNER_MANAGEMENT;
        } 
        if(status == "success"){
            _seatData.notification_list[0]["code"] = resourceConstants.CLIENTCODE_006;
            _seatData.notification_list[0]["level"] = "info";
        }
        else if(status == "fail"){
            _seatData.notification_list[0]["code"] = resourceConstants.CLIENTCODE_007;
            _seatData.notification_list[0]["level"] = "error";
        }else {
            if(_seatData.notification_list.length > 0){
                _seatData.notification_list[0]["code"] = null;
                _seatData.notification_list[0].description = "";
            }
        }
        _seatData["utility"] = data;
        this.setCurrentSeat(_seatData);
        console.log(_seatData);
    },
    getUtility: function() {
        return _utility;
    },
    convert_textbox : function(action, index){
        _action = action;
        _binId = index;
    },
    update_peripheral : function(data, method, index){
       utils.updatePeripherals(data, method, _seatName); 
    },
    generateNotification : function(data){
        if(_seatData.notification_list.length > 0){
            _seatData.notification_list[0]["code"] = data.code;
            _seatData.notification_list[0].level = data.level;
        }else{
            var notification_list = {
                "code" : data.code,
                "level" : data.level,
                "details" :[],
                "description" : ""
            }
            _seatData.notification_list[0] = notification_list;
        }    
    },
    getScreenData: function() {
        var data = {};
        switch (_screenId) {
            case appConstants.PUT_BACK_STAGE:
            case appConstants.PUT_BACK_SCAN_TOTE:
                data["PutBackBinData"] = this.getBinData();
                data["PutBackScreenId"] = this.getScreenId();
                data["StageActive"] = this.getStageActiveStatus();
                data["StageAllActive"] = this.getStageAllActiveStatus();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                break;
            case appConstants.PUT_BACK_INVALID_TOTE_ITEM:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackItemUid"] = this.getItemUid();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                data["PutBackToteException"] = this.getToteException();
                break;
            case appConstants.PUT_BACK_SCAN:
                data["PutBackBinData"] = this.getBinData();
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackScanDetails"] = this.scanDetails();
                data["PutBackProductDetails"] = this.productDetails();
                data["PutBackItemUid"] = this.getItemUid();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                break;
            case appConstants.PUT_BACK_TOTE_CLOSE:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackReconciliation"] = this.getReconcileData();
                data["PutBackToteId"] = this.getToteId();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                break;
            case appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE:
            case appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackKQDetails"] = this.getScanDetails();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                break;
            case appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackKQDetails"] = this.getScanDetails();
                data["PutBackExceptionProductDetails"] = this.getItemDetailsData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                break;
            case appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackBinData"] = this.getBinData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                break;
            case appConstants.PUT_BACK_EXCEPTION_PUT_EXTRA_ITEM_IN_IRT_BIN:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                break;
            case appConstants.PUT_FRONT_WAITING_FOR_RACK:
                data["PutFrontNavData"] = this.getNavData();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontExceptionStatus"] = this.getExceptionStatus();
                break;
            case appConstants.PUT_FRONT_SCAN:
                data["PutFrontNavData"] = this.getNavData();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontBinData"] = this.getBinData();
                data["PutFrontScanDetails"] = this.scanDetails();
                data["PutFrontProductDetails"] = this.productDetails();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontExceptionStatus"] = this.getExceptionStatus();
                data["PutFrontItemUid"] = this.getItemUid();
                break;
            case appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK:
                data["PutFrontNavData"] = this.getNavData();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontCurrentBin"] = this.getCurrentSelectedBin();
                data["PutFrontRackDetails"] = this.getRackDetails();
                data["PutFrontScanDetails"] = this.scanDetails();
                data["PutFrontProductDetails"] = this.productDetails();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontExceptionStatus"] = this.getExceptionStatus();
                data["PutFrontItemUid"] = this.getItemUid();
                break;
            case appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED:
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontGoodQuantity"] = this.getGoodScanDetails();
                data["PutFrontDamagedQuantity"] = this.getDamagedScanDetails();
                data["PutFrontMissingQuantity"] = this.getMissingScanDetails();
                data["PutFrontExceptionScreen"] = this.getPutFrontExceptionScreen();
                break;
            case appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE:
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontKQQuantity"] = this.getScanDetails();
                data["PutFrontExceptionScreen"] = this.getPutFrontExceptionScreen();
                break;

            case appConstants.PICK_FRONT_WAITING_FOR_MSU:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_LOCATION_SCAN:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontRackDetails"] = this.getRackDetails();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_ITEM_SCAN:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontRackDetails"] = this.getRackDetails();
                data["PickFrontProductDetails"] = this.productDetails();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_CONTAINER_SCAN:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontBoxDetails"] = this.getBoxDetails();
                data["PickFrontRackDetails"] = this.getRackDetails();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_MORE_ITEM_SCAN:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontScanDetails"] = this.scanDetails();
                data["PickFrontChecklistDetails"] = this.getChecklistDetails();
                data["PickFrontChecklistIndex"] = this.getChecklistIndex();
                data["PickFrontSlotDetails"] = this.getCurrentSlot();
                data["PickFrontBinData"] = this.getBinData();
                data["PickFrontScanDetails"] = this.scanDetails();
                data["PickFrontProductDetails"] = this.productDetails();
                data["PickFrontItemUid"] = this.getItemUid();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_PPTL_PRESS:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontScanDetails"] = this.scanDetails();
                data["PickFrontChecklistDetails"] = this.getChecklistDetails();
                data["PickFrontChecklistIndex"] = this.getChecklistIndex();
                data["PickFrontSlotDetails"] = this.getCurrentSlot();
                data["PickFrontBinData"] = this.getBinData();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED:
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontGoodQuantity"] = this.getGoodScanDetails();
                data["PickFrontDamagedQuantity"] = this.getDamagedScanDetails();
                data["PickFrontMissingQuantity"] = this.getMissingScanDetails();
                data["PickFrontExceptionScreen"] = this.getPickFrontExceptionScreen();
                break;
            case appConstants.PICK_FRONT_EXCEPTION_MISSING_BOX:
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionScreen"] = this.getPickFrontExceptionScreen();
                data["PickFrontBoxDetails"] = this.getBoxDetails();
                break;
            case appConstants.PICK_BACK_BIN:
            case appConstants.PICK_BACK_SCAN:
                data["PickBackNavData"] = this.getNavData();
                data["PickBackNotification"] = this.getNotificationData();
                data["PickBackBinData"] = this.getBinData();
                data["PickBackScreenId"] = this.getScreenId();
                data["PickBackServerNavData"] = this.getServerNavData();
                data["PickBackToteDetails"] = this.getToteDetails();
                data["PickBackExceptionStatus"] = this.getExceptionStatus();
                data["PickBackExceptionData"] = this.getExceptionData();
                break;
            case appConstants.PICK_BACK_EXCEPTION_REPRINT:
            case appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING:
            case appConstants.PICK_BACK_EXCEPTION_DIS_ASSOCIATE_TOTE:
            case appConstants.PICK_BACK_EXCEPTION_OVERRIDE_TOTE:
                data["PickBackNavData"] = this.getNavData();
                data["PickBackNotification"] = this.getNotificationData();
                data["PickBackBinData"] = this.getBinData();
                data["PickBackScreenId"] = this.getScreenId();
                data["PickBackExceptionData"] = this.getExceptionData();
                data["PickBackServerNavData"] = this.getServerNavData();
                data["PickBackToteDetails"] = this.getToteDetails();
                data["PickBackExceptionStatus"] = this.getExceptionStatus();
                data["PickBackSelectedBin"] = this.getSelectedBin();
                break;
            case appConstants.AUDIT_WAITING_FOR_MSU:
                data["AuditNavData"] = this.getNavData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                data["AuditShowModal"] = this.getModalStatus();
                break;
            case appConstants.AUDIT_SCAN:
                data["AuditNavData"] = this.getNavData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                data["AuditShowModal"] = this.getModalStatus();
                data["AuditCancelScanStatus"] = this.getCancelScanStatus();
                data["AuditBoxSerialData"] = this.getBoxSerialData();
                data["AuditLooseItemsData"] = this.getLooseItemsData();
                data["AuditSlotDetails"] = this.getCurrentSlot();
                data["AuditItemDetailsData"] = this.getItemDetailsData();
                data["AuditScanDetails"] = this.getScanDetails();
                data["AuditFinishFlag"] = this.getFinishAuditFlag();
                break;
            case appConstants.AUDIT_RECONCILE:
                data["AuditNavData"] = this.getNavData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                data["AuditShowModal"] = this.getModalStatus();
                data["AuditReconcileBoxSerialData"] = this.getReconcileBoxSerialData();
                data["AuditReconcileLooseItemsData"] = this.getReconcileLooseItemsData();
                data["AuditReconcileItemInBoxData"] = this.getItemInBoxReconcileData();
                data["AuditSlotDetails"] = this.getCurrentSlot();
                break;
            case appConstants.AUDIT_LOCATION_SCAN:
                data["AuditNavData"] = this.getNavData();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditRackDetails"] = this.getRackDetails();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                data["AuditShowModal"] = this.getModalStatus();
                break;
            case appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE:
            case appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION:
            case appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION:
                data["AuditNavData"] = this.getNavData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                //data["AuditShowModal"] = this.getModalStatus();
                data["AuditKQDetails"] = this.getScanDetails();
                break;
            case appConstants.PPTL_MANAGEMENT:
            case appConstants.SCANNER_MANAGEMENT:
                data["utility"] = this.getPptlData();
                data["PutBackScreenId"] = this.getScreenId();
                data["PutFrontScreenId"] = this.getScreenId();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickBackScreenId"] = this.getScreenId();
                data["AuditScreenId"] = this.getScreenId();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                data["PutBackPpsMode"] = this.getPpsMode();
                data["PutBackSeatType"] = this.getSeatType();
                data["PutFrontPpsMode"] = this.getPpsMode();
                data["PutFrontSeatType"] = this.getSeatType();

                data["PickBackPpsMode"] = this.getPpsMode();
                data["PickBackSeatType"] = this.getSeatType();
                data["PickFrontPpsMode"] = this.getPpsMode();
                data["PickFrontSeatType"] = this.getSeatType();

                data["PutFrontNavData"] = this.getNavData();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontExceptionStatus"] = this.getExceptionStatus();

                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();

                data["PickBackNavData"] = this.getNavData();
                data["PickBackServerNavData"] = this.getServerNavData();
                data["PickBackExceptionData"] = this.getExceptionData();
                data["PickBackNotification"] = this.getNotificationData();
                data["PickBackExceptionStatus"] = this.getExceptionStatus();

                data["AuditNavData"] = this.getNavData();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();

                break;
            default:
        }
        return data;
    }



});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.actionType) {
        case appConstants.TOGGLE_BIN_SELECTION:
            mainstore.toggleBinSelection(action.bin_id);
            mainstore.emitChange();
            break;
        case appConstants.STAGE_ONE_BIN:
            mainstore.showSpinner();
            mainstore.stageOneBin();
            mainstore.emitChange();
            break;

        case appConstants.STAGE_ALL:
            mainstore.showSpinner();
            mainstore.stageAllBin();
            mainstore.emitChange();
            break;
        case appConstants.WEBSOCKET_CONNECT:
            utils.connectToWebSocket();
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.SET_CURRENT_SEAT:
            mainstore.setCurrentSeat(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.POPUP_VISIBLE:
            setPopUpVisible(action.status);
            break;
        case appConstants.POST_DATA_TO_INTERFACE:
            mainstore.showSpinner();
            mainstore.postDataToInterface(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.RESET_NUMPAD:
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.LOAD_MODAL:
            mainstore.setModalContent(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.SET_SERVER_MESSAGES:
            mainstore.setServerMessages();
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.CHANGE_LANGUAGE:
            mainstore.changeLanguage(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.SET_LANGUAGE:
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.LOG_ERROR:
            mainstore.logError(action.data);
            break;
        case appConstants.ENABLE_EXCEPTION:
            mainstore.enableException(action.data);
            mainstore.emitChange();
            break;
        case appConstants.SET_ACTIVE_EXCEPTION:
            mainstore.setActiveException(action.data);
            mainstore.emitChange();
            break;
        case appConstants.UPDATE_KQ_QUANTITY:
            mainstore.setKQQuanity(action.data);
            mainstore.emitChange();
            break;
        case appConstants.UPDATE_GOOD_QUANTITY:
            mainstore.setGoodQuanity(action.data);
            mainstore.emitChange();
            break;
        case appConstants.UPDATE_DAMAGED_QUANTITY:
            mainstore.setDamagedQuanity(action.data);
            mainstore.emitChange();
            break;
        case appConstants.UPDATE_MISSING_QUANTITY:
            mainstore.setMissingQuanity(action.data);
            mainstore.emitChange();
            break;
        case appConstants.CHANGE_PUT_FRONT_EXCEPTION_SCREEN:
            mainstore.setPutFrontExceptionScreen(action.data);
            mainstore.emitChange();
            break;
        case appConstants.CHANGE_PICK_FRONT_EXCEPTION_SCREEN:
            mainstore.setPickFrontExceptionScreen(action.data);
            mainstore.emitChange();
            break;
        case appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER:
            mainstore.validateAndSendDataToServer();
            mainstore.emitChange();
            break;
        case appConstants.VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER:
            mainstore.validateAndSendSpaceUnavailableDataToServer();
            mainstore.emitChange();
            break;
        case appConstants.PERIPHERAL_DATA:
            mainstore.getPeripheralData(action.data);
            mainstore.emitChange();
            break;
        case appConstants.UPDATE_SEAT_DATA:
            mainstore.showSpinner();
            mainstore.updateSeatData(action.data, action.type, action.status);
            mainstore.emitChange();
            break;
        case appConstants.CONVERT_TEXTBOX:
            mainstore.convert_textbox(action.data, action.index);
            mainstore.emitChange();
            break;
        case appConstants.UPDATE_PERIPHERAL:
            mainstore.showSpinner();
            mainstore.update_peripheral(action.data, action.method, action.index);
            mainstore.emitChange();
            break;
        case appConstants.GENERATE_NOTIFICATION:
            mainstore.generateNotification(action.data);
            mainstore.emitChange();
            break;    
        default:
            return true;
    }
});

module.exports = mainstore;