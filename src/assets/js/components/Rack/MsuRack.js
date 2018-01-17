var React = require('react');
var RackRow = require('./RackRow');
var DrawerRow = require('./DrawerRow');
var MsuRackFlex = require('./MsuRackFlex');

// var drawRackStyle = {
//     flexGrow:"1",
//     flexBasis:"0",
//     width:"50%"};

// var lastSlot = {
//     flexBasis:"4vh"};

var MsuRack = React.createClass({

	render: function(){
		return (
				<div className="drawRackWrapper">
                    <MsuRackFlex rackDetails={this.props.rackData.rack_type_rec} slotBarcodes={this.props.rackData.slot_barcodes} rackWidth={this.props.rackData.rack_width} />
                </div>
			);
	}
});

module.exports = MsuRack;