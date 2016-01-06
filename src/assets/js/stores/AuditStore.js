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
        _NavData = navConfig.audit;
        navConfig.audit.map(function(data, index) {
            if (_AuditData.screen_id === data.screen_id) {
                _NavData[index].type = 'active';
                _NavData[index].showImage = true;
            } else {
                _NavData[index].type = 'passive';
                _NavData[index].showImage = false;
            }
        });
        return _NavData;
    },


    getServerNavData: function() {
        if (_AuditData.header_msge_list.length > 0) {
            _serverNavData = _AuditData.header_msge_list[0];
            return _serverNavData;
        } else {
            return null;
        }
    },


    tableCol: function(text, status, selected, size, border, grow, bold, disabled, centerAlign) {
        this.text = text;
        this.status = status;
        this.selected = selected;
        this.size = size;
        this.border = border;
        this.grow = grow;
        this.bold = bold;
        this.disabled = disabled;
        this.centerAlign = centerAlign;
    },

    getBoxSerialData: function() {
        var data = {};
        data["header"] = "Box Serial Numbers";
        data["tableRows"] = [];
        data["tableRows"].push([new this.tableCol("1.9845012AA", "enabled", false, "large", false, true, false, false)]);
        data["tableRows"].push([new this.tableCol("2.9845012AC", "enabled", false, "large", false, true, false, false)]);
        data["tableRows"].push([new this.tableCol("3.9845012AB", "enabled", false, "large", false, true, false, false)]);

        return data;

    },

    getCurrentBoxSerialData: function() {
        var data = {};
        data["header"] = "SKU Box Serial Number";
        data["tableRows"] = [];
        data["tableRows"].push([new this.tableCol("SKU", "enabled", false, "small", false, true, true, false), new this.tableCol("Expected", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Actual", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Finish", "enabled", false, "small", true, false, true, false, true)]);
        data["tableRows"].push([new this.tableCol("8545012AA", "enabled", false, "large", false, true, false, true), new this.tableCol("1", "enabled", false, "large", true, false, false, true, true), new this.tableCol("0", "enabled", false, "large", true, false, false, true, true), new this.tableCol("0", "enabled", false, "large", true, false, false, true, true)]);

        return data;
    },

    getLooseItemsData: function() {
        var data = {};
        data["header"] = "Loose Items";
        data["tableRows"] = [];
        data["tableRows"].push([new this.tableCol("SKU", "enabled", false, "small", false, true, true, false), new this.tableCol("Expected", "enabled", false, "small", true, false, true, false, true), new this.tableCol("Actual", "enabled", false, "small", true, false, true, false, true)]);
        data["tableRows"].push([new this.tableCol("8545012AA", "enabled", false, "large", false, true, false, false), new this.tableCol("1", "enabled", false, "large", true, false, false, false, true), new this.tableCol("0", "enabled", false, "large", true, false, false, false, true)]);
        data["tableRows"].push([new this.tableCol("8545012AA", "enabled", false, "large", false, true, false, false), new this.tableCol("0", "enabled", false, "large", true, false, false, false, true), new this.tableCol("1", "enabled", false, "large", true, false, false, false, true)]);

        return data;
    },

    getItemDetailsData: function() {
        var data = {};
        data["header"] = "Details";
        data["tableRows"] = [];
        data["tableRows"].push([new this.tableCol("Product Name", "enabled", false, "small", false, true, false, false), new this.tableCol("--", "enabled", false, "small", false, true, false, false)]);
        data["tableRows"].push([new this.tableCol("Color", "enabled", false, "small", false, true, false, false), new this.tableCol("--", "enabled", false, "small", false, true, false, false)]);
        data["tableRows"].push([new this.tableCol("L X W X H (cm)", "enabled", false, "small", false, true, false, false), new this.tableCol("--", "enabled", false, "small", false, true, false, false)]);
        data["tableRows"].push([new this.tableCol("Item Serial", "enabled", false, "small", false, true, false, false), new this.tableCol("--", "enabled", false, "small", false, true, false, false)]);

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