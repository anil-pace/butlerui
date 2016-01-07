var React = require('react');
var Header = require('./Header');
var allresourceConstants = require('../constants/resourceConstants');

var ReconcileStatus = React.createClass({
	render:function(){		
				
		
		return (
				<div className="reconcileWrapper">
					<div className="reconcileStatus"> {allresourceConstants.NO_RECONCILE} </div>
					<div className="reconcileAction"> Please Place The Box Back in Slot A1 </div>					
				</div>
				
					
				
			);
	}
});

module.exports = ReconcileStatus;