var React = require('react');
var ExceptionHeader = React.createClass({ 
	_component:[],
    render: function() {
        return (
            <div className="exception-head">
               {this.props.text}
      		</div>
        );
    },
});

module.exports = ExceptionHeader;