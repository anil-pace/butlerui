var svgConstants = require('../constants/svgConstants');

var navData ={
  "putBack" : [
		    {
          "screen_id":"put_back_stage",
          "code" :  "Common.000",
          "image":svgConstants.stage,
          "message" : "Stage Bin or Scan Item",
          "showImage" : true,
          "level" : 1,
          "type" : 'passive'
        },
        {
          "screen_id":"put_back_scan",
          "code" :  "Common.001",
          "image":svgConstants.scan,
          "message" : "Place item in bin {0} and press PPTL to confirm",
          "showImage" : true,
          "level" : 2,
          "type" : 'passive'
        }
  ],
  "putFront" : [
        {
          "screen_id":"Scan the item(s)",
          "code" :  "Common.000",
          "image":svgConstants.stage,
          "message" : "Stage Bin or Scan Item",
          "showImage" : true,
          "level" : 1,
          "type" : 'passive'
        },
        {
          "screen_id":"Place",
          "code" :  "Common.001",
          "image":svgConstants.scan,
          "message" : "Scan & Confirm",
          "showImage" : true,
          "level" : 2,
          "type" : 'passive'
        }
  ],
  "pickFront" : [
        {
          "screen_id":"put_back_stage",
          "code" :  "Common.000",
          "image":svgConstants.stage,
          "message" : "Stage Bin or Scan Item",
          "showImage" : true,
          "level" : 1,
          "type" : 'passive'
        },
        {
          "screen_id":"put_back_scan",
          "code" :  "Common.001",
          "image":svgConstants.scan,
          "message" : "Scan & Confirm",
          "showImage" : true,
          "level" : 2,
          "type" : 'passive'
        }
  ],
  "pickBack" : [
        {
          "screen_id":"put_back_stage",
          "code" :  "Common.000",
          "image":svgConstants.stage,
          "message" : "Stage Bin or Scan Item",
          "showImage" : true,
          "level" : 1,
          "type" : 'passive'
        },
        {
          "screen_id":"put_back_scan",
          "code" :  "Common.001",
          "image":svgConstants.scan,
          "message" : "Scan & Confirm",
          "showImage" : true,
          "level" : 2,
          "type" : 'passive'
        }
  ]

module.exports = navData;
