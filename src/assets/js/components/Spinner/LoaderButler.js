/*

var React = require('react');
var SpinnerButler = require('./SpinnerButler');

var LoaderButler = React.createClass({
	render:function(){
		return (

			<div className="loader">
				
					<SpinnerButler />
				
			</div>
			);
	}
});

module.exports = LoaderButler;
*/

var React = require('react');
//var LoaderButler = require('./LoaderButler');
var SpinnerButler = require('./SpinnerButler');

var LoaderButler = React.createClass({
	render:function(){
		return (

			<div className="loaderButler">
				<SpinnerButler />
			</div>
			);
	}
});

module.exports = LoaderButler;