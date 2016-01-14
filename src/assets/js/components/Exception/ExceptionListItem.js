var React = require('react');
var IconButton = require('./Button/IconButton');
var appConstants = require('../constants/appConstants');

var TableRow = React.createClass({ 
	_component:[],
    render: function() {
    	this.getComponent();
        return (
            <div className="exception-list-item">
               {this.props.data}
      		</div>
        );
    },
});

module.exports = TableRow;