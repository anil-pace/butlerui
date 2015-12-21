var React = require('react');
var allSvgConstants = require('../constants/svgConstants');
var CommonActions = require('../actions/CommonActions');
var mainstore = require('../stores/mainstore');

var Header = React.createClass({
    openKeyboard: function() {  
        $('#barcode').data('keyboard').reveal();
        return false;
    },
    componentDidMount: function(){
        setTimeout(function () {
             $('#barcode').keyboard({
             layout: 'qwerty',
             css:{
                container: "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad"
             },
             reposition   : true,
             alwaysOpen   : false,
             initialFocus : true,
             position : {
               of : $('.keyboard-actions'),
               my : 'center top',
               at : 'center top'
           },
             accepted: function(e, keypressed, el) {
               if (e.target.value === '' || e.target.value === '0') {
                 CommonActions.resetNumpadVal(parseInt(qty));
               }else{
                 var data  = {
                   "event_name":"quantity_update_from_gui",
                   "event_data":{
                       "item_uid":itemUid,
                       "quantity_updated":parseInt(e.target.value)
                   }
                 }
               }
             }
         })}.bind(this), 0);
    },
    render: function() {
        return (
            <div className="head">
            	<div className="logo">
            	<img src={allSvgConstants.logo} />
            	</div>
                <div className="keyboard-actions" onClick={this.openKeyboard}>
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