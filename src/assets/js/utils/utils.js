var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appConstants = require('../constants/appConstants');
var CommonActions = require('../actions/CommonActions');


var seatData = [];
var ws = new WebSocket(appConstants.WEBSOCKET_IP);


var utils = objectAssign({}, EventEmitter.prototype, {
	connectToWebSocket : function(data){
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
	},
	postDataToWebsockets: function(data){ console.log(data);
      ws.send(JSON.stringify(data));
      setTimeout(CommonActions.operatorSeat, 0, true);
  	}
}); 

function parseSeatData(data){
    seatData.push()
}

module.exports = utils;