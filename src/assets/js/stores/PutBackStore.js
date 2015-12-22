
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';
var navConfig = require('../config/navConfig');
var utils = require('../utils/utils');
var resourceConstants = require('../constants/resourceConstants');

var _PutBackData, _NavData, _NotificationData, _scanDetails, _prodDetails , modalContent, _serverNavData;


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
        if(value["selected_for_staging"]!=undefined)
          value["selected_for_staging"] =  !value["selected_for_staging"];
        else
          value["selected_for_staging"] = true;
      }else if(value["selected_for_staging"]!=undefined)
        value["selected_for_staging"] = false;
    });
    if(_PutBackData.notification_list.length != 0){
      _PutBackData.notification_list[0].description = resourceConstants.BIN+ ' '+bin_id + ' '+resourceConstants.SELECTED;
    }else{
     // _PutBackData.notification_list = undefined;
    }
  },

  getStageActiveStatus:function(){
    var flag = false;
    _PutBackData["ppsbin_list"].map(function(value,index){
      if( value["selected_for_staging"] !=undefined &&  value["selected_for_staging"] == true)
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
  getServerNavData : function(){
    if(_PutBackData.header_msge_list.length > 0){
      _serverNavData = _PutBackData.header_msge_list[0];
      return _serverNavData;
    }else{
      return null;
    }
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
         if( value["selected_for_staging"] !=undefined &&  value["selected_for_staging"] == true){
          data["event_name"] = "stage_ppsbin";
          data["event_data"] = {};
          data["event_data"]["ppsbin_id"] = value.ppsbin_id;
        }
    });

   utils.postDataToInterface(data, _PutBackData.seat_name);

  },

  stageAllBin:function(){
    var data ={};
    data["event_name"] = "stage_all";
    data["event_data"]= '';
     utils.postDataToInterface(data, _PutBackData.seat_name);
  },
  scanDetails : function(){ 
    _scanDetails = _PutBackData.scan_details;
    return _scanDetails;
  },
  productDetails : function(){
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
