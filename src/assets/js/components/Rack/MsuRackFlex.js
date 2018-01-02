var React = require('react');
var MsuSlot = require('./MsuSlot');

var xyz = [
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "1",
    "orig_coordinate": [
      0,
      0
    ],
    "length": "1100",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      1,
      1
    ],
    "group_id": "1"
  },
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "6",
    "orig_coordinate": [
      1100,
      600
    ],
    "length": "670",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      2,
      1
    ],
    "group_id": "1"
  },
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "2",
    "orig_coordinate": [
      1100,
      0
    ],
    "length": "670",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      1,
      2
    ],
    "group_id": "1"
  },
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "7",
    "orig_coordinate": [
      1770,
      600
    ],
    "length": "670",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      2,
      2
    ],
    "group_id": "1"
  },
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "3",
    "orig_coordinate": [
      1770,
      0
    ],
    "length": "670",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      1,
      3
    ],
    "group_id": "1"
  },
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "8",
    "orig_coordinate": [
      2440,
      600
    ],
    "length": "670",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      2,
      3
    ],
    "group_id": "1"
  },
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "4",
    "orig_coordinate": [
      2440,
      0
    ],
    "length": "670",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      1,
      4
    ],
    "group_id": "1"
  },
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "9",
    "orig_coordinate": [
      3110,
      600
    ],
    "length": "670",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      2,
      4
    ],
    "group_id": "1"
  },
  {
    "breadth": "710",
    "direction": "left",
    "bin_info": [],
    "ppsbin_id": "5",
    "orig_coordinate": [
      3110,
      0
    ],
    "length": "670",
    "selected_state": false,
    "ppsbin_state": "empty",
    "ppsbin_count": "0",
    "coordinate": [
      1,
      5
    ],
    "group_id": "1"
  }
];

var MsuRackFlex = React.createClass({

    getInitialState: function(){
        return this._sortBins(xyz,false);
    },
    componentWillReceiveProps: function() {
        this._sortBins(xyz,true);
    },

      _sortBins:function (aBins,shouldSetState){
         if (!aBins || (aBins.constructor !== Array && aBins.length < 1)){
            //no bins found
            return;
         }

        var totalBins = aBins.length;
        var totalWidth =0, totalHeight=0, lastHBin = {}, lastVBin={};


        lastHBin = aBins.reduce(function(oBinPrev,oBinCurr, index){
            //console.log("==============================>");
            //console.log(index);
            if (oBinPrev.orig_coordinate[0] < oBinCurr.orig_coordinate[0]){
                return oBinCurr;
            }else if (oBinPrev.orig_coordinate[0] === oBinCurr.orig_coordinate[0]){
                return oBinCurr;
            }else{
                return oBinPrev;
            }
        });
        //console.log(lastHBin);
        lastVBin = aBins.reduce(function(oBinPrev,oBinCurr, index){
            //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$>");
            //console.log(index);
            if (oBinPrev.orig_coordinate[1] < oBinCurr.orig_coordinate[1]){
                return oBinCurr;
            }else if (oBinPrev.orig_coordinate[1] === oBinCurr.orig_coordinate[1]){
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
            });
        }
        else{
            return{
                 aBins:aBins,
                lastHBin:lastHBin,
                lastVBin: lastVBin
            }
        }
    },

    _createBinLayouts: function(aBins, lastHBin, lastVBin,  seatType, screenId) {
        if ((aBins.constructor !== Array && aBins.length < 1) || !(lastHBin.length) || !(lastVBin.length)){
            //no bins found
            return;
         }
         var aHTMLBins =[];
         // since the total width would be 100% but the bins would be divided into
         // ratios, hence each of the bin would have to have the factor into % of the
         // .bins container.
         // for reference orig_coordinate[0] === x axis and orig_coordinate[1] === y axis
         var horFactor = parseFloat(100/(Number(lastHBin.orig_coordinate[0]) + Number(lastHBin.length)));
         var vertFactor = parseFloat(100/(Number(lastVBin.orig_coordinate[1]) + Number(lastVBin.breadth)));

         var totalPpsWidth = Number(lastHBin.orig_coordinate[0]) + Number(lastHBin.length)


         for (var i =0; i<aBins.length ;i++){
                var binWidth = aBins[i].length * horFactor +'%';
                var binHeight = aBins[i].breadth * vertFactor +'%';
                var ileft=0;
                var itop=0;

                // if the seat type is front then we have to modify the x co-ordinate as per the formula:
                // the new x coordinate of a ppsbin is (Total length of pps - xcoordinate - length of bin)

                ileft = (seatType ==='back')? (aBins[i].orig_coordinate[0] * horFactor +'%'):
                    (totalPpsWidth - aBins[i].orig_coordinate[0] - aBins[i].length) * horFactor +'%';
                itop = aBins[i].orig_coordinate[1] * vertFactor+'%';
                
                  aHTMLBins.push(
                                   <div className="bin-container"
                                      style={{
                                        width: binWidth,
                                        height:binHeight,
                                        top: itop,
                                        left:ileft,
                                        border: "1px solid grey"
                                      }}>
                                      <MsuSlot binData={aBins[i]} screenId={screenId} />
                                   </div>
                                   )
              }
        return aHTMLBins;
    },

    render: function() {
        var aHTMLBins = this._createBinLayouts(this.state.aBins,
                                               this.state.lastHBin,
                                               this.state.lastVBin,

                                               this.props.seatType,

                                               this.props.screenId
                                               );
        var self = this;
        return (
                 <div className="bins-flex" style={{width:document.body.clientWidth/1.7, height:document.body.clientHeight/2, border: "1px solid grey"}}>
                        {aHTMLBins}
                 </div>
        );
    }
});

module.exports = MsuRackFlex;
