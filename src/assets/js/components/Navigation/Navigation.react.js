var React = require('react');
var ActiveNavigation = require('./ActiveNavigation.react');
var PassiveNavigation = require('./PassiveNavigation.react');

var Navigation = React.createClass({
    render: function() {
        console.log(this.props.navData);
        return (
            <div className="navigation">
                {this.props.navData.map(function(value,index){
                    console.log(value);
                    if(value.type == "active")
                        return (
                                <ActiveNavigation key={index} data={value} />
                            );
                    else
                        return (
                                <PassiveNavigation data={value} />
                            );
                },this)}
      		</div>
        );
    },
});

module.exports = Navigation;