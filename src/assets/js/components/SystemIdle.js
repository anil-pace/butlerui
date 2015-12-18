var React = require('react');
var Header = require('./Header');

var SystemIdle = React.createClass({
	render:function(){
		return (
				<div className="systemIdle">
					<Header />
					<div className="idleScreen">
						
		  					System is Idle	
						
					</div>
				</div>
			);
	}
});

module.exports = SystemIdle;