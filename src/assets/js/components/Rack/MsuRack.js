var React = require('react');
var RackRow = require('./RackRow');


var MsuRack = React.createClass({
	render: function(){

         /*"compartment_details": [
            "005.1.B.01", 
            "005.1.B.03"
        ], */

		/*var rackDetails = [

            [
                "A", 
                [
                    [
                        [
                            "01", 
                            "02", 
                            "03", 
                            "04", 
                            "05", 
                            "06"
                        ], 
                        30, 
                        48
                    ]
                ]
            ], 
            [
                "B", 
                [
                    [
                        [
                            "01", 
                            "02", 
                            "03", 
                            "04", 
                            "05", 
                            "06"
                        ], 
                        30, 
                        48
                    ]
                ]
            ], 
            [
                "C", 
                [
                    [
                        [
                            "01", 
                            "02", 
                            "03", 
                            "04", 
                            "05", 
                            "06"
                        ], 
                        30, 
                        48
                    ]
                ]
            ], 
            [
                "D", 
                [
                    [
                        [
                            "01", 
                            "02", 
                            "03", 
                            "04", 
                            "05", 
                            "06"
                        ], 
                        30, 
                        48
                    ]
                ]
            ], 
            [
                "E", 
                [
                    [
                        [
                            "01", 
                            "02", 
                            "03", 
                            "04", 
                            "05", 
                            "06"
                        ], 
                        30, 
                        48
                    ]
                ]
            ]
        ];*/
        

        var rackDetails = [

           [
                "A", 
                [
                    [
                        [
                            "01", 
                            "02",
                            "03", 
                            "04"
                        ], 
                        100, 
                        48
                    ], 
                    [
                        [
                            "05", 
                            "06"
                        ], 
                        100, 
                        48
                    ]
                ]
            ], 
            [
                "B", 
                [
                    [
                        [
                            "01", 
                            "02"
                        ], 
                        25, 
                        48
                    ], 
                    [
                        [
                            "03", 
                            "04"
                        ], 
                        25, 
                        48
                    ], 
                    [
                        [
                            "05", 
                            "06"
                        ], 
                        25, 
                        48
                    ]
                ]
            ],
            [
                "C", 
                [
                    [
                        [
                            "01", 
                            "02",
                            "03"
                        ], 
                        110, 
                        48
                    ], 
                    [
                        [
                            
                            "04"
                        ], 
                        110, 
                        48
                    ], 
                    [
                        [
                            "05", 
                            "06"
                        ], 
                        110, 
                        48
                    ]
                ]
            ]
        
        ];

/*          var a = "005.1.B.01";
        var b = a.split(".")[3];
        alert(b%10);
*/
        var compartment_details = [
                "005.1.B.01", 
                "005.1.B.05"
            ];

        var slotStart;
        var slotEnd;

        if(compartment_details.length === 1){
            slotStart = (compartment_details[0].split(".")[3])%10;
            selectedRackRow =compartment_details[0].split(".")[2]; 
        }
        else if(compartment_details.length === 2){
            slotStart = (compartment_details[0].split(".")[3])%10;
            slotEnd = (compartment_details[1].split(".")[3])%10;
            selectedRackRow =compartment_details[0].split(".")[2]; 
        }
        else {
            console.log('No Slots to be highlited!!!');
        }
        var slotIndexList = [];
        for (var i = slotStart; i <= slotEnd; i++) {
            slotIndexList.push(i);
        };
        //eachSlot={this.state.eachSlot}
        //console.log("rackDetails = " + rackDetails[0][1].length);
        var eachRow =[];
        
        eachRow = rackDetails.map(function(row,index){
            if(row[0] == selectedRackRow)
                return (
                        <RackRow slots={row[1]} key={index} slotIndexArray={slotIndexList} selectedRackRow ={true} />
                    );

            else
                return (
        				<RackRow slots={row[1]} key={index}  />
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