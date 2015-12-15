
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';
var navConfig = require('../config/navConfig');

var _PutBackData, _NavData, _NotificationData;


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

  toggleBinSelection:function(bin_id){
    _PutBackData["ppsbin_list"].map(function(value,index){
      if(value.ppsbin_id == bin_id){
        value.selected_state = !value.selected_state;
      }else
        value.selected_state = false;
    });
  },

  getStageActiveStatus:function(){
    console.log(_PutBackData);
    var flag = false;
    _PutBackData["ppsbin_list"].map(function(value,index){
      if(value.selected_state == true)
        flag = true;
    });
    return flag;
  },

  getStageAllActiveStatus:function(){
    var flag = false;
    _PutBackData["ppsbin_list"].map(function(value,index){
      if(value.ppsbin_count > 0 && value.ppsbin_state != "staged")
        flag = true;
    });
    return flag;
  },
  setNavData: function (screenId){ 
    _NavData = navConfig.putBack;
    console.log(_NavData);
    navConfig.putBack.map(function(data,index){
       if(screenId.screen_id === data.screen_id ){
          _NavData[index].type = 'active'; 
          _NavData[index].showImage = true; 
        }else{
          _NavData[index].type = 'passive';
          _NavData[index].showImage = false; 
        }
    });
    console.log(_NavData);
  },
  getNavData : function (argument) {
    return _NavData;
  },
  setNotificationData : function(data){
    _NotificationData = data.notification_list[0];console.log(_NotificationData);
  },
  getNotificationData : function() {
    return _NotificationData;
  },
  setPutBackData:function(data){
    _PutBackData = data;
  },

  getStateData:function(){
    return _PutBackData;
  }



});

PutBackStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.action.actionType) {
    case ActionTypes.TOGGLE_BIN_SELECTION:
      PutBackStore.toggleBinSelection(action.action.bin_id);
      PutBackStore.emitChange();
      break;

     case ActionTypes.SET_PUT_BACK_DATA:
      PutBackStore.setPutBackData(action.action.data);
      PutBackStore.setNavData(action.action.data);
      PutBackStore.setNotificationData(action.action.data);
      PutBackStore.emitChange();
      break;

    
    default:
      // do nothing
  }

});

module.exports = PutBackStore;
