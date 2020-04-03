var appConstants = {
  WEBSOCKET_CONNECT: "Websocket connection",
  LIST_SEATS: "LIST_SEATS",
  LOGIN: "LOGIN",
  API: "/api",
  AUTH: "/auth",
  TOKEN: "/token",
  LOGOUT: "/logout",
  PPS_SEATS: "/pps_seats/",
  MODE: "/mode",
  SEND_DATA: "/send_data",
  COMPONENT: "/components",
  LANG: "/language", //Language from api
  FRONT: "front",
  OPERATOR_SEAT: "OPERATOR_SEAT",
  LOGIN_SEAT: "LOGIN_SEAT",
  SCAN_ITEMS: "Scan the item(s)",
  PLACE_ITEMS: "Place",
  TOGGLE_BIN_SELECTION: "TOGGLE_BIN_SELECTION",
  SET_PUT_DATA: "SET_PUT_DATA",
  SET_PICK_BACK_DATA: "SET_PICK_BACK_DATA",
  ARA_PICK_FRONT: "ara_pick_front",
  SET_SEARCH_DATA: "SET_SEARCH_DATA",
  PICK_BACK: "pick_back",
  PICK_FRONT: "pick_front",
  PUT_BACK: "put_back",
  PUT_FRONT: "put_front",
  PICK: "pick",
  CLOSE_MODAL: "CLOSE_MODAL",
  PRINT_CONFIRM: "PRINT_CONFIRM",
  CHANGE_AUDIT_EXCEPTION_SCREEN: "CHANGE_AUDIT_EXCEPTION_SCREEN",
  AUDIT_LOCATION_SCAN: "audit_front_waiting_for_location_scan",
  INNER_SUBPACK: "container_level_1",
  OUTER_PACK: "container_level_2",
  QUANTITY_UPDATE_AUDIT_SEAT: "quantity_update_for_audit_seat",
  TOGGLE_BIN_SELECTION: "TOGGLE_BIN_SELECTION",
  CHANGE_DAMAGED_SCREEN_CONFIRM: "CHANGE_DAMAGED_SCREEN_CONFIRM",
  CHANGE_OVERSIZED_SCREEN_CONFIRM: "CHANGE_OVERSIZED_SCREEN_CONFIRM",
  CHANGE_DAMAGED_ENTITY_CONFIRM: "CHANGE_DAMAGED_ENTITY_CONFIRM",
  DAMAGED_ENTITY_CONFIRM: "damaged_entity_confirm",
  MOVE_TO_DAMAGED_CONFIRM: "MOVE_TO_DAMAGED_CONFIRM",
  SET_CURRENT_SEAT: "SET_CURRENT_SEAT",
  SET_PUT_BACK_DATA: "SET_PUT_BACK_DATA",
  SET_PUT_FRONT_DATA: "SET_PUT_FRONT_DATA",
  CHANGE_PUT_BACK_EXCEPTION_SCREEN: "CHANGE_PUT_BACK_EXCEPTION_SCREEN",
  POPUP_VISIBLE: "POPUP_VISIBLE",
  PUT_BACK_STAGE: "put_back_stage",
  REPRINT_INVOICE: "REPRINT_INVOICE",
  EXCEPTION_DATA_SENT: "EXCEPTION_DATA_SENT",
  SKIP_PRINTING: "SKIP_PRINTING",
  DIS_ASSOCIATE_TOTE: "DIS_ASSOCIATE_TOTE",
  OVERRIDE_TOTE: "OVERRIDE_TOTE",
  BACK_BUTTON_PRESS: "BACK_BUTTON_PRESS",
  CONFIRM_BUTTON: "CONFIRM_BUTTON",
  PICK_FINISH_EXCEPTION_ENTITY: "PICK_FINISH_EXCEPTION_ENTITY",
  PICK_BACK_EXCEPTION_REPRINT: "pick_back_reprint_required",
  PICK_BACK_EXCEPTION_SKIP_PRINTING: "pick_back_skip_print",
  PICK_BACK_EXCEPTION_DIS_ASSOCIATE_TOTE: "pick_back_tote_deassociation",
  PICK_BACK_EXCEPTION_OVERRIDE_TOTE: "pick_back_override_tote_required",
  PICK_BACK_PACKING_BOX: "pick_back_packing_box",
  PUT_BACK_SCAN: "put_back_scan",
  PUT_BACK_TOTE_CLOSE: "put_back_tote_close",
  PUT_BACK_SCAN_TOTE: "put_back_scan_tote",
  PUT_BACK_EXCEPTION: "put_back_exception",
  PUT_FRONT_WAITING_FOR_RACK: "put_front_waiting_for_rack",
  PUT_FRONT_PLACE_ITEMS_IN_RACK: "put_front_place_items_in_rack",
  PUT_BACK_EXCEPTION_PUT_EXTRA_ITEM_IN_IRT_BIN:
    "put_back_put_extra_item_in_irt_bin",
  PICK_FRONT_REPRINT_EXCEPTION: "pick_front_reprint_exception",
  PUT_BACK_WAREHOUSE_FULL_IRT_SCAN: "put_back_warehouse_full_irt_scan",
  PUT_BACK_PHYSICALLY_DAMAGED_ITEMS: "put_back_physically_damaged_items",
  PHYSICALLY_DAMAGED: "physically_damaged",
  EXTRA_ITEMS: "extra_items",
  CANCEL_SCAN_MODAL: "CANCEL_SCAN_MODAL",
  CANCEL_SCAN_SEND_TO_SERVER_MODAL: "CANCEL_SCAN_SEND_TO_SERVER_MODAL",
  PICK_FRONT_REPRINT: "PICK_FRONT_REPRINT",
  ITEM_SCANNABLE: "item_unscannable",
  ITEM_OVERSIZED: "item_oversized",
  FINISH_DAMAGED_ENTITY_DATA: "FINISH_DAMAGED_ENTITY_DATA",
  FINISH_EXCEPTION_EXTRA_ITEM: "FINISH_EXCEPTION_EXTRA_ITEM",
  PUT_FRONT_EXCEPTION_DAMAGED_ENTITY: "put_front_physically_damaged_items",
  PUT_FRONT_EXCEPTION_EXCESS_TOTE: "put_front_excess_items_tote",
  PUT_FRONT_EXCEPTION_EXCESS_ITEMS: "put_front_excess_items",
  PUT_FRONT_EXCESS_ITEMS_PPSBIN: "put_front_excess_items_ppsbin",
  PUT_FRONT_PPTL_PRESS: "put_front_pptl_press",
  PUT_FRONT_BIN_WAREHOUSE_FULL: "put_front_bin_warehouse_full",
  PUT_FRONT_PLACE_UNMARKED_ENTITY_IN_RACK:
    "put_front_place_unmarked_entity_in_rack",
  PUT_FRONT_SCAN_RACK_FOR_UNMARKED_ENTITY:
    "put_front_scan_rack_for_unmarked_entity",
  PICK_FRONT_EXCEPTION_DAMAGED_ENTITY: "pick_front_physically_damaged",
  PICK_FRONT_MISSING_DAMAGED_UNSCANNABLE_ENTITY:
    "pick_front_missing_or_unscannable_damaged_item",
  PICK_FRONT_MISSING_OR_UNSCANNABLE_DAMAGED_PACK:
    "pick_front_missing_or_unscannable_damaged_pack",
  PICK_FRONT_MISSING_OR_UNSCANNABLE_DAMAGED_SUBPACK:
    "pick_front_missing_or_unscannable_damaged_subpack",
  PUT_FRONT_MISSING_DAMAGED_UNSCANNABLE_ENTITY:
    "put_front_unscannable_or_missing_or_damaged",
  PICK_BACK_CHANGE_PBOX_BIN: "pick_back_change_pbox_bin",
  PICK_BACK_CHANGE_PBOX_SCAN: "pick_back_change_pbox_scan",
  PICK_FRONT_IRT_BIN_CONFIRM: "pick_front_irt_bin_confirm",
  PICK_FRONT_BIN_PRINTOUT: "pick_front_bin_printout",
  PICK_FRONT_ROLLCAGE_PRINTOUT: "pick_front_rollcage_print",
  PICK_FRONT_WORKING_TABLE: "pick_front_working_table",
  PER_ITEM_PRINT: "per_item_print",
  PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE: "put_front_space_unavailable",
  VALIDATE_AND_SEND_DATA_TO_SERVER: "VALIDATE_AND_SEND_DATA_TO_SERVER",
  VALIDATE_AND_SEND_PUT_DATA_TO_SERVER: "VALIDATE_AND_SEND_PUT_DATA_TO_SERVER",
  VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER:
    "VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER",
  CONFIRM_ITEM_PLACE_IN_IRT: "CONFIRM_ITEM_PLACE_IN_IRT",
  SEND_MISSING_BOX_EXCEPTION: "SEND_MISSING_BOX_EXCEPTION",
  PUT_FRONT_SCAN: "put_front_scan",
  STAGE_ONE_BIN: "STAGE_ONE_BIN",
  CLOSE_CANCEL_SCAN: "CLOSE_CANCEL_SCAN",
  PICK_FRONT_EXCEPTION_MISSING_BOX: "pick_front_no_containers_found",
  STAGE_ALL: "STAGE_ALL",
  KQ_OPERATION: "KQ_OPERATION",
  CONFIRM_FROM_USER: "CONFIRM_FROM_USER",
  RESET_NUMPAD: "RESET_NUMPAD",
  CANCEL_FINISH_AUDIT: "CANCEL_FINISH_AUDIT",
  FINISH_CURRENT_AUDIT: "FINISH_CURRENT_AUDIT",
  CHANGE_PICK_FRONT_EXCEPTION_SCREEN: "CHANGE_PICK_FRONT_EXCEPTION_SCREEN",
  CANCEL_SCAN: "CANCEL_SCAN",
  CANCEL_SCAN_UDP: "CANCEL_SCAN_UDP",
  FINISH_BOX: "FINISH_BOX",
  GENERATE_REPORT: "GENERATE_REPORT",
  LOAD_MODAL: "load_modal",
  CANCEL_SCAN_ALL: "cancel_scan_all",
  PPTL_PRESS: "PPTL_PRESS",
  SET_PICK_FRONT_DATA: "SET_PICK_FRONT_DATA",
  PUT_FRONT_EXCEPTION_WAREHOUSE_FULL: "put_front_exception_warehouse_full",
  EXPECTED_QUANTITY: "expected_quantity",
  GOOD_QUANTITY: "good_quantity",
  BAD_QUANTITY: "bad_quantity",
  MISSING_QUANTITY: "Missing_quntity",
  UNSCANNABLE_QUANTITY: "Unscannable_quntity",
  UNSCANNABLE: "UNSCANNABLE",
  DAMAGED_QUANTITY: "Damaged_quntity",
  GOOD_PACK: "good_pack",
  GOOD_SUB_PACK: "good_sub_pack",
  UNEXPECTED_PACK: "unexpected_pack",
  UNEXPECTED_SUB_PACK: "unexpected_sub_pack",
  PACK_MISSING: "pack_missing",
  SUB_PACK_MISSING: "sub_pack_missing",
  DAMAGED_PACK: "damaged_pack",
  DAMAGED_SUB_PACK: "damaged_sub_pack",
  BAD_BARCODE_PACK: "bad_barcode_pack",
  BAD_BARCODE_SUB_PACK: "bad_barcode_sub_pack",
  PICK_FRONT_WAITING_FOR_MSU: "pick_front_waiting_for_msu",
  PICK_FRONT_ONE_STEP_SCAN: "pick_front_one_step_scan",
  PICK_FRONT_UNDOCK_TOTE: "pick_front_undock_tote",
  PICK_FRONT_LOCATION_SCAN: "pick_front_location_scan",
  PICK_FRONT_CONTAINER_SCAN: "pick_front_container_scan",
  PICK_FRONT_ITEM_SCAN: "pick_front_item_scan",
  PICK_FRONT_CONTAINER_BREAK: "pick_front_container_break",
  PICK_FRONT_MORE_ITEM_SCAN: "pick_front_more_item_scan",
  PICK_FRONT_PPTL_PRESS: "pick_front_pptl_press",
  PICK_FRONT_NO_FREE_BIN: "pick_front_no_free_bin",
  PICK_FRONT_DOCK_TOTE: "pick_front_dock_tote",
  PUT_BACK_EXCEPTION_OVERSIZED_ITEMS: "put_back_item_oversized",
  PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS: "put_back_extra_item_bin_select",
  PUT_BACK_INVALID_TOTE_ITEM: "put_back_invalid_tote_item",
  FINISH_EXCEPTION_ITEM_OVERSIZED: "FINISH_EXCEPTION_ITEM_OVERSIZED",
  FINISH_EXCEPTION_ENTITY_DAMAGED: "FINISH_EXCEPTION_ENTITY_DAMAGED",
  PUT_BACK_EXCEPTION_ENITY_IRT_BIN: "put_back_transfer_to_irt_bin",
  PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE:
    "put_back_extra_item_quantity_update",
  PUT_FRONT_WAREHOUSE_FULL_IRT_SCAN: "put_front_warehouse_full_irt_scan",
  SEND_EXTRA_ITEM_QTY: "SEND_EXTRA_ITEM_QTY",
  UNMARKED_DAMAGED: "UNMARKED_DAMAGED",
  EDIT_DETAILS: "EDIT_DETAILS",
  PICK_BACK_BIN: "pick_back_bin",
  PICK_BACK_SCAN: "pick_back_scan",
  SEND_EXCESS_ITEMS_BIN: "SEND_EXCESS_ITEMS_BIN",
  WAREHOUSEFULL_EXCEPTION: "WAREHOUSEFULL_EXCEPTION",
  CONFIRM_PHYSICALLY_DAMAGED_ITEMS: "CONFIRM_PHYSICALLY_DAMAGED_ITEMS",
  SEND_AUDIT_DAMAGED_ENTITY_DETAILS_ON_CONFIRM:
    "SEND_AUDIT_DAMAGED_ENTITY_DETAILS_ON_CONFIRM",
  AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION:
    "audit_loose_item_damage_exception",
  AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE: "audit_box_damage_exception",
  AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION: "audit_item_in_box_damage_exception",

  AUDIT_PACK_UNSCANNABLE_EXCEPTION: "audit_pack_unscannable_exception",
  AUDIT_SUB_PACK_UNSCANNABLE_EXCEPTION: "audit_sub_pack_unscannable_exception",
  AUDIT_EACH_UNSCANNABLE_EXCEPTION: "audit_each_unscannable_exception",
  AUDIT_DAMAGED_ENTITY_EXCEPTION: "audit_physically_damaged_exception",
  AUDIT_FRONT_IRT_BIN_CONFIRM: "audit_front_irt_bin_confirm",
  DEFAULT: "default",
  AUDIT: "audit_front",
  SET_AUDIT_DATA: "SET_AUDIT_DATA",
  AUDIT_SCAN: "audit_scan",
  AUDIT_SCAN_SR: "audit_scan_sr",
  AUDIT_RECONCILE: "audit_reconcile",
  AUDIT_WAITING_FOR_MSU: "audit_front_waiting_for_msu",
  GET_REVISED_QUANTITY: "GET_REVISED_QUANTITY",
  BARCODE_SCAN: "BARCODE_SCAN",
  GET_SERVER_MESSAGES: "GET_SERVER_MESSAGES",
  SET_SERVER_MESSAGES: "SET_SERVER_MESSAGES",
  CHANGE_PUT_FRONT_EXCEPTION_SCREEN: "CHANGE_PUT_FRONT_EXCEPTION_SCREEN",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
  SET_LANGUAGE: "SET_LANGUAGE",
  CHECKLIST_SUBMIT: "CHECKLIST_SUBMIT",
  UPDATE_KQ_QUANTITY: "UPDATE_KQ_QUANTITY",
  UPDATE_MISSING_QUANTITY: "UPDATE_MISSING_QUANTITY",
  UPDATE_UNSCANNABLE_QUANTITY: "UPDATE_UNSCANNABLE_QUANTITY",
  PUT_FRONT_ITEMS_TO_IRT_BIN: "put_front_items_to_irt_bin",
  PUT_FINISH_EXCEPTION_ENTITY: "PUT_FINISH_EXCEPTION_ENTITY",
  UPDATE_GOOD_QUANTITY: "UPDATE_GOOD_QUANTITY",
  UPDATE_DAMAGED_QUANTITY: "UPDATE_DAMAGED_QUANTITY",
  CANCEL_TOTE: "CANCEL_TOTE",
  CLOSE_TOTE: "CLOSE_TOTE",
  TOTE_ACTION: "TOTE_ACTION",
  POST_DATA_TO_INTERFACE: "POST_DATA_TO_INTERFACE",
  POST_DATA_TO_TOWER: "POST_DATA_TO_TOWER",
  LOG_ERROR: "LOG_ERROR",
  SEND_KQ_QTY: "SEND_KQ_QTY",
  SEND_AUDIT_DAMAGED_ENTITY_DETAILS: "SEND_AUDIT_DAMAGED_ENTITY_DETAILS",
  ENABLE_EXCEPTION: "ENABLE_EXCEPTION",
  ENABLE_SEARCH: "ENABLE_SEARCH",
  CANCEL_EXCEPTION: "CANCEL_EXCEPTION",
  REPRINT: "REPRINT",
  CANCEL_EXCEPTION_TO_SERVER: "CANCEL_EXCEPTION_TO_SERVER",
  LOGOUT_SESSION: "LOGOUT_SESSION",
  SET_ACTIVE_EXCEPTION: "SET_ACTIVE_EXCEPTION",
  DAMAGED_BARCODE: "Damaged Barcode",
  OVERSIZED_ITEMS: "Oversized Items",
  EXCESS_ITEMS_IN_PPS_BINS: "Excess Items in PPS Bins",
  SHOW_ERROR_MESSAGE: "SHOW_ERROR_MESSAGE",
  CONFIRM_TOTE_EXCEPTION: "CONFIRM_TOTE_EXCEPTION",
  CANCEL_TOTE_EXCEPTION: "CANCEL_TOTE_EXCEPTION",
  PERIPHERAL_DATA: "PERIPHERAL_DATA",
  SEARCH_MANAGEMENT: "SEARCH_MANAGEMENT",
  BACK: "BACK",
  ITEM_SEARCH_RESULT: "ITEM_SEARCH_RESULT",
  ITEM_SEARCH_NO_RESULT: "ITEM_SEARCH_NO_RESULT",
  PERIPHERALS: "peripherals",
  UPDATE_SEAT_DATA: "UPDATE_SEAT_DATA",
  PPTL_MANAGEMENT: "pptl_management",
  ITEM_SEARCH: "ITEM_SEARCH",
  ORPHAN_ITEM_DATA: "ORPHAN_ITEM_DATA",
  SCANNER_MANAGEMENT: "scanner_management",
  SEARCH_ITEM_DETAILS: "SEARCH_ITEM_DETAILS",
  CONVERT_TEXTBOX: "convert_textbox",
  UPDATE_PERIPHERAL: "UPDATE_PERIPHERAL",
  ADD: "/add",
  ADD_SCANNER: "ADD_SCANNER",
  PERIPHERAL_MANAGEMENT: "PERIPHERAL_MANAGEMENT",
  ADD_SCANNER_DETAILS: "ADD_SCANNER_DETAILS",
  CANCEL_ADD_SCANNER: "CANCEL_ADD_SCANNER",
  CANCEL_CLOSE_SCANNER: "CANCEL_CLOSE_SCANNER",
  GENERATE_NOTIFICATION: "GENERATE_NOTIFICATION",
  CANCEL_PPTL: "CANCEL_PPTL",
  IDLE_LOGOUT_TIME: 300000, //in millisec
  VALIDATE_UNMARKED_DAMAGED_DATA: "VALIDATE_UNMARKED_DAMAGED_DATA",
  PUT_FRONT_WAITING_UNDOCK: "put_front_waiting_undock",
  PUT_FRONT_WRONG_UNDOCK: "put_front_wrong_undock",
  PRE_PUT_STAGE: "pre_put_stage",
  PRE_PUT_SCAN: "pre_put_scan",
  PRE_PUT_RELEASE: "pre_put_release",
  PRE_PUT: "pre_put_back",
  PRE_PUT_EXCEPTION_EXCESS_TOTE: "pre_put_excess_items_tote",
  PRE_PUT_EXCEPTION_EXCESS_ITEMS: "pre_put_excess_items",
  RELEASE_MTU: "release_mtu",
  BIN_FULL: "bin_full",
  BIN_FULL_REQUEST: "bin_full_request",
  CANCEL_BIN_FULL_REQUEST: "bin_full_cancel",
  CONFIRM_BIN_FULL_REQUEST: "bin_full_confirmed",
  CANCEL_LAST_SCAN: "cancel_last_scan",
  CONFIRM_LOGOUT: "confirm_logout",
  CONFIRM_LOGOUT_REQUEST: "confirm_logout_request",
  CANCEL_LOGOUT_REQUEST: "cancel_logout_request",
  REPRINT_REQUEST: "reprint_request",
  CANCEL_REPRINT_REQUEST: "cancel_reprint_request",
  CONFIRM_REPRINT_LAST_REQUEST: "reprint_last_confirm",
  CONFIRM_REPRINT_ALL_REQUEST: "reprint_all_confirm",
  PICK_FRONT_PACKING_BOX: "pick_front_packing_box",
  PICK_FRONT_PACKING_CONTAINER_SCAN: "pick_front_packing_container_scan",
  PICK_FRONT_PACKING_ITEM_SCAN: "pick_front_packing_item_scan",
  PICK_FRONT_PACKING_PPTL_PRESS: "pick_front_packing_pptl_press",
  PACKING_BOX: "PACKING_BOX",
  BOX_FULL: "BOX_FULL",
  BOX_FULL_REQUEST: "packing_box_full_request",
  BOX_FULL_REQUEST_CONFIRMED: "packing_box_full_confirmed",
  DISCARD_PACKING_BOX: "DISCARD_PACKING_BOX",
  CANCEL_BOX_FULL: "CANCEL_BOX_FULL",
  CANCEL_BOX_FULL_REQUEST: "packing_box_full_cancel",
  CONFIRM_BOX_FULL: "packing_box_full_confirmed",
  CONFIRM_LOCATION: "CONFIRM_LOCATION",
  CONFIRM_LOCATION_PRESS: "container_kept_in_rack",
  HIDE_SPINNER: "HIDE_SPINNER",
  PICK_FRONT_LOCATION_CONFIRM: "pick_front_location_confirm",
  CLOSE_CANCEL_EXCEPTION: "close_cancel_exception",
  CANCEL_EXCEPTION_MODAL: "cancel_exception_modal",
  PUT_BACK_INVOICE: "put_back_invoice",
  EXIT_INVOICE: "EXIT_INVOICE",
  DECLINE_CANCEL_INVOICE: "DECLINE_CANCEL_INVOICE",
  PICK_BACK_REPRINT_TOTE: "pick_back_reprint_tote",
  CONFIRM_EXIT_INVOICE: "CONFIRM_EXIT_INVOICE",
  /*Constants for order details*/
  VOLUME_UNIT: "vol_unit",
  VOLUME: "volume",
  /*Constants for Put back exception*/
  ENTITY_DAMAGED: "entity_damaged",
  PICK_BACK_REPRINT_TOTE: "pick_back_reprint_tote",
  BIN_LIGHT_COLOR: {
    red: "#FF0000",
    blue: "#0390FF",
    green: "#4CAF50",
    pink: "#FF1BA5",
    white: "#FFFFFF",
    cyan: "#00FFFF",
    yellow: "#FFFF00"
  },
  PICK_FRONT_SCAN_PACKS: "pick_front_scan_packs",
  ERROR_NOTIFICATION: "ERROR_NOTIFICATION",
  HIDE_ERROR_NOTIFICATION: "HIDE_ERROR_NOTIFICATION",
  CLIENT_NOTIFICATION: "client",
  PUT_BACK_PRESS_PPTL_TOTE: "put_back_pptl_press_tote",
  PUT_BACK_NO_SCAN_TOTE: "put_back_no_scan_tote",
  PUT_BACK_UNSCANNABLE: "put_back_unscannable",
  PUT_BACK_SCAN_EXCESS_ITEM: "put_back_scan_excess_item",

  UNSCANNABLE_TOTE_ENTITY_QUANTITY: "UNSCANNABLE_TOTE_ENTITY_QUANTITY",
  TOTE_UNSCANNABLE: "tote_unscannable",
  EXCESS_ITEM_BIN: "EXCESS_ITEM_BIN",
  PICK_BACK_TOTE_BIN: "pick_back_tote_bin",
  WAITING_ORDER_TO_COMPLETE_FRONT: "waiting_order_to_complete_front",
  BIN_FULL_RAISED_FRONT: "bin_full_raised_front",
  PRESS_PPTL_TO_CLEAR_BIN: "press_pptl_to_clear_bin",
  CANCEL_SCAN_TOTE: "CANCEL_SCAN_TOTE",
  PICK_BACK_NO_SCAN: "pick_back_no_scan",
  SET_CANCEL_BUTTON_STATUS: "SET_CANCEL_BUTTON_STATUS",
  /*Constants for UDP*/
  UDP_PUT_FRONT_TOTE_SCAN: "ud_put_front_tote_scan",
  UDP_PUT_FRONT_ENTITY_SCAN: "ud_put_front_entity_scan",
  UDP_PUT_FRONT_BIN_SCAN: "ud_put_front_bin_scan",

  SEARCH_PPS_ITEM: "search_item",
  SEARCH_ITEM_CONFIRM: "search_item_confirm",
  SEARCH_ENTITY_SCAN: "search_entity_scan",
  SEARCH_IRT_CONFIRM: "search_irt_confirm",
  SEARCH: "search_front",
  WAITING_FOR_MSU: "waiting_for_msu",
  UDP_PUT_FRONT_WAITING_FOR_RACK: "ud_put_front_waiting_for_rack",
  UDP_PUT_FRONT_PLACE_ITEMS_IN_RACK: "ud_put_front_place_items_in_rack",
  UDP_PUT_FRONT_MISSING: "ud_put_front_missing",
  UDP_PUT_FRONT_UNEXPECTED: "ud_put_front_unexpected",
  UDP_UNEXPECTED_ITEM: "ud_put_front_unexpected",
  CLOSE_UNEXPECTED_SCAN: "CLOSE_UNEXPECTED_SCAN",
  SEND_MSU: "send_msu",
  CLOSE_CART: "close_cart",
  PICK_FRONT_CHECKLIST: "pick_front_checklist",
  /*Constants for Audit*/
  OPEN_AUDIT_MODAL: "OPEN_AUDIT_MODAL",
  API_GATEWAY: "/api-gateway",
  SR_SERVICE: "/sr-service",
  PLATFORM_SRMS: "/platform-srms",
  SERVICE_REQUEST: "/service-request",
  SEARCH_ITEM: "/search-item",
  CONFIRM_LOCATION: "CONFIRM_LOCATION",
  PICK_FRONT_SLOT_SCAN: "pick_front_slot_scan",
  PICK_FRONT_TOTE_CONFIRM: "pick_front_tote_confirm",
  NEW_CARRYING_UNIT: "request_tote",
  CANCEL_TOTE: "cancel_tote",
  CONFIRM_TOTE: "confirm_tote",
  CONFIRM_TOTE_SEND_TO_SERVER_MODAL: "CONFIRM_TOTE_SEND_TO_SERVER_MODAL",
  CANCEL_TOTE_SEND_TO_SERVER_MODAL: "CANCEL_TOTE_SEND_TO_SERVER_MODAL",
  LANGUAGE: "Language",
  LOGINTO: "Login to",
  BUTLERSYSTEM: "Butler System",
  PICK_FRONT_SKIP_TOTE: "pick_front_skip_tote",
  SKIP_DOCKING: "skip_bin",
  CANCEL_SKIP_DOCKING: "cancel_bin_skip",
  CONFIRM_SKIP_DOCKING: "confirm_bin_skip",
  CANCEL_SKIP_DOCKING_SEND_TO_SERVER_MODAL:
    "CANCEL_SKIP_DOCKING_SEND_TO_SERVER_MODAL",
  CONFIRM_SKIP_DOCKING_SEND_TO_SERVER_MODAL:
    "CONFIRM_SKIP_DOCKING_SEND_TO_SERVER_MODAL",
  PICK_FRONT_SKIP_BIN: "pick_front_skip_bin",
  GET_BOI_CONFIG: "GET_BOI_CONFIG",
  KEYBOARD: "KEYBOARD",
  SCANNER: "SCANNER",
  UNIVERSAL_DOCK_UNDOCK: "universal_dock_undock",
  PICK_REPRINT_PACKLIST: "pick_reprint_packlist",
  IN: "in ",
  QL_CODE: "QL Code",
  SLOT_ID: "Slot ID",
  PREV_LOCATION: "Location",
  CONFIRM_CLOSE_INVOICE: "confirm_close_invoice",
  INVOICE_REQUIRED: "INVOICE_REQUIRED",
}

module.exports = appConstants
