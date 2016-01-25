var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var SVGConstants = require('../constants/svgConstants');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');
var serverMessages = require('../serverMessages/server_messages');
var chinese = require('../serverMessages/chinese');
var navConfig = require('../config/navConfig');
var resourceConstants = require('../constants/resourceConstants');

var CHANGE_EVENT = 'change';
var _seatData, _currentSeat, _seatName, _pptlEvent, _cancelEvent, _messageJson, _screenId, _itemUid, _exceptionType, _KQQty = 0,_logoutStatus,
    _activeException = "",
    _enableException = false,
    popupVisible = false,
    _showSpinner = true,
    _goodQuantity = 0,
    _damagedQuantity = 0,
    _putFrontExceptionScreen = "good",
    _missingQuantity = 0;
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
    setLogoutState : function(){
        _logoutStatus = _seatData.logout_allowed;
    },
    getSpinnerState: function() {
        return _showSpinner;
    },
    getLogoutState: function(){
       if(_seatData.hasOwnProperty("logout_allowed"))
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
    getNavData: function() {
        switch (_currentSeat) {
            case appConstants.PUT_BACK:
                _NavData = navConfig.putBack;
                break;
            case appConstants.PUT_FRONT:
                if (_seatData.screen_id === appConstants.PUT_FRONT_WAITING_FOR_RACK)
                    _NavData = navConfig.putFront[0];
                else
                    _NavData = navConfig.putFront[1];
                break;
            case appConstants.PICK_BACK:
                _NavData = navConfig.pickBack;
                break;
            case appConstants.PICK_FRONT:
                if (_seatData.screen_id === appConstants.PUT_FRONT_WAITING_FOR_RACK)
                    _NavData = navConfig.pickFront[0];
                else
                    _NavData = navConfig.pickFront[1];
                break;
            default:
                //return true; 
        }
        _NavData.map(function(data, index) {
            if (data.screen_id instanceof Array) {
                if (data.screen_id.indexOf(_seatData.screen_id) != -1) {
                    if(_seatData.screen_id === appConstants.PUT_BACK_TOTE_CLOSE){                       
                        _NavData[index].image = SVGConstants.tote;
                    }
                    else
                        _NavData[index].image = SVGConstants.scan;
                    _NavData[index].type = 'active';
                } else {
                    _NavData[index].type = 'passive';
                }
            } else if (_seatData.screen_id === data.screen_id) {
                _NavData[index].type = 'active';
            } else {
                _NavData[index].type = 'passive';
            }
        });

        return _NavData;
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
            var data = "";
            _seatData.ppsbin_list.map(function(value, index) {
                if (value["selected_for_staging"] != undefined && value["selected_for_staging"] == true) {
                    data = value.ppsbin_id;
                }
            });

            return data;
        }
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
                    "event": value["event"] != undefined ? value["event"] : ""
                });
            else
                data["list"].push({
                    "text": value.exception_name,
                    "selected": false,
                    "event": value["event"] != undefined ? value["event"] : ""
                });
        })
        return data;
    },
    getExceptionAllowed:function(){
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

    tableCol: function(text, status, selected, size, border, grow, bold, disabled, centerAlign, type, buttonType) {
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
            for (var key in _seatData.product_info) {
                if (_seatData.product_info.hasOwnProperty(key)) {
                    data["tableRows"].push([new self.tableCol(key, "enabled", false, "small", false, true, false, false), new self.tableCol(_seatData.product_info[key], "enabled", false, "small", false, true, false, false)]);
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
                    "kq_allowed": true
                }
            };
            return data.scan_details;
        } else {
            return _seatData["scan_details"];
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
        _currentSeat = data.mode + "_" + data.seat_type;
        _itemUid = data["item_uid"] != undefined ? data["item_uid"] : "";
        _exceptionType = data["exception_type"] != undefined ? data["exception_type"] : "";
        _screenId = data.screen_id;
        if(_screenId == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED)
            _putFrontExceptionScreen = "good";
        else if(_screenId == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE)
            _putFrontExceptionScreen = "take_item_from_bin";

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
    
    getItemUid:function(){
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
        switch (data) {
            case "chinese":
                _.setTranslation(chinese);
        }
    },
    postDataToInterface: function(data) {
        utils.postDataToInterface(data, _seatName);
    },
    logError: function(data) {
        utils.logError(data);
    },
    getScreenId: function() {
        return _screenId;
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
        return _KQQty;
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
    getPutFrontExceptionScreen: function() {
        return _putFrontExceptionScreen;
    },

    getCurrentSlot : function(){        
        if(_seatData.hasOwnProperty('rack_details')){       
            return _seatData.rack_details.slot_barcodes;
        }else{
            return null;
        }
    },

    validateAndSendPutDataToServer: function() {
        if ((_goodQuantity + _damagedQuantity + _missingQuantity) != _seatData.put_quantity) {
            if (_seatData.notification_list.length == 0) {
                var data = {};
                data["code"] = "1234";
                data["level"] = "error";
                data["description"] = "Put Quantity should be equal to damaged ,missing and good";
                data["details"] = [];
                _seatData.notification_list.push(data);
                _screenGoodOrDamaged = "good";
            }else{
                _seatData.notification_list[0].description = "Put Quantity should be equal to damaged ,missing and good";
                _seatData.notification_list[0].level = "error";
            }
        } else {
            var data = {};
            data["event_name"] = "put_front_exception";
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

    validateAndSendSpaceUnavailableDataToServer:function(){
        if ((_KQQty) > _seatData.put_quantity) {
            if (_seatData.notification_list.length == 0) {
                var data = {};
                data["code"] = "1234";
                data["level"] = "error";
                data["description"] = "Revised Quantity should be less than or equal to put quantity";
                data["details"] = [];
                _seatData.notification_list.push(data);
            }else{
                _seatData.notification_list[0].description = "Put Quantity should be equal to damaged ,missing and good";
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
                data["PutBackNotification"] = mainstore.getNotificationData();
                break;
            case appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackBinData"] = this.getBinData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = mainstore.getNotificationData();
                break;
            case appConstants.PUT_BACK_EXCEPTION_PUT_EXTRA_ITEM_IN_IRT_BIN:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = mainstore.getNotificationData();
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
                data["PickFrontSlotDetails"] = this.getCurrentSlot();
                data["PickFrontBinData"] = this.getBinData();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
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
                break;
            default:
        }
        return data;
    }



});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    console.log(action.actionType);
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
        case appConstants.VALIDATE_AND_SEND_PUT_DATA_TO_SERVER:
            mainstore.validateAndSendPutDataToServer();
            mainstore.emitChange();
            break;
        case appConstants.VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER:
            mainstore.validateAndSendSpaceUnavailableDataToServer();
            mainstore.emitChange();

        default:
            return true;
    }
});

module.exports = mainstore;