var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Actions = require('../actions/Actions');

var CHANGE_EVENT = 'change';
var flag = false;
var retrieved_token = sessionStorage.getItem('store_data');
if(retrieved_token != null){
  var xhrConfig = function(xhr) {
          var authentication_token = JSON.parse(retrieved_token)["auth_token"];
          xhr.setRequestHeader("Authentication-Token", authentication_token)
  }
}
var seatData = [];
var currentSeat = [];
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    currentSeat[0] = results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " ")); 
    listPpsSeat(currentSeat[0]);
}
function listPpsSeat(seat){
    if(seat === null){console.log(seat);
      $.ajax({
        type: 'GET',
        url: appConstants.INTERFACE_IP+appConstants.PPS_SEATS,
        dataType : "json",
        beforeSend : xhrConfig 
        }).done(function(response) {
          console.log(response);  
        }).fail(function(jqXhr) {
                     
      });
    }
}
var ws = new WebSocket(appConstants.WEBSOCKET_IP);
function connectToWebSocket(data){
    if ("WebSocket" in window) {
      ws.onopen = function(){
         console.log("connected");
      };     
      ws.onmessage = function (evt){

        var received_msg = evt.data;
          parseSeatData(evt.data);
          console.log(evt.data);
      };
      ws.onclose = function(){ 
         alert("Connection is closed..."); 
      };
    }
    else
    {
      alert("WebSocket NOT supported by your Browser!");
    }
}

function postDataToWebsockets(data){
   ws.send(JSON.stringify(data));
   setTimeout(Actions.operatorSeat, 0, true);
}
var loginRedirect = function(data){ console.log(data);
    postDataToWebsockets(data);
};
function parseSeatData(data){
    seatData.push()
}

var showBox = function(index){
  flag = true;
}
var responseOfApi = [];
var boxData = [];
var scanBarcode = function(data,receiveKey){ 
   $("#barcode").unbind('keyup').keyup(function(e) {
        if (e.keyCode == 13) {
                $.ajax({
                  type: 'GET',
                  url: url_root + "/qc/barcode/" + escape(data) + "/" + escape(receiveKey),
                  beforeSend : xhrConfig 
                  }).done(function(response) {
                    responseOfitemDetails.push(response.product_data[0]);
                    getBoxDetails(0);
                  }).fail(function(jqXhr) {
                     
                });
        }
    });
}
var getBoxDetails = function(itemIndex){
  var data = {
      "item_uid": responseOfitemDetails[itemIndex].item_uid,
      "box_type": 'storage'
  };
    $.ajax({
      type: 'POST',
      url: url_root + "/boxes/find_box_type",
      dataType: 'json',
      contentType: "application/json",
      data:JSON.stringify(data),
      beforeSend: xhrConfig
      }).done(function(response) {
        boxData.push(response.data);
        store.emit(CHANGE_EVENT);
      }).fail(function(jqXhr){

    });
}

var store = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getFlag : function(){
    return flag;
  },
  getReceiveKeys : function(){
    return responseOfApi;
  },
  scanBarcode : function(){
    return responseOfitemDetails;
  },
  boxData : function(){
    return boxData;
  }
});

AppDispatcher.register(function(payload){ console.log(payload);
  var action = payload.action;
  switch(action.actionType){
    case appConstants.WEBSOCKET_CONNECT:
      connectToWebSocket();
      getParameterByName("seat_name");
      store.emit(CHANGE_EVENT);
      break;
    case appConstants.LOGIN:
      loginRedirect(action.data);
      store.emit(CHANGE_EVENT);
      break;
    case appConstants.OPERATOR_SEAT:
      showBox(action.data);
      store.emit(CHANGE_EVENT);
      break;
    case appConstants.SCAN_BARCODE:
      scanBarcode(action.data, action.receiveKey);
      break; 
    default:
      return true;
  }
});

module.exports = store;