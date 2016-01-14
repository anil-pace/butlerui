var React = require('react');

var TableHeader = React.createClass({ 
    
    render: function() {
        return (
            <div className="table-header">
               {this.props.data}
      		</div>
        );
    },
});

module.exports = TableHeader;