var React = require('react');

var SingleSlot = React.createClass({
	render : function(){

		
		return (
			<div className={"singleslot " + (this.props.selected ? 'activeSlot' : '')}  >
			</div>
			);
	}
});

module.exports = SingleSlot ;