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
    getCurrentLang:function(){
        var localeStr = window.sessionStorage.getItem("localeData"),
        localeObj =  (localeStr) ? JSON.parse(localeStr) : {},
        localeLang = (localeObj && localeObj.data) ? localeObj.data.locale : null;
        return localeLang
      },
   get3dotTrailedText:function(serial,frontlimit=5,rearLimit=5,stringLength){
       let trailedText="";
       if(serial.length>stringLength){
        trailedText=serial.slice(0,frontlimit)+"..."+serial.slice(-rearLimit);
       }
       else{
        trailedText=serial;
       }
       return trailedText
   },   
   displayData : function(data,serial){
    product_info_locale = {};
    image_url = {};
    var language_locale = sessionStorage.getItem('localeData');
    var locale;
    if(language_locale == 'null' || language_locale == null){
      locale = 'en-US';
    }else{
      locale = JSON.parse(language_locale)["data"]["locale"]; 
    }
    data.map(function(value, index){
      var keyValue ="";
      var imageKey;
      for (var key in value[0]) { 
        if (key === "product_dimensions") {
          var dimension = value[0][key];
          for (var i = 0; i < dimension.length; i++) {
            if(i === 0) {
              keyValue = dimension[i] + "";
            }
            else {
              keyValue = keyValue + " X " + dimension[i]
            }
          }
          
        }
        else if(key != 'display_data' && key != 'product_local_image_url' ){
          keyValue = value[0][key] + ' ';
         }else if(key != 'display_data' && key == 'product_local_image_url' ){
          imageKey = value[0][key];
         }
      }
      value[0].display_data.map(
        function(data_locale, index1){
         if(data_locale.locale == locale){
            if(data_locale.display_name != 'product_local_image_url' ){
              product_info_locale[data_locale.display_name] = keyValue;
            }
          }
          if(data_locale.display_name == 'product_local_image_url' ){
            if(imageKey === "outer_each" || imageKey === "inner_each" || imageKey === "outer_inner"){
                product_info_locale[data_locale.display_name] = "assets/images/" + imageKey + ".gif";
            }
            else if(imageKey === "outer" || imageKey === "inner"){
                product_info_locale[data_locale.display_name] = "assets/images/" + imageKey + ".png";
            }
            else
            product_info_locale[data_locale.display_name] = imageKey;
        }
        
        }

      )
      
    });
    if(serial){
        product_info_locale[_("Serial")]=serial;
    }
  return product_info_locale;
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
        if(data.data.barcode){ // if barcode key is present its login via scanner mode
            var loginData ={
                "username" : "d_____", // post discussion with platform (rahul.s)
                "password" : "d_____", // d+(5 times _)
                "grant_type": "password",
                "action": "LOGIN",
                "context": {
                    "barcode": data.data.barcode
                }
            }
        }
        else{
            var loginData ={
                "username" : data.data.username,
                "password" : data.data.password,
                "grant_type": "password",
                "action": "LOGIN"
            }
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
getOrphanItemData : function(data, seat_name){
    var dataToSent="?"+"barcode="+data+"&"+"ppsId="+seat_name;
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)["data"]["auth-token"];
    $.ajax({
        type: 'GET',
         url: configConstants.INTERFACE_IP + appConstants.API +appConstants.API_GATEWAY+appConstants.SR_SERVICE+appConstants.PLATFORM_SRMS+appConstants.SERVICE_REQUEST+appConstants.SEARCH_ITEM+dataToSent,
         dataType: "json",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authentication-Token' : authentication_token
        }

    }).done(function(response) {
            CommonActions.updateSeatData(response.data, "orphanSearch");  
    }).fail(function(jqXhr) {
        CommonActions.updateSeatData([], "orphanSearch"); 
        
    });
    
},
getBOIConfig : function(){
    $.ajax({
        type: 'GET',
         url: configConstants.BOI_CONFIG 
    }).done(function(response) {
            CommonActions.updateSeatData(response, "BOI_CONFIG");  
    }).fail(function(jqXhr) {
        CommonActions.updateSeatData(null, "BOI_CONFIG"); 
        
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
    data.state_data = {"seat_name":"front_1","notification_list":[{"level":"info","code":"PkF.I.004","details":["Item"],"description":"Item Scan successful"}],"rack_details":{"slot_barcodes":["447.0.A.01","447.0.A.02","447.0.A.03"],"rack_type_rec":[{"slot_ref":[48,46,65,46,48,49,45,65,46,48,50,45,65,46,48,51],"height":31.5,"length":47.6,"orig_coordinates":[0.9500000000000028,6],"type":"slot","barcodes":["A.01","A.02","A.03"]},{"slot_ref":[48,46,65,46,48,52,45,65,46,48,53,45,65,46,48,54],"height":31.5,"length":47.6,"orig_coordinates":[49.35,6],"type":"slot","barcodes":["A.04","A.05","A.06"]},{"slot_ref":[48,46,66,46,48,49,45,66,46,48,50,45,66,46,48,51],"height":17,"length":47.6,"orig_coordinates":[0.9500000000000028,41.5],"type":"slot","barcodes":["B.01","B.02","B.03"]},{"slot_ref":[48,46,66,46,48,52,45,66,46,48,53,45,66,46,48,54],"height":17,"length":47.6,"orig_coordinates":[49.35,41.5],"type":"slot","barcodes":["B.04","B.05","B.06"]},{"slot_ref":[48,46,67,46,48,49,45,67,46,48,50,45,67,46,48,51],"height":17,"length":47.6,"orig_coordinates":[0.9500000000000028,62.5],"type":"slot","barcodes":["C.01","C.02","C.03"]},{"slot_ref":[48,46,67,46,48,52,45,67,46,48,53,45,67,46,48,54],"height":17,"length":47.6,"orig_coordinates":[49.35,62.5],"type":"slot","barcodes":["C.04","C.05","C.06"]},{"slot_ref":[48,46,68,46,48,49,45,68,46,48,50],"height":17,"length":31.6,"orig_coordinates":[0.9500000000000028,83.5],"type":"slot","barcodes":["D.01","D.02"]},{"slot_ref":[48,46,68,46,48,51,45,68,46,48,52],"height":17,"length":31.6,"orig_coordinates":[33.35,83.5],"type":"slot","barcodes":["D.03","D.04"]},{"slot_ref":[48,46,68,46,48,53,45,68,46,48,54],"height":17,"length":31.6,"orig_coordinates":[65.35,83.5],"type":"slot","barcodes":["D.05","D.06"]},{"slot_ref":[48,46,69,46,48,49,45,69,46,48,50,45,69,46,48,51,45,69,46,48,52,45,69,46,48,53,45,69,46,48,54],"height":39,"length":96,"orig_coordinates":[0.9500000000000028,104.5],"type":"slot","barcodes":["E.01","E.02","E.03","E.04","E.05","E.06"]},{"slot_ref":[48,46,70,46,48,49,45,70,46,48,50,45,70,46,48,51,45,70,46,48,52,45,70,46,48,53,45,70,46,48,54],"height":39,"length":96,"orig_coordinates":[0.9500000000000028,147.5],"type":"slot","barcodes":["F.01","F.02","F.03","F.04","F.05","F.06"]}],"rack_type":"msu","rack_width":97.9,"slot_type":"slot"},"exception_allowed":[{"event":"missing_or_unscannable_damaged_item","exception_id":"PkF001","details":["Item"],"exception_name":"Item Missing/Bad Barcode"}],"roll_cage_flow":false,"previous_pick_details":[[{"display_data":[{"locale":"en-US","display_name":"QL Code"}],"ql_code":"i2_bc"}],[{"display_data":[{"locale":"en-US","display_name":"Slot ID"}],"slot_barcode":["447.0.F.01-F.02-F.03-F.04-F.05-F.06"]}],[{"bin_station":"1","display_data":[{"locale":"en-US","display_name":"Location"}]}]],"bin_coordinate_plotting":true,"event":"first_item_pick","screen_id":"pick_front_one_step_scan","logout_allowed":true,"seat_type":"front","product_info":[[{"display_data":[{"locale":"ja-JP","display_name":"製品バーコード"},{"locale":"en-US","display_name":"Product Barcodes"}],"product_barcodes":["i3_bc"]}],[{"product_sku":"i3","display_data":[{"locale":"ja-JP","display_name":"製品SKU"},{"locale":"en-US","display_name":"Product SKU"}]}],[{"display_data":[{"locale":"ja-JP","display_name":"商品の寸法"},{"locale":"en-US","display_name":"Product Dimensions"}],"product_dimensions":[40.79999923706055,35.100001096725464,10.000000149011612]}],[{"display_data":[{"locale":"en-US","display_name":"product_local_image_url"}],"product_local_image_url":null}]],"time_stamp":"1546426287","ppsbin_list":[{"breadth":"49","direction":"right","bin_info":[],"ppsbin_id":"4","packing_box":"false","orig_coordinate":[0,0],"ppsbin_light_color":"none","length":"127","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[1,1],"ppsbin_blink_state":false,"group_id":"1","totes_associated":"false"},{"breadth":"49","direction":"left","bin_info":[],"ppsbin_id":"2","packing_box":"false","orig_coordinate":[15,0],"ppsbin_light_color":"none","length":"127","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[1,3],"ppsbin_blink_state":false,"group_id":"1","totes_associated":"false"},{"breadth":"49","direction":"right","bin_info":[],"ppsbin_id":"3","packing_box":"false","orig_coordinate":[127,0],"ppsbin_light_color":"none","length":"127","selected_state":false,"ppsbin_state":"empty","ppsbin_count":"0","coordinate":[1,2],"ppsbin_blink_state":false,"group_id":"1","totes_associated":"false"},{"breadth":"49","direction":"left","bin_info":[{"product_sku":"i2","serial":[],"type":"Item","quantity":1},{"product_sku":"i3","serial":[],"type":"Item","quantity":0}],"ppsbin_id":"1","packing_box":"false","orig_coordinate":[142,0],"ppsbin_light_color":"blue","length":"127","selected_state":true,"ppsbin_state":"IN USE","ppsbin_count":"1","coordinate":[1,4],"ppsbin_blink_state":false,"group_id":"1","totes_associated":"true"}],"mode":"pick","group_info":{"1":"right"},"scan_allowed":true,"special_handling":[],"operator_orientation":"0","button_press_allowed":false,"item_uid":"3","button_press_id":"bin_full","structure":[1,4],"error_popup_disabled":false,"screen_version":"1","docked":[],"api_version":"1","is_idle":false,"header_msge_list":[{"level":"info","code":"PkF.H.029","details":["cart","Item"],"description":"Scan item or dock Tote"}]};
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
        case appConstants.SEARCH:
        CommonActions.setSearchData(data.state_data);
        break;

        default:
        return true;
    }
}

module.exports = utils;