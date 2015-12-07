var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CommonActions = require('../actions/CommonActions');
var mainstore = require('./mainstore');
console.log(mainstore);

var CHANGE_EVENT = 'change';
var flag = false;
var retrieved_token = sessionStorage.getItem('store_data');
if(retrieved_token != null){
  var xhrConfig = function(xhr) {
          var authentication_token = JSON.parse(retrieved_token)["auth_token"];
          xhr.setRequestHeader("Authentication-Token", authentication_token)
  }
}
var currentSeat = [];

function listPpsSeat(seat){
    if(seat === null){
      currentSeat = []; 
      $.ajax({
        type: 'GET',
        url: appConstants.INTERFACE_IP+appConstants.PPS_SEATS,
        dataType : "json",
        beforeSend : xhrConfig 
        }).done(function(response) {
          currentSeat.push(response.pps_seats);
          loginstore.emit(CHANGE_EVENT); 
        }).fail(function(jqXhr) {
                     
      });
    }
}

var showBox = function(index){
  flag = true;
}


var loginstore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getFlag : function(){
    return flag;
  },
  seatList : function(){ 
    return currentSeat;
  },
  getParameterByName: function(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search); console.log(name);
    currentSeat[0] = results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " ")); console.log(currentSeat[0]);
    listPpsSeat(currentSeat[0]);
  }
});


AppDispatcher.register(function(payload){ console.log(payload);
  var action = payload.action;
  switch(action.actionType){
    case appConstants.LOGIN: console.log(mainstore);
      mainstore.postDataToWebsockets(action.data);
      loginstore.emit(CHANGE_EVENT);
      break;
    case appConstants.OPERATOR_SEAT:
      showBox(action.data);
      loginstore.emit(CHANGE_EVENT);
      break;
    case appConstants.SCAN_BARCODE:
      scanBarcode(action.data, action.receiveKey);
      break; 
    default:
      return true;
  }
});

module.exports = loginstore;