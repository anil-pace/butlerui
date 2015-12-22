var React = require('react');

var SingleSlot = React.createClass({
	render : function(){
		var rackRange = this.props.rackRange;
		var slotId = this.props.index;
		
		return (
			<div className={"singleslot " + (this.props.selected ? 'activeSlot' : '')}  >
				{this.props.selected ? rackRange + slotId : ''}
			</div>
			);
	}
});

module.exports = SingleSlot ;