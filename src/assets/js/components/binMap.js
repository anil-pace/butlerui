var React = require('react');
var allresourceConstants = require('../constants/resourceConstants');

var BinMap = React.createClass({
	
	processData: function(){
		var data =  Object.assign({},(this.props.mapDetails || {}));
		var leftCol = [],selectedGroup = this.props.selectedGroup,isSelected,rightCol=[];
		for(var  k in data){
			if(data.hasOwnProperty(k)){
				isSelected = selectedGroup === k ? "sel" : "";
				if(data[k] === allresourceConstants.BIN_GROUP_LEFT){
					leftCol.push(<li key={k} className={isSelected}></li>);
				}
				else if(data[k] === allresourceConstants.BIN_GROUP_RIGHT){
					rightCol.push(<li key={k} className={isSelected}></li>);
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
					<ul>
					{mapStructure.leftCol}
					</ul>
					</div>
					<div className="col2">
					</div>
					<div className="col3">
					<ul>
					{mapStructure.rightCol}
					</ul>
					</div>
					</div>
				</div>
						
					
				
			);
	}
});

module.exports = BinMap;