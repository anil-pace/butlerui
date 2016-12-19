var React = require('react');
var Header = require('./Header');
var allresourceConstants = require('../constants/resourceConstants');

var BinMap = React.createClass({
	
	processData: function(){
		var data =  Object.assign({},(this.props.mapDetails || {}));
		var leftCol = document.createElement("ul"),midCol,rightCol=document.createElement("ul");
		for(var  k in data){
			if(data.hasOwnProperty(k)){
				if(data[k] === allresourceConstants.BIN_GROUP_LEFT){
					leftCol.appendChild(document.createElement("li"))
				}
				else if(data[k] === allresourceConstants.BIN_GROUP_RIGHT){
					rightCol.appendChild(document.createElement("li"))
				}

			}
		}
		return {
			leftCol:leftCol,
			rightCol:rightCol
		}
	},
	render:function(){		
		
		var mapStructure = this.processData();	
		
		return (
				<div className="binMapWrapper">
					<div className="mapCont">
					<div className="col1">
					{mapStructure.leftCol}
					</div>
					<div className="col2">
					</div>
					<div className="col3">
					{mapStructure.rightCol}
					</div>
					</div>
				</div>
						
					
				
			);
	}
});

module.exports = BinMap;