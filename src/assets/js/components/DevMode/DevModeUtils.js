postUrl = function(EndPoint, Data, CallBack) {
  console.log("Posting: " + Data + " @ " + EndPoint),
    $.ajax({
      url: EndPoint,
      type: "post",
      data: Data,
      headers: {
        "Content-Type": "application/json",
        "Authentication-Token": $("#tokenText").val()
      },
      dataType: "json",
      success: CallBack
    });
};

getAuthToken = function() {
  var EndPoint = configConstants.INTERFACE_IP + "/api/auth/token";
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

devlog = function(text) {
  prevText = $("#devconsole_ta").val();
  $("#devconsole_ta").val(prevText + text + "\n");
  console.log(text);
//   var textarea = document.getElementById('devconsole_ta');
//     textarea.scrollTop = textarea.scrollHeight;
      var $devconsole_ta = $("#devconsole_ta");
  $devconsole_ta.scrollTop($devconsole_ta[0].scrollHeight);
};

stdCallBack = function(response, responseStatus, xhr) {
  devlog("Got response: " + responseStatus);
  console.log(JSON.stringify(response));
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
      configConstants.INTERFACE_IP +
      "/api/pps_seats/" +
      StateDataJson.state_data.seat_name +
      "/send_data"
    );
  },

  stdCallBack: stdCallBack,

  devlog: devlog,

  getCompositeBarcode: function(serials) {
    var Result = $("#pd_sku").val() + ",4234234," + serials.length;
    for (var i = 0; i < serials.length; ++i) {
      Result += "," + serials[i].package_serials;
    }
    return Result;
  },

  load_config: function() {
    if (typeof configConstants == "undefined") {
      if (sessionStorage.getItem("configConstants")) {
        configConstants = JSON.parse(sessionStorage.getItem("configConstants"));
      } else {
        configConstants = require("../../constants/configConstants");
        sessionStorage.setItem(
          "configConstants",
          JSON.stringify(configConstants)
        );
      }
    }
  },

  getAuthToken: getAuthToken,

  postUrl: postUrl,

  coreCall: function(Module, Fun, Args, CallBack) {
    var EndPoint = configConstants.CORE_IP + "/devtools/remexec";
    Data = {
      module: Module,
      function: Fun,
      args: Args
    };
    $.ajax({
      url: EndPoint,
      type: "post",
      data: JSON.stringify(Data),
      headers: {
        "Content-Type": "application/json"
      },
      dataType: "json",
      success: CallBack
    });
  },

  getUrl: function(EndPoint, CallBack) {
    console.log("Get @ " + EndPoint),
      $.ajax({
        url: EndPoint,
        type: "get",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": $("#tokenText").val(),
          Authorization: "Basic YnV0bGVyOmJ1dGxlcg=="
        },
        dataType: "json",
        success: CallBack
      });
  }
};

module.exports = devModeUtils;
