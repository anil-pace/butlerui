var React = require('react');

var SingleSlot = React.createClass({
	render : function(){
		var rackRange = this.props.rackRange;
		var slotId = this.props.index;
		
		return (
			<div className={"singleslot " + (this.props.selected ? 'activeSlot' : '')}  >
				<h2>{this.props.selected ? rackRange + slotId : ''}</h2>
			</div>
			);
	}
});

module.exports = SingleSlot ;