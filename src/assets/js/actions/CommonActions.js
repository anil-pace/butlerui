var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');

var commonActions = {
  webSocketConnection: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.WEBSOCKET_CONNECT, 
      data: data
    });
  },
  listSeats: function(data){
    AppDispatcher.handleAction({
      actionType : appConstants.LIST_SEATS,
      data: data
    })
  },
  login: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.LOGIN, 
      data: data
    });
  },
  operatorSeat: function(data){ 
    AppDispatcher.handleAction({
      actionType: appConstants.OPERATOR_SEAT, 
      data: data
    });
  },
  seatData : function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.SEAT_DATA,
      data : data
    })
  },

  toggleBinSelection:function(bin_id){
     AppDispatcher.handleAction({
      actionType: appConstants.TOGGLE_BIN_SELECTION,
      bin_id:bin_id
    })
  },

  setPutData:function(data){
     AppDispatcher.handleAction({
      actionType: appConstants.SET_PUT_DATA,
      data:data
    })
  },

  setCurrentSeat:function(seat){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_CURRENT_SEAT,
      data:seat
    })
  },

  setPutBackData :function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_PUT_BACK_DATA,
      data:data
    })
  },
  increment : function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.INCREMENT, 
      data: data
    });
  },
  decrement : function(data){ 
    alert("decrement");    
    AppDispatcher.handleAction({
      actionType: appConstants.DECREMENT, 
      data: data
    });
  },
  updatePopupVisible:function(status){   
    AppDispatcher.handleAction({
      actionType: appConstants.POPUP_VISIBLE,
      status: status
    })
  },
  stageAllBins:function(){   
    AppDispatcher.handleAction({
      actionType: appConstants.STAGE_ALL
    })
  },
  stageOneBin:function(){   
    AppDispatcher.handleAction({
      actionType: appConstants.STAGE_ONE_BIN
    })
  },
};

module.exports = commonActions;