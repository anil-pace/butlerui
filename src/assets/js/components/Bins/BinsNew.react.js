var React = require('react');
var Bin = require('./Bin.react');
var PutBackStore = require('../../stores/PutBackStore');

var BinsNew = React.createClass({
	componentDidMount: function() {
        this._calculateAndSetBinDimensions(this.props.binsData["structure"]);
  	},
    _findCoordinatesIndex:function(x,y){
        var i = 0;
        this.props.binsData.ppsbin_list.map(function(value,index){
            if(value.orig_coordinate[0]==x && value.orig_coordinate[1]==y){
                i=index;
                return ;
            }
        });
        return i;
    },
    render: function() {
        this._calculateAndSetBinDimensions(this.props.binsData["structure"]);
        var compData = this.props.binsData; 
        var scrnId = this.props.screenId;
        var self = this;
        return (
            	 <div className="bins">
            	 	{
            	 		(function(){
            	 			var l =[],list=[];
                            var n1=0,n2=0,k,x,y=0,j;
                            while(n1<compData.structure[0])
                            {
                                list=[];
                                x=0;
                                j=y;
                                n2=0;
                                while(n2<compData.structure[1])
                                {
                                    k=self._findCoordinatesIndex(x,j);
                                    console.log('For index ',x,',',j,'=',k);
                                    list.push(<Bin binData={compData.ppsbin_list[k]} screenId={scrnId} />);
                                    if(x=='0' && j=='0')
                                    {
                                        y+=parseInt(compData.ppsbin_list[k].length);
                                        console.log('Incrementing length by ',y);
                                    }
                                    x+=parseInt(compData.ppsbin_list[k].breadth);
                                    n2++;
                                }
                                l.push((
                                        <div className="bin-row">
                                        {list}
                                        </div>
                                ));
                                n1++;
                            } 
            	 		return l;
            	 		})()
            	 	}
            	 </div>
        );
    },

    _calculateAndSetBinDimensions: function(dimension){
        var myElements = document.querySelectorAll(".bin");
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.height = 0 + "px";
            myElements[i].style.width = 0 + "px";
        }
        var clientHeight = $('.bins').height();
        var clientWidth = $('.bins').width();
        var boxSize = Math.min(clientHeight/dimension[0],clientWidth/dimension[1]);
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.height = boxSize + "px";
            myElements[i].style.width = boxSize + "px";
        }
    }
});

module.exports = BinsNew;