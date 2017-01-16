var React = require('react');
var allresourceConstants = require('../constants/resourceConstants');

var SplitPPS = React.createClass({
	
	processData: function(){
		var data =  Object.assign({},(this.props.groupInfo || {}));
		var leftCol = [],dockedGroup = this.props.docked,
		undockAwaited = this.props.undockAwaited,
		rightCol=[];
		for(var  k in data){
			if(data.hasOwnProperty(k)){
				
				if(data[k] === allresourceConstants.BIN_GROUP_LEFT){
					if(dockedGroup.indexOf(k) >= 0){
						leftCol.push(<li key={k} className={"spriteIcons"}>
							<span className="docked spriteIcons"></span>
							</li>);
					}
					else if(undockAwaited.indexOf(k) >= 0){
						leftCol.push(<li key={k} className={"spriteIcons"}>
							<span className="undock left spriteIcons"></span>
							</li>);
					}
					else{
						leftCol.push(<li key={k} className={"spriteIcons"}></li>);
					}
					
				}
				else if(data[k] === allresourceConstants.BIN_GROUP_RIGHT){
					if(dockedGroup.indexOf(k) >= 0){
						rightCol.push(<li key={k} className={"spriteIcons"}>
							<span className="docked spriteIcons"></span>
							</li>);
					}
					else if(undockAwaited.indexOf(k) >= 0){
						rightCol.push(<li key={k} className={"spriteIcons"}>
							<span className="undock right spriteIcons"></span>
							</li>);
					}
					else{
						rightCol.push(<li key={k} className={"spriteIcons"}></li>);
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
		
		return (
				<div className="splitPPSWrapper">
					<div className="mapCont">
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