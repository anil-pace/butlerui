var React = require('react');
var Bin = require('./Bin.react');
var PutBackStore = require('../../stores/PutBackStore');

var Bins = React.createClass({
	componentDidMount: function() {
        console.log("did mount");
        this._calculateAndSetBinDimensions(this.props.binsData["structure"]);
  	},
    render: function() {
        console.log("render");
        this._calculateAndSetBinDimensions(this.props.binsData["structure"]);
        var compData = this.props.binsData;
        var scrnId = this.props.screenId;
        return (
            	 <div className="bins">
            	 	{
            	 		(function(){
            	 			var l =[];        
                            console.log(compData.structure);
            	 			for(var j = 0 ;j<compData.structure[0] ;j++){
            	 			var list = [];
            	 			var i = 0;
            	 			for( i = i ; i<compData.structure[1] ; i++){
            	 				list.push(<Bin binData={compData.ppsbin_list[j*compData.structure[1] + i]} screenId={scrnId} />);
            	 			}
            	 			l.push((
            	 				<div className="bin-row">
            	 					{list}
            	 				</div>
            	 				));
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
        console.log("ashu");
        var clientHeight = $('.bins').height();
        var clientWidth = $('.bins').width();
        console.log(clientHeight + " " + clientWidth);
        var boxSize = Math.min(clientHeight/dimension[0],clientWidth/dimension[1]);
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.height = boxSize - 15 + "px";
            myElements[i].style.width = boxSize - 15 + "px";
        }
    }
});

module.exports = Bins;