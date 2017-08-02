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
                var data = JSON.parse(evt.data);
                if(data.hasOwnProperty('data')){
                    if(data.data == 'disconnect'){
                        utils.sessionLogout();
                        return false;
                    }
                }
                putSeatData(data);
                CommonActions.setCurrentSeat(data.state_data);
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
        }).fail(function(jqXhr) { console.log(jqXhr);
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
    
    console.log(data);
    switch (data.state_data.mode + "_" + data.state_data.seat_type) {
        case appConstants.PUT_BACK:
            CommonActions.setPutBackData(data.state_data);
            break;
        case appConstants.PUT_FRONT:
         // if(data.state_data){
         // data.state_data= JSON.parse('{"seat_name":"front_2","notification_list":[],"scan_details":{"current_qty":"1","total_qty":"2","kq_allowed":true},"rack_details":{"rack_type_rec":[["A",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["B",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["C",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["D",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["E",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]]],"slot_barcodes":["101.1.A.01","101.1.A.02"],"slot_type":"slot"},"exception_allowed":[{"exception_id":"PtF001","exception_name":"Issue with Entity","event":"unscannable_or_missing_or_damaged"},{"exception_id":"PtF002","exception_name":"Space Unavailable To Put","event":"space_unavailable"}],"roll_cage_flow":false,"bin_coordinate_plotting":false,"screen_id":"put_front_place_items_in_rack","logout_allowed":false,"seat_type":"front","product_info":[[{"display_data":[{"locale":"ja-JP","display_name":"商品の寸法"},{"locale":"en-US","display_name":"Product Dimensions"}],"product_dimensions":[1,3,10]}],[{"display_data":[{"locale":"en-US","display_name":"product_local_image_url"}],"product_local_image_url":null}],[{"display_data":[{"locale":"ja-JP","display_name":"製品バーコード"},{"locale":"en-US","display_name":"Product Barcodes"}],"product_barcodes":["6003"]}],[{"product_sku":"6003","display_data":[{"locale":"ja-JP","display_name":"製品SKU"},{"locale":"en-US","display_name":"Product SKU"}]}]],"time_stamp":"1501583659","ppsbin_list":[{"breadth":"200","direction":"center","bin_info":[],"ppsbin_id":"5","length":"200","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[1,1],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[{"product_sku":"6003","type":"item","quantity":1}],"ppsbin_blink_state":true,"ppsbin_id":"4","ppsbin_light_color":"blue","length":"200","selected_state":true,"ppsbin_state":"IN USE","ppsbin_count":"1","coordinate":[1,2],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[{"product_sku":"6012","type":"item","quantity":2}],"ppsbin_id":"3","length":"200","selected_state":false,"ppsbin_state":"IN USE","ppsbin_count":"2","coordinate":[1,3],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[],"ppsbin_id":"2","length":"200","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[1,4],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[],"ppsbin_id":"1","length":"200","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[1,5],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[],"ppsbin_id":"10","length":"200","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[2,1],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[],"ppsbin_id":"9","length":"200","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[2,2],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[],"ppsbin_id":"8","length":"200","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[2,3],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[],"ppsbin_id":"7","length":"200","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[2,4],"group_id":"1","totes_associated":false},{"breadth":"200","direction":"center","bin_info":[],"ppsbin_id":"6","length":"200","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[2,5],"group_id":"1","totes_associated":false}],"mode":"put","group_info":{"1":"center"},"is_idle":false,"special_handling":{"nestable_count":"1","nestable_direction":"BLH","stacking":"BHL","fragile":true,"orientation_preference":true,"stacking_count":["inf","inf",1]},"item_uid":"b69dd9f6-5e95-41ab-ac0e-988f212cca43","structure":[2,5],"screen_version":"1","docked":[],"api_version":"1","scan_allowed":true,"header_msge_list":[{"level":"info","code":"PtF.H.001","details":[],"description":"Place Entity in Slot and Scan More"}]}');
         // }
         console.log(data.state_data);
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