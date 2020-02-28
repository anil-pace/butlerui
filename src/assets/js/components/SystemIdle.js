var React = require('react');
var Header = require('./Header');
var allresourceConstants = require('../constants/resourceConstants');
var Footer = require('./Footer');
var mainstore = require('../stores/mainstore');

var SystemIdle = React.createClass({
	render:function(){
		var footer = mainstore.getGamificationUrl() ? <Footer /> : ""
		return (
				<div className="systemIdle">
					<Header />
					<div className="idleScreen">
						{_(allresourceConstants.SYS_IDLE)}
					</div>
					{footer}
				</div>
			);
	}
});

module.exports = SystemIdle;