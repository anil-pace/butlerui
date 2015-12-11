var React = require('react');
var RackSlot = require('./RackSlot');


var RackRow = React.createClass({
	render: function(){
		
		
		var slotIndexArray = this.props.slotIndexArray;
				
		/*var arr = new Array();var obj;
		function include(arr, obj) {
    		for(var i=0; i<arr.length; i++) {
        	if (arr[i] == obj) return true;
    			};
			};*/


		var slotData = this.props.slots;
		
		var eachSlot =[];
		eachSlot = slotData.map(function(slot,index){
			//console.log("Slot Height " + slotData[index][1]);

			if(slotIndexArray!==undefined  && slotIndexArray.indexOf(index+1) >= 0)
			return(
					<RackSlot selectedSlot={true} slotHeightData={slot[1]} slotWidthData={slot[0]} slotWidthDataLength={slot[0].length} key={index} slotIndexArrays={slotIndexArray} />
				);
			else
				return(
					<RackSlot slotHeightData={slot[1]} slotWidthData={slot[0]} slotWidthDataLength={slot[0].length} slotIndexArrays={slotIndexArray} key={index} />
					);
		});

		return (
				<div className="rackRow">
					{eachSlot}
				</div>
			);
	}
});

module.exports = RackRow;