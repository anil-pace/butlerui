var React = require('react');
var Header = require('./Header');
var allresourceConstants = require('../constants/resourceConstants');
var Footer = require('./Footer');
var mainstore = require('../stores/mainstore');

var SystemIdle = React.createClass({
	render:function(){
		var isAllPpsBlocked = mainstore.getAllPpsBlocked();
		var footer = mainstore.getGamificationUrl() ? <Footer /> : ""
		return (
				<div className="systemIdle">
					<Header />
					{isAllPpsBlocked ? 
						(<div className="idleScreen">
							<div className="ppsBlocked">
							<span>{_("All the bins are")} </span>
							<span>{_("currently facing")} </span>
							<br></br>
							<span>{_("some issue.")} </span>
							<br></br>
							<span>{_("Please contact support.")} </span>
							</div>
						</div>) 
						:
						(
						<div className="idleScreen">
							{_(allresourceConstants.SYS_IDLE)}
						</div>
						)
					}
					{footer}
				</div>
			);
	}
});

module.exports = SystemIdle;