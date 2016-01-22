var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';
var navConfig = require('../config/navConfig');
var utils = require('../utils/utils');
var resourceConstants = require('../constants/resourceConstants');

var _PutBackData, _NavData, _NotificationData, _scanDetails, _prodDetails, modalContent, _serverNavData, _enableException = false,
    _activeException = null;


var PutBackStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    toggleBinSelection: function(bin_id) {
        _PutBackData["ppsbin_list"].map(function(value, index) {
            if (value.ppsbin_id == bin_id) {
                if (value["selected_for_staging"] != undefined)
                    value["selected_for_staging"] = !value["selected_for_staging"];
                else
                    value["selected_for_staging"] = true;
            } else if (value["selected_for_staging"] != undefined)
                value["selected_for_staging"] = false;
        });
        if (_PutBackData.notification_list.length != 0) {
            _PutBackData.notification_list[0].description = resourceConstants.BIN + ' ' + bin_id + ' ' + resourceConstants.SELECTED;
        } else {
            // _PutBackData.notification_list = undefined;
        }
    },

    getExceptionData: function() {
        var data = {};
        data["activeException"] = this.getActiveException();
        data["list"] = [];
        data["header"] = "Exceptions";
        _PutBackData.exception_allowed.map(function(value, index) {
            if (value.exception_name == data["activeException"])
                data["list"].push({
                    "text": value.exception_name,
                    "selected": true
                });
            else
                data["list"].push({
                    "text": value.exception_name,
                    "selected": false
                });
        })
        return data;
    },

    setActiveException: function(data) {
        _activeException = data;
    },
    getActiveException: function() {
        return _activeException;
    },
    getStageActiveStatus: function() {
        if (_PutBackData.hasOwnProperty('ppsbin_list')) {
            var flag = false;
            _PutBackData["ppsbin_list"].map(function(value, index) {
                if (value["selected_for_staging"] != undefined && value["selected_for_staging"] == true)
                    flag = true;
            });
            return flag;
        }
    },

    getStageAllActiveStatus: function() {
        if (_PutBackData.hasOwnProperty('ppsbin_list')) {
            var flag = false;
            _PutBackData["ppsbin_list"].map(function(value, index) {
                if (value.ppsbin_count > 0 && value.ppsbin_state != "staged")
                    flag = true;
            });
            return flag;
        }
    },
    getNavData: function() {        
        _NavData = navConfig.putBack;
        //alert(JSON.stringify(_NavData));
        _NavData.map(function(data, index) {            
            if (data.screen_id instanceof Array) {
                if (data.screen_id.indexOf(_PutBackData.screen_id) != -1) {
                    if(_PutBackData.screen_id === "put_back_tote_close"){
                        _NavData[index].image = 'assets/images/tote.png';
                    }
                    _NavData[index].type = 'active';
                    //alert(_NavData[index].image[0]);
                    
                } else {
                    _NavData[index].type = 'passive';
                    
                }
            }             
            else if (_PutBackData.screen_id === data.screen_id) {
                _NavData[index].type = 'active';                
            } else {
                _NavData[index].type = 'passive';                
            }
        });

        return _NavData;
    },
    getServerNavData: function() {
        if (_PutBackData.header_msge_list.length > 0) {
            _serverNavData = _PutBackData.header_msge_list[0];
            return _serverNavData;
        } else {
            return null;
        }
    },
    getNotificationData: function() {
        return _PutBackData.notification_list[0];
    },
    setPutBackData: function(data) {
        _PutBackData = data;
    },

    getStateData: function() {
        return _PutBackData;
    },

    getBinData: function() {
        var binData = {};
        binData["structure"] = _PutBackData.structure;
        binData["ppsbin_list"] = _PutBackData.ppsbin_list;
        return binData;
    },


    getScreenId: function() {
        return _PutBackData.screen_id;
    },
    stageOneBin: function() {
        if (_PutBackData.hasOwnProperty('ppsbin_list')) {
            var data = {};
            _PutBackData.ppsbin_list.map(function(value, index) {
                if (value["selected_for_staging"] != undefined && value["selected_for_staging"] == true) {
                    data["event_name"] = "stage_ppsbin";
                    data["event_data"] = {};
                    data["event_data"]["ppsbin_id"] = value.ppsbin_id;
                }
            });

            utils.postDataToInterface(data, _PutBackData.seat_name);
        }
    },

    stageAllBin: function() {
        var data = {};
        data["event_name"] = "stage_all";
        data["event_data"] = '';
        utils.postDataToInterface(data, _PutBackData.seat_name);
    },
    scanDetails: function() {
        _scanDetails = _PutBackData.scan_details;
        return _scanDetails;
    },
    productDetails: function() {
        _prodDetails = _PutBackData.product_info;
        return _prodDetails;
    },
    getItemUid: function() {
        return _PutBackData.item_uid;
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
        if (_PutBackData.hasOwnProperty('reconciliation')) {
            var data = {};
            data["header"] = "Box Serial Numbers";
            data["tableRows"] = [];
            var self = this;
            data["tableRows"].push([new this.tableCol("Product SKU", "enabled", false, "small", false, true, true, false), new this.tableCol("Expected Quantity", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Actual Quantity", "enabled", false, "small", true, false, true, false, true)]);
            _PutBackData.reconciliation.map(function(value, index) {
                data["tableRows"].push([new self.tableCol(value.product_sku, "enabled", false, "large", false, true, false, false), new self.tableCol(value.expected_quantity, "enabled", false, "large", true, false, false, false, true), new self.tableCol(value.actual_quantity, "enabled", false, "large", true, false, false, false, true)]);

            });
            return data;
        }
    },
    getToteId: function() {
        if (_PutBackData.hasOwnProperty('tote_id')) {
            return _PutBackData.tote_id;
        } else {
            return null;
        }
    },

    enableException: function(data) {
        _enableException = data;
    },
    getExceptionStatus: function() {
        return _enableException;
    }
});

PutBackStore.dispatchToken = AppDispatcher.register(function(action) {
    switch (action.action.actionType) {
        case ActionTypes.TOGGLE_BIN_SELECTION:
            PutBackStore.toggleBinSelection(action.action.bin_id);
            PutBackStore.emitChange();
            break;

        case ActionTypes.SET_PUT_BACK_DATA:
            PutBackStore.setPutBackData(action.action.data);
            PutBackStore.emitChange();
            break;

        case ActionTypes.STAGE_ONE_BIN:
            PutBackStore.stageOneBin();
            PutBackStore.emitChange();
            break;

        case ActionTypes.STAGE_ALL:
            PutBackStore.stageAllBin();
            PutBackStore.emitChange();
            break;

        case ActionTypes.ENABLE_EXCEPTION:
            PutBackStore.enableException(action.action.data);
            PutBackStore.emitChange();
            break;
        case ActionTypes.SET_ACTIVE_EXCEPTION:
            PutBackStore.setActiveException(action.action.data);
            PutBackStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = PutBackStore;