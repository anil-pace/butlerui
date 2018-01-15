var React = require('react');


// var xyz = [
//   {
//   "rack_type_rec":[
//     {
//     "height": "33",
//     "orig_coordinates": [
//       0,
//       5
//     ],
//     "length": "32",
//     "barcodes":["A.01", "A.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       32,
//       5
//     ],
//     "length": "32",
//     "barcodes":["B.01", "B.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       64,
//       5
//     ],
//     "length": "32",
//     "barcodes":["C.01", "C.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       0,
//       43
//     ],
//     "length": "32",
//     "barcodes":["D.01", "D.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       32,
//       43
//     ],
//     "length": "32",
//     "barcodes":["E.01", "E.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       64,
//       43
//     ],
//     "length": "32",
//     "barcodes":["F.01", "F.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       0,
//       81
//     ],
//     "length": "32",
//     "barcodes":["G.01", "G.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       32,
//       81
//     ],
//     "length": "32",
//     "barcodes":["H.01", "H.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       64,
//       81
//     ],
//     "length": "32",
//     "barcodes":["I.01", "I.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       0,
//       119
//     ],
//     "length": "32",
//     "barcodes":["J.01", "J.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       32,
//       119
//     ],
//     "length": "32",
//     "barcodes":["K.01", "K.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       64,
//       119
//     ],
//     "length": "32",
//     "barcodes":["L.01", "L.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       0,
//       157
//     ],
//     "length": "32",
//     "barcodes":["M.01", "M.02"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       32,
//       157
//     ],
//     "length": "32",
//     "barcodes":["N.01", "N.02", "N.03"]
//   },
//   {
//     "height": "33",
//     "orig_coordinates": [
//       64,
//       157
//     ],
//     "length": "32",
//     "barcodes":["O.01", "O.02"]
//   }

//     ]
//   },
//   {"slot_barcodes":["003.1.N.01", "003.1.N.02", "003.1.N.03"]}
// ];


var MsuRackFlex = React.createClass({

    getInitialState: function(){
        //return this._sortSlots(xyz[0].rack_type_rec);
        return this._sortSlots(this.props.rackDetails);
    },
    componentWillReceiveProps: function() {
        //this._sortSlots(xyz[0].rack_type_rec);
        this._sortSlots(this.props.rackDetails);
    },

    componentDidUpdate:function(){
        /*
            Calling the line function only if the drawerLineDrawn is false 
            and the slot type is drawer.
            drawerLineDrawn is set true once the line is created
         */
        var strEl = document.querySelectorAll("#selectedSlot")[0];
        strEl = strEl ? strEl.parentNode : null;
        var endEl  = document.querySelectorAll("#slotDisplayArea")[0];
        if(strEl && endEl){
          //this.connect(strEl, endEl, "#6d6d6d", 3,"drawerLine");
        }
        
    },

    componentWillUnmount:function(){
       // var lines = document.getElementsByClassName("drawerLine");
       //  var directionLine = document.getElementsByClassName("LineDirection");
       //  if(lines.length){
       //      lines[0].remove();
       //  }
       //  if(directionLine.length){
       //      directionLine[0].remove();
       //  }

    },

    _sortSlots:function (vSlots){
       if (!vSlots || (vSlots.constructor !== Array && vSlots.length < 1)){
          //no slots found
          return;
       }

      var totalSlots = vSlots.length;
      var totalWidth =0, totalHeight=0;
      var lastHSlot = {}, lastVSlot={}; 
      var selectedSlotIndex;


      var newBarcodes = []; // for storing post truncation data
      var selectedSlotIds = "";

      //var y = xyz[1].slot_barcodes.map(function(slotBarcodes,idx){
        //{"slot_barcodes":["003.1.N.01", "003.1.N.02", "003.1.N.03"]}
        var y = this.props.slotBarcodes.map(function(slotBarcodes,idx){
        // var barcodesSplit = slotBarcodes.split(".");
        // var barcodeId = barcodesSplit[2]+"."+barcodesSplit[3];

        // console.log("===================================>");
        // console.log("slotsToHighlight post Truncation " + barcodeId);

          var str = slotBarcodes,
          delimiter = '.',
          start = 2,
          tokens = str.split(delimiter).slice(start);
          if(tokens.length > 1) result = tokens.join("."); //take extra care when we have 3rd "." as delimiter
          else result = tokens;

          newBarcodes.push(result);
        });

      console.log(newBarcodes);
      //selectedSlotIds =newBarcodes[0].replace(".",'')+" - "+newBarcodes[newBarcodes.length-1].replace(".",'');
        selectedSlotIds = newBarcodes;
      

      vSlots.map(function(eachSlot, index){
         var eachSlotBarcodes = eachSlot.barcodes;
         if(!eachSlotBarcodes) return;
          console.log("eachSlotBarcodes" + eachSlotBarcodes);
          if(eachSlotBarcodes.length === newBarcodes.length){
              console.log("length of both the arrays is same");
              if( JSON.stringify(newBarcodes)==JSON.stringify(eachSlotBarcodes) ){
                 selectedSlotIndex = index;
              }
          }
      });
      
      lastHSlot = vSlots.reduce(function(prevSlot,currSlot){
          if (prevSlot.orig_coordinates[0] < currSlot.orig_coordinates[0]){
              return currSlot;
          }else if (prevSlot.orig_coordinates[0] === currSlot.orig_coordinates[0]){
              return currSlot;
          }else{
              return prevSlot;
          }
      });

      lastVSlot = vSlots.reduce(function(prevSlot,currSlot){
          if (prevSlot.orig_coordinates[1] < currSlot.orig_coordinates[1]){
              return currSlot;
          }else if (prevSlot.orig_coordinates[1] === currSlot.orig_coordinates[1]){
              return currSlot;
          }else{
              return prevSlot;
          }
      });


      return{
          vSlots:vSlots,
          lastHSlot:lastHSlot,
          lastVSlot: lastVSlot,
          selectedSlotIndex: selectedSlotIndex,
          selectedSlotIds: selectedSlotIds
      }
    },

    connect:function(startEl, endEl, color, thickness) {
      var off1 = this.getOffset(startEl);
      var off2 = this.getOffset(endEl);
      // bottom right
      var x1 = off1.left + off1.width;
      var y1 = off1.top + off1.height/2;
      // top right
      var x2 = off2.left ;
      var y2 = off2.top+ off2.height/2;
      // distance
      var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
      // center
      var cx = ((x1 + x2) / 2) - (length / 2);
      var cy = ((y1 + y2) / 2) - (thickness / 2);
      // angle
      var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
      // make hr

      var htmlLine = "<div class='connectingLine' style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
      document.getElementById('app').innerHTML += htmlLine; 
    },

    getOffset( el ) {
        var rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
            width: rect.width || el.offsetWidth,
            height: rect.height || el.offsetHeight
        };
    },
    _createSlotLayouts: function(vSlots, lastHSlot, lastVSlot, selectedSlotIndex, selectedSlotIds) {
        if ((vSlots.constructor !== Array && vSlots.length < 1) || !(lastHSlot.length) || !(lastVSlot.length)){
            //no bins found
            return;
         }
         var vHTMLSlots =[];
         // since the total width would be 100% but the bins would be divided into
         // ratios, hence each of the bin would have to have the factor into % of the
         // .bins container.

         // for reference orig_coordinates[0] === x axis and orig_coordinates[1] === y axis
          var horFactor = parseFloat(100/(Number(lastHSlot.orig_coordinates[0]) + Number(lastHSlot.length)));
          var vertFactor = parseFloat(100/(Number(lastVSlot.orig_coordinates[1]) + Number(lastVSlot.height)));

         var totalRackWidth = Number(lastHSlot.orig_coordinates[0]) + Number(lastHSlot.length);
         var totalRackHeight = Number(lastVSlot.orig_coordinates[1]) + Number(lastVSlot.height);

         console.log("TotalPPSWidth is" + totalRackWidth);
         console.log("totalRackHeight is" + totalRackHeight);

         for (var i =0; i<vSlots.length ;i++){
                var binWidth = vSlots[i].length * horFactor+'%';
                var binHeight = vSlots[i].height * vertFactor +'%';
                var ileft=0;
                var ibottom=0;



                ileft = (vSlots[i].orig_coordinates[0] * horFactor +'%'); // 0 on x-axis should start from bottom-left towards right.
                ibottom = (vSlots[i].orig_coordinates[1]) * vertFactor +'%'; // 0 on y-axis should start from bottom-left towards up.

                var vRackHeight = totalRackHeight * vertFactor; //rack height in ratio

                let sum= Number(ibottom.substring(0,ibottom.length-1)) + Number(binHeight.substring(0,binHeight.length-1));

                console.log("========================>");
                console.log("ibottom + binHeight " + sum);


                /* Check for BORDER of bins-flex - START*/

                if(ileft === "0%") var borderLeft="0.625vw solid #939598";
                  else borderLeft = "1px solid #939598";


                if( vRackHeight === Math.round(sum) ) var borderTop="0.625vw solid #939598";
                  else borderTop = "1px solid #939598";

                if(ileft === lastHSlot.orig_coordinates[0] * horFactor + '%') var borderRight="0.625vw solid #939598";
                  else borderRight = "1px solid #939598";
                  
                /* END **********************************/

                if(i===selectedSlotIndex){
                  vHTMLSlots.push(
                                   <div className="subSlot"
                                      style={{
                                        width: binWidth,
                                        height: binHeight,
                                        bottom: ibottom,
                                        left:ileft,
                                        borderTop: borderTop,
                                        borderRight: borderRight,
                                        borderBottom: "1px solid #939598",
                                        borderLeft: borderLeft,
                                        background: "#939598",
                                        color:"white",
                                        fontSize: "1.5em",
                                        textAlign: "center",
                                        fontWeight: "bold"
                                      }}>
                                      <div id="selectedSlot"></div>
                                   </div>
                                   )
                }
                else{
                  vHTMLSlots.push(
                                   <div className="subSlot"
                                      style={{
                                        width: binWidth,
                                        height: binHeight,
                                        bottom: ibottom,
                                        left:ileft,
                                        borderTop: borderTop,
                                        borderRight: borderRight,
                                        borderBottom: "1px solid #939598",
                                        borderLeft: borderLeft,
                                        background: "white"
                                      }}>
                                   </div>
                                   )
                }
              }
              //attach legs to Rack
              vHTMLSlots.push(<div className="legsSpaceContainer"> </div>);
        return vHTMLSlots;
    },

    render: function() {

      console.log("============================>");
      console.log("document width is" + document.body.clientWidth);
      console.log("document height is" + document.body.clientHeight);
      console.log("lastHSlot" + this.state.lastHSlot.orig_coordinates[0]);
      console.log("lastVSlot" + this.state.lastVSlot.orig_coordinates[1]);


      
      var vHTMLSlots = this._createSlotLayouts(this.state.vSlots,
                                               this.state.lastHSlot,
                                               this.state.lastVSlot,
                                               this.state.selectedSlotIndex,
                                               this.state.selectedSlotIds
                                             );
      return(
              <div className="slotsFlexContainer">
                  {vHTMLSlots}
                  <div id="slotDisplayArea" className="slotDisplayArea">{"SLOT " + this.state.selectedSlotIds}</div>
              </div>
      );
    }
});

module.exports = MsuRackFlex;