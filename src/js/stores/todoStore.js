var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var todoActions = require('../actions/todoActions');

var CHANGE_EVENT = 'change';
var flag = false;
var store = {
  list: []
};
var retrieved_token = sessionStorage.getItem('store_data');
if(retrieved_token != null){
  var xhrConfig = function(xhr) {
          var authentication_token = JSON.parse(retrieved_token)["auth_token"];
          xhr.setRequestHeader("Authentication-Token", authentication_token)
  }
}
var url_root = "http://192.168.2.103:5000/api";
var loginRedirect = function(data){
    
  $.ajax({
    type: 'POST',
    url: url_root+"/auth/token",
    data: data
  }).done(function(response) {
   
      var store_data = {
              'auth_token' : response.auth_token 
      };
      // Put the object into storage
      sessionStorage.setItem('store_data', JSON.stringify(store_data));
      var retrievedObject = sessionStorage.getItem('store_data');

    getReceiveKeys(); 
  }).fail(function(jqXhr) {
     todoActions.showBox(true);
    console.log('failed to register');
  });
};

var showBox = function(index){
  flag = true;
}
var responseOfApi = [];
var responseOfitemDetails = [];
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
        todoStore.emit(CHANGE_EVENT);
      }).fail(function(jqXhr){

    });
}
var getReceiveKeys = function(){
 
     $.ajax({
      type: 'GET',
      url: url_root+"/receive_keys?filter=pending",
      beforeSend : xhrConfig 
    }).done(function(response) {
     responseOfApi.push(response.receive_keys); 
     todoActions.showBox(true);
    }).fail(function(jqXhr) {
       responseOfApi = null;
    });
}
var todoStore = objectAssign({}, EventEmitter.prototype, {
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

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.LOGIN:
      loginRedirect(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.SHOW_ERROR:
      showBox(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.SCAN_BARCODE:
      scanBarcode(action.data, action.receiveKey);
      break; 
    default:
      return true;
  }
});

module.exports = todoStore;