var React = require('react');
var SingleSlot = require('./SingleSlot');


var RackSlot = React.createClass({
	render : function(){
		var rackRange = this.props.rackRange;
		slotIndexArrays = this.props.slotIndexArrays;
		//selectedSlotStatus = this.props.selectedSlot;
		//console.log('slotWidthData' + this.props.slotWidthData);
		//console.log('slotWidthDataLength' + this.props.slotWidthDataLength);
		//var calculateWidth = 3.66*this.props.slotWidthDataLength;
		var calculateWidth = 4.2*this.props.slotWidthDataLength; 
		 var calculateHeight = this.props.slotHeightData;
		var slotWidth = {
				width : calculateWidth + 'vw',
				height : calculateHeight/5.5 + "vh",
			};
		
		
		var singleSlot = this.props.slotWidthData.map(function(singSlot,index){
			if(slotIndexArrays!==undefined && slotIndexArrays.indexOf(singSlot%10) >= 0)
				return(
						<SingleSlot selected={true} key={singSlot} rackRange={rackRange} index={singSlot%10} />
					);
				else
				return(
						<SingleSlot key={index} rackRange={rackRange} />
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