
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants;
var CHANGE_EVENT = 'change';

var _PutBackData;


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
    _PutBackData["state_data"]["ppsbins"].map(function(value,index){
      if(value.ppsbin_id == bin_id){
        value.selected_state = !value.selected_state;
      }else
        value.selected_state = false;
    });
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
      PutBackStore.emitChange();
      break;

    
    default:
      // do nothing
  }

});

module.exports = PutBackStore;
