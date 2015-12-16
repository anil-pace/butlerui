var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');

var CHANGE_EVENT = 'change';
var seatData;
var popupVisible = false;

function setPopUpVisible(status){
  popupVisible = status;
  mainstore.emit(CHANGE_EVENT);
  console.log(" im in store set function " + popupVisible);
};
var mainstore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  seatData : function(data){
    console.log(data);
    return seatData;
  },
  getPopUpVisible: function(data){
    console.log("getpopupvisible" + data);
    return popupVisible;
  }
});
function pasreSeatData(data){console.log(data);
  var parseData = JSON.parse(data);
  if(parseData.hasOwnProperty('state_data')){
    seatData = parseData.state_data;
  }
  console.log(seatData);
  mainstore.emit(CHANGE_EVENT);
}
AppDispatcher.register(function(payload){ 
  var action = payload.action;
  switch(action.actionType){
    case appConstants.WEBSOCKET_CONNECT:
      utils.connectToWebSocket();
      mainstore.emit(CHANGE_EVENT);
      break;
    case appConstants.SEAT_DATA:
      pasreSeatData(action.data);
      break;
    case appConstants.POPUP_VISIBLE:
      setPopUpVisible(action.status);
      break; 
    default:
      return true;
  }
});

module.exports = mainstore;