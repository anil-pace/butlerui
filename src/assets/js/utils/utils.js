var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var configConstants = require('../constants/configConstants');
var resourceConstants = require('../constants/resourceConstants');
var appConstants = require('../constants/appConstants');
var CommonActions = require('../actions/CommonActions');
var serverMessages = require('../serverMessages/server_messages');
var ws, self;

var utils = objectAssign({}, EventEmitter.prototype, {
  enableKeyboard: function () {
    virtualKeyBoard_login = $('#username, #password').keyboard({
      layout: 'custom',
      customLayout: {
        default: [
          '! @ # $ % ^ & * + _',
          '1 2 3 4 5 6 7 8 9 0 {b}',
          'q w e r t y u i o p',
          'a s d f g h j k l',
          '{shift} z x c v b n m . {shift}',
          '{space}',
          '{a} {c}'
        ],
        shift: [
          '( ) { } [ ] = ~ ` -',
          '< > | ? / " : ; , \' {b}',
          'Q W E R T Y U I O P',
          'A S D F G H J K L',
          '{shift} Z X C V B N M . {shift}',
          '{space}',
          '{a} {c}'
        ]
      },
      css: {
        container:
          'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad'
      },
      reposition: true,
      alwaysOpen: false,
      initialFocus: true,
      visible: function (e, keypressed, el) {
        el.value = '';
        //$(".authNotify").css("display","none");
      },

      accepted: function (e, keypressed, el) {
        var usernameValue = document.getElementById('username').value;
        var passwordValue = document.getElementById('password').value;
        if (
          usernameValue != null &&
          usernameValue != '' &&
          passwordValue != null &&
          passwordValue != ''
        ) {
          $('#loginBtn').prop('disabled', false);
        } else {
          $('#loginBtn').prop('disabled', true);
        }
      }
    });
  },
  connectToWebSocket: function (data) {
    self = this;
    ws = new WebSocket(configConstants.WEBSOCKET_IP);
    if ('WebSocket' in window) {
      ws.onopen = function () {
        $('#username, #password').prop('disabled', false);
        console.log('connected');
        utils.checkSessionStorage();
        clearTimeout(utils.connectToWebSocket);
      };
      ws.onmessage = function (evt) {
        if (
          evt.data == 'CLIENTCODE_409' ||
          evt.data == 'CLIENTCODE_412' ||
          evt.data == 'CLIENTCODE_401' ||
          evt.data == 'CLIENTCODE_400' ||
          evt.data == 'CLIENTCODE_503' ||
          evt.data == 'CLIENTCODE_403'
        ) {
          var msgCode = evt.data;
          CommonActions.showErrorMessage(serverMessages[msgCode]);
          sessionStorage.setItem('sessionData', null);
          CommonActions.loginSeat(false);
          utils.enableKeyboard();
        } else if (evt.data === resourceConstants.CLIENTCODE_MODE_CHANGED) {
          utils.sessionLogout();
          return false;
        } else {
          var received_msg = evt.data;
          var data;
          try {
            data = JSON.parse(evt.data);
            if (data.hasOwnProperty('data')) {
              if (data.data == 'disconnect') {
                utils.sessionLogout();
                return false;
              }
            }
            putSeatData(data);
            CommonActions.setCurrentSeat(data.state_data);
          } catch (err) {
            //intentionally left blank
          }

          CommonActions.setServerMessages();
        }
      };
      ws.onclose = function () {
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
      alert('WebSocket NOT supported by your Browser!');
    }
  },
  getCurrentLang: function () {
    var localeStr = window.sessionStorage.getItem('localeData'),
      localeObj = localeStr ? JSON.parse(localeStr) : {},
      localeLang = localeObj && localeObj.data ? localeObj.data.locale : null;
    return localeLang;
  },
  get3dotTrailedText: function (
    serial,
    frontlimit = 5,
    rearLimit = 5,
    stringLength
  ) {
    let trailedText = '';
    if (serial.length > stringLength) {
      trailedText =
        serial.slice(0, frontlimit) + '...' + serial.slice(-rearLimit);
    } else {
      trailedText = serial;
    }
    return trailedText;
  },
  displayData: function (data, serial) {
    product_info_locale = {};
    image_url = {};
    var language_locale = sessionStorage.getItem('localeData');
    var locale;
    if (language_locale == 'null' || language_locale == null) {
      locale = 'en-US';
    } else {
      locale = JSON.parse(language_locale)['data']['locale'];
    }
    data.map(function (value, index) {
      var keyValue = '';
      var imageKey;
      for (var key in value[0]) {
        if (key === 'product_dimensions') {
          var dimension = value[0][key];
          for (var i = 0; i < dimension.length; i++) {
            if (i === 0) {
              keyValue = dimension[i] + '';
            } else {
              keyValue = keyValue + ' X ' + dimension[i];
            }
          }
        } else if (key != 'display_data' && key != 'product_local_image_url') {
          keyValue = value[0][key] + ' ';
        } else if (key != 'display_data' && key == 'product_local_image_url') {
          imageKey = value[0][key];
        }
      }
      value[0].display_data.map(function (data_locale, index1) {
        if (data_locale.locale == locale) {
          if (data_locale.display_name != 'product_local_image_url') {
            product_info_locale[data_locale.display_name] = keyValue;
          }
        }
        if (data_locale.display_name == 'product_local_image_url') {
          if (
            imageKey === 'outer_each' ||
            imageKey === 'inner_each' ||
            imageKey === 'outer_inner'
          ) {
            product_info_locale[data_locale.display_name] =
              'assets/images/' + imageKey + '.gif';
          } else if (imageKey === 'outer' || imageKey === 'inner') {
            product_info_locale[data_locale.display_name] =
              'assets/images/' + imageKey + '.png';
          } else product_info_locale[data_locale.display_name] = imageKey;
        }
      });
    });
    if (serial) {
      product_info_locale[_('Serial')] = serial;
    }
    return product_info_locale;
  },
  checkSessionStorage: function () {
    var sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
    if (sessionData === null) {
    } else {
      var webSocketData = {
        data_type: 'auth',
        data: {
          'auth-token': sessionData.data['auth-token'],
          seat_name: sessionData.data.seat_name
        }
      };
      utils.postDataToWebsockets(webSocketData);
    }
  },
  postDataToWebsockets: function (data) {
    console.log(JSON.stringify(data));
    ws.send(JSON.stringify(data));
    setTimeout(CommonActions.operatorSeat, 0, true);
  },
  storeSession: function (data) {
    // Put the object into storage
    sessionStorage.setItem('sessionData', JSON.stringify(data));
  },
  getAuthToken: function (data) {
    sessionStorage.setItem('sessionData', null);

    if (data.data.barcode) {
      // if barcode key is present its login via scanner mode
      var loginData = {
        username: 'd_____', // post discussion with platform (rahul.s)
        password: 'd_____', // d+(5 times _)
        grant_type: 'password',
        action: 'LOGIN',
        role: [data.data.role],
        context: {
          entity_id: '1',
          barcode: data.data.barcode,
          app_name: 'boi_ui'
        }
      };
    } else {
      var loginData = {
        username: data.data.username,
        password: data.data.password,
        grant_type: 'password',
        role: [data.data.role],
        action: 'LOGIN',
        context: {
          entity_id: '1',
          app_name: 'boi_ui'
        }
      };
    }
    $.ajax({
      type: 'POST',
      url:
        configConstants.INTERFACE_IP +
        appConstants.API +
        appConstants.AUTH +
        appConstants.TOKEN,
      data: JSON.stringify(loginData),
      dataType: 'json',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      }
    })
      .done(function (response) {
        var webSocketData = {
          data_type: 'auth',
          data: {
            'auth-token': response.auth_token,
            seat_name: data.data.seat_name
          }
        };
        utils.storeSession(webSocketData);
        utils.postDataToWebsockets(webSocketData);
      })
      .fail(function (data, jqXHR, textStatus, errorThrown) {
        CommonActions.showErrorMessage(data.responseJSON.error);
      });
  },

  sessionLogout: function (data) {
    sessionStorage.setItem('sessionData', null);
    location.reload();
    $.ajax({
      type: 'GET',
      url:
        configConstants.INTERFACE_IP +
        appConstants.API +
        appConstants.AUTH +
        appConstants.LOGOUT,
      dataType: 'json',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'Authentication-Token': JSON.parse(
          sessionStorage.getItem('sessionData')
        )['data']['auth-token']
      }
    })
      .done(function (response) {
        sessionStorage.setItem('sessionData', null);
        location.reload();
      })
      .fail(function (data, jqXHR, textStatus, errorThrown) {
        alert('Logout Failed');
      });
  },
  postDataToInterface: function (data, seat_name) {
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)['data'][
      'auth-token'
    ];
    $.ajax({
      type: 'POST',
      url:
        configConstants.INTERFACE_IP +
        appConstants.API +
        appConstants.PPS_SEATS +
        seat_name +
        appConstants.SEND_DATA,
      data: JSON.stringify(data),
      dataType: 'json',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'Authentication-Token': authentication_token
      }
    })
      .done(function (response) {
        CommonActions.hideSpinner();
      })
      .fail(function (jqXhr) {
        console.log(jqXhr);
        CommonActions.hideSpinner();
        if (jqXhr.status == 401 || jqXhr.status == 403) {
          var msgCode =
            jqXhr.status == 401 ? 'CLIENTCODE_401' : 'CLIENTCODE_403';
          CommonActions.showErrorMessage(serverMessages[msgCode]);
          sessionStorage.setItem('sessionData', null);
          CommonActions.loginSeat(false);
          utils.enableKeyboard();
        }
      });
  },
  generateSessionId: function () {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 50; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    localStorage.setItem('session', text);
  },
  getPeripheralData: function (type, seat_name, status, method) {
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)['data'][
      'auth-token'
    ];
    $.ajax({
      type: 'GET',
      url:
        configConstants.INTERFACE_IP +
        appConstants.API +
        appConstants.PPS_SEATS +
        seat_name +
        '/' +
        appConstants.PERIPHERALS +
        '?type=' +
        type,
      dataType: 'json',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'Authentication-Token': authentication_token
      }
    })
      .done(function (response) {
        CommonActions.updateSeatData(response.data, type, status, method);
      })
      .fail(function (jqXhr) { });
  },
  ///itemsearch
  getOrphanItemData: function (data, seat_name) {
    var dataToSent = '?' + 'barcode=' + data + '&' + 'ppsId=' + seat_name;
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)['data'][
      'auth-token'
    ];
    $.ajax({
      type: 'GET',
      url:
        configConstants.INTERFACE_IP +
        appConstants.API +
        appConstants.API_GATEWAY +
        appConstants.SR_SERVICE +
        appConstants.PLATFORM_SRMS +
        appConstants.SERVICE_REQUEST +
        appConstants.SEARCH_ITEM +
        dataToSent,
      dataType: 'json',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'Authentication-Token': authentication_token
      }
    })
      .done(function (response) {
        CommonActions.updateSeatData(response.data, 'orphanSearch');
      })
      .fail(function (jqXhr) {
        CommonActions.updateSeatData([], 'orphanSearch');
      });
  },
  getBOIConfig: function () {
    $.ajax({
      type: 'GET',
      url: configConstants.BOI_CONFIG
    })
      .done(function (response) {
        CommonActions.updateSeatData(response, 'BOI_CONFIG');
      })
      .fail(function (jqXhr) {
        CommonActions.updateSeatData(null, 'BOI_CONFIG');
      });
  },
  updatePeripherals: function (data, method, seat_name) {
    var retrieved_token = sessionStorage.getItem('sessionData');
    var authentication_token = JSON.parse(retrieved_token)['data'][
      'auth-token'
    ];
    var url;
    var method = method;
    if (method == 'POST') {
      url =
        configConstants.INTERFACE_IP +
        appConstants.API +
        appConstants.PPS_SEATS +
        seat_name +
        '/' +
        appConstants.PERIPHERALS +
        appConstants.ADD;
    } else {
      url =
        configConstants.INTERFACE_IP +
        appConstants.API +
        appConstants.PPS_SEATS +
        appConstants.PERIPHERALS +
        '/' +
        data.peripheral_type +
        '/' +
        encodeURIComponent(data.peripheral_id) /*.replace(/\//g, "%2F")*/;
    }
    $.ajax({
      type: method,
      url: url,
      data: JSON.stringify(data),
      dataType: 'json',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'Authentication-Token': authentication_token
      }
      /*complete:function(xhr,textStatus) {
                if(xhr.status == 409)
                    utils.getPeripheralData(data.peripheral_type, seat_name , '409', method)

            //utils.getPeripheralData(data.peripheral_type, seat_name , 'success', method)
           // CommonActions.updateSeatData(response.data, data.peripheral_type); 
       }*/
    })
      .done(function (response, statusText, xhr) {
        utils.getPeripheralData(
          data.peripheral_type,
          seat_name,
          'success',
          method
        );
        // CommonActions.updateSeatData(response.data, data.peripheral_type);
      })
      .fail(function (jqXhr) {
        if (jqXhr.status == 409)
          utils.getPeripheralData(
            data.peripheral_type,
            seat_name,
            '409',
            method
          );
        else if (jqXhr.status == 400)
          utils.getPeripheralData(
            data.peripheral_type,
            seat_name,
            '400',
            method
          );
        else
          utils.getPeripheralData(
            data.peripheral_type,
            seat_name,
            'fail',
            method
          );
      });
  },
  createLogData: function (message, type) {
    var data = {};
    data['message'] = message;
    data['type'] = type;
    data['session'] = localStorage.getItem('session');
    return data;
  },

  frntStringTransform: function (messgCode, stringArg) {
    var message_args = [];
    message_args = stringArg ? stringArg : [];
    message_args.unshift(
      serverMessages[messgCode] ? serverMessages[messgCode] : ''
    );
    return _.apply(null, message_args);
  },
  logError: function (data) {
    $.ajax({
      type: 'POST',
      url: 'http://192.168.3.93:300/api/log',
      data: data,
      dataType: 'json'
    }).success(function (response) {
      console.log('Error logged Successfully');
      console.log('Log Details :');
      console.log(JSON.stringify(data));
    });
  }
});

var putSeatData = function (data) {

  /*
  data.state_data = {
    "seat_name": "back_2",
    "notification_list": [{
      "level": "info",
      "code": "PkB.I.004",
      "details": ["8"],
      "description": "Bin entities removed successfully"
    }],
    "exception_allowed": [],
    "roll_cage_flow": false,
    "bin_coordinate_plotting": false,
    "event": "initialize",
    "screen_id": "universal_dock_undock",
    "logout_allowed": true,
    "seat_type": "back",
    "time_stamp": "2019-05-14T12:51:33Z",
    "ppsbin_list": [{
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "6",
      "packing_box": "false",
      "orig_coordinate": [0, 200],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [2, 1],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "1",
      "packing_box": "false",
      "orig_coordinate": [0, 0],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [1, 1],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "7",
      "packing_box": "false",
      "orig_coordinate": [200, 200],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [2, 2],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "2",
      "packing_box": "false",
      "orig_coordinate": [200, 0],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [1, 2],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "8",
      "packing_box": "false",
      "orig_coordinate": [400, 200],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [2, 3],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "3",
      "packing_box": "false",
      "orig_coordinate": [400, 0],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [1, 3],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "9",
      "packing_box": "false",
      "orig_coordinate": [600, 200],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [2, 4],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "4",
      "packing_box": "false",
      "orig_coordinate": [600, 0],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [1, 4],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "10",
      "packing_box": "false",
      "orig_coordinate": [800, 200],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [2, 5],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }, {
      "breadth": "200",
      "direction": "center",
      "bin_info": [],
      "ppsbin_id": "5",
      "packing_box": "false",
      "orig_coordinate": [800, 0],
      "ppsbin_light_color": "none",
      "ppsbin_blue_state": "false",
      "selected_state": false,
      "ppsbin_state": "empty",
      "ppsbin_count": "0",
      "coordinate": [1, 5],
      "length": "200",
      "ppsbin_blink_state": false,
      "group_id": "1",
      "totes_associated": "false"
    }],
    "mode": "pick",
    "group_info": {
      "1": "center"
    },
    "scan_allowed": true,
    "operator_orientation": "0",
    "structure": [2, 5],
    "error_popup_disabled": false,
    "screen_version": "1",
    "docked": [],
    "api_version": "1",
    "is_idle": false,
    "header_msge_list": [{
      "level": "info",
      "code": "PkB.H.012",
      "details": [],
      "description": "Wait for next action"
    }],
    "dock_header": {
      "level": "info",
      "code": "Common.A.001",
      "details": [
        "load unit"
      ],
      "description": "Dock load unit"
    },
    "dock_actions": [
      {
        "level": "info",
        "code": "Common.A.001",
        "details": [
          "load unit"
        ],
        "description": "Scan load unit"
      },
      {
        "level": "info",
        "code": "Common.A.002",
        "details": [
        ],
        "description": "Scan location/Press PPTL"
      }
    ],
    "dock_index": 1,
    "dock_station_list": [
      // {
      //   "direction": "left",
      //   "dock_station_id": "3",
      //   "status": "none"
      // },
      // {
      //   "direction": "left",
      //   "dock_station_id": "4",
      //   "status": "none"
      // },
      {
        "direction": "center-top",
        "dock_station_id": "1",
        "status": "print_ready"
      },
      {
        "direction": "center-top",
        "dock_station_id": "2",
        "status": "undock_awaited"
      },
      // {
      //   "direction": "right",
      //   "dock_station_id": "3",
      //   "status": "wrong_undock"
      // },
      // {
      //   "direction": "left",
      //   "dock_station_id": "4",
      //   "status": "docked"
      // },
      // {
      //   "direction": "right",
      //   "dock_station_id": "6",
      //   "status": "none"
      // },
      // {
      //   "direction": "left",
      //   "dock_station_id": "7",
      //   "status": "none"
      // }
    ],
    "undock_header": {
      "level": "info",
      "code": "Common.H.003",
      "details": [
        "load unit"
      ],
      "description": "Undock load unit"
    },
    "undock_actions": [
      {
        "level": "info",
        "code": "Common.A.001",
        "details": [
          "load unit"
        ],
        "description": "Press PPTL to undock"
      }
    ],
    "undock_index": 0,
    "printer_visible": false
  }
  */


  /*---------- exception data => pick_reprint_packlist */
  data.state_data = {
    "api_version": "1",
    "bin_coordinate_plotting": false,
    "docked": [],
    "error_popup_disabled": false,
    "event": "reprint_packlist",
    "exception_allowed": [
      {
        "details": [],
        "event": "reprint_packlist",
        "exception_id": "PkC001",
        "exception_name": "Reprint Packlist"
      }
    ],
    "exception_type": "reprint_packlist",
    "group_info": {
      "1": "center"
    },
    "header_msge_list": [
      {
        "code": "PkC.H.001",
        "description": "Scan the load units for its packlist",
        "details": [],
        "level": "info"
      }
    ],
    "is_idle": false,
    "logout_allowed": false,
    "mode": "pick",
    "notification_list": [],
    "operator_orientation": "0",
    "roll_cage_flow": false,
    "scan_allowed": true,
    "screen_id": "pick_reprint_packlist",
    "screen_version": "1",
    "seat_name": "back_1",
    "seat_type": "back",
    "time_stamp": "2019-05-14T09:23:01Z"
  };
  /* ----- */


  console.log(data);
  switch (data.state_data.mode + '_' + data.state_data.seat_type) {
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
};

module.exports = utils;
