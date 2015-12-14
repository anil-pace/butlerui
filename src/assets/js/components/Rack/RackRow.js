var React = require('react');
var RackSlot = require('./RackSlot');


var RackRow = React.createClass({
	render: function(){
		
		var rackRange = this.props.rackRange;
		var slotIndexArray = this.props.slotIndexArray;
		var slotData = this.props.slots;
		var eachSlot =[];		
		
		eachSlot = slotData.map(function(slot,index){
			if(slotIndexArray!==undefined  && slotIndexArray.indexOf(index+1) >= 0)
			return(
					<RackSlot selectedSlot={true} slotHeightData={slot[1]} slotWidthData={slot[0]} slotWidthDataLength={slot[0].length} key={index} slotIndexArrays={slotIndexArray} rackRange={rackRange} />
				);
			else
				return(
					<RackSlot slotHeightData={slot[1]} slotWidthData={slot[0]} slotWidthDataLength={slot[0].length} slotIndexArrays={slotIndexArray} key={index} rackRange={rackRange} />
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