var React = require('react');

var Header = React.createClass({
    render: function() {
        return (<div>
                    <div className="row header">
                                <div className="col-md-3 col-sm-4 col-xs-8">
                                    <div className="gorLogo">
                                        <img className="img-responsive" src="assets/images/gorLogo.png" alt="GreyOrange_Logo" />
                                    </div>
                                </div>
                    </div>
                </div>
        );
    },
});

module.exports = Header;