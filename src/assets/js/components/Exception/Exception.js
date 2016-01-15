var React = require('react');[]
var ExceptionHeader = require('./ExceptionHeader');
var ExceptionList = require('./ExceptionList');

var Exception = React.createClass({ 
    render: function() {
        return (
            <div className="exception">
                <ExceptionHeader data = {this.props.data.header} />
                <ExceptionList data = {this.props.data.list} />
            </div>
        );
    },
});

module.exports = Exception;