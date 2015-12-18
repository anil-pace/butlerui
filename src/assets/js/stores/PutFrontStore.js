
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';
var navConfig = require('../config/navConfig');
var utils = require('../utils/utils');

var _PutFrontData, _NavData, _NotificationData;


var PutFrontStore = assign({}, EventEmitter.prototype, {

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
    _NavData = navConfig.putFront;
    console.log(_NavData);
    navConfig.putFront.map(function(data,index){
       if(_PutFrontData.screen_id === data.screen_id ){
          _NavData[index].type = 'active'; 
          _NavData[index].showImage = true; 
        }else{
          _NavData[index].type = 'passive';
          _NavData[index].showImage = false; 
        }
    });
    return _NavData;
  },
  getNotificationData : function() { 
      return _PutFrontData.notification_list[0];
  },
  setPutFrontData:function(data){
    _PutFrontData = data;
  },

  getStateData:function(){
    return _PutFrontData;
  },

  getScreenId:function(){
    return _PutFrontData.screen_id;
  },

});

PutFrontStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.action.actionType) {
    case ActionTypes.SET_PUT_FRONT_DATA:
      PutFrontStore.setPutFrontData(action.action.data);
      PutFrontStore.emitChange();
      break;    
    default:
      // do nothing
  }

});

module.exports = PutFrontStore;
