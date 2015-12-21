var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');

var CHANGE_EVENT = 'change';
var seatData, _currentSeat, _seatName;
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
    _seatName = data.seat_name;
    _currentSeat  = data.mode + "_" + data.seat_type;
  },
  cancelScan : function(barcode){
    var data = {
      "event_name": "cancel_barcode_scan",
      "event_data": {
        "barcode": barcode
      }
    };
    utils.postDataToInterface(data, _seatName);
  },

  getModalContent:function(){
    return modalContent.data;
  },

  getModalType:function(){
    return modalContent.type;
  },
  setModalContent:function(data){
    modalContent = data;
  },

  getCurrentSeat:function(){
    return _currentSeat;
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
    case appConstants.LOAD_MODAL:
      mainstore.setModalContent(action.data);
       mainstore.emit(CHANGE_EVENT);
      break;    
    default:
      return true;
  }
});

module.exports = mainstore;