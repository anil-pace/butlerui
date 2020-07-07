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
								<div style={{"marginLeft": "15%", "letterSpacing": "5px"}}>{_("All the bins are")} </div>
								<div style={{"marginLeft": "15%", "letterSpacing": "5px"}}>{_("currently facing")} </div>
								<div style={{"marginLeft": "22.5%", "letterSpacing": "5px"}}>{_("some issue.")} </div>
								<div style={{"marginTop": "10%", "letterSpacing": "5px"}}>{_("Please contact support.")} </div>
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