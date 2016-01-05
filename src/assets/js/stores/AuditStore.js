
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';
var navConfig = require('../config/navConfig');
var utils = require('../utils/utils');
var resourceConstants = require('../constants/resourceConstants');

var _AuditData, _NavData, _NotificationData , modalContent, _serverNavData;


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

 
  getNavData : function () {
    _NavData = navConfig.audit;
    navConfig.Audit.map(function(data,index){
       if(_AuditData.screen_id === data.screen_id ){
          _NavData[index].type = 'active'; 
          _NavData[index].showImage = true; 
        }else{
          _NavData[index].type = 'passive';
          _NavData[index].showImage = false; 
        }
    });
    return _NavData;
  },


  getServerNavData : function(){
    if(_AuditData.header_msge_list.length > 0){
      _serverNavData = _AuditData.header_msge_list[0];
      return _serverNavData;
    }else{
      return null;
    }
  },


  getNotificationData : function() { 
      return _AuditData.notification_list[0];
  },


  setAuditData:function(data){
    _AuditData = data;
  },

  getStateData:function(){
    return _AuditData;
  },

  getBinData:function(){
    var binData = {};
    binData["structure"] = _AuditData.structure;
    binData["ppsbin_list"] = _AuditData.ppsbin_list;
    return binData;
  },

  getScreenId:function(){
    return _AuditData.screen_id;
  }


  
});

AuditStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.action.actionType) {

     case ActionTypes.SET_AUDIT_DATA:
      AuditStore.setAuditData(action.action.data);
      AuditStore.emitChange();
      break;
    
    default:
      // do nothing
  }

});

module.exports = AuditStore;
