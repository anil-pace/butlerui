var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var configConstants = require('../constants/configConstants');
var appConstants = require('../constants/appConstants');
var CommonActions = require('../actions/CommonActions');

var ws;

var utils = objectAssign({}, EventEmitter.prototype, {
    connectToWebSocket: function(data) { 
        ws = new WebSocket(configConstants.WEBSOCKET_IP);
        if ("WebSocket" in window) {
            ws.onopen = function() {
                console.log("connected");
                utils.checkSessionStorage();
                clearTimeout(utils.connectToWebSocket)
            };
            ws.onmessage = function(evt) {
                var received_msg = evt.data;
                var data = JSON.parse(evt.data);
                putSeatData(data);
                CommonActions.setCurrentSeat(data.state_data);
                CommonActions.setServerMessages();
            };
            ws.onclose = function() {
                alert("Connection is closed...");
                setTimeout(utils.connectToWebSocket, 10000);
            };
        } else {
            alert("WebSocket NOT supported by your Browser!");
        }
    },
    checkSessionStorage : function(){
        var sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
        if(sessionData === null){  
        }else{
            var webSocketData = {
                "auth_token" : sessionData.auth_token,
                "seat_name" : sessionData.seat_name
            };
            //utils.postDataToWebsockets(webSocketData); 
        }
    },
    postDataToWebsockets: function(data) {
        ws.send(JSON.stringify(data));
        setTimeout(CommonActions.operatorSeat, 0, true);
    },
    storeSession : function(data){
        // Put the object into storage
        sessionStorage.setItem('sessionData', JSON.stringify(data));
    },
    getAuthToken : function(data){
        sessionStorage.setItem('sessionData', null);
        var loginData ={
          "username" : data.data.username,
          "password" : data.data.password
        }
        $.ajax({
            type: 'POST',
            url: configConstants.INTERFACE_IP + appConstants.API + appConstants.AUTH + appConstants.TOKEN,
            data: JSON.stringify(loginData),
            dataType: "json",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }).done(function(response) {
            var webSocketData = {
                "auth_token" : response.auth_token,
                "seat_name" : data.data.seat_name
            };
            utils.storeSession(webSocketData);
            utils.postDataToWebsockets(data); // utils.postDataToWebsockets(webSocketData)
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status);
            alert(textStatus);
            alert(errorThrown);
        });
       
    },
    postDataToInterface: function(data, seat_name) {
        var retrieved_token = sessionStorage.getItem('sessionData');
        var authentication_token = JSON.parse(retrieved_token)["auth_token"];
        
        console.log(authentication_token)
        $.ajax({
            type: 'POST',
            url: configConstants.INTERFACE_IP + appConstants.API + appConstants.PPS_SEATS + seat_name + appConstants.SEND_DATA,
            data: JSON.stringify(data),
            dataType: "json",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'Authentication-Token' : authentication_token
            }
        }).done(function(response) {

        }).fail(function(jqXhr) {

        });
    },
    generateSessionId: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 50; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        localStorage.setItem("session",text);
    },
    createLogData: function(message, type) {
        var data = {};
        data["message"] = message;
        data["type"] = type;
        data["session"] = localStorage.getItem("session");
        return data;
    },
    logError: function(data) {
        $.ajax({
            type: 'POST',
            url: "http://192.168.3.93:300/api/log",
            data: data,
            dataType: "json"
        }).success(function(response) {
            console.log("Error logged Successfully");
            console.log("Log Details :");
            console.log(JSON.stringify(data));
        });
    }
});

var putSeatData = function(data) {
    console.log(data);
    switch (data.state_data.mode + "_" + data.state_data.seat_type) {
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