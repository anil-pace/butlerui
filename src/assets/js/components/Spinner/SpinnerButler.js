var React = require("react");

var SpinnerButler = React.createClass({
	render: function () {
		if (!this.props.needZoomout) {
			return <div className={"hexdots-loader"}></div>;
		} else {
			return (
				<div
					style={{ zoom: "0.5", marginBottom: "30vh" }}
					className={"hexdots-loader"}
				></div>
			);
		}
	},
});

module.exports = SpinnerButler;
