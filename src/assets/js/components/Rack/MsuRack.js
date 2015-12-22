var React = require('react');
var RackRow = require('./RackRow');


var MsuRack = React.createClass({
	render: function(){

        var rackDetails = this.props.rackData.rack_type_rec;
        var compartment_details = this.props.rackData.slot_barcodes;
        var slotStart,slotEnd,i;
        var slotIndexList = [];
        var eachRow =[];
        if(compartment_details.length === 1){
            slotStart = (compartment_details[0].split(".")[3])%10;
            slotEnd = (compartment_details[0].split(".")[3])%10;
            selectedRackRow =compartment_details[0].split(".")[2]; 
        }
        else if(compartment_details.length === 2){
            slotStart = (compartment_details[0].split(".")[3])%10;
            slotEnd = (compartment_details[1].split(".")[3])%10;
            selectedRackRow =compartment_details[0].split(".")[2]; 
        }
        else {
        }
        
        for (i = slotStart; i <= slotEnd; i++) {
            slotIndexList.push(i);
        };

        var rackRange = selectedRackRow;
       
        
        eachRow = rackDetails.map(function(row,index){
            if(row[0] == selectedRackRow)
                return (
                        <RackRow slots={row[1]} key={index} slotIndexArray={slotIndexList} rackRange={rackRange} />
                    );

            else
                return (
        				<RackRow slots={row[1]} key={index} rackRange={rackRange} />
        			);
        	});


		return (
				<div className="drawRack">
					{eachRow.reverse()}
				</div>
			);
	}
});

module.exports = MsuRack;