var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CommonActions = require('../actions/CommonActions');
var loginstore = require('./loginstore');
var utils  = require('../utils/utils.js');

var CHANGE_EVENT = 'change';

var mainstore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  postDataToWebsockets: function(data){
      ws.send(JSON.stringify(data));
      setTimeout(CommonActions.operatorSeat, 0, true);
  }
});

AppDispatcher.register(function(payload){ 
  var action = payload.action;
  switch(action.actionType){
    case appConstants.WEBSOCKET_CONNECT:
      utils.connectToWebSocket();
      loginstore.getParameterByName('seat_name');
      mainstore.emit(CHANGE_EVENT);
      break;
    case appConstants.OPERATOR_SEAT:
      mainstore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = mainstore;