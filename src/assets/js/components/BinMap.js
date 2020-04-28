var React = require('react');
var allresourceConstants = require('../constants/resourceConstants');

var BinMap = React.createClass({

	processData: function(){
		var data =  Object.assign({},(this.props.mapDetails || {}));
		var bindata = this.props.bindata ? this.props.bindata.ppsbin_list : {};
		var pickFrontSelectedBin = this.props.pickFrontSelectedBin ? this.props.pickFrontSelectedBin.ppsbin_list[0].ppsbin_id : '';
		var leftCol = [],leftColCount,rightColCount,selectedGroup = this.props.selectedGroup,isSelected,
		rightCol=[],maxBlockCount=0,maxLeftCount=0,maxRightCount=0,maxBlockHeight=0,style=null,maxWidth=null;
		
		if(Object.entries(bindata).length > 0 ){
			for(var  k in bindata){
			if(bindata[k].direction === allresourceConstants.BIN_GROUP_LEFT || bindata[k].direction === allresourceConstants.BIN_CENTER_LEFT){
				maxLeftCount++;
			}
			else if(bindata[k].direction === allresourceConstants.BIN_GROUP_RIGHT || bindata[k].direction === allresourceConstants.BIN_CENTER_RIGHT){
				maxRightCount++;
			}}}

		maxBlockCount = maxLeftCount > maxRightCount ? maxLeftCount :maxRightCount;
		maxBlockHeight = 40/maxBlockCount;
		maxWidth = ((maxBlockHeight/100)*150);

		style = {
				height:maxBlockHeight<= 105 ? 105 +"px" : height,
				width: maxWidth <= 38 ? 38 : maxWidth
				}

		if(Object.entries(bindata).length > 0 ){
		for(let i=0; i<bindata.length; i++){
				if((bindata[i].direction === allresourceConstants.BIN_GROUP_LEFT  && bindata[i].ppsbin_id === pickFrontSelectedBin) || (bindata[i].direction === allresourceConstants.BIN_CENTER_LEFT && bindata[i].ppsbin_id === pickFrontSelectedBin)){
					leftCol.push(<li key={k} style={style} className={'sel'}></li>);
				}
				else if((bindata[i].direction === allresourceConstants.BIN_GROUP_RIGHT && bindata[i].ppsbin_id === pickFrontSelectedBin) || (bindata[i].direction === allresourceConstants.BIN_CENTER_RIGHT && bindata[i].ppsbin_id === pickFrontSelectedBin)){
					rightCol.push(<li key={k} style={style} className={'sel'}></li>);
				}
		}

		if(leftCol.length === 0){
			leftCol.push(<li  style={{height: "105px"}} className ={'col1Zero'}></li>);
		}
		else if(rightCol.length === 0){
			rightCol.push(<li style={{height: "105px"}} className={'col3Zero'} ></li>);
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
		var transformStyle = {
			transform: 'rotate('+((Number(this.props.orientation || 0)+'deg)'))
		}
		var mapStructure = this.processData();
		return (
				<div style={transformStyle} className={"binMapWrapper "+this.props.screenClass}>
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
