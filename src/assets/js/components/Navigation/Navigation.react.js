var React = require('react');
var ActiveNavigation = require('./ActiveNavigation.react');

var Navigation = React.createClass({ 
    
    render: function() {
        return (
            <div className="navigation">
                 <ActiveNavigation  data={this.props.navData} />             
      		</div>
        )
    },
});

module.exports = Navigation;