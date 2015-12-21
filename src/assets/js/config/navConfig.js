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
            "screen_id": "put_front_rack_waiting",
            "code": "Common.000",
            "message": "Wait For MSU",
            "showImage": false,
            "level": 1,
            "type": 'active'
        }],
        [{
            "screen_id": "put_front_scan_stage",
            "code": "Common.000",
            "image": svgConstants.scan,
            "message": "Scan Item From Bin",
            "showImage": true,
            "level": 1,
            "type": 'passive'
        }, {
            "screen_id": "put_front_place_item_in_rack",
            "code": "Common.001",
            "image": svgConstants.rack,
            "message": "Place Item in slot and scan more",
            "showImage": true,
            "level": 2,
            "type": 'passive'
        }]
    ],
    "pickFront": [{
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
    "pickBack": [{
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
    }]
  };




module.exports = navData;
