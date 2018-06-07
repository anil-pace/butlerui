var React = require('react');
var allresourceConstants = require('../constants/resourceConstants');

var SplitPPS = React.createClass({
	
	processData: function(){
		var data =  Object.assign({},(this.props.groupInfo || {}));
		var leftCol = [],dockedGroup = this.props.docked||[],
		undockAwaited = this.props.undockAwaited||[],
		wrongUndock=this.props.wrongUndock||[]
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
			width:(maxBlockHeight/100)*360
		}
		for(var  k in data){
			if(data.hasOwnProperty(k)){
				
				if(data[k] === allresourceConstants.BIN_GROUP_LEFT){

					if(dockedGroup.indexOf(k) >= 0){
						leftCol.push(<li  key={k} style={style} className="dockedCont">
							<span  className="docked"></span>
							</li>);
					}
					else if(undockAwaited.indexOf(k) >= 0){
						leftCol.push(<li key={k} style={style} className="undockedCont">
							<span  className="undock left"></span>
							</li>);
					}
					else if(wrongUndock.indexOf(k) >= 0){
						leftCol.push(<li key={k} style={style} className="wrongUndockCont">
							<span   className="wrongUndock left"></span>
							</li>);
					}
					else{
						leftCol.push(<li key={k} style={style} ></li>);
					}
					
				}
				else if(data[k] === allresourceConstants.BIN_GROUP_RIGHT){
					if(dockedGroup.indexOf(k) >= 0){
						rightCol.push(<li key={k} style={style} className="dockedCont">
							<span className="docked"></span>
							</li>);
					}
					else if(undockAwaited.indexOf(k) >= 0){
						rightCol.push(<li key={k} style={style} className="undockedCont">
							<span className="undock right"></span>
							</li>);
					}else if(wrongUndock.indexOf(k) >= 0){
						rightCol.push(<li key={k} style={style} className="wrongUndockCont">
							<span  className="wrongUndock right"></span>
							</li>);
					}
					else{
						rightCol.push(<li key={k} style={style} ></li>);
					}
					
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
		var orientation = Number(this.props.orientation || 0);
		var transformStyle = {
			transform: 'rotate('+((orientation+'deg)'))
		}
		var textTransform = {
			transform: 'rotate('+(((orientation > 90 ? 180 : 0)+'deg)'))
		}
		
		return (
				<div className="splitPPSWrapper" style={transformStyle}>
					<div className="mapCont">
					<div className="msuSpace"  style={textTransform}>{_("MSU")}</div>
					<div className={"col1 three"}>
					<ul>
					{mapStructure.leftCol}
					</ul>
					</div>
					<div className="col2 spriteIcons">
					</div>
					<div className={"col3 three"}>
					<ul>
					{mapStructure.rightCol}
					</ul>
					</div>
					</div>
				</div>
						
					
				
			);
	}
});

module.exports = SplitPPS;