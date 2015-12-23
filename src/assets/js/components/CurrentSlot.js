var React = require('react');
var Header = require('./Header');

var CurrentSlot = React.createClass({
	render:function(){
		return (
				<div className="currentSlotWrapper">
					<div className="slotRange">	A1- A6 </div>
					<div className="slotFooter"> CURRENT SLOT </div>
				</div>
						
					
				
			);
	}
});

module.exports = CurrentSlot;