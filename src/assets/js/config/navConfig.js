var svgConstants = require('../constants/svgConstants');

var navData = {
    "putBack": [{
        "screen_id": "put_back_stage",
        "code": "Common.000",
        "image": svgConstants.stage,
        "message": "Stage Bin or Scan Item",
        "showImage": true,
        "level": 1,
        "type": 'passive'
    }, {
        "screen_id": "put_back_scan",
        "code": "Common.001",
        "image": svgConstants.scan,
        "message": "Scan & Confirm",
        "showImage": true,
        "level": 2,
        "type": 'passive'
    }],
    "putFront": [
        [{
            "screen_id": "put_front_waiting_for_rack",
            "code": "Common.000",
            "message": "Wait For MSU",
            "showImage": false,
            "level": 1,
            "type": 'active'
        }],
        [{
            "screen_id": "put_front_scan",
            "code": "Common.000",
            "image": svgConstants.scan,
            "message": "Scan Item From Bin",
            "showImage": true,
            "level": 1,
            "type": 'passive'
        }, {
            "screen_id": "put_front_place_items_in_rack",
            "code": "Common.001",
            "image": svgConstants.rack,
            "message": "Place Item in slot and scan more",
            "showImage": true,
            "level": 2,
            "type": 'passive'
        }]
    ],
    "pickFront": [
        [{
            "screen_id": "pick_front_waiting_for_rack",
            "code": "Common.000",
            "message": "Wait For MSU",
            "showImage": false,
            "level": 1,
            "type": 'active'
        }],
        [{
            "screen_id": ["pick_front_scan_slot_barcode", "pick_front_scan_box_barcode", "pick_front_scan_item_and_place_in_bin"],
            "code": "Common.000",
            "image": svgConstants.scan,
            "message": "Scan Slot Barcode",
            "showImage": true,
            "level": 1,
            "type": 'passive'
        }, {
            "screen_id": "pick_front_press_pptl_to_confirm",
            "code": "Common.001",
            "image": svgConstants.place,
            "message": "PPTL",
            "showImage": true,
            "level": 2,
            "type": 'passive'
        }],

    ],
    "pickBack": [{
        "screen_id": "put_back_stage",
        "code": "Common.000",
        "image": svgConstants.scan,
        "message": "Stage Bin or Scan Item",
        "showImage": true,
        "level": 1,
        "type": 'passive'
    }, {
        "screen_id": "put_back_scan",
        "code": "Common.001",
        "image": svgConstants.place,
        "message": "Scan & Confirm",
        "showImage": true,
        "level": 2,
        "type": 'passive'
    }]

};

module.exports = navData;
