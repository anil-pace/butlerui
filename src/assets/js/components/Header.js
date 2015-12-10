var React = require('react');
var allSvgConstants = require('../constants/svgConstants');

var Header = React.createClass({
    render: function() {
        return (
            <div className="head">
            	<div className="logo">
            	<img src={allSvgConstants.logo} />
            	</div>
            	<div className="header-actions">
            	   <img src={allSvgConstants.menu} />
            	</div>
      		</div>
        );
    },
});

module.exports = Header;