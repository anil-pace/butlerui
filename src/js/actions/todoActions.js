var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');

var todoActions = {
  login: function(data){;
    AppDispatcher.handleAction({
      actionType: appConstants.LOGIN, 
      data: data
    });
  },
  showBox: function(data){;
    AppDispatcher.handleAction({
      actionType: appConstants.SHOW_ERROR, 
      data: data
    });
  },
  removeItem: function(index){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  },
  scanBarcode : function(data, receiveKey){
    AppDispatcher.handleAction({
      actionType: appConstants.SCAN_BARCODE,
      data:data,
      receiveKey : receiveKey
    })
  }
};

module.exports = todoActions;