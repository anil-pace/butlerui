var React = require('react');

var MessageNavigation = React.createClass({
    render: function() {
        return (
            	<div className="row messageNavigation">
           		   <div className="">
           				   <div className="col-md-6 col-sm-6 msg">
                        {this.props.navData.description}
                     </div>
           		   </div>
           	</div>
        );
    },
});

module.exports = MessageNavigation;