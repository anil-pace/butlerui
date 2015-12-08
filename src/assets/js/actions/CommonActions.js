var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');

var commonActions = {
  webSocketConnection: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.WEBSOCKET_CONNECT, 
      data: data
    });
  },
  login: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.LOGIN, 
      data: data
    });
  },
  operatorSeat: function(data){ console.log(data)
    AppDispatcher.handleAction({
      actionType: appConstants.OPERATOR_SEAT, 
      data: data
    });
  },
  
  scanBarcode : function(data, receiveKey){
    AppDispatcher.handleAction({
      actionType: appConstants.SCAN_BARCODE,
      data:data,
      receiveKey : receiveKey
    })
  }
};

module.exports = commonActions;