var React = require('react');
var allSvgConstants = require('../constants/svgConstants');
var CommonActions = require('../actions/CommonActions');
var mainstore = require('../stores/mainstore');
var virtualkeyboard = require('virtual-keyboard');

var Header = React.createClass({
    virtualKeyBoard: '',
    getInitialState: function() {
        return {
            spinner: mainstore.getSpinnerState(),
            systemIsIdle: mainstore.getSystemIdleState()
        }
    },
    openKeyboard: function() {
        $('#barcode').data('keyboard').reveal();
        return false;
    },
    componentDidMount: function() {
        virtualKeyBoard = $('#barcode').keyboard({
            layout: 'custom',
            customLayout: {
              'default': ['1 2 3 4 5 6 7 8 9 {b}', 'q w e r t y u i o p', 'a s d f g h j k l', '{shift} z x c v b n m {shift}', '{a} {c}'],
              'shift': ['1 2 3 4 5 6 7 8 9 {b}', 'Q W E R T Y U I O P', 'A S D F G H J K L', '{shift} Z X C V B N M {shift}', '{a} {c}']
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
            accepted: function(e, keypressed, el) {
                if (e.target.value === '' || e.target.value === '0') {
                    CommonActions.resetNumpadVal(parseInt(qty));
                } else {
                    var data = {
                        "event_name": "quantity_update_from_gui",
                        "event_data": {
                            "item_uid": itemUid,
                            "quantity_updated": parseInt(e.target.value)
                        }
                    }
                }
            }
        })
    },
    componentWillMount: function() {
        mainstore.addChangeListener(this.onChange);
    },
    onChange: function() {
        virtualKeyBoard.getkeyboard().close();
    },
    render: function() { 
        var cssClass;        
        if(this.state.spinner || this.state.systemIsIdle){
            cssClass = 'keyboard-actions hide-manual-barcode'
        } else{
            cssClass = 'keyboard-actions'
        }
        return (
            <div className="head">
              <div className="logo">
              <img src={allSvgConstants.logo} />
              </div>
                <div className={cssClass} onClick={this.openKeyboard}>
                  <span className="glyphicon glyphicon-barcode"></span>
                  <input id="barcode" type="text" />
                </div>
              <div className="header-actions">
                 <img src={allSvgConstants.menu} />
              </div>
            </div>
        );
    },
});

module.exports = Header;
