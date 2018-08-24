var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var configConstants = require('../constants/configConstants');
var resourceConstants = require('../constants/resourceConstants');
var appConstants = require('../constants/appConstants');
var CommonActions = require('../actions/CommonActions');
var serverMessages = require('../serverMessages/server_messages');
var ws,self;

var utils = objectAssign({}, EventEmitter.prototype, {
    enableKeyboard:function(){
        virtualKeyBoard_login = $('#username, #password').keyboard({
          layout: 'custom',
          customLayout: {
            'default': ['! @ # $ % ^ & * + _', '1 2 3 4 5 6 7 8 9 0 {b}', 'q w e r t y u i o p', 'a s d f g h j k l', '{shift} z x c v b n m . {shift}','{space}', '{a} {c}'],
            'shift':   ['( ) { } [ ] = ~ ` -', '< > | ? / " : ; , \' {b}', 'Q W E R T Y U I O P', 'A S D F G H J K L', '{shift} Z X C V B N M . {shift}','{space}', '{a} {c}']
        },
        css: {
            container: "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad"
        },
        reposition: true,
        alwaysOpen: false,
        initialFocus: true,      
        visible : function(e, keypressed, el){
            el.value = '';
        //$(".authNotify").css("display","none"); 
    },

    accepted: function(e, keypressed, el) {
        var usernameValue = document.getElementById('username').value;
        var passwordValue = document.getElementById('password').value;
        if(usernameValue != null && usernameValue !=''  && passwordValue != null && passwordValue != '' ){
          $('#loginBtn').prop('disabled', false);
      }else{
          $('#loginBtn').prop('disabled', true); 
      }    
  }
}); 
    },
    connectToWebSocket: function(data) { 
        self= this;
        ws = new WebSocket(configConstants.WEBSOCKET_IP);
        if ("WebSocket" in window) {
            ws.onopen = function() {
                $("#username, #password").prop('disabled', false);
                console.log("connected");
                utils.checkSessionStorage();
                clearTimeout(utils.connectToWebSocket)
            };
            ws.onmessage = function(evt) { 
             if(evt.data == "CLIENTCODE_409" || evt.data == "CLIENTCODE_412"|| evt.data == "CLIENTCODE_401" || evt.data == "CLIENTCODE_400" || evt.data == "CLIENTCODE_503" || evt.data == "CLIENTCODE_403"){
                var msgCode = evt.data;
                CommonActions.showErrorMessage(serverMessages[msgCode]);
                sessionStorage.setItem('sessionData', null);
                CommonActions.loginSeat(false);
                utils.enableKeyboard();
            }else if(evt.data === resourceConstants.CLIENTCODE_MODE_CHANGED){
                utils.sessionLogout();
                return false;
            }
            else{
                var received_msg = evt.data;
                var data;
                try{
                    data = JSON.parse(evt.data);
                    if(data.hasOwnProperty('data')){
                        if(data.data == 'disconnect'){
                            utils.sessionLogout();
                            return false;
                        }
                    }
                    putSeatData(data);
                    CommonActions.setCurrentSeat(data.state_data);
                }catch(err){
                    //intentionally left blank
                }
                

                CommonActions.setServerMessages();
            }
        };
        ws.onclose = function() {
                //serverMessages.CLIENTCODE_003;
               /* alert(JSON.stringify(evt));
                if(evt == "CLIENTCODE_409" || evt == "CLIENTCODE_503"){
                    var msgCode = evt;
                    console.log(serverMessages[msgCode]);
                    CommonActions.showErrorMessage(serverMessages[msgCode]);
                    CommonActions.logoutSession(true);
                }*/
                //$("#username, #password").prop('disabled', true);
                //alert("Connection is closed...");
                setTimeout(utils.connectToWebSocket, 100);
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
                'data_type': 'auth',
                'data' : {
                    "auth-token" : sessionData.data["auth-token"],
                    "seat_name" : sessionData.data.seat_name
                }
            };
            utils.postDataToWebsockets(webSocketData); 
        }
    },
    postDataToWebsockets: function(data) { 
        console.log(JSON.stringify(data));
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
            'data_type': 'auth',
            'data' : {
                "auth-token" : response.auth_token,
                "seat_name" : data.data.seat_name
            }
        };
        utils.storeSession(webSocketData);
        utils.postDataToWebsockets(webSocketData);
    }).fail(function(data,jqXHR, textStatus, errorThrown) {
        CommonActions.showErrorMessage(data.responseJSON.error);
    });

},
sessionLogout:function(data){
    sessionStorage.setItem('sessionData', null);
    location.reload();
    $.ajax({
        type: 'GET',
        url: configConstants.INTERFACE_IP + appConstants.API + appConstants.AUTH + appConstants.LOGOUT,
        dataType: "json",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            "Authentication-Token" : JSON.parse(sessionStorage.getItem('sessionData'))["data"]["auth-token"]
        }
    }).done(function(response) {
        sessionStorage.setItem('sessionData', null);
        location.reload();
    }).fail(function(data,jqXHR, textStatus, errorThrown) {
        alert("Logout Failed");
    });
},
postDataToInterface: function(data, seat_name) {
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)["data"]["auth-token"];
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
        CommonActions.hideSpinner();
    }).fail(function(jqXhr) {
        console.log(jqXhr);
        CommonActions.hideSpinner();
        if(jqXhr.status == 401 || jqXhr.status == 403 ){
            var msgCode = (jqXhr.status == 401)? "CLIENTCODE_401":"CLIENTCODE_403";
            CommonActions.showErrorMessage(serverMessages[msgCode]);
            sessionStorage.setItem('sessionData', null);
            CommonActions.loginSeat(false);
            utils.enableKeyboard();
        }
    });
},
generateSessionId: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 50; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    localStorage.setItem("session",text);
},
getPeripheralData : function(type, seat_name, status, method){
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)["data"]["auth-token"];
    $.ajax({
        type: 'GET',
        url: configConstants.INTERFACE_IP + appConstants.API + appConstants.PPS_SEATS + seat_name + '/'+ appConstants.PERIPHERALS+'?type='+type,
        dataType: "json",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authentication-Token' : authentication_token
        }
    }).done(function(response) {
        CommonActions.updateSeatData(response.data, type, status, method);  
    }).fail(function(jqXhr) {    

    });
},
///itemsearch 
getOrphanItemData : function(type, seat_name, status, method){
    var data=[{
        "eventName": "put",
        "expectation":{"Put Expectation": "xyz"},
        "location": ["PPS01", "Bin07"],
    //     "UOM": [{
    //         "Case id": "ASHJS787JI"
    //     },
    //     {
    //         "Inner ID": "18771242774"
    //     },
    //     {
    //         "Each ID": "688332"
    //     },
    //     {
    //         "UNIT": "8332"
    //     }

    // ]
        "UOM": {
                "child":{
                    "childId":"Case ID",
                    "childValue": "ASHASDccc",
                    "child":{
                        "childId":"Inner ID",
                        "childValue": "ASAHSDJASD",
                        "child":{
                            "childId":"Each ID",
                            "childValue": "ALKSDAScds"
                        }
                    }
                } 
            }
    },
    {
        "eventName": "put",
        "Put Expectation": "xyz",
        "expectation":{"Put Expectation": "xyz"},
        "location": ["PPS01", "Bin07"],
        // "UOM": [{
        //         "Case id": "ASHJS787JI"
        //     },
        //     {
        //         "Inner ID": "18771242774"
        //     },
        //     {
        //         "Each ID": "688332"
        //     },
        //     {
        //         "UNIT": "8332"
        //     }

        // ]
        "UOM": {
            "child":{
                "childId":"Case ID",
                "childValue": "ASHASDccc",
                "child":{
                    "childId":"Inner ID",
                    "childValue": "ASAHSDJASD",
                    "child":{
                        "childId":"Each ID",
                        "childValue": "ALKSDAScds"
                    }
                }
            } 
        }
    }
    ];
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)["data"]["auth-token"];
    $.ajax({
        type: 'GET',
        url: configConstants.INTERFACE_IP + appConstants.API + appConstants.PPS_SEATS + seat_name + '/'+ appConstants.PERIPHERALS+'?type=pptl',
        dataType: "json",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authentication-Token' : authentication_token
        }
    }).done(function(response) {
        CommonActions.updateSeatData(data, "orphanSearch", status, method);  
    }).fail(function(jqXhr) {    

    });
},




updatePeripherals : function(data, method, seat_name){
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)["data"]["auth-token"];
    var url;
    var method = method;
    if(method == 'POST'){
        url = configConstants.INTERFACE_IP + appConstants.API + appConstants.PPS_SEATS + seat_name + '/'+appConstants.PERIPHERALS+appConstants.ADD;
    }else{
        url = configConstants.INTERFACE_IP + appConstants.API + appConstants.PPS_SEATS + appConstants.PERIPHERALS+'/'+data.peripheral_type+'/'+ encodeURIComponent(data.peripheral_id)/*.replace(/\//g, "%2F")*/;
    }
    $.ajax({
        type: method,
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authentication-Token' : authentication_token
        }
            /*complete:function(xhr,textStatus) {
                if(xhr.status == 409)
                    utils.getPeripheralData(data.peripheral_type, seat_name , '409', method)

            //utils.getPeripheralData(data.peripheral_type, seat_name , 'success', method)
           // CommonActions.updateSeatData(response.data, data.peripheral_type); 
       }*/
   }).done(function(response,statusText,xhr) {
    utils.getPeripheralData(data.peripheral_type, seat_name , 'success', method)
           // CommonActions.updateSeatData(response.data, data.peripheral_type); 
       }).fail(function(jqXhr) {
        if(jqXhr.status == 409)
            utils.getPeripheralData(data.peripheral_type, seat_name , '409', method)
        else if(jqXhr.status == 400)
            utils.getPeripheralData(data.peripheral_type, seat_name , '400', method)
        else
            utils.getPeripheralData(data.peripheral_type, seat_name , 'fail', method);

    });
   },
   createLogData: function(message, type) {
    var data = {};
    data["message"] = message;
    data["type"] = type;
    data["session"] = localStorage.getItem("session");
    return data;
},

frntStringTransform : function(messgCode, stringArg) {
    var message_args = [];
    message_args = stringArg?stringArg:[];
    message_args.unshift(serverMessages[messgCode]?serverMessages[messgCode]:"");
    return _.apply(null, message_args);
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
    data.state_data={ "seat_name": "front_4", "notification_list": [], "scan_details": { "current_qty": "2", "total_qty": "2", "kq_allowed": true }, "rack_details": { "slot_barcodes": ["025.1.E.01", "025.1.E.02"], "rack_type_rec": [{ "slot_ref": [49, 46, 65, 46, 48, 49, 45, 65, 46, 48, 50], "height": 33, "length": 32, "orig_coordinates": [0, 5], "type": "slot", "barcodes": ["A.01", "A.02"] }, { "slot_ref": [49, 46, 65, 46, 48, 51, 45, 65, 46, 48, 52], "height": 33, "length": 32, "orig_coordinates": [32, 5], "type": "slot", "barcodes": ["A.03", "A.04"] }, { "slot_ref": [49, 46, 65, 46, 48, 53, 45, 65, 46, 48, 54], "height": 33, "length": 32, "orig_coordinates": [64, 5], "type": "slot", "barcodes": ["A.05", "A.06"] }, { "slot_ref": [49, 46, 66, 46, 48, 49, 45, 66, 46, 48, 50], "height": 33, "length": 32, "orig_coordinates": [0, 43], "type": "slot", "barcodes": ["B.01", "B.02"] }, { "slot_ref": [49, 46, 66, 46, 48, 51, 45, 66, 46, 48, 52], "height": 33, "length": 32, "orig_coordinates": [32, 43], "type": "slot", "barcodes": ["B.03", "B.04"] }, { "slot_ref": [49, 46, 66, 46, 48, 53, 45, 66, 46, 48, 54], "height": 33, "length": 32, "orig_coordinates": [64, 43], "type": "slot", "barcodes": ["B.05", "B.06"] }, { "slot_ref": [49, 46, 67, 46, 48, 49, 45, 67, 46, 48, 50], "height": 33, "length": 32, "orig_coordinates": [0, 81], "type": "slot", "barcodes": ["C.01", "C.02"] }, { "slot_ref": [49, 46, 67, 46, 48, 51, 45, 67, 46, 48, 52], "height": 33, "length": 32, "orig_coordinates": [32, 81], "type": "slot", "barcodes": ["C.03", "C.04"] }, { "slot_ref": [49, 46, 67, 46, 48, 53, 45, 67, 46, 48, 54], "height": 33, "length": 32, "orig_coordinates": [64, 81], "type": "slot", "barcodes": ["C.05", "C.06"] }, { "slot_ref": [49, 46, 68, 46, 48, 49, 45, 68, 46, 48, 50], "height": 33, "length": 32, "orig_coordinates": [0, 119], "type": "slot", "barcodes": ["D.01", "D.02"] }, { "slot_ref": [49, 46, 68, 46, 48, 51, 45, 68, 46, 48, 52], "height": 33, "length": 32, "orig_coordinates": [32, 119], "type": "slot", "barcodes": ["D.03", "D.04"] }, { "slot_ref": [49, 46, 68, 46, 48, 53, 45, 68, 46, 48, 54], "height": 33, "length": 32, "orig_coordinates": [64, 119], "type": "slot", "barcodes": ["D.05", "D.06"] }, { "slot_ref": [49, 46, 69, 46, 48, 49, 45, 69, 46, 48, 50], "height": 33, "length": 32, "orig_coordinates": [0, 157], "type": "slot", "barcodes": ["E.01", "E.02"] }, { "slot_ref": [49, 46, 69, 46, 48, 51, 45, 69, 46, 48, 52], "height": 33, "length": 32, "orig_coordinates": [32, 157], "type": "slot", "barcodes": ["E.03", "E.04"] }, { "slot_ref": [49, 46, 69, 46, 48, 53, 45, 69, 46, 48, 54], "height": 33, "length": 32, "orig_coordinates": [64, 157], "type": "slot", "barcodes": ["E.05", "E.06"] }], "rack_type": "msu", "rack_width": 96, "slot_type": "slot" }, "exception_allowed": [], "roll_cage_flow": false, "bin_coordinate_plotting": false, "event": "empty", "screen_id": "pick_front_pptl_press", "logout_allowed": false, "seat_type": "front", "time_stamp": "1534160270", "ppsbin_list": [{ "breadth": "200", "direction": "center", "bin_info": [], "ppsbin_blink_state": false, "packing_box": "false", "ppsbin_id": "6", "ppsbin_light_color": "none", "length": "200", "selected_state": false, "ppsbin_state": "empty", "ppsbin_count": "0", "coordinate": [1, 1], "group_id": "1", "totes_associated": "false" }, { "breadth": "200", "direction": "center", "bin_info": [], "ppsbin_blink_state": false, "packing_box": "false", "ppsbin_id": "5", "ppsbin_light_color": "none", "length": "200", "selected_state": false, "ppsbin_state": "empty", "ppsbin_count": "0", "coordinate": [1, 2], "group_id": "1", "totes_associated": "false" }, { "breadth": "200", "direction": "center", "bin_info": [], "ppsbin_blink_state": false, "packing_box": "false", "ppsbin_id": "4", "ppsbin_light_color": "none", "length": "200", "selected_state": false, "ppsbin_state": "empty", "ppsbin_count": "0", "coordinate": [1, 3], "group_id": "1", "totes_associated": "false" }, { "breadth": "200", "direction": "center", "bin_info": [], "ppsbin_blink_state": false, "packing_box": "false", "ppsbin_id": "3", "ppsbin_light_color": "none", "length": "200", "selected_state": false, "ppsbin_state": "empty", "ppsbin_count": "0", "coordinate": [1, 4], "group_id": "1", "totes_associated": "false" }, { "breadth": "200", "direction": "center", "bin_info": [], "ppsbin_blink_state": false, "packing_box": "false", "ppsbin_id": "2", "ppsbin_light_color": "none", "length": "200", "selected_state": false, "ppsbin_state": "empty", "ppsbin_count": "0", "coordinate": [1, 5], "group_id": "1", "totes_associated": "false" }, { "breadth": "200", "direction": "center", "bin_info": [{ "product_sku": "a1", "serial": [], "type": "Item", "quantity": 2 }], "ppsbin_blink_state": false, "packing_box": "false", "ppsbin_id": "1", "ppsbin_light_color": "blue", "length": "200", "selected_state": true, "ppsbin_state": "empty", "ppsbin_count": "2", "coordinate": [1, 6], "group_id": "1", "totes_associated": "false" }], "mode": "pick", "group_info": { "1": "center" }, "search_allowed":true, "scan_allowed": false, "operator_orientation": "0", "button_press_allowed": true, "cancel_scan_enabled": true, "button_press_id": "bin_full", "structure": [1, 6], "error_popup_disabled": true, "header_steps": ["PkF.S.003", "PkF.S.005"], "screen_version": "1", "docked": [], "api_version": "1", "is_idle": false, "header_msge_list": [{ "level": "info", "code": "PkF.H.007", "details": ["1"], "description": "Press PPTL for Bin to confirm" }] };
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