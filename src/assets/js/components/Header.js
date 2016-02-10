var React = require('react');

var Header = React.createClass({
    dropDown:function(){
        $('.dropDown').toggle(100);
    },

    render: function() {
        return (<div>
                    <div className="row header">
                                <div className="col-md-2 col-sm-3 col-xs-5">
                                    <div className="gorLogo">
                                        <img className="img-responsive" src="assets/images/gorLogo.png" alt="GreyOrange_Logo" />
                                    </div>
                                </div>
                                <div className="col-md-offset-9 col-md-1 col-sm-offset-7 col-sm-2 col-xs-offset-4 col-xs-3">
                                     <div className="menuIcon">
                                        <img className="img-responsive" src="assets/images/menu_Icon.png" alt="Menu_Icon" onClick={this.dropDown} />
                                     </div>
                                     <div className="dropDown">
                                            <ul>
                                                <li>SWITCH MODE</li>
                                                <li>LOGOUT</li>
                                            </ul>
                                    </div>
                                </div>
                    </div>
                </div>
        );
    },
});

module.exports = Header;