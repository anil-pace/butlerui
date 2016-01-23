var React = require('react');
var allSvgConstants = require('../constants/svgConstants');
var CommonActions = require('../actions/CommonActions');
var mainstore = require('../stores/mainstore');
var virtualkeyboard = require('virtual-keyboard');
var jqueryPosition = require('jquery-ui/position');
var virtualKeyBoard_header = null;
var Header = React.createClass({
    getInitialState: function() {
        return {
            spinner: mainstore.getSpinnerState(),
            systemIsIdle: mainstore.getSystemIdleState()
        }
    },
    openKeyboard: function() {
       virtualKeyBoard_header = $('#barcode').keyboard({
            layout: 'custom',
            customLayout: {
              'default': ['1 2 3 4 5 6 7 8 9 0 {b}', 'q w e r t y u i o p', 'a s d f g h j k l', '{shift} z x c v b n m . {shift}', '{a} {c}'],
              'shift': ['! @ # $ % ^ & * ( ) {b}', 'Q W E R T Y U I O P', 'A S D F G H J K L', '{shift} Z X C V B N M . {shift}', '{a} {c}']
            },
            css: {
                container: "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad"
            },
            reposition: true,
            alwaysOpen: false,
            initialFocus: true,
            position: {
                of: $('.keyboard-actions'),
                my: 'center top',
                at: 'center top'
            },
            visible : function(e, keypressed, el){
                el.value = '';
            },
            accepted: function(e, keypressed, el) {
                if (e.target.value === '') {
                } else {
                    var data = {
                        "event_name": "process_barcode",
                        "event_data": {
                            "barcode": e.target.value,
                        }
                    }
                    CommonActions.postDataToInterface(data);
                }
            }
        })
        $('#barcode').data('keyboard').reveal();
    },
    enableException:function(){
        CommonActions.enableException(true);
        $("#actionMenu").hide();
    },
    logoutSession:function(){
        CommonActions.logoutSession(true);
        $("#actionMenu").hide();
    },
    componentDidMount: function() {
    },
    showMenu: function(){
        $("#actionMenu").toggle();
    },
    componentWillMount: function() {
        mainstore.addChangeListener(this.onChange);
    },
    onChange: function() {
        if(virtualKeyBoard_header != null){
            virtualKeyBoard_header.getkeyboard().close();
        }
    },
    render: function() { 
        var cssClass;        
        if(this.state.spinner || this.state.systemIsIdle){
            cssClass = 'keyboard-actions hide-manual-barcode'
        } else{
            cssClass = 'keyboard-actions'
        }
        return (<div>
            <div className="head">
              <div className="logo">
              <img src={allSvgConstants.logo} />
              </div>
                <div className={cssClass} onClick={this.openKeyboard}>
                  <img src={allSvgConstants.scanHeader} />
                  <input id="barcode" type="text" value='' />
                </div>
              <div className="header-actions" onClick={this.showMenu} >
                 <img src={allSvgConstants.menu} />
                 
              </div>
            </div>
            <div className="actionMenu" id="actionMenu" >
                    <div className="actionItem" onClick = {this.enableException} >
                        Exception
                    </div>
                    <div className="actionItem" onClick = {this.logoutSession} >
                        Logout
                    </div>
            </div>
            </div>
        );
    },
});

module.exports = Header;
