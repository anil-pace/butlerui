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

  postDataToInterface:function(data){
     AppDispatcher.handleAction({
      actionType: appConstants.POST_DATA_TO_INTERFACE,
      data:data
    })
   },

  setPutBackData :function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_PUT_BACK_DATA,
      data:data
    })
  },
  setPutFrontData :function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_PUT_FRONT_DATA,
      data:data
    })
  },

  setPickBackData :function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_PICK_BACK_DATA,
      data:data
    })
  },

  setAuditData :function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_AUDIT_DATA,
      data:data
    })
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
  resetNumpadVal : function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.RESET_NUMPAD, 
      data: data
    });
  },
  showModal:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.LOAD_MODAL,
      data:data
    })
  },
  pptlPress : function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.PPTL_PRESS,
      data:data
    })
  },
  setPickFrontData :function(data){  
    AppDispatcher.handleAction({
      actionType: appConstants.SET_PICK_FRONT_DATA,
      data:data
    })
  },
  setServerMessages : function(){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_SERVER_MESSAGES
    });
  },
  changeLanguage: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.CHANGE_LANGUAGE,
      data:data
    }); 
  },
  setLanguage: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_LANGUAGE,
      data:data
    }); 
  }

};

module.exports = commonActions;