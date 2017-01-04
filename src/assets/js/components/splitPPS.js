var React = require('react');
var allresourceConstants = require('../constants/resourceConstants');

var SplitPPS = React.createClass({
	
	processData: function(){
		var data =  Object.assign({},(this.props.mapDetails || {}));
		var leftCol = [],leftColCount,rightColCount,selectedGroup = this.props.selectedGroup,isSelected,rightCol=[];
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
		switch(leftCol.length){
			case 1:
			leftColCount = "one";
			break;
			case 2:
			leftColCount = "two";
			break;
			case 3:
			leftColCount = "three";
			break;
			case 4:
			leftColCount = "four";
			break;
			default:
			leftColCount = "zero";
		}
		switch(rightCol.length){
			case 1:
			rightColCount = "one";
			break;
			case 2:
			rightColCount = "two";
			break;
			case 3:
			rightColCount = "three";
			break;
			case 4:
			rightColCount = "four";
			break;
			default:
			rightColCount = "zero";
		}

		return {
			leftCol:leftCol,
			rightCol:rightCol,
			leftColCount:leftColCount,
			rightColCount:rightColCount
		}
	},
	render:function(){		
		
		//var mapStructure = this.processData();	
		
		return (
				<div className="splitPPSWrapper">
					<div className="mapCont">
					<div className={"col1 three"}>
					<ul>
					<li className="spriteIcons">
					<span className="docked spriteIcons"></span>
					</li>
					<li className="spriteIcons"><span className="undock left spriteIcons"></span></li>
					<li className="spriteIcons"></li>
					</ul>
					</div>
					<div className="col2 spriteIcons">
					</div>
					<div className={"col3 three"}>
					<ul>
					<li className="spriteIcons"><span className="undock right spriteIcons"></span></li>
					<li className="spriteIcons"></li>
					<li className="spriteIcons"></li>
					</ul>
					</div>
					</div>
				</div>
						
					
				
			);
	}
});

module.exports = SplitPPS;