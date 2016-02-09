var React = require('react');
var SingleSlot = require('./SingleSlot');


var RackSlot = React.createClass({
	render : function(){
		var rackRange = this.props.rackRange;
		var slotIndexArrays = this.props.slotIndexArrays;
		var totalRackHeight = this.props.totalRackHeight;
		var noOfRows = this.props.noOfRows;
		var calculateWidth = 100/*/this.props.slotWidthDataLength*/; 
		var type = this.props.type;
		var slotColor = this.props.slotColor;
		//var calculateHeight = this.props.slotHeightData;
		var slotWidth = {
				width : calculateWidth + '%',
				//height : calculateHeight/4 + "vh",
			};
		
		
		var singleSlot = this.props.slotWidthData.map(function(singSlot,index){
			if(slotIndexArrays!==undefined && slotIndexArrays.indexOf(singSlot%10) >= 0)
				return(
						<SingleSlot slotColor={slotColor} selected={true} key={singSlot} rackRange={rackRange} index={singSlot%10} type={type} />
					);
				else
				return(
						<SingleSlot slotColor={slotColor} key={index} rackRange={rackRange} type={type} />
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