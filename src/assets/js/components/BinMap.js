var React = require('react');
var allresourceConstants = require('../constants/resourceConstants');

var BinMap = React.createClass({

	processData: function(){
		var data =  Object.assign({},(this.props.mapDetails || {}));
		var leftCol = [],leftColCount,rightColCount,selectedGroup = this.props.selectedGroup,isSelected,
		rightCol=[],maxBlockCount=0,maxLeftCount=0,maxRightCount=0,maxBlockHeight=0,style=null;
		
		for(var  key in data){
			if(data[key] === allresourceConstants.BIN_GROUP_LEFT){
				maxLeftCount++;
			}
			else if(data[key] === allresourceConstants.BIN_GROUP_RIGHT){
				maxRightCount++;
			}
		}
		maxBlockCount = maxLeftCount > maxRightCount ? maxLeftCount :maxRightCount;
		maxBlockHeight = 70/maxBlockCount;
		style = {
			height:maxBlockHeight+"%",
			width:(maxBlockHeight/100)*160
		}

		for(var  k in data){
			if(data.hasOwnProperty(k)){
				isSelected = selectedGroup === k ? "sel" : "";
				if(data[k] === allresourceConstants.BIN_GROUP_LEFT){
					leftCol.push(<li key={k} style={style} className={isSelected}></li>);
				}
				else if(data[k] === allresourceConstants.BIN_GROUP_RIGHT){
					rightCol.push(<li key={k} style={style} className={isSelected}></li>);
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

		var mapStructure = this.processData();
		return (
				<div className={"binMapWrapper "+this.props.screenClass}>
					<div className="mapCont">
					<div className="msuSpace"></div>
					<div className={"col1 "+mapStructure.leftColCount}>
					<ul>
					{mapStructure.leftCol}
					</ul>
					</div>
					<div className="col2 spriteIcons">
					</div>
					<div className={"col3 "+mapStructure.rightColCount}>
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
