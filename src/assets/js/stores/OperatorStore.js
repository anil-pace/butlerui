var AppDispatcher = require('../dispatchers/AppDispatcher');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');
var appConstants = require('../constants/appConstants');

var CHANGE_EVENT = 'change';
var _currentSeat;

var OperatorStore = objectAssign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  setCurrentSeat:function(seat){
    _currentSeat  = seat;
  },

  getCurrentSeat:function(){
    return _currentSeat;
  }

});

AppDispatcher.register(function(payload){ 
  var action = payload.action;
  switch(action.actionType){
      case appConstants.SET_CURRENT_SEAT:
        OperatorStore.setCurrentSeat(action.data);
        OperatorStore.emitChange();
      break;

      default:
      return true;
  }
});

module.exports = OperatorStore;