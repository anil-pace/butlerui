
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';
var navConfig = require('../config/navConfig');
var utils = require('../utils/utils');

var _PutBackData, _NavData, _NotificationData, _scanDetails, _prodDetails;


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
  getNavData : function () {
    _NavData = navConfig.putBack;
    console.log(_NavData);
    navConfig.putBack.map(function(data,index){
       if(_PutBackData.screen_id === data.screen_id ){
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
      return _PutBackData.notification_list[0];
  },
  setPutBackData:function(data){
    _PutBackData = data;
  },

  getStateData:function(){
    return _PutBackData;
  },

  getBinData:function(){
    var binData = {};
    binData["structure"] = _PutBackData.structure;
    binData["ppsbin_list"] = _PutBackData.ppsbin_list;
    return binData;
  },

  getScreenId:function(){
    return _PutBackData.screen_id;
  },

  stageOneBin:function(){
    var data ={};
    _PutBackData.ppsbin_list.map(function(value,index){
        if(value.selected_state == true){
          data["event_name"] = "stage_ppsbin";
          data["event_data"] = {};
          data["event_data"]["ppsbin_id"] = value.ppsbin_id;
        }
    });
    utils.postDataToInterface(data);

  },

  stageAllBin:function(){
    var data ={};
    data["event_name"] = "stage_all";
    data["event_data"]= '';
     utils.postDataToInterface(data);
  },
  scanDetails : function(){ console.log(_PutBackData);
    _scanDetails = _PutBackData.scan_details;
    return _scanDetails;
  },
  productDetails : function(){ console.log(_PutBackData);
    _prodDetails = _PutBackData.product_info;
    return _prodDetails;
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

    
    default:
      // do nothing
  }

});

module.exports = PutBackStore;
