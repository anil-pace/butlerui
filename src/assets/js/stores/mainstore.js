var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var SVGConstants = require('../constants/svgConstants');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils/utils');
var resourceConstants = require('../constants/resourceConstants');

var CHANGE_EVENT = 'change';
var _seatData, _currentSeat, _seatName, _cancelEvent, _messageJson, _screenId, _itemUid, _exceptionType, _KQQty = 0,
    _flag = false,
    _logoutStatus,
    _activeException = "",
    _enableException = false,
    popupVisible = false,
    _showSpinner = true,
    _goodQuantity = 0,
    _damagedQuantity = 0,
    _putFrontExceptionScreen = "good",
    _pickFrontExceptionScreen = "good",
    _missingQuantity = 0,
    _finishAuditFlag = true;
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
    getAuthToken : function(data){
        utils.getAuthToken(data);
    },
    getPopUpVisible: function(data) {
        return popupVisible;
    },
    showSpinner: function() {
        _showSpinner = true;
    },
    setLogoutState: function() {
        _logoutStatus = _seatData.logout_allowed;
    },
    getSpinnerState: function() {
        return _showSpinner;
    },

    getLogoutState: function() {
        if (_seatData.hasOwnProperty("logout_allowed"))
            return _seatData.logout_allowed;
    },
    getFlag : function(){
        return _flag;
    },

    getPutQuantity: function() {
        if (_seatData.hasOwnProperty("put_quantity"))
            return _seatData.put_quantity;
    },
    productDetails: function() {
        _prodDetails = _seatData.product_info;
        return _prodDetails;
    },
    getPPTLEvent: function() {
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
    getNavData: function() {
        switch (_currentSeat) {
            case appConstants.PICK_FRONT:
                    _NavData = _seatData.header_msge_list[0]
                break;
            case appConstants.PUT_FRONT:
                    _NavData = _seatData.header_msge_list[0];
                break;
            default:
                //return true; 
        }

        return _NavData;
    },
     getBinData: function() {
        var binData = {};
        binData["structure"] = _seatData.structure;
        binData["ppsbin_list"] = _seatData.ppsbin_list;
        return binData;
    },
    getCurrentSlot: function() {
        if (_seatData.hasOwnProperty('rack_details')) {
            return _seatData.rack_details.slot_barcodes;
        } else {
            return null;
        }
    },

    getServerNavData: function() {
        if (_seatData.header_msge_list.length > 0) {
            _serverNavData = _seatData.header_msge_list[0];
            return _serverNavData;
        } else {
            return null;
        }
    },

    getNotificationData: function() {
        if(_seatData.notification_list.length > 0){
            return _seatData.notification_list[0];
        }
    },

    getCurrentState: function() {
        if (_seatData.hasOwnProperty('ppsbin_list')) {
            var data = null;
            _seatData.ppsbin_list.map(function(value, index) {
                if (value["selected_for_staging"] != undefined && value["selected_for_staging"] == true) {
                    data = value.ppsbin_state;
                }
            });

            return data;
        }else
            return null;
    },

    getItemUid: function() {
        return _seatData.item_uid;
    },

    getRackDetails: function() {
        if (_seatData.hasOwnProperty('rack_details')) {
            return _seatData.rack_details;
        }
    },

    setCurrentSeat: function(data) {
        _enableException = false;
        _KQQty = 0;
        _putFrontExceptionScreen = "good";
        _goodQuantity = 0;
        _damagedQuantity = 0;
        _missingQuantity = 0;
        _activeException = "";
        _showSpinner = false;
        _enableException = false;
        _seatData = data;
        _seatName = data.seat_name;
        _currentSeat = data.mode + "_" + data.seat_type;
        _itemUid = data["item_uid"] != undefined ? data["item_uid"] : "";
        _exceptionType = data["exception_type"] != undefined ? data["exception_type"] : "";
        _screenId = data.screen_id;
        if (_screenId == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED)
            _putFrontExceptionScreen = "good";
        else if (_screenId == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE)
            _putFrontExceptionScreen = "take_item_from_bin";
        else if (_screenId == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED)
            _pickFrontExceptionScreen = "good";
        else if (_screenId == appConstants.PICK_FRONT_EXCEPTION_MISSING_BOX)
            _pickFrontExceptionScreen = "box_serial";


        _flag = true;
        
    },

    getItemUid: function() {
        return _itemUid;
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
    postDataToInterface: function(data, type) {
        utils.postDataToInterface(data, type, _seatName);
    },
    logError: function(data) {
        utils.logError(data);
    },
    getScreenId: function() {
        return _screenId;
    },

    getListItems : function(){
        console.log(_seatData);
        if(_seatData.hasOwnProperty('list_items')){
            return _seatData.list_items;
        }else{
            return null;
        }
    },

    getScreenData: function() {
        var data = {};
        switch (_screenId) {
            case appConstants.PUT_BACK_STAGE:
            case appConstants.PUT_BACK_SCAN_TOTE:
                data["PutBackBinData"] = this.getBinData();
                data["PutBackScreenId"] = this.getScreenId();
                data["StageActive"] = this.getStageActiveStatus();
                data["StageAllActive"] = this.getStageAllActiveStatus();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                break;
            case appConstants.PUT_BACK_INVALID_TOTE_ITEM:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackItemUid"] = this.getItemUid();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                data["PutBackToteException"] = this.getToteException();
                break;
            case appConstants.PUT_BACK_SCAN:
                data["PutBackBinData"] = this.getBinData();
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackScanDetails"] = this.scanDetails();
                data["PutBackProductDetails"] = this.productDetails();
                data["PutBackItemUid"] = this.getItemUid();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                break;
            case appConstants.PUT_BACK_TOTE_CLOSE:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackReconciliation"] = this.getReconcileData();
                data["PutBackToteId"] = this.getToteId();
                data["PutBackNavData"] = this.getNavData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                data["PutBackExceptionStatus"] = this.getExceptionStatus();
                break;
            case appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE:
            case appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackKQDetails"] = this.getScanDetails();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = this.getNotificationData();
                break;
            case appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackKQDetails"] = this.getScanDetails();
                data["PutBackExceptionProductDetails"] = this.getItemDetailsData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = mainstore.getNotificationData();
                break;
            case appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackBinData"] = this.getBinData();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = mainstore.getNotificationData();
                break;
            case appConstants.PUT_BACK_EXCEPTION_PUT_EXTRA_ITEM_IN_IRT_BIN:
                data["PutBackScreenId"] = this.getScreenId();
                data["PutBackServerNavData"] = this.getServerNavData();
                data["PutBackExceptionData"] = this.getExceptionData();
                data["PutBackNotification"] = mainstore.getNotificationData();
                break;
            case appConstants.PUT_FRONT_WAITING_FOR_RACK:
                data["PutFrontNavData"] = this.getNavData();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontExceptionStatus"] = this.getExceptionStatus();
                break;
            case appConstants.PUT_FRONT_SCAN:
                data["PutFrontNavData"] = this.getNavData();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontBinData"] = this.getBinData();
                data["PutFrontScanDetails"] = this.scanDetails();
                data["PutFrontProductDetails"] = this.productDetails();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontExceptionStatus"] = this.getExceptionStatus();
                data["PutFrontItemUid"] = this.getItemUid();
                break;
            case appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK:
                data["PutFrontNavData"] = this.getNavData();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontCurrentBin"] = this.getCurrentSelectedBin();
                data["PutFrontRackDetails"] = this.getRackDetails();
                data["PutFrontScanDetails"] = this.scanDetails();
                data["PutFrontProductDetails"] = this.productDetails();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontExceptionStatus"] = this.getExceptionStatus();
                data["PutFrontItemUid"] = this.getItemUid();
                break;
            case appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED:
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontGoodQuantity"] = this.getGoodScanDetails();
                data["PutFrontDamagedQuantity"] = this.getDamagedScanDetails();
                data["PutFrontMissingQuantity"] = this.getMissingScanDetails();
                data["PutFrontExceptionScreen"] = this.getPutFrontExceptionScreen();
                break;
            case appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE:
                data["PutFrontScreenId"] = this.getScreenId();
                data["PutFrontServerNavData"] = this.getServerNavData();
                data["PutFrontExceptionData"] = this.getExceptionData();
                data["PutFrontNotification"] = this.getNotificationData();
                data["PutFrontKQQuantity"] = this.getScanDetails();
                data["PutFrontExceptionScreen"] = this.getPutFrontExceptionScreen();
                break;

            case appConstants.PICK_FRONT_WAITING_FOR_MSU:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["ListItems"] = this.getListItems();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_LOCATION_SCAN:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontRackDetails"] = this.getRackDetails();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_ITEM_SCAN:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontRackDetails"] = this.getRackDetails();
                data["PickFrontProductDetails"] = this.productDetails();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_CONTAINER_SCAN:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontBoxDetails"] = this.getBoxDetails();
                data["PickFrontRackDetails"] = this.getRackDetails();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_MORE_ITEM_SCAN:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontScanDetails"] = this.scanDetails();
                data["PickFrontChecklistDetails"] = this.getChecklistDetails();
                data["PickFrontChecklistIndex"] = this.getChecklistIndex();
                data["PickFrontSlotDetails"] = this.getCurrentSlot();
                data["PickFrontBinData"] = this.getBinData();
                data["PickFrontScanDetails"] = this.scanDetails();
                data["PickFrontProductDetails"] = this.productDetails();
                data["PickFrontItemUid"] = this.getItemUid();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_PPTL_PRESS:
                data["PickFrontNavData"] = this.getNavData();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontScanDetails"] = this.scanDetails();
                data["PickFrontChecklistDetails"] = this.getChecklistDetails();
                data["PickFrontChecklistIndex"] = this.getChecklistIndex();
                data["PickFrontSlotDetails"] = this.getCurrentSlot();
                data["PickFrontBinData"] = this.getBinData();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionStatus"] = this.getExceptionStatus();
                data["PickFrontChecklistOverlayStatus"] = this.getChecklistOverlayStatus();
                break;
            case appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED:
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontGoodQuantity"] = this.getGoodScanDetails();
                data["PickFrontDamagedQuantity"] = this.getDamagedScanDetails();
                data["PickFrontMissingQuantity"] = this.getMissingScanDetails();
                data["PickFrontExceptionScreen"] = this.getPickFrontExceptionScreen();
                break;
            case appConstants.PICK_FRONT_EXCEPTION_MISSING_BOX:
                data["PickFrontScreenId"] = this.getScreenId();
                data["PickFrontServerNavData"] = this.getServerNavData();
                data["PickFrontExceptionData"] = this.getExceptionData();
                data["PickFrontNotification"] = this.getNotificationData();
                data["PickFrontExceptionScreen"] = this.getPickFrontExceptionScreen();
                data["PickFrontBoxDetails"] = this.getBoxDetails();
                break;
            case appConstants.PICK_BACK_BIN:
            case appConstants.PICK_BACK_SCAN:
                data["PickBackNavData"] = this.getNavData();
                data["PickBackNotification"] = this.getNotificationData();
                data["PickBackBinData"] = this.getBinData();
                data["PickBackScreenId"] = this.getScreenId();
                data["PickBackServerNavData"] = this.getServerNavData();
                data["PickBackToteDetails"] = this.getToteDetails();
                data["PickBackExceptionStatus"] = this.getExceptionStatus();
                data["PickBackExceptionData"] = this.getExceptionData();
                break;
            case appConstants.PICK_BACK_EXCEPTION_REPRINT:
            case appConstants.PICK_BACK_EXCEPTION_SKIP_PRINTING:
            case appConstants.PICK_BACK_EXCEPTION_DIS_ASSOCIATE_TOTE:
            case appConstants.PICK_BACK_EXCEPTION_OVERRIDE_TOTE:
                data["PickBackNavData"] = this.getNavData();
                data["PickBackNotification"] = this.getNotificationData();
                data["PickBackBinData"] = this.getBinData();
                data["PickBackScreenId"] = this.getScreenId();
                data["PickBackExceptionData"] = this.getExceptionData();
                data["PickBackServerNavData"] = this.getServerNavData();
                data["PickBackToteDetails"] = this.getToteDetails();
                data["PickBackExceptionStatus"] = this.getExceptionStatus();
                data["PickBackSelectedBin"] = this.getSelectedBin();
                break;
            case appConstants.AUDIT_WAITING_FOR_MSU:
                data["AuditNavData"] = this.getNavData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                data["AuditShowModal"] = this.getModalStatus();
                break;
            case appConstants.AUDIT_SCAN:
                data["AuditNavData"] = this.getNavData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                data["AuditShowModal"] = this.getModalStatus();
                data["AuditCancelScanStatus"] = this.getCancelScanStatus();
                data["AuditBoxSerialData"] = this.getBoxSerialData();
                data["AuditLooseItemsData"] = this.getLooseItemsData();
                data["AuditSlotDetails"] = this.getCurrentSlot();
                data["AuditItemDetailsData"] = this.getItemDetailsData();
                data["AuditScanDetails"] = this.getScanDetails();
                data["AuditFinishFlag"] = this.getFinishAuditFlag();
                break;
            case appConstants.AUDIT_RECONCILE:
                data["AuditNavData"] = this.getNavData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                data["AuditShowModal"] = this.getModalStatus();
                data["AuditReconcileBoxSerialData"] = this.getReconcileBoxSerialData();
                data["AuditReconcileLooseItemsData"] = this.getReconcileLooseItemsData();
                data["AuditSlotDetails"] = this.getCurrentSlot();
                break;
            case appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE:
            case appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION:
            case appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION:
                data["AuditNavData"] = this.getNavData();
                data["AuditNotification"] = this.getNotificationData();
                data["AuditScreenId"] = this.getScreenId();
                data["AuditServerNavData"] = this.getServerNavData();
                data["AuditExceptionData"] = this.getExceptionData();
                data["AuditExceptionStatus"] = this.getExceptionStatus();
                //data["AuditShowModal"] = this.getModalStatus();
                data["AuditKQDetails"] = this.getScanDetails();
                break;
            default:
        }
        return data;
    }



});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    console.log(action.actionType);
    switch (action.actionType) {
        case appConstants.LOGIN:
          mainstore.getAuthToken(action.data);
          mainstore.emit(CHANGE_EVENT);
          break;
        case appConstants.WEBSOCKET_CONNECT:
            utils.connectToWebSocket();
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.SET_CURRENT_SEAT:
            mainstore.setCurrentSeat(action.data);
            mainstore.emit(CHANGE_EVENT);
            break;
        case appConstants.POST_DATA_TO_INTERFACE:
            mainstore.showSpinner();
            mainstore.postDataToInterface(action.data, action.type);
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