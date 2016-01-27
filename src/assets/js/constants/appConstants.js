var appConstants = {
	WEBSOCKET_CONNECT : "Websocket connection",
	LIST_SEATS : "LIST_SEATS",
	LOGIN: "LOGIN",
	API : '/api',
	AUTH : '/auth',
	TOKEN : '/token',
	PPS_SEATS : "/pps_seats/",
	SEND_DATA : '/send_data',
	OPERATOR_SEAT: "OPERATOR_SEAT",
	SCAN_ITEMS: "Scan the item(s)",
	PLACE_ITEMS: "Place",
	TOGGLE_BIN_SELECTION:"TOGGLE_BIN_SELECTION",
	SET_PUT_DATA:"SET_PUT_DATA",
	SET_PICK_BACK_DATA:"SET_PICK_BACK_DATA",
	PICK_BACK : "pick_back",
	PICK_FRONT:"pick_front",
	PUT_BACK : "put_back",
	PUT_FRONT : "put_front",
	PICK : "pick",
	TOGGLE_BIN_SELECTION:"TOGGLE_BIN_SELECTION",
	SET_CURRENT_SEAT:"SET_CURRENT_SEAT",
	SET_PUT_BACK_DATA:"SET_PUT_BACK_DATA",
	SET_PUT_FRONT_DATA:"SET_PUT_FRONT_DATA",
	POPUP_VISIBLE:"POPUP_VISIBLE",
	PUT_BACK_STAGE:"put_back_stage",
	PUT_BACK_SCAN : "put_back_scan",
	PUT_BACK_TOTE_CLOSE : "put_back_tote_close",
	PUT_BACK_SCAN_TOTE :'put_back_scan_tote',
	PUT_BACK_EXCEPTION:"put_back_exception",
	PUT_FRONT_WAITING_FOR_RACK:"put_front_waiting_for_rack",
	PUT_FRONT_PLACE_ITEMS_IN_RACK:"put_front_place_items_in_rack",
	PUT_BACK_EXCEPTION_PUT_EXTRA_ITEM_IN_IRT_BIN : "put_back_put_extra_item_in_irt_bin",
	PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED:"put_front_damaged_or_missing",
	PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED:"pick_front_damaged_or_missing",
	PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE:"put_front_space_unavailable",
	VALIDATE_AND_SEND_DATA_TO_SERVER:"VALIDATE_AND_SEND_DATA_TO_SERVER",
	VALIDATE_AND_SEND_PUT_DATA_TO_SERVER:"VALIDATE_AND_SEND_PUT_DATA_TO_SERVER",
	VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER:"VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER",
	CONFIRM_ITEM_PLACE_IN_IRT:"CONFIRM_ITEM_PLACE_IN_IRT",
	PUT_FRONT_SCAN:"put_front_scan",
	STAGE_ONE_BIN : 'STAGE_ONE_BIN',
	STAGE_ALL : 'STAGE_ALL',
	KQ_OPERATION : 'KQ_OPERATION',
	PLACE_ITEM_BACK:"PLACE_ITEM_BACK",
	CONFIRM_FROM_USER:"CONFIRM_FROM_USER",
	RESET_NUMPAD :'RESET_NUMPAD',
	CANCEL_FINISH_AUDIT:"CANCEL_FINISH_AUDIT",
	FINISH_CURRENT_AUDIT:"FINISH_CURRENT_AUDIT",
	CHANGE_PICK_FRONT_EXCEPTION_SCREEN:"CHANGE_PICK_FRONT_EXCEPTION_SCREEN",
	CANCEL_SCAN : 'CANCEL_SCAN',
	FINISH_BOX:"FINISH_BOX",
	GENERATE_REPORT:"GENERATE_REPORT",
	LOAD_MODAL:'load_modal',
	PPTL_PRESS : 'PPTL_PRESS',
	SET_PICK_FRONT_DATA:"SET_PICK_FRONT_DATA",
	PICK_FRONT_WAITING_FOR_MSU:"pick_front_waiting_for_msu",
	PICK_FRONT_LOCATION_SCAN:"pick_front_location_scan",
	PICK_FRONT_CONTAINER_SCAN:"pick_front_container_scan",
	PICK_FRONT_ITEM_SCAN:"pick_front_item_scan",
	PICK_FRONT_MORE_ITEM_SCAN:"pick_front_more_item_scan",
	PICK_FRONT_PPTL_PRESS:"pick_front_pptl_press",
	PUT_BACK_EXCEPTION_DAMAGED_BARCODE:"put_back_item_damaged",
	PUT_BACK_EXCEPTION_OVERSIZED_ITEMS:"put_back_item_oversized",
	PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS:"put_back_extra_item_bin_select",
	FINISH_EXCEPTION_ITEM_OVERSIZED:"FINISH_EXCEPTION_ITEM_OVERSIZED",
	PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE:"put_back_extra_item_quantity_update",
	SEND_EXTRA_ITEM_QTY:"SEND_EXTRA_ITEM_QTY",
	EDIT_DETAILS:"EDIT_DETAILS",
	PICK_BACK_BIN:"pick_back_bin",
	PICK_BACK_SCAN:"pick_back_scan",
	SEND_EXCESS_ITEMS_BIN:"SEND_EXCESS_ITEMS_BIN",
	AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_BARCODE:"audit_loose_item_damaged_barcode",
	AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE:"audit_box_damaged_barcode",
	AUDIT:"audit_front",
	SET_AUDIT_DATA:"SET_AUDIT_DATA",
	AUDIT_SCAN:"audit_scan",
	AUDIT_RECONCILE:"audit_reconcile",
	AUDIT_WAITING_FOR_MSU:"audit_front_waiting_for_msu",
	GET_REVISED_QUANTITY:"GET_REVISED_QUANTITY",
	BARCODE_SCAN : 'BARCODE_SCAN',
	GET_SERVER_MESSAGES :'GET_SERVER_MESSAGES',
	SET_SERVER_MESSAGES : 'SET_SERVER_MESSAGES',
	GET_MISSING_AND_DAMAGED_QTY:"GET_MISSING_AND_DAMAGED_QTY",
	CHANGE_PUT_FRONT_EXCEPTION_SCREEN:"CHANGE_PUT_FRONT_EXCEPTION_SCREEN",
	CHANGE_LANGUAGE :'CHANGE_LANGUAGE',
	SET_LANGUAGE :'SET_LANGUAGE',
	CHECKLIST_SUBMIT :'CHECKLIST_SUBMIT',
	UPDATE_KQ_QUANTITY:"UPDATE_KQ_QUANTITY",
	UPDATE_MISSING_QUANTITY:"UPDATE_MISSING_QUANTITY",
	UPDATE_GOOD_QUANTITY:"UPDATE_GOOD_QUANTITY",
	UPDATE_DAMAGED_QUANTITY:"UPDATE_DAMAGED_QUANTITY",
	CANCEL_TOTE :'CANCEL_TOTE',
	CLOSE_TOTE : 'CLOSE_TOTE',
	TOTE_ACTION :'TOTE_ACTION',
	POST_DATA_TO_INTERFACE:"POST_DATA_TO_INTERFACE",
	LOG_ERROR:"LOG_ERROR",
	SEND_KQ_QTY:"SEND_KQ_QTY",
	ENABLE_EXCEPTION:"ENABLE_EXCEPTION",
	CANCEL_EXCEPTION:"CANCEL_EXCEPTION",
	CANCEL_EXCEPTION_TO_SERVER:"CANCEL_EXCEPTION_TO_SERVER",
	LOGOUT_SESSION:"LOGOUT_SESSION",
	SET_ACTIVE_EXCEPTION:"SET_ACTIVE_EXCEPTION",
	DAMAGED_BARCODE:"Damaged Barcode",
	OVERSIZED_ITEMS:"Oversized Items",
	EXCESS_ITEMS_IN_PPS_BINS:"Excess Items in PPS Bins",
	SHOW_ERROR_MESSAGE :"SHOW_ERROR_MESSAGE"

};

module.exports = appConstants;