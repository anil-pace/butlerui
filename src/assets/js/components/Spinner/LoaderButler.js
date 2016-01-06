var React = require('react');

var LoaderButler = React.createClass({
	render:function(){
		return (

			<div className="loader">
				
					<div className="hexdots-loader">
  						Loading…
					</div>
				
			</div>
			);
	}
});

module.exports = LoaderButler;