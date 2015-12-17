var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');

var CHANGE_EVENT = 'change';
var seatData, _currentSeat;
var popupVisible = false;
var _showSpinner = true;

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
  seatData : function(data){
    return seatData;
  },
  getPopUpVisible: function(data){
    return popupVisible;
  },
  kqOperation: function(data){
    utils.postDataToInterface(data);
  },
  showSpinner : function(){
    _showSpinner = true;
  },
  getSpinnerState : function(){
    return _showSpinner;
  },
  setCurrentSeat:function(seat){
    _showSpinner = false;
    _currentSeat  = seat;
  },
  cancelScan : function(barcode){
    var data = {
      "event_name": "cancel_barcode_scan",
      "event_data": {
        "barcode": barcode
      }
    }
    utils.postDataToInterface(data);
  },
  getCurrentSeat:function(){
    return _currentSeat;
  },
});
function pasreSeatData(data){console.log(data);
  var parseData = JSON.parse(data);
  if(parseData.hasOwnProperty('state_data')){
    seatData = parseData.state_data;
  }
  mainstore.emit(CHANGE_EVENT);
}
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
    case appConstants.SEAT_DATA:
      pasreSeatData(action.data);
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
    default:
      return true;
  }
});

module.exports = mainstore;