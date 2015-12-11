var React = require('react');
var SingleSlot = require('./SingleSlot');


var RackSlot = React.createClass({
	render : function(){

		console.log(this.props.selectedSlot);
		console.log("slotIndexArrays rackrow " + this.props.slotIndexArrays);
		slotIndexArrays = this.props.slotIndexArrays;
		//selectedSlotStatus = this.props.selectedSlot;
		//console.log('slotWidthData' + this.props.slotWidthData);
		//console.log('slotWidthDataLength' + this.props.slotWidthDataLength);
		 var calculateWidth = 3.66*this.props.slotWidthDataLength;
		 var calculateHeight = this.props.slotHeightData;
		var slotWidth = {
				width : calculateWidth + 'vw',
				height : calculateHeight/5.5 + "vh",
			};
			console.log("slotWidth " + slotWidth.width);
		
		var singleSlot = this.props.slotWidthData.map(function(singSlot,index){
			if(slotIndexArrays!==undefined && slotIndexArrays.indexOf(singSlot%10) >= 0)
				return(
						<SingleSlot selected={true} key={index} />
					);
				else
				return(
						<SingleSlot key={index} />
					);
			
		});

		return (
			<div className="rackSlot" style={slotWidth} >
				{singleSlot}
			</div>
			);
	}
});

module.exports = RackSlot ;