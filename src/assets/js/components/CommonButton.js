var React = require('react');
var CommonActions = require('../actions/CommonActions');
var appConstants = require('../constants/appConstants');
var mainstore = require('../stores/mainstore');


var CommonButton = React.createClass({
	render: function(){
		return (
			 	< a className="commonButton">{this.props.text}</a>
			);
	}
});

module.exports = CommonButton;