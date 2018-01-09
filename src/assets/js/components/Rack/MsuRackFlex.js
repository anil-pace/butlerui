var React = require('react');
var MsuSlot = require('./MsuSlot');

var lastSlot = {
  flexBasis:"4vh"
};

var xyz = [
  {
    "barcodes": ["A.01", "A.02", "A.03"],
    "height": "33",
    "orig_coordinates": [
      0,
      5
    ],
    "length": "32",
  },
  {
    "barcodes": ["B.01", "B.02", "B.03"],
    "height": "33",
    "orig_coordinates": [
      32,
      5
    ],
    "length": "32",
  },
  {
    "barcodes": ["C.01", "B.02", "B.03"],
    "height": "33",
    "orig_coordinates": [
      64,
      5
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      0,
      43
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      32,
      43
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      64,
      43
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      0,
      81
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      32,
      81
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      64,
      81
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      0,
      119
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      32,
      119
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      64,
      119
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      0,
      157
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      32,
      157
    ],
    "length": "32",
  },
  {
    "height": "33",
    "orig_coordinates": [
      64,
      157
    ],
    "length": "32",
  },
  // "slot_barcodes":["003.1.A.01", "003.1.A.02", "003.1.A.03"],
  // "slot_type":"slot"
];

var xyz_barcodes = [
        {
          "barcodes": ["A.01", "A.09"],
          "height": "33",
          "orig_coordinates": [
            0,
            5
          ],
          "length": "32",
        },
        {
          "barcodes": ["A.03", "A.04"],
          "height": "33",
          "orig_coordinates": [
            32,
            5
          ],
          "length": "32",
        },
        {
          "barcodes": ["A.03", "A.04"],
          "height": "33",
          "orig_coordinates": [
            64,
            5
          ],
          "length": "32",
        },
        {
          "barcodes": ["A.19", "A.04"],
          "height": "33",
          "orig_coordinates": [
            0,
            43
          ],
          "length": "32",
        }
      ]; 

var MsuRackFlex = React.createClass({

    getInitialState: function(){
        return this._sortBins(xyz,false);
    },
    componentWillReceiveProps: function() {
        this._sortBins(xyz,true);
    },

      _sortBins:function (aBins,shouldSetState, a,b){
         if (!aBins || (aBins.constructor !== Array && aBins.length < 1)){
            //no bins found
            return;
         }

        var totalBins = aBins.length;
        var totalWidth =0, totalHeight=0, lastHBin = {}, lastVBin={}; 
        var selectedSlot;


        var slot_barcodes = ["003.1.A.19", "003.1.A.04"];
        
        var compartment_details = slot_barcodes[0].split(".");

        let slotToHighlight = compartment_details[2]+"."+compartment_details[3];

        let x = xyz_barcodes.map(function(item, idx){
          let eachSlot = item.barcodes;
          if(eachSlot.indexOf(slotToHighlight)>0){
          //if(slotToHighlight === eachSlot[0]){
            selectedSlot = idx;
            console.log("INDEX is " + idx);
          }
        });

        lastHBin = aBins.reduce(function(oBinPrev,oBinCurr){
            if (oBinPrev.orig_coordinates[0] < oBinCurr.orig_coordinates[0]){
                return oBinCurr;
            }else if (oBinPrev.orig_coordinates[0] === oBinCurr.orig_coordinates[0]){
                return oBinCurr;
            }else{
                return oBinPrev;
            }
        });
        console.log(lastHBin);
        lastVBin = aBins.reduce(function(oBinPrev,oBinCurr){
            if (oBinPrev.orig_coordinates[1] < oBinCurr.orig_coordinates[1]){
                return oBinCurr;
            }else if (oBinPrev.orig_coordinates[1] === oBinCurr.orig_coordinates[1]){
                return oBinCurr;
            }else{
                return oBinPrev;
            }
        });
        //console.log(lastVBin);
        if(shouldSetState){
            this.setState({
                aBins:aBins,
                lastHBin:lastHBin,
                lastVBin: lastVBin,
                selectedSlot: selectedSlot,
                slotToHighlight: slotToHighlight
            });
        }
        else{
            return{
                aBins:aBins,
                lastHBin:lastHBin,
                lastVBin: lastVBin,
                selectedSlot: selectedSlot,
                slotToHighlight: slotToHighlight
            }
        }
    },

    _createBinLayouts: function(aBins, lastHBin, lastVBin,  seatType, screenId, selectedSlot, slotToHighlight) {
        if ((aBins.constructor !== Array && aBins.length < 1) || !(lastHBin.length) || !(lastVBin.length)){
            //no bins found
            return;
         }
         var aHTMLBins =[];
         // since the total width would be 100% but the bins would be divided into
         // ratios, hence each of the bin would have to have the factor into % of the
         // .bins container.
         // for reference orig_coordinates[0] === x axis and orig_coordinates[1] === y axis
          var horFactor = parseFloat(100/(Number(lastHBin.orig_coordinates[0]) + Number(lastHBin.length)));
          var vertFactor = parseFloat(100/(Number(lastVBin.orig_coordinates[1]) + Number(lastVBin.height)));
           // var horFactor = 1;
           // var vertFactor = 1;

         var totalPpsWidth = Number(lastHBin.orig_coordinates[0]) + Number(lastHBin.length);
         var totalPpsHeight = Number(lastVBin.orig_coordinates[1]) + Number(lastVBin.height);

         var lastTop = "0%";
         var lastHeight=0;

         for (var i =0; i<aBins.length ;i++){
                var binWidth = aBins[i].length * horFactor+'%';
                var binHeight = aBins[i].height * vertFactor +'%';
                var ileft=0;
                var itop=0;
                
                // if the seat type is front then we have to modify the x co-ordinate as per the formula:
                // the new x coordinate of a ppsbin is (Total length of pps - xcoordinate - length of bin)

                ileft = (totalPpsWidth - aBins[i].orig_coordinates[0] - aBins[i].length) * horFactor +'%';
                itop = (totalPpsHeight - aBins[i].orig_coordinates[1] - aBins[i].height) * vertFactor +'%';
                console.log("currentNewTop itop" + itop);
                
                if( Number(lastTop.substring(0,lastTop.length-1)) - Number(itop.substring(0,itop.length-1)) > 0){
                  var difference =  Number(lastTop.substring(0,lastTop.length-1)) - Number(itop.substring(0,itop.length-1));

                // if( Number(itop.substring(0,itop.length-1)) - Number(lastTop.substring(0,lastTop.length-1)) > 0){
                //   var difference =  Number(itop.substring(0,itop.length-1)) - Number(lastTop.substring(0,lastTop.length-1));
                  aHTMLBins.push(
                                   <div className="gap-container"
                                      style={{
                                        background: "black",
                                        top: Number(itop.substring(0,itop.length-1)) + Number(binHeight.substring(0,binHeight.length-1)) + '%',
                                        position: "absolute",
                                        width: "100%",
                                        left: "0%",
                                        background: "black",
                                        height: (difference-Number(binHeight.substring(0,binHeight.length-1)))+'%',
                                      }}>
                                   </div>
                                   )
                  
                  console.log("There is a gap. difference is " + difference);
                }

                if(i===1){
                  aHTMLBins.push(
                                   <div className="bin-container"
                                      style={{
                                        width: binWidth,
                                        height: binHeight,
                                        top: itop,
                                        left:ileft,
                                        background: "grey",
                                        border: "1px solid grey",
                                      }}>{selectedSlot}
                                   </div>
                                   
                                   )
                }
                else{
                  aHTMLBins.push(
                                   <div className="bin-container"
                                      style={{
                                        width: binWidth,
                                        height: binHeight,
                                        top: itop,
                                        left:ileft,
                                        border: "1px solid grey",
                                      }}>
                                      
                                   </div>
                                   )
                }

                lastTop = (totalPpsHeight - aBins[i].orig_coordinates[1] - aBins[i].height) * vertFactor +'%';
                lastHeight = binHeight;
                console.log("lastTop lasttop" + lastTop);
              }
        return aHTMLBins;
    },

    render: function() {
      
      var type = this.props.type;
      
        var aHTMLBins = this._createBinLayouts(this.state.aBins,
                                               this.state.lastHBin,
                                               this.state.lastVBin,
                                               this.props.seatType,
                                               this.props.screenId,
                                               this.state.selectedSlot,
                                               this.state.slotToHighlight
                                               );
        var self = this;
        return (
                 <div className="bins-flex" style={{width:document.body.clientWidth/4, height:document.body.clientHeight/2, borderTop: "5px solid grey", borderLeft: "5px solid grey", borderRight: "5px solid grey"}}>
                        {aHTMLBins}
                      <div style={{fontSize:"2em", position: "absolute", background: "grey", color: "white", marginLeft:"70%", paddingLeft: "15%", width: "100%"}}>{"SLOT " + this.state.slotToHighlight}</div>
                 </div>
        );
    }
});

module.exports = MsuRackFlex;
