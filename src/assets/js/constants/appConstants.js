var appConstants = {
	WEBSOCKET_CONNECT : "Websocket connection",
	LIST_SEATS : "LIST_SEATS",
	LOGIN: "LOGIN",
	API : '/api',
	AUTH : '/auth',
	TOKEN : '/token',
	LOGOUT : '/logout',
	PPS_SEATS : "/pps_seats/",
	SEND_DATA : '/send_data',
	COMPONENT : '/components',
	LANG : '/language',     //Language from api
	OPERATOR_SEAT: "OPERATOR_SEAT",
	LOGIN_SEAT:"LOGIN_SEAT",
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
	CHANGE_AUDIT_EXCEPTION_SCREEN:"CHANGE_AUDIT_EXCEPTION_SCREEN",
	AUDIT_LOCATION_SCAN:"audit_front_waiting_for_location_scan",
	TOGGLE_BIN_SELECTION:"TOGGLE_BIN_SELECTION",
	CHANGE_DAMAGED_SCREEN_CONFIRM:"CHANGE_DAMAGED_SCREEN_CONFIRM",
	CHANGE_OVERSIZED_SCREEN_CONFIRM:"CHANGE_OVERSIZED_SCREEN_CONFIRM",
	CHANGE_DAMAGED_ENTITY_CONFIRM:"CHANGE_DAMAGED_ENTITY_CONFIRM",
	DAMAGED_ENTITY_CONFIRM:"damaged_entity_confirm",
	MOVE_TO_DAMAGED_CONFIRM:"MOVE_TO_DAMAGED_CONFIRM",
	SET_CURRENT_SEAT:"SET_CURRENT_SEAT",
	SET_PUT_BACK_DATA:"SET_PUT_BACK_DATA",
	SET_PUT_FRONT_DATA:"SET_PUT_FRONT_DATA",
	CHANGE_PUT_BACK_EXCEPTION_SCREEN:"CHANGE_PUT_BACK_EXCEPTION_SCREEN",
	POPUP_VISIBLE:"POPUP_VISIBLE",
	PUT_BACK_STAGE:"put_back_stage",
	REPRINT_INVOICE:"REPRINT_INVOICE",
	SKIP_PRINTING:"SKIP_PRINTING",
	DIS_ASSOCIATE_TOTE:"DIS_ASSOCIATE_TOTE",
	OVERRIDE_TOTE:"OVERRIDE_TOTE",
	PICK_BACK_EXCEPTION_REPRINT:"pick_back_reprint_required",
	PICK_BACK_EXCEPTION_SKIP_PRINTING:"pick_back_skip_print",
	PICK_BACK_EXCEPTION_DIS_ASSOCIATE_TOTE:"pick_back_tote_deassociation",
	PICK_BACK_EXCEPTION_OVERRIDE_TOTE:"pick_back_override_tote_required",
	PUT_BACK_SCAN : "put_back_scan",
	PUT_BACK_TOTE_CLOSE : "put_back_tote_close",
	PUT_BACK_SCAN_TOTE :'put_back_scan_tote',
	PUT_BACK_EXCEPTION:"put_back_exception",
	PUT_FRONT_WAITING_FOR_RACK:"put_front_waiting_for_rack",
	PUT_FRONT_PLACE_ITEMS_IN_RACK:"put_front_place_items_in_rack",
	PUT_BACK_EXCEPTION_PUT_EXTRA_ITEM_IN_IRT_BIN : "put_back_put_extra_item_in_irt_bin",
	PUT_BACK_PHYSICALLY_DAMAGED_ITEMS:"put_back_physically_damaged_items",
	PUT_FRONT_EXCEPTION_DAMAGED_ENTITY:"put_front_physically_damaged_items",
	PUT_FRONT_EXCEPTION_EXCESS_TOTE: "put_front_excess_items_tote",
	PUT_FRONT_EXCEPTION_EXCESS_ITEMS: "put_front_excess_items",
    PUT_FRONT_EXCESS_ITEMS_PPSBIN: "put_front_excess_items_ppsbin",
	PUT_FRONT_PPTL_PRESS: "put_front_pptl_press",
	PUT_FRONT_BIN_WAREHOUSE_FULL: "put_front_bin_warehouse_full",
	PUT_FRONT_PLACE_UNMARKED_ENTITY_IN_RACK:"put_front_place_unmarked_entity_in_rack",
	PUT_FRONT_SCAN_RACK_FOR_UNMARKED_ENTITY:"put_front_scan_rack_for_unmarked_entity",
	PICK_FRONT_EXCEPTION_DAMAGED_ENTITY:"pick_front_physically_damaged",
	PICK_FRONT_MISSING_DAMAGED_UNSCANNABLE_ENTITY:"pick_front_missing_or_unscannable_damaged_item",
	PUT_FRONT_MISSING_DAMAGED_UNSCANNABLE_ENTITY:"put_front_unscannable_or_missing_or_damaged",
	PICK_FRONT_IRT_BIN_CONFIRM:"pick_front_irt_bin_confirm",
	PICK_FRONT_BIN_PRINTOUT:"pick_front_bin_printout",
	PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE:"put_front_space_unavailable",
	VALIDATE_AND_SEND_DATA_TO_SERVER:"VALIDATE_AND_SEND_DATA_TO_SERVER",
	VALIDATE_AND_SEND_PUT_DATA_TO_SERVER:"VALIDATE_AND_SEND_PUT_DATA_TO_SERVER",
	VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER:"VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER",
	CONFIRM_ITEM_PLACE_IN_IRT:"CONFIRM_ITEM_PLACE_IN_IRT",
	SEND_MISSING_BOX_EXCEPTION:"SEND_MISSING_BOX_EXCEPTION",
	PUT_FRONT_SCAN:"put_front_scan",
	STAGE_ONE_BIN : 'STAGE_ONE_BIN',
	PICK_FRONT_EXCEPTION_MISSING_BOX:"pick_front_no_containers_found",
	STAGE_ALL : 'STAGE_ALL',
	KQ_OPERATION : 'KQ_OPERATION',
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
	PUT_FRONT_EXCEPTION_WAREHOUSE_FULL:"put_front_exception_warehouse_full",
	GOOD_QUANTITY:"good_quntity",
	MISSING_QUANTITY:"Missing_quntity",
	UNSCANNABLE_QUANTITY:"Unscannable_quntity",
	UNSCANNABLE:"UNSCANNABLE",
	DAMAGED_QUANTITY:"Damaged_quntity",
	PICK_FRONT_WAITING_FOR_MSU:"pick_front_waiting_for_msu",
	PICK_FRONT_LOCATION_SCAN:"pick_front_location_scan",
	PICK_FRONT_CONTAINER_SCAN:"pick_front_container_scan",
	PICK_FRONT_ITEM_SCAN:"pick_front_item_scan",
	PICK_FRONT_MORE_ITEM_SCAN:"pick_front_more_item_scan",
	PICK_FRONT_PPTL_PRESS:"pick_front_pptl_press",
	PICK_FRONT_NO_FREE_BIN : 'pick_front_no_free_bin',
	PUT_BACK_EXCEPTION_DAMAGED_BARCODE:"put_back_item_unscannable",
	PUT_BACK_EXCEPTION_OVERSIZED_ITEMS:"put_back_item_oversized",
	PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS:"put_back_extra_item_bin_select",
	PUT_BACK_INVALID_TOTE_ITEM : "put_back_invalid_tote_item",
	FINISH_EXCEPTION_ITEM_OVERSIZED:"FINISH_EXCEPTION_ITEM_OVERSIZED",
	FINISH_EXCEPTION_ENTITY_DAMAGED:"FINISH_EXCEPTION_ENTITY_DAMAGED",
	PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE:"put_back_extra_item_quantity_update",
	SEND_EXTRA_ITEM_QTY:"SEND_EXTRA_ITEM_QTY",
	UNMARKED_DAMAGED:"UNMARKED_DAMAGED",
	EDIT_DETAILS:"EDIT_DETAILS",
	PICK_BACK_BIN:"pick_back_bin",
	PICK_BACK_SCAN:"pick_back_scan",
	SEND_EXCESS_ITEMS_BIN:"SEND_EXCESS_ITEMS_BIN",
	WAREHOUSEFULL_EXCEPTION:"WAREHOUSEFULL_EXCEPTION",
	CONFIRM_PHYSICALLY_DAMAGED_ITEMS:"CONFIRM_PHYSICALLY_DAMAGED_ITEMS",
	AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION:"audit_loose_item_damage_exception",
	AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE:"audit_box_damage_exception",
	AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION:"audit_item_in_box_damage_exception",
	AUDIT:"audit_front",
	SET_AUDIT_DATA:"SET_AUDIT_DATA",
	AUDIT_SCAN:"audit_scan",
	AUDIT_RECONCILE:"audit_reconcile",
	AUDIT_WAITING_FOR_MSU:"audit_front_waiting_for_msu",
	GET_REVISED_QUANTITY:"GET_REVISED_QUANTITY",
	BARCODE_SCAN : 'BARCODE_SCAN',
	GET_SERVER_MESSAGES :'GET_SERVER_MESSAGES',
	SET_SERVER_MESSAGES : 'SET_SERVER_MESSAGES',
	CHANGE_PUT_FRONT_EXCEPTION_SCREEN:"CHANGE_PUT_FRONT_EXCEPTION_SCREEN",
	CHANGE_LANGUAGE :'CHANGE_LANGUAGE',
	SET_LANGUAGE :'SET_LANGUAGE',
	CHECKLIST_SUBMIT :'CHECKLIST_SUBMIT',
	UPDATE_KQ_QUANTITY:"UPDATE_KQ_QUANTITY",
	UPDATE_MISSING_QUANTITY:"UPDATE_MISSING_QUANTITY",
	UPDATE_UNSCANNABLE_QUANTITY:"UPDATE_UNSCANNABLE_QUANTITY",
	PUT_FRONT_ITEMS_TO_IRT_BIN:"put_front_items_to_irt_bin",
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
	SHOW_ERROR_MESSAGE :"SHOW_ERROR_MESSAGE",
	CONFIRM_TOTE_EXCEPTION : 'CONFIRM_TOTE_EXCEPTION',
	CANCEL_TOTE_EXCEPTION : 'CANCEL_TOTE_EXCEPTION',
	PERIPHERAL_DATA : 'PERIPHERAL_DATA',
	PERIPHERALS : 'peripherals',
	UPDATE_SEAT_DATA : 'UPDATE_SEAT_DATA',
	PPTL_MANAGEMENT : 'pptl_management',
	SCANNER_MANAGEMENT : 'scanner_management',
	CONVERT_TEXTBOX : 'convert_textbox',
	UPDATE_PERIPHERAL : 'UPDATE_PERIPHERAL',
	ADD: '/add',
	ADD_SCANNER : 'ADD_SCANNER',
	PERIPHERAL_MANAGEMENT :'PERIPHERAL_MANAGEMENT',
	ADD_SCANNER_DETAILS : "ADD_SCANNER_DETAILS",
	CANCEL_ADD_SCANNER : "CANCEL_ADD_SCANNER",
	CANCEL_CLOSE_SCANNER: "CANCEL_CLOSE_SCANNER",
	GENERATE_NOTIFICATION : 'GENERATE_NOTIFICATION',
	CANCEL_PPTL : 'CANCEL_PPTL',
	IDLE_LOGOUT_TIME : 300000, //in millisec
	VALIDATE_UNMARKED_DAMAGED_DATA:"VALIDATE_UNMARKED_DAMAGED_DATA",
	PUT_FRONT_WAITING_UNDOCK : 'put_front_waiting_undock',
	PUT_FRONT_WRONG_UNDOCK : 'put_front_wrong_undock',
	PRE_PUT_STAGE : "pre_put_stage",
	PRE_PUT_SCAN : "pre_put_scan",
	PRE_PUT_RELEASE : "pre_put_release",	
	PRE_PUT : "pre_put_back",
	PRE_PUT_EXCEPTION_EXCESS_TOTE:"pre_put_excess_items_tote",
	PRE_PUT_EXCEPTION_EXCESS_ITEMS:"pre_put_excess_items",	
	RELEASE_MTU : "release_mtu",
	BIN_FULL : "bin_full",
	BIN_FULL_REQUEST:"bin_full_request",
	CANCEL_BIN_FULL_REQUEST:"bin_full_cancel",
	CONFIRM_BIN_FULL_REQUEST:"bin_full_confirmed",
	CANCEL_LAST_SCAN : "cancel_last_scan",
	PICK_FRONT_PACKING_BOX:"pick_front_packing_box",
	PICK_FRONT_PACKING_CONTAINER_SCAN:"pick_front_packing_container_scan",
	PICK_FRONT_PACKING_ITEM_SCAN:"pick_front_packing_item_scan",
	PICK_FRONT_PACKING_PPTL_PRESS:"pick_front_packing_pptl_press",
	PACKING_BOX:"PACKING_BOX",
	BOX_FULL:"BOX_FULL",
	BOX_FULL_REQUEST:"packing_box_full_request",
	BOX_FULL_REQUEST_CONFIRMED:"packing_box_full_confirmed",
	DISCARD_PACKING_BOX:"DISCARD_PACKING_BOX",
	CANCEL_BOX_FULL:"CANCEL_BOX_FULL",
	CANCEL_BOX_FULL_REQUEST:"packing_box_full_cancel",
	CONFIRM_BOX_FULL:"packing_box_full_confirmed",
	CONFIRM_LOCATION:"CONFIRM_LOCATION",
	CONFIRM_LOCATION_PRESS:"container_kept_in_rack",
	HIDE_SPINNER:"HIDE_SPINNER",
	PICK_FRONT_LOCATION_CONFIRM:"pick_front_location_confirm",
	CLOSE_CANCEL_EXCEPTION : "close_cancel_exception",
	CANCEL_EXCEPTION_MODAL : "cancel_exception_modal",
	PUT_BACK_INVOICE : "put_back_invoice",
	EXIT_INVOICE : "EXIT_INVOICE",
	DECLINE_CANCEL_INVOICE : "DECLINE_CANCEL_INVOICE",
	PICK_BACK_REPRINT_TOTE : "pick_back_reprint_tote",
	CONFIRM_EXIT_INVOICE : "CONFIRM_EXIT_INVOICE",
	/*Constants for order details*/
	VOLUME_UNIT:"vol_unit",
	VOLUME:"volume",
	/*Constants for Put back exception*/
	ENTITY_DAMAGED:"entity_damaged",
    PICK_BACK_REPRINT_TOTE : "pick_back_reprint_tote",
	BIN_LIGHT_COLOR:{
		"red":"#FF0000",
		"blue":"#0390FF",
		"green":"#4CAF50",
		"pink":"#FF1BA5",
		"white":"#FFFFFF",
	}
};

module.exports = appConstants;