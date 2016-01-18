var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';
var navConfig = require('../config/navConfig');
var utils = require('../utils/utils');
var resourceConstants = require('../constants/resourceConstants');

var _AuditData, _NavData, _NotificationData, modalContent, _serverNavData;


var AuditStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },


    getNavData: function() {
        if (_AuditData.screen_id === AppConstants.AUDIT_WAITING_FOR_MSU) {
            _NavData = navConfig.audit[0];
            _NavData[0].type = 'active';
        } else {
            _NavData = navConfig.audit[1];
            _NavData.map(function(data, index) {
                if (_AuditData.screen_id === data.screen_id) {
                    console.log(_AuditData);
                    _NavData[index].type = 'active';
                } else {
                    _NavData[index].type = 'passive';
                }
            });
        }
        return _NavData;
    },

    getScanDetails: function() {
        return _AuditData.scan_details;
    },

    getServerNavData: function() {
        if (_AuditData.header_msge_list.length > 0) {
            _serverNavData = _AuditData.header_msge_list[0];
            return _serverNavData;
        } else {
            return null;
        }
    },


    tableCol: function(text, status, selected, size, border, grow, bold, disabled, centerAlign, type, buttonType,buttonStatus) {
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
    },

    getBoxSerialData: function() {
        var data = {};
        data["header"] = [];
        data["tableRows"] = [];
        var self = this;
        data["header"].push(new this.tableCol("Box Serial Numbers", "header", false, "small", false, true, true, false));
        data["header"].push(new this.tableCol("Expected", "header", false, "small", false, false, true, false, true));
        data["header"].push(new this.tableCol("Actual", "header", false, "small", false, false, true, false, true));
        data["header"].push(new this.tableCol("Finish", "header", false, "small", false, false, true, false, true));
        _AuditData.Box_qty_list.map(function(value, index) {
            if (value.Scan_status != "close")
                data["tableRows"].push([new self.tableCol(value.Box_serial, "enabled", false, "large", false, true, false, false),
                    new self.tableCol(value.Expected_qty, "enabled", false, "large", true, false, false, false, true),
                    new self.tableCol(value.Actual_qty, "enabled", value.Scan_status == "open", "large", true, false, false, false, true),
                    new self.tableCol("0", "enabled", false, "large", true, false, false, false, true, "button", "finish",value.Scan_status == "open")
                ]);
            else
                data["tableRows"].push([new self.tableCol(value.Box_serial, "complete", false, "large", false, true, false, false),
                    new self.tableCol(value.Expected_qty, "complete", false, "large", true, false, false, false, true),
                    new self.tableCol(value.Actual_qty, "complete", false, "large", true, false, false, false, true),
                    new self.tableCol("0", "complete", false, "large", true, false, false, false, true, "button", "finish",value.Scan_status == "open")
                ]);
        });

        _AuditData.Extra_box_list.map(function(value, index) {
            data["tableRows"].push([new self.tableCol(value.Box_serial, "extra", false, "large", false, true, false, false),
                new self.tableCol(value.Expected_qty, "extra", false, "large", true, false, false, false, true),
                new self.tableCol(value.Actual_qty, "extra", false, "large", true, false, false, false, true),
                new self.tableCol("0", "extra", false, "large", true, false, false, false, true, "button", "finish",value.Scan_status == "open")
            ]);
        });

        return data;

    },

    getCurrentBoxSerialData: function() {
        var data = {};
        data["header"] = [];
        data["tableRows"] = [];
        var self = this;
        data["header"].push(new this.tableCol("Current Box Serial Numbers", "header", false, "small", false, true, true, false));
        data["header"].push(new this.tableCol("Expected", "header", false, "small", true, false, true, false, true));
        data["header"].push(new this.tableCol("Actual", "header", false, "small", true, false, true, false, true));
        data["header"].push(new this.tableCol("Finish", "header", false, "small", true, false, true, false, true));
        data["tableRows"].push([new this.tableCol("SKU", "enabled", false, "small", false, true, true, false), new this.tableCol("Expected", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Actual", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Finish", "enabled", false, "small", true, false, true, false, true)]);
        if (_AuditData.Current_box_details.length > 0) {
            _AuditData.Current_box_details.map(function(value, index) {
                data["tableRows"].push([new self.tableCol(value.Sku, "enabled", false, "large", false, true, false, false),
                    new self.tableCol(value.Expected_qty, "enabled", false, "large", true, false, false, false, true),
                    new self.tableCol(value.Actual_qty, "enabled", true, "large", true, false, false, false, true),
                    new self.tableCol("0", "enabled", false, "large", true, false, false, false, true, "button", "finish")
                ]);
            });
        } else {
            data["tableRows"].push([new this.tableCol("No Box selected", "enabled", false, "large", false, true, false, true),
                new this.tableCol("0", "enabled", false, "large", true, false, false, true, true),
                new this.tableCol("0", "enabled", false, "large", true, false, false, true, true),
                new this.tableCol("--", "enabled", false, "large", true, false, false, true, true)
            ]);
        }

        return data;
    },

    getCancelScanStatus: function() {
        return _AuditData.Cancel_scan;
    },


    getReconcileBoxSerialData: function() {
        var data = {};
        data["header"] = [];
        data["tableRows"] = [];
        var self = this;
        data["header"].push([new this.tableCol("Box Serial Numbers", "header", false, "small", false, true, true, false),
            new this.tableCol("Expected", "header", false, "small", true, false, true, false, true),
            new this.tableCol("Actual", "header", false, "small", true, false, true, false, true),
            new this.tableCol("Finish", "header", false, "small", true, false, true, false, true)
        ]);
        data["tableRows"].push([new this.tableCol("Box Serial", "enabled", false, "small", false, true, true, false), new this.tableCol("Missing", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Extra", "enabled", false, "small", true, false, true, false, true)]);
        _AuditData.Box_qty_list.map(function(value, index) {
            if (value.Scan_status != "no_scan")
                data["tableRows"].push([new self.tableCol(value.Box_serial, "enabled", false, "large", false, true, false, false), new self.tableCol(Math.max(value.Expected_qty - value.Actual_qty, 0), "enabled", false, "large", true, false, false, false, true), new self.tableCol(Math.max(value.Actual_qty - value.Expected_qty, 0), "enabled", false, "large", true, false, false, false, true)]);
            else
                data["tableRows"].push([new self.tableCol(value.Box_serial, "missing", false, "large", false, true, false, false), new self.tableCol("Missing", "missing", false, "large", false, false, false, false, true)]);

        });
        _AuditData.Extra_box_list.map(function(value, index) {
            data["tableRows"].push([new self.tableCol(value.Box_serial, "extra", false, "large", false, true, false, false), new self.tableCol("Extra ( " + value.Actual_qty + "/" + value.Expected_qty + " )", "extra", false, "large", false, false, false, false, true)]);
        });

        return data;
    },

    getReconcileLooseItemsData: function() {
        var data = {};
        data["header"] = [];
        data["tableRows"] = [];
        data["header"].push([new this.tableCol("Loose Items", "header", false, "small", false, true, true, false),
            new this.tableCol("Expected", "header", false, "small", true, false, true, false, true),
            new this.tableCol("Actual", "header", false, "small", true, false, true, false, true),
            new this.tableCol("Finish", "header", false, "small", true, false, true, false, true)
        ]);
        var self = this;
        data["tableRows"].push([new this.tableCol("SKU", "enabled", false, "small", false, true, true, false), new this.tableCol("Missing", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Extra", "enabled", false, "small", true, false, true, false, true)]);
        _AuditData.Loose_sku_list.map(function(value, index) {
            if (value.Scan_status != "no_scan")
                data["tableRows"].push([new self.tableCol(value.Sku, "enabled", false, "large", false, true, false, false), new self.tableCol(Math.max(value.Expected_qty - value.Actual_qty, 0), "enabled", false, "large", true, false, false, false, true), new self.tableCol(Math.max(value.Actual_qty - value.Expected_qty, 0), "enabled", false, "large", true, false, false, false, true)]);
            else
                data["tableRows"].push([new self.tableCol(value.Sku, "missing", false, "large", false, true, false, false), new self.tableCol("Missing", "missing", false, "large", false, false, false, false, true)]);

        });
        return data;
    },

    getLooseItemsData: function() {
        var data = {};
        var disabledStatus;
        //if (_AuditData.Current_box_details.length > 0) {
            disabledStatus = false;
        //}
        data["header"] = [];
        data["header"].push(new this.tableCol("Loose Items", "header", false, "small", false, true, true, false));
        data["header"].push(new this.tableCol("Expected", "header", false, "small", false, false, true, false, true));
        data["header"].push(new this.tableCol("Actual", "header", false, "small", false, false, true, false, true));
        data["tableRows"] = [];
        var self = this;
        _AuditData.Loose_sku_list.map(function(value, index) {
            data["tableRows"].push([new self.tableCol(value.Sku, "enabled", false, "large", false, true, false, disabledStatus), new self.tableCol(value.Expected_qty, "enabled", false, "large", true, false, false, disabledStatus, true), new self.tableCol(value.Actual_qty, "enabled", false, "large", true, false, false, disabledStatus, true)]);
        });
        return data;
    },

    getItemDetailsData: function() {
        var data = {};
        data["header"] = [];
        data["header"].push(new this.tableCol("Product Details", "header", false, "small", false, true, true, false));
        data["tableRows"] = [];
        var self = this;
        for (var key in _AuditData.product_info) {
            if (_AuditData.product_info.hasOwnProperty(key)) {
                data["tableRows"].push([new self.tableCol(key, "enabled", false, "small", false, true, false, false), new self.tableCol(_AuditData.product_info[key], "enabled", false, "small", false, true, false, false)]);
            }
        }
        return data;
    },

    getRackDetails: function() {
        console.log(_AuditData.rack_details);
        return _AuditData.rack_details;
    },

    getNotificationData: function() {
        return _AuditData.notification_list[0];
    },

    setAuditData: function(data) {
        _AuditData = data;
    },

    getStateData: function() {
        return _AuditData;
    },

    getBinData: function() {
        var binData = {};
        binData["structure"] = _AuditData.structure;
        binData["ppsbin_list"] = _AuditData.ppsbin_list;
        return binData;
    },

    getScreenId: function() {
        return _AuditData.screen_id;
    }



});

AuditStore.dispatchToken = AppDispatcher.register(function(action) {
    switch (action.action.actionType) {

        case ActionTypes.SET_AUDIT_DATA:
            AuditStore.setAuditData(action.action.data);
            AuditStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = AuditStore;