var React = require('react');
var Header = require('./Header');
var allresourceConstants = require('../constants/resourceConstants');

var CurrentSlot = React.createClass({
	render:function(){
		return (
				<div className="currentSlotWrapper">
					<div className="slotRange">	A1- A6 </div>
					<div className="slotFooter"> {allresourceConstants.CURR_SLOT} </div>
				</div>
						
					
				
			);
	}
});

module.exports = CurrentSlot;