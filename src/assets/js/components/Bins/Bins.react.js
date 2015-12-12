var React = require('react');
var Bin = require('./Bin.react');
var PutBackStore = require('../../stores/PutBackStore');

var Bins = React.createClass({
	 componentDidMount: function() {
        this._calculateAndSetBinDimensions(this.props.binsData["structure"]);
  	},
    render: function() {
    	console.log(this.props.binsData);
        var compData = this.props.binsData;
        return (
            	 <div className="bins">
            	 	{
            	 		(function(){
            	 			var l =[];        console.log(compData.structure);

            	 			for(var j = 0 ;j<compData.structure[0] ;j++){
            	 			var list = [];
            	 			var i = 0;
            	 			for( i = i ; i<compData.structure[1] ; i++){
            	 				list.push(<Bin binData={compData.ppsbin_list[j*compData.structure[1] + i]} />);
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
        var clientHeight = $('.bins').height();
        var clientWidth = $('.bins').width();
        console.log(clientHeight + " " + clientWidth);
        var boxSize = Math.min(clientHeight/dimension[0],clientWidth/dimension[1]);
        var myElements = document.querySelectorAll(".bin");
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.height = boxSize - 15 + "px";
            myElements[i].style.width = boxSize - 15 + "px";
        }
    }
});

module.exports = Bins;