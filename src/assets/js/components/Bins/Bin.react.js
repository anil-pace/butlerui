var React = require('react');

var Bin = React.createClass({
    render: function() {
        return (
            	 <div className = "bin">
                    <div className ="item-count">0</div>
                     <div className="pptl">2</div>
                </div>
        );
    },
});

module.exports = Bin;