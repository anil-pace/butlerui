var React = require("react");

var BoxSerial = React.createClass({
	render : function(){

		var boxList =["ABCCD123RT","A09976523RT","ABCCD1091253","ABCJDHSGET9465RT"];
		var eachBoxSerial = [];

		eachBoxSerial = boxList.map(function(row,index){
				return(
						<tr>
							<td>
								{(index+1) + ". " + row}
							</td>
						</tr>
					);
		});


		return (
				<div className="boxSerial">
					<table className="table">
						<thead>
							<div className="boxHeader">
								Box Serial Numbers
							</div>
						</thead>
						<tbody>
							{eachBoxSerial}
						</tbody>
					</table>
				</div>
			);
	}
});

module.exports  = BoxSerial;