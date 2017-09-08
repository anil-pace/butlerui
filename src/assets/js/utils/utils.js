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
                try{
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
                }catch(ex){

                }

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
    
    //console.log(data);
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
            //scan MPU screen data.state_data=JSON.parse('{"seat_name":"front_3","notification_list":[{"level":"info","code":"AdF.I.008","details":[],"description":"Cancel audit successful.Audit Restarted"}],"rack_details":{"rack_type_rec":[["A",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["B",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["C",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["D",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["E",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]]],"slot_type":"slot"},"exception_allowed":[{"exception_id":"AdF003","exception_name":"Loose Item unscannable","event":"loose_item_damage"},{"exception_id":"AdF002","exception_name":"Box unscannable","event":"box_damage"}],"roll_cage_flow":false,"show_expected_qty":false,"bin_coordinate_plotting":false,"screen_id":"audit_scan_sr","last_finished_box":[],"Cancel_scan":false,"logout_allowed":true,"seat_type":"front","product_info":[],"time_stamp":"1504526748","api_version":"1","mode":"audit","Box_qty_list":[],"group_info":{"1":"center"},"scan_allowed":true,"Extra_box_list":[],"Sku_Item_List":[{"Sku":"2001","Item_Qty_List":[{"Item_Id":"b0662a85-0c69-405d-b8ce-a7bdd0d7607e","Actual_Qty":0,"Expected_Qty":9}]}],"Current_box_details":[],"item_in_box_barcode_damage":[],"extra_loose_sku_item_list":[],"screen_version":"1","enable_kq":false,"loose_item_barcode_damage":0,"docked":[],"Loose_sku_list":[{"Sku":"2001","Actual_qty":0,"Expected_qty":9}],"is_idle":false,"box_barcode_damage":0,"header_msge_list":[{"level":"info","code":"AdF.H.003","details":[],"description":"Scan Box/Items"}]}');
            //add pack screen 
            //data.state_data=JSON.parse('{"seat_name":"front_3","notification_list":[{"level":"info","code":"AdF.I.008","details":[],"description":"Cancel audit successful.Audit Restarted"}],"rack_details":{"rack_type_rec":[["A",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["B",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["C",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["D",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["E",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]]],"slot_barcodes":["026.1.A.03","026.1.A.04"],"slot_type":"slot"},"exception_allowed":[{"exception_id":"AdF003","exception_name":"Loose Item unscannable","event":"loose_item_damage"},{"exception_id":"AdF002","exception_name":"Box unscannable","event":"box_damage"}],"roll_cage_flow":false,"show_expected_qty":false,"bin_coordinate_plotting":false,"screen_id":"audit_scan_sr","last_finished_box":[],"Cancel_scan":false,"logout_allowed":true,"seat_type":"front","product_info":[],"time_stamp":"1504526748","api_version":"1","mode":"audit","Box_qty_list":[{"Box_serial": "A001","Actual_qty": "3","Expected_qty": "5","Box_Expected_Qty": "3","Box_Actual_Qty": "2","Scan_status": "close","Type": "outer/pack"},{"Box_serial": "A002","Actual_qty": "4","Expected_qty": "7","Box_Expected_Qty": "6","Box_Actual_Qty": "3",”Scan_status": "close","Type": "inner/subpack"}],"group_info":{"1":"center"},"scan_allowed":true,"Extra_box_list":[],"Sku_Item_List":[],"Current_box_details":[],"item_in_box_barcode_damage":[],"extra_loose_sku_item_list":[],"screen_version":"1","enable_kq":false,"loose_item_barcode_damage":0,"docked":[],"Loose_sku_list":[],"is_idle":false,"box_barcode_damage":0,"header_msge_list":[{"level":"info","code":"AdF.H.003","details":[],"description":"Scan Box/Items"}]}');
            //data.state_data=JSON.parse('{"seat_name": "front_1", "notification_list": [], "rack_details": { "rack_type_rec": [ ["A", [ [ ["01", "02"], 32, 33, 48 ], [ ["03", "04"], 32, 33, 48 ], [ ["05", "06"], 32, 33, 48 ] ]], ["B", [ [ ["01", "02"], 32, 33, 48 ], [ ["03", "04"], 32, 33, 48 ], [ ["05", "06"], 32, 33, 48 ] ]], ["C", [ [ ["01", "02"], 32, 33, 48 ], [ ["03", "04"], 32, 33, 48 ], [ ["05", "06"], 32, 33, 48 ] ]], ["D", [ [ ["01", "02"], 32, 33, 48 ], [ ["03", "04"], 32, 33, 48 ], [ ["05", "06"], 32, 33, 48 ] ]], ["E", [ [ ["01", "02"], 32, 33, 48 ], [ ["03", "04"], 32, 33, 48 ], [ ["05", "06"], 32, 33, 48 ] ]] ], "slot_barcodes": ["002.1.A.01", "002.1.A.02"], "slot_type": "slot" }, "exception_allowed": [{ "exception_id": "AdF003", "exception_name": "Loose Item unscannable", "event": "loose_item_damage" }, { "exception_id": "AdF002", "exception_name": "Box unscannable", "event": "box_damage" }], "roll_cage_flow": false, "show_expected_qty": false, "bin_coordinate_plotting": false, "event": "process_barcode", "screen_id": "audit_reconcile", "last_finished_box": [], "Cancel_scan": false, "logout_allowed": true, "seat_type": "front", "product_info": [], "time_stamp": "1504680547", "api_version": "1", "mode": "audit", "Box_qty_list": [{ "Box_serial": "A001", "Actual_qty": 3, "Expected_qty": 5, "Box_Expected_Qty": 3, "Box_Actual_Qty": 2, "Scan_status": "close", "Type": "outer/pack" }, { "Box_serial": "A002", "Actual_qty": 4, "Expected_qty": 7, "Box_Expected_Qty": 6, "Box_Actual_Qty": 3, "Scan_status": "close", "Type": "inner/subpack" }], "group_info": { "1": "center" }, "scan_allowed": true, "Extra_box_list": [], "Sku_Item_List": [{ "Sku": "2022", "Item_Qty_List": [{ "Item_Id": "eaddb471-bffd-43fb-9e6b-074d7b171a38", "Actual_Qty": 0, "Expected_Qty": 7 }] }], "Current_box_details": [{"Box_serial": "A001","Sku": "null","Actual_qty": 2,"Expected_qty": 9}], "item_in_box_barcode_damage": [], "extra_loose_sku_item_list": [], "screen_version": "1", "enable_kq": false, "loose_item_barcode_damage": 0, "docked": [], "Loose_sku_list": [], "is_idle": false, "box_barcode_damage": 0, "header_msge_list": [{ "level": "info", "code": "AdF.H.003", "details": [], "description": "Scan Box/Items" }]}');
            //data.state_data=JSON.parse('{"seat_name":"front_1","notification_list":[],"rack_details":{"rack_type_rec":[["A",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["B",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["C",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["D",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]],["E",[[["01","02"],32,33,48],[["03","04"],32,33,48],[["05","06"],32,33,48]]]],"slot_barcodes":["002.1.A.03","002.1.A.04"],"slot_type":"slot"},"exception_allowed":[],"roll_cage_flow":false,"show_expected_qty":false,"bin_coordinate_plotting":false,"event":"finish_audit","screen_id":"audit_reconcile","last_finished_box":[],"Cancel_scan":true,"logout_allowed":true,"seat_type":"front","product_info":[],"time_stamp":"1504781383","api_version":"1","mode":"audit","Box_qty_list":[{"Box_serial": "A001","Actual_qty": "3","Expected_qty": "5","Box_Expected_Qty": "3","Box_Actual_Qty": "2","Scan_status": "close","Type": "inner/subpack"}],"group_info":{"1":"center"},"scan_allowed":false,"Extra_box_list":[{"Box_serial":"A000000067","Expected_qty":0,"Actual_qty":2,"Scan_status":"close","Type":"inner/subpack"}],"Sku_Item_List":[{"Sku":"2024","Item_Qty_List":[{"Item_Id":"9e0832dc-523a-416f-ad32-aba2e0e580ab","Actual_Qty":0,"Expected_Qty":1}]},{"Sku":"3001","Item_Qty_List":[{"Item_Id":"3fcb566d-c777-4910-a667-afd7e83b4d43","Actual_Qty":0,"Expected_Qty":2}]}],"Current_box_details":[],"item_in_box_barcode_damage":[],"extra_loose_sku_item_list":[],"screen_version":"1","enable_kq":false,"loose_item_barcode_damage":0,"docked":[],"Loose_sku_list":[{"Sku":"3001","Actual_qty":0,"Expected_qty":2},{"Sku":"2024","Actual_qty":0,"Expected_qty":1}],"is_idle":false,"box_barcode_damage":[],"header_msge_list":[{"level":"info","code":"AdF.H.006","details":[],"description":"Check Count"}]}');            
            CommonActions.setAuditData(data.state_data);
            break;
        default:
            return true;
    }
}

module.exports = utils;