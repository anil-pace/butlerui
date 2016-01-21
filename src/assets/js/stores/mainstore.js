var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');
var serverMessages = require('../serverMessages/server_messages');
var chinese = require('../serverMessages/chinese');

var CHANGE_EVENT = 'change';
var _seatData, _currentSeat, _seatName, _pptlEvent, _cancelEvent, _messageJson , _screenId;
var popupVisible = false;
var _showSpinner = true;
var _enableException = false;
var modalContent = {
    data: "",
    type: ""
};

function setPopUpVisible(status) {
    popupVisible = status;
    mainstore.emit(CHANGE_EVENT);
};
var mainstore = objectAssign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    getPopUpVisible: function(data) {
        return popupVisible;
    },
    showSpinner: function() {
        _showSpinner = true;
    },
    getSpinnerState: function() {
        return _showSpinner;
    },
    setCurrentSeat: function(data) {
        _showSpinner = false;
        _seatData = data;
        _seatName = data.seat_name;
        _currentSeat = data.mode + "_" + data.seat_type;
        _screenId = data.screen_id;
    },
    getModalContent: function() {
        return modalContent.data;
    },
    getSystemIdleState: function() {
        if (_seatData != undefined) {
            return _seatData.is_idle;
        } else {
            return null;
        }
    },
    getModalType: function() {
        return modalContent.type;
    },
    setModalContent: function(data) {
        modalContent = data;
    },

    getPPTLEvent:function(){
      switch (_currentSeat) {
            case appConstants.PUT_BACK:
                _pptlEvent = 'secondary_button_press';
                break;
            case appConstants.PUT_FRONT:
                _pptlEvent = 'primary_button_press';
                break;
            case appConstants.PICK_BACK:
                _pptlEvent = 'secondary_button_press';
                break;
            case appConstants.PICK_FRONT:
                _pptlEvent = 'primary_button_press';
                break;
            default:
                //return true; 
        }
        return _pptlEvent;
    },
    getCurrentSeat: function() {
        return _currentSeat;
    },
    setServerMessages: function(data) {
        _messageJson = serverMessages;
    },
    getServerMessages: function() {
        return _messageJson;
    },
    changeLanguage: function(data) {
        switch (data) {
            case "chinese":
                _.setTranslation(chinese);
        }
    },
    postDataToInterface: function(data) {
        utils.postDataToInterface(data, _seatName);
    },
    logError:function(data){
        utils.logError(data);
    },
    getScreenId:function(){
        return _screenId;
    }
    

});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    console.log(action.actionType);
    switch (action.actionType) {
        case appConstants.WEBSOCKET_CONNECT:
            utils.connectToWebSocket();
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.SET_CURRENT_SEAT:
            mainstore.setCurrentSeat(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.POPUP_VISIBLE:
            setPopUpVisible(action.status);
            break;
        case appConstants.POST_DATA_TO_INTERFACE:
            mainstore.showSpinner();
            mainstore.postDataToInterface(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.RESET_NUMPAD:
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.LOAD_MODAL:
            mainstore.setModalContent(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.SET_SERVER_MESSAGES:
            mainstore.setServerMessages();
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.CHANGE_LANGUAGE:
            mainstore.changeLanguage(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.SET_LANGUAGE:
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.LOG_ERROR:
            mainstore.logError(action.data);
            break;
        default:
            return true;
    }
});

module.exports = mainstore;