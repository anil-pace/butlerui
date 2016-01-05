var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var configConstants = require('../constants/configConstants');
var appConstants = require('../constants/appConstants');
var CommonActions = require('../actions/CommonActions');

var ws = new WebSocket(configConstants.WEBSOCKET_IP);


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
	        utils.getServerErrorMapping();
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
  		$.ajax({
        type: 'POST',
        url: configConstants.INTERFACE_IP+appConstants.API+appConstants.PPS_SEATS+seat_name+appConstants.SEND_DATA,
        data: JSON.stringify(data),
        dataType:"json",
        headers: {
         'content-type' : 'application/json',
         'accept' : 'application/json'
        }
        }).done(function(response) {

        }).fail(function(jqXhr) {
                     
        });
  	},
    getServerErrorMapping : function(){
      $.ajax({
        type: 'GET',
        url: 'http://192.168.3.93:3000/static/server_messages.js',
        }).done(function(response) { 
          alert(JSON.stringify(response));
          console.log(response);
          CommonActions.setServerMessages(response);
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
          CommonActions.setPickBackData(data.state_data);
        break;
      case appConstants.PICK_FRONT: 
          CommonActions.setPickFrontData(data.state_data);
        break;
       case appConstants.AUDIT: 
          CommonActions.setAuditData(data.state_data);
        break;
      default:
        return true; 
      }
}

module.exports = utils;

