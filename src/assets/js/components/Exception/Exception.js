var React = require('react');
var ExceptionHeader = require('./TableRow');
var ExceptionList = require('./TableHeader');

var TabularData = React.createClass({ 
    render: function() {
        return (
            <div className="exception">
                <ExceptionHeader data = {this.props.data.header} />
                <ExceptionList data = {this.props.data.list} />
            </div>
        );
    },
});

module.exports = TabularData;