var React = require('react');
var MsuSlot = require('./MsuSlot');

var lastSlot = {
  flexBasis:"4vh"
};

var xyz = [
  {
  "rack_type_rec":[
    {
      "height": "10",
      "orig_coordinates": [
        0,
        5
      ],
      "length": "32",
      "barcodes":["A.01", "A.02"]
    },
    {
      "height": "33",
      "orig_coordinates": [
        32,
        5
      ],
      "length": "32",
      "barcodes":["N.01", "N.02", "N.03"]
    },
    {
      "height": "20",
      "orig_coordinates": [
        64,
        5
      ],
      "length": "32",
      "barcodes":["M.01", "M.02"]
    },
    {
      "height": "33",
      "orig_coordinates": [
        0,
        43
      ],
      "length": "32",
      "barcodes":["L.01", "L.02"]
    },
    {
      "height": "20",
      "orig_coordinates": [
        32,
        43
      ],
      "length": "32",
      "barcodes":["K.01", "K.02"]
    },
    {
      "height": "33",
      "orig_coordinates": [
        64,
        43
      ],
      "length": "32",
      "barcodes":["J.01", "J.02"]
    },
    {
      "height": "33",
      "orig_coordinates": [
        0,
        81
      ],
      "length": "32",
      "barcodes":["I.01", "I.02"]
    },
    {
      "height": "20",
      "orig_coordinates": [
        32,
        81
      ],
      "length": "32",
      "barcodes":["H.01", "H.02"]
    },
    {
      "height": "10",
      "orig_coordinates": [
        64,
        81
      ],
      "length": "32",
      "barcodes":["G.01", "G.02"]
    },
    {
      "height": "18",
      "orig_coordinates": [
        0,
        20
      ],
      "length": "32",
      "barcodes":["F.01", "F.02"]
    },
    {
      "height": "8",
      "orig_coordinates": [
        32,
        68
      ],
      "length": "32",
      "barcodes":["E.01", "E.02"]
    },
    {
      "height": "8",
      "orig_coordinates": [
        32,
        106
      ],
      "length": "32",
      "barcodes":["D.01", "D.02"]
    },
    {
      "height": "18",
      "orig_coordinates": [
        64,
        96
      ],
      "length": "32",
      "barcodes":["C.01", "C.02"]
    },
    {
      "height": "8",
      "orig_coordinates": [
        64,
        30
      ],
      "length": "32",
      "barcodes":["B.01", "B.02"]
    }
    ]
  },
  {"slot_barcodes":["003.1.N.01", "003.1.N.02", "003.1.N.03"]}
];


var MsuRackFlex = React.createClass({

    getInitialState: function(){
        return this._sortBins(xyz[0].rack_type_rec,false);
    },
    componentWillReceiveProps: function() {
        this._sortBins(xyz[0].rack_type_rec,true);
    },

      _sortBins:function (aBins,shouldSetState){
         if (!aBins || (aBins.constructor !== Array && aBins.length < 1)){
            //no bins found
            return;
         }

        var totalBins = aBins.length;
        var totalWidth =0, totalHeight=0, lastHBin = {}, lastVBin={}; 
        var selectedSlotIdx;


        //var slot_barcodes = ["003.1.A.19", "003.1.A.04"];

        var newBarcodes = []; // for storing post truncation data
        var selectedSlotIds = "";

        var y = xyz[1].slot_barcodes.map(function(barcodes,idx){
          var barcodesSplit = barcodes.split(".");
          var barcodeId = barcodesSplit[2]+"."+barcodesSplit[3];

          console.log("===================================>");
          console.log("slotsToHighlight post Truncation " + barcodeId);
          newBarcodes.push(barcodeId);
        });

        console.log(newBarcodes);
        selectedSlotIds =newBarcodes[0].replace(".",'')+"-"+newBarcodes[newBarcodes.length-1].replace(".",'');
        this.props.getSelectedSlotsIds(selectedSlotIds);
        

        var x = aBins.map(function(eachSlot, index){
           var eachSlotBarcodes = eachSlot.barcodes;
           console.log("eachSlotBarcodes" + eachSlotBarcodes);
          if(eachSlotBarcodes.length === newBarcodes.length){
              console.log("length of both the arrays is same");
              if( JSON.stringify(newBarcodes)==JSON.stringify(eachSlotBarcodes) ){
                 selectedSlotIdx = index;
              }
          }
        });
        
        // var compartment_details = slot_barcodes[0].split(".");

        lastHBin = aBins.reduce(function(oBinPrev,oBinCurr){
            if (oBinPrev.orig_coordinates[0] < oBinCurr.orig_coordinates[0]){
                return oBinCurr;
            }else if (oBinPrev.orig_coordinates[0] === oBinCurr.orig_coordinates[0]){
                return oBinCurr;
            }else{
                return oBinPrev;
            }
        });

        lastVBin = aBins.reduce(function(oBinPrev,oBinCurr){
            if (oBinPrev.orig_coordinates[1] < oBinCurr.orig_coordinates[1]){
                return oBinCurr;
            }else if (oBinPrev.orig_coordinates[1] === oBinCurr.orig_coordinates[1]){
                return oBinCurr;
            }else{
                return oBinPrev;
            }
        });
        

        if(shouldSetState){
            this.setState({
                aBins:aBins,
                lastHBin:lastHBin,
                lastVBin: lastVBin,
                selectedSlotIdx: selectedSlotIdx,
                selectedSlotIds: selectedSlotIds
            });
        }
        else{
            return{
                aBins:aBins,
                lastHBin:lastHBin,
                lastVBin: lastVBin,
                selectedSlotIdx: selectedSlotIdx,
                selectedSlotIds: selectedSlotIds
            }
        }
        
    },

    _createBinLayouts: function(aBins, lastHBin, lastVBin,  seatType, screenId, selectedSlotIdx, selectedSlotIds) {
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

         console.log("TotalPPSWidth is" + totalPpsWidth);
         console.log("totalPpsHeight is" + totalPpsHeight);

         for (var i =0; i<aBins.length ;i++){
                var binWidth = aBins[i].length * horFactor+'%';
                var binHeight = aBins[i].height * vertFactor +'%';
                var ileft=0;
                var ibottom=0;
                
               

                // if the seat type is front then we have to modify the x co-ordinate as per the formula:
                // the new x coordinate of a ppsbin is (Total length of pps - xcoordinate - length of bin)

                ileft = (aBins[i].orig_coordinates[0] * horFactor +'%'); // 0 on x-axis should start from bottom-left towards right.
                ibottom = (aBins[i].orig_coordinates[1]) * vertFactor +'%'; // 0 on y-axis should start from bottom-left towards up.

                var totalHeight = totalPpsHeight * vertFactor;
                

                // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%>");
                // console.log("condition check is " + totalHeight);

                let sum= Number(ibottom.substring(0,ibottom.length-1)) + Number(binHeight.substring(0,binHeight.length-1));

                console.log("========================>");
                console.log("ibottom + binHeight " + sum);


                /* Check for BORDER of bins-flex - START*/

                if(ileft === "0%") var borderLeft="0.625vw solid #939598";
                  else borderLeft = "1px solid #939598";


                if( totalHeight === Math.round(sum) ) var borderTop="0.625vw solid #939598";
                  else borderTop = "1px solid #939598";

                if(ileft === lastHBin.orig_coordinates[0] * horFactor + '%') var borderRight="0.625vw solid #939598";
                  else borderRight = "1px solid #939598";
                  
                /* END **********************************/

                if(i===selectedSlotIdx){
                  aHTMLBins.push(
                                   <div className="bin-container"
                                      style={{
                                        width: binWidth,
                                        height: binHeight,
                                        bottom: ibottom,
                                        left:ileft,
                                        borderLeft: borderLeft,
                                        borderTop: borderTop,
                                        borderRight: borderRight,
                                        background: "white",
                                        borderBottom: "1px solid #939598",
                                        background: "#939598",
                                        color:"white",
                                        fontSize: "1.5em",
                                        textAlign: "center",
                                        fontWeight: "bold"
                                      }}>{selectedSlotIds}
                                   </div>
                                   )
                }
                else{
                  aHTMLBins.push(
                                   <div className="bin-container"
                                      style={{
                                        width: binWidth,
                                        height: binHeight,
                                        bottom: ibottom,
                                        left:ileft,
                                        borderLeft: borderLeft,
                                        borderTop: borderTop,
                                        borderRight: borderRight,
                                        borderBottom: "1px solid #939598",
                                        background: "white",
                                      }}>
                                   </div>
                                   )
                }
              }
              aHTMLBins.push(<div style={{top:"100%", position: "absolute", height:"15vh", width:"100%", marginLeft: "-20%", borderLeft:"0.625vw solid #939598", borderRight:"0.625vw solid #939598"}}> </div>);
        return aHTMLBins;
    },

    render: function() {

      console.log("============================>");
      console.log("document width is" + document.body.clientWidth);
      console.log("document height is" + document.body.clientHeight);
      console.log("lastHBin" + this.state.lastHBin.orig_coordinates[0]);
      console.log("lastVBin" + this.state.lastVBin.orig_coordinates[1]);
      
      var type = this.props.type;
      
        var aHTMLBins = this._createBinLayouts(this.state.aBins,
                                               this.state.lastHBin,
                                               this.state.lastVBin,
                                               this.props.seatType,
                                               this.props.screenId,
                                               this.state.selectedSlotIdx,
                                               this.state.selectedSlotIds
                                               );
        var self = this;
        return (
                 <div className="bins-flex" style={{height:"85%", width: "100%", background:"#66686a"}}>
                        {aHTMLBins}
                    {/*<div style={{fontSize:"2em", position: "absolute", background: "grey", color: "white", marginLeft:"70%", paddingLeft: "15%", width: "100%"}}>{"SLOT " + this.state.selectedSlotIds}</div> */}
                 </div>
        );
    }
});

module.exports = MsuRackFlex;