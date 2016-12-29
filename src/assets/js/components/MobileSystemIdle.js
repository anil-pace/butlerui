var React = require('react');
var mainstore = require('../stores/mainstore');
var SystemIdleHeader = require('./SystemIdleHeader');
var SplitPPS = require('./SplitPPS');
function getState(){
		return {
	      dockedGroup :mainstore.getDockedGroup(),
    	  undockedAwaited:mainstore.getUndockAwaitedGroup(),
        groupInfo : mainstore.getBinMapDetails(),
        undockAwaited : mainstore.getUndockAwaitedDetails(),
        docked : mainstore.getDockedDetails()
  		}
}

var MobileSystemIdle = React.createClass({
	getInitialState: function(){
		return getState();
  	},
  	componentDidMount: function(){
    	mainstore.addChangeListener(this.onChange);
 	 },
  	componentWillMount: function(){
    	 mainstore.addChangeListener(this.onChange);
  	},
  	componentWillUnmount: function(){
    	mainstore.removeChangeListener(this.onChange);
  	},
  	onChange: function(){ 
  		if(this.refs.myRef){
   			this.setState(getState());
  		}
  	},
	render: function(){
		return (
			<div ref="myRef">
					<SystemIdleHeader />
					<SplitPPS groupInfo = {this.state.groupInfo} undockAwaited = {this.state.undockAwaited} docked = {this.state.docked}/>
			</div>
		)
	}
});
module.exports = MobileSystemIdle;
