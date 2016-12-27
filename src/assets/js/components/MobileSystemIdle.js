var React = require('react');
var mainstore = require('../stores/mainstore');
var SystemIdleHeader = require('./SystemIdleHeader');
var SplitPPS = require('./SplitPPS');
function getState(){
		return {
	      dockedGroup :mainstore.getDockedGroup(),
    	  undockedAwaited:mainstore.getUndockAwaitedGroup()
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
					<SplitPPS />
			</div>
		)
	}
});
module.exports = MobileSystemIdle;
