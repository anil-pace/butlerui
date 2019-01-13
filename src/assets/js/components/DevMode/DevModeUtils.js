postUrl = function(EndPoint, Data, CallBack) {
  console.log("Posting: " + Data + " @ " + EndPoint),
    $.ajax({
      url: EndPoint,
      type: "post",
      data: Data,
      headers: {
        "Content-Type": "application/json",
        "Authentication-Token": $("#tokenText").val() //for object property name, use quoted notation shown in second
      },
      dataType: "json",
      success: CallBack
    });
};

getAuthToken = function() {
  var EndPoint = configConstants.INTERFACE_IP +"/api/auth/token";
  var Data = {
    username: "admin",
    password: "apj0702",
    grant_type: "password",
    action: "LOGIN"
  };
  var CallBack = function(response, responseStatus, xhr) {
    console.log("got response: " + response + ", status: " + responseStatus);
    var ResponseJson = response;
    $("#tokenText").val(ResponseJson.auth_token);
  };
  postUrl(EndPoint, JSON.stringify(Data), CallBack);
};

var devModeUtils = {
  devModeInit: function() {
    wsHook.before = function(data, url) {
      console.log("Sending message to " + url + " : " + data);
    };

    wsHook.after = function(messageEvent, url) {
      console.log("Received message from " + url + " : " + messageEvent.data);
      try {
        StateDataJson = JSON.parse(messageEvent.data);
      } catch (e) {
        return messageEvent;
      }
      return messageEvent;
    };
  },
  makeid: function() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },
  getSeatEndpoint: function() {
    return (
      configConstants.INTERFACE_IP + "/api/pps_seats/" +
      StateDataJson.state_data.seat_name +
      "/send_data"
    );
  },

  stdCallBack: function(response) {
    console.log("Got response " + response.status);
    console.log(response.responseText);
  },

  getCompositeBarcode: function(serials) {
    var Result = $("#pd_sku").val() + ",4234234," + serials.length;
    for (var i = 0; i < serials.length; ++i) {
      Result += "," + serials[i].package_serials;
    }
    return Result;
  },

  load_config: function(){
    if (typeof(configConstants) == "undefined"){
      if (sessionStorage.getItem("configConstants")){
          configConstants = JSON.parse(sessionStorage.getItem("configConstants")); 
      }else{
          configConstants = require('../../constants/configConstants');
          sessionStorage.setItem("configConstants", JSON.stringify(configConstants));
      } 
  }
  
  },

  getAuthToken: getAuthToken
};

module.exports = devModeUtils;
