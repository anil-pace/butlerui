var React = require('react');

var Header = React.createClass({
    render: function() {
        return (
                <div className="row header">
                    <div className="">
                            <div className="col-md-2 col-sm-3 col-xs-5">
                                <div className="gorLogo">GREYORANGE</div>
                            </div>
                            <div className="col-md-offset-9 col-md-1 col-sm-offset-7 col-sm-2 col-xs-offset-4 col-xs-2">
                                ICON
                            </div>
                    </div>
            </div>
        );
    },
});

module.exports = Header;