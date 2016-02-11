var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');

var commonActions = {
  webSocketConnection: function(){
    AppDispatcher.handleAction({
      actionType: appConstants.WEBSOCKET_CONNECT
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

  postDataToInterface:function(data, type){
     AppDispatcher.handleAction({
      actionType: appConstants.POST_DATA_TO_INTERFACE,
      data:data,
      type : type
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
  },
  logError: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.LOG_ERROR,
      data:data
    }); 
  },
  enableException:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.ENABLE_EXCEPTION,
      data:data
    }); 
  },
  logoutSession:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.LOGOUT_SESSION,
      data:data
    }); 
  },
  setActiveException:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_ACTIVE_EXCEPTION,
      data:data
    }); 
  },

  updateKQQuantity:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_KQ_QUANTITY,
      data:data
    });
  },

  updateMissingQuantity:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_MISSING_QUANTITY,
      data:data
    });
  },

  updateGoodQuantity:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_GOOD_QUANTITY,
      data:data
    });
  },

  updateDamagedQuantity:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_DAMAGED_QUANTITY,
      data:data
    });
  },

  changePutFrontExceptionScreen:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.CHANGE_PUT_FRONT_EXCEPTION_SCREEN,
      data:data
    });
  },

  changePickFrontExceptionScreen:function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.CHANGE_PICK_FRONT_EXCEPTION_SCREEN,
      data:data
    });
  },

  validateAndSendDataToServer:function(){
     AppDispatcher.handleAction({
      actionType: appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER
    });
   },

   validateAndSendSpaceUnavailableDataToServer:function(){
     AppDispatcher.handleAction({
      actionType: appConstants.VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER
    });
   }

};

module.exports = commonActions;