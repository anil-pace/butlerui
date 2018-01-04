var React = require('react');
var MsuSlot = require('./MsuSlot');

var lastSlot = {
  flexBasis:"4vh"
};

var xyz = [
  {
    "height": "710",
    "orig_coordinates": [
      0,
      0
    ],
    "length": "1100",
  },
  {
    "height": "710",
    "orig_coordinates": [
      1100,
      600
    ],
    "length": "670",
  },
  {
    "height": "710",
    "orig_coordinates": [
      1100,
      0
    ],
    "length": "670",
  },
  {
    "height": "710",
    "orig_coordinates": [
      1770,
      600
    ],
    "length": "670",
  },
  {
    "height": "710",
    "orig_coordinates": [
      1770,
      0
    ],
    "length": "670",
  },
  {
    "height": "710",
    "orig_coordinates": [
      2440,
      600
    ],
    "length": "670",
  },
  {
    "height": "710",
    "orig_coordinates": [
      2440,
      0
    ],
    "length": "670",
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
            if (oBinPrev.orig_coordinates[0] < oBinCurr.orig_coordinates[0]){
                return oBinCurr;
            }else if (oBinPrev.orig_coordinates[0] === oBinCurr.orig_coordinates[0]){
                return oBinCurr;
            }else{
                return oBinPrev;
            }
        });
        //console.log(lastHBin);
        lastVBin = aBins.reduce(function(oBinPrev,oBinCurr, index){
            //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$>");
            //console.log(index);
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
         // for reference orig_coordinates[0] === x axis and orig_coordinates[1] === y axis
         var horFactor = parseFloat(100/(Number(lastHBin.orig_coordinates[0]) + Number(lastHBin.length)));
         var vertFactor = parseFloat(100/(Number(lastVBin.orig_coordinates[1]) + Number(lastVBin.height)));

         var totalPpsWidth = Number(lastHBin.orig_coordinates[0]) + Number(lastHBin.length);
         var totalPpsHeight = Number(lastVBin.orig_coordinates[1]) + Number(lastVBin.height);


         for (var i =0; i<aBins.length ;i++){
                var binWidth = aBins[i].length * horFactor +'%';
                var binHeight = aBins[i].height * vertFactor +'%';
                var ileft=0;
                var itop=0;

                // if the seat type is front then we have to modify the x co-ordinate as per the formula:
                // the new x coordinate of a ppsbin is (Total length of pps - xcoordinate - length of bin)

                ileft = (seatType ==='back')? (aBins[i].orig_coordinates[0] * horFactor +'%'):
                    (totalPpsWidth - aBins[i].orig_coordinates[0] - aBins[i].length) * horFactor +'%';
                itop = (seatType ==='back')? (aBins[i].orig_coordinates[1] * vertFactor+'%'):
                    (totalPpsHeight - aBins[i].orig_coordinates[1] - aBins[i].height) * vertFactor +'%';
                
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
        var type = this.props.type;
        var aHTMLBins = this._createBinLayouts(this.state.aBins,
                                               this.state.lastHBin,
                                               this.state.lastVBin,

                                               this.props.seatType,

                                               this.props.screenId
                                               );
        var self = this;
        return (
                 <div className="bins-flex" style={{width:document.body.clientWidth/1.7, height:document.body.clientHeight/2, border: "5px solid grey"}}>
                        {aHTMLBins}
                        <div className="lastRow" style={{border: "1px solid red", top:"50%"}}></div>
                 </div>
        );
    }
});

module.exports = MsuRackFlex;
