var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';
var navConfig = require('../config/navConfig');
var utils = require('../utils/utils');

var _PickFrontData, _NavData, _NotificationData;


var PickFrontStore = assign({}, EventEmitter.prototype, {

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
        if (_PickFrontData.screen_id === AppConstants.PUT_FRONT_WAITING_FOR_RACK) {
            _NavData = navConfig.putFront[0];
            _NavData[0].type = 'active';
        } else {
            _NavData = navConfig.putFront[1];
            _NavData.map(function(data, index) { 
                if (_PickFrontData.screen_id === data.screen_id) {console.log(_PickFrontData);
                    _NavData[index].type = 'active';
                }else{
                     _NavData[index].type = 'passive';
                }
            });
        }
        return _NavData;
    },
    getNotificationData: function() {
        return _PickFrontData.notification_list[0];
    },
    setPickFrontData: function(data) {
        _PickFrontData = data;
    },

    getStateData: function() {
        return _PickFrontData;
    },

    getScreenId: function() {
        return _PickFrontData.screen_id;
    },

    getBinData: function() {
        var binData = {};
        binData["structure"] = _PickFrontData.structure;
        binData["ppsbin_list"] = _PickFrontData.ppsbin_list;
        return binData;
    },

    scanDetails: function() {
        console.log(_PickFrontData);
        _scanDetails = _PickFrontData.scan_details;
        return _scanDetails;
    },
    productDetails: function() {
        console.log(_PickFrontData);
        _prodDetails = _PickFrontData.product_info;
        return _prodDetails;
    },

    getRackDetails: function() {
        return _PickFrontData.rack_details;
    },

    getCurrentSelectedBin:function(){
       var binData = {};
        binData["structure"] = [2,4];
        binData["ppsbin_list"] = [];
        _PickFrontData.ppsbin_list.map(function(value,index){
          if(value.selected_state == true)
              binData["ppsbin_list"].push(value);
        })
        return binData;
    }

});

PickFrontStore.dispatchToken = AppDispatcher.register(function(action) {
    switch (action.action.actionType) { 
        case ActionTypes.SET_PICK_FRONT_DATA: 
            PickFrontStore.setPickFrontData(action.action.data);
            PickFrontStore.emitChange();
            break;
        default:
           return true;
    }
});

module.exports = PickFrontStore;
