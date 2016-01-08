var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');

var CHANGE_EVENT = 'change';
var _seatData, _currentSeat, _seatName, _pptlEvent , _cancelEvent, _messageJson;
var popupVisible = false;
var _showSpinner = true;
var modalContent = {
  data:"",
  type:""
};
function setPopUpVisible(status){
  popupVisible = status;
  mainstore.emit(CHANGE_EVENT);
};
var mainstore = objectAssign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getPopUpVisible: function(data){
    return popupVisible;
  },
  kqOperation: function(data){
    utils.postDataToInterface(data, _seatName);
  },
  showSpinner : function(){
    _showSpinner = true;
  },
  getSpinnerState : function(){
    return _showSpinner;
  },
  setCurrentSeat:function(data){
    _showSpinner = false;
    _seatData = data;
    _seatName = data.seat_name;
    _currentSeat  = data.mode + "_" + data.seat_type;    
  },
  cancelScan : function(barcode){
    var data = {
      "event_name": _cancelEvent,
      "event_data": {
        "barcode": barcode
      }
    };
    utils.postDataToInterface(data, _seatName);
  },
  cancelScanAll : function(barcode){
    
    if(_currentSeat == appConstants.AUDIT){
      var data = {
      "event_name": _cancelEvent,
      "event_data":{
        "type":"cancel_audit"
      }
    };
    }else{
      var data = {
      "event_name": _cancelEvent,
      "event_data":{}
    };
    }
    utils.postDataToInterface(data, _seatName);
  },
  finishBox:function(){
     var data = {
      "event_name": _cancelEvent,
      "event_data":{
        "type":"finish_box"
      }
    };
      utils.postDataToInterface(data, _seatName);
  },
  generateReport:function(){
    var data = {
      "event_name": _cancelEvent,
      "event_data":{
        "type":"generate_report"
      }
    };
      utils.postDataToInterface(data, _seatName);
  },
  cancelFinishAudit:function(){
    var data = {
      "event_name": _cancelEvent,
      "event_data":{
        "type":"cancel_finish_audit"
      }
    };
      utils.postDataToInterface(data, _seatName);
  },
  finishCurrentAudit:function(){
    var data = {
      "event_name": _cancelEvent,
      "event_data":{
        "type":"finish_current_audit"
      }
    };
      utils.postDataToInterface(data, _seatName);
  },
  getModalContent:function(){
    return modalContent.data;
  },
  getSystemIdleState : function(){ 
    if(_seatData != undefined){
      return _seatData.is_idle;
    }
    else{
      return null;
    }
  },
  getModalType:function(){
    return modalContent.type;
  },
  setModalContent:function(data){
    modalContent = data;
  },

  getCurrentSeat:function(){
    switch(_currentSeat){
      case appConstants.PUT_BACK:
         _pptlEvent = 'secondary_button_press';
         _cancelEvent = 'cancel_barcode_scan';
        break;
      case appConstants.PUT_FRONT:
          _pptlEvent = 'primary_button_press';
          _cancelEvent = 'cancel_scan_all';
        break;
      case appConstants.PICK_BACK:
          _pptlEvent = 'secondary_button_press';
          _cancelEvent = 'cancel_tote_scan';
        break;
      case appConstants.PICK_FRONT:
          _pptlEvent = 'primary_button_press';
          _cancelEvent = 'cancel_scan_all';
        break;
      case appConstants.AUDIT:
          _cancelEvent = 'audit_actions';
        break;
      default:
        //return true; 
    }
    return _currentSeat;
  },
  pptlPress : function(data){ 
    var data = {
      "event_name": "process_ppsbin_event",
      "event_data": {
        "ppsbin_id" : data.bin_id,
        "ppsbin_state": data.bin_state,
        "ppsbin_event" : _pptlEvent
      }
    };
    utils.postDataToInterface(data, _seatName);

  },
  barcodeScan : function(data){
    utils.postDataToInterface(data, _seatName);
  },
  setServerMessages : function(data){
    _messageJson = data;
  },
  getServerMessages : function(){
    return _messageJson;
  },
  changeLanguage : function(data){
    utils.changeLanguage(data);
  }

});

AppDispatcher.register(function(payload){ 
  var action = payload.action; 
  switch(action.actionType){
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
    case appConstants.KQ_OPERATION:
      mainstore.showSpinner();
      mainstore.kqOperation(action.data);
      mainstore.emit(CHANGE_EVENT);
      break;
    case appConstants.RESET_NUMPAD:
      mainstore.emit(CHANGE_EVENT);
      break;
    case appConstants.CANCEL_SCAN:
      mainstore.showSpinner();
      mainstore.cancelScan(action.data);
      mainstore.emit(CHANGE_EVENT);
      break;       
     case appConstants.FINISH_BOX:
      mainstore.showSpinner();
      mainstore.finishBox();
      mainstore.emit(CHANGE_EVENT);
      break;           
    case appConstants.GENERATE_REPORT:
      mainstore.showSpinner();
      mainstore.generateReport();
      mainstore.emit(CHANGE_EVENT);
      break;       
     case appConstants.CANCEL_FINISH_AUDIT:
      mainstore.showSpinner();
      mainstore.cancelFinishAudit();
      mainstore.emit(CHANGE_EVENT);
      break;  
     case appConstants.FINISH_CURRENT_AUDIT:
      mainstore.showSpinner();
      mainstore.finishCurrentAudit();
      mainstore.emit(CHANGE_EVENT);
      break;      
    case appConstants.LOAD_MODAL:
      mainstore.setModalContent(action.data);
       mainstore.emit(CHANGE_EVENT);
      break; 
    case appConstants.PPTL_PRESS:
      mainstore.showSpinner();
      mainstore.pptlPress(action.data);
       mainstore.emit(CHANGE_EVENT);
      break;  
    case appConstants.BARCODE_SCAN:
      mainstore.showSpinner();
      mainstore.barcodeScan(action.data);
       mainstore.emit(CHANGE_EVENT);
      break; 
    case appConstants.CANCEL_SCAN_ALL:
      mainstore.showSpinner();
      mainstore.cancelScanAll();
       mainstore.emit(CHANGE_EVENT);
      break;
    case appConstants.SET_SERVER_MESSAGES:
       mainstore.setServerMessages(action.data);
       mainstore.emit(CHANGE_EVENT);
      break;
    case appConstants.CHANGE_LANGUAGE:
       mainstore.changeLanguage(action.data);
       mainstore.emit(CHANGE_EVENT);
      break; 
    case appConstants.SET_LANGUAGE:
       mainstore.emit(CHANGE_EVENT);
      break;                    
    default:
      return true;
  }
});

module.exports = mainstore;