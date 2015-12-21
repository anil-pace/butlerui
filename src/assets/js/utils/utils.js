var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appConstants = require('../constants/appConstants');
var CommonActions = require('../actions/CommonActions');

var ws = new WebSocket(appConstants.WEBSOCKET_IP);


var utils = objectAssign({}, EventEmitter.prototype, {
	connectToWebSocket : function(data){
		if ("WebSocket" in window) {
	      ws.onopen = function(){
	         console.log("connected");
	      };     
	      ws.onmessage = function (evt){
	        var received_msg = evt.data;
	        //setTimeout(CommonActions.seatData, 0, evt.data);
	        var data = JSON.parse(evt.data);
	        putSeatData(data);
	        CommonActions.setCurrentSeat(data.state_data);
	        
	      };
	      ws.onclose = function(){ 
	         alert("Connection is closed..."); 
	      };
	    }
	    else
	    {
	      alert("WebSocket NOT supported by your Browser!");
	    }
	},
	postDataToWebsockets: function(data){ 
      ws.send(JSON.stringify(data));
      setTimeout(CommonActions.operatorSeat, 0, true);
  	},
  	postDataToInterface : function(data, seat_name){ 
      console.log(data);
  		$.ajax({
        type: 'POST',
        url: appConstants.INTERFACE_IP+appConstants.API+appConstants.PPS_SEATS+seat_name+appConstants.SEND_DATA,
        data: JSON.stringify(data),
        dataType:"json",
        headers: {
         'content-type' : 'application/json',
         'accept' : 'application/json'
        }
        }).done(function(response) {

        }).fail(function(jqXhr) {
                     
        });
  	}
}); 

var putSeatData = function(data){ console.log(data);
	 switch(data.state_data.mode + "_" + data.state_data.seat_type){
      case appConstants.PUT_BACK:
          CommonActions.setPutBackData(data.state_data);
      break;
      case appConstants.PUT_FRONT:
          CommonActions.setPutFrontData(data.state_data);
        break;
      case appConstants.PICK_BACK:
        break;
      case appConstants.PICK_FRONT:
        break;
      default:
        return true; 
      }
}

module.exports = utils;

