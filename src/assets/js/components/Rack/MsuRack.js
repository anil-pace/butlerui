var React = require('react');
var RackRow = require('./RackRow');


var MsuRack = React.createClass({

     totalRackHeight: function(){
            var rackDetails = this.props.rackData.rack_type_rec;
            var totalHeight = 0;
            var eachRowHeight=[];
            var eachRowHeight = rackDetails.map(function(row,index){
                return row[1][0][1];
            });
            for(var i in eachRowHeight) { 
                totalHeight += eachRowHeight[i]; 
            }
               return totalHeight;
        },

        eachRowHeight: function(){
            var rackDetails = this.props.rackData.rack_type_rec;
            var eachRowHeight=[];
            var eachRowHeight = rackDetails.map(function(row,index){
                return row[1][0][1];
            });
            return eachRowHeight;
        },

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
        var totalRackHeight = this.totalRackHeight(); 
        var eachRowHeight = this.eachRowHeight();
        
        
        eachRow = rackDetails.map(function(row,index){
            if(row[0] == selectedRackRow)
                return (
                        <RackRow slots={row[1]} key={index} slotIndexArray={slotIndexList} rackRange={rackRange} noOfRows={rackDetails.length} totalRackHeight={totalRackHeight} eachRowHeight={eachRowHeight} />
                    );

            else
                return (
        				<RackRow slots={row[1]} key={index} rackRange={rackRange} noOfRows={rackDetails.length} totalRackHeight={totalRackHeight} eachRowHeight={eachRowHeight} />
        			);
        	});


		return (
				<div className="drawRack">
					{eachRow.reverse()}
                    <div className="lastRow"></div>
				</div>
			);
	}
});

module.exports = MsuRack;