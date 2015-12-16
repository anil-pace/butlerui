var React = require('react');
var CommonActions = require('../../actions/CommonActions');

var KQ = React.createClass({
  handleIncrement: function(event){
    if(this.props.scanDetails.kq_allowed === true){
      var data  = {
        "event_name":"quantity_update_from_gui",
        "event_data":{
            "item_uid":this.props.itemUid,
            "quantity_updated":parseInt(this.props.scanDetails.current_qty) + 1
        }
      }
      CommonActions.kq_operation(data);
    }
  },
  handleDecrement: function(event){
    if(this.props.scanDetails.kq_allowed === true){
      if(parseInt(this.props.scanDetails.current_qty) != 1){
      var data  = {
          "event_name":"quantity_update_from_gui",
          "event_data":{
              "item_uid":this.props.itemUid,
              "quantity_updated":parseInt(this.props.scanDetails.current_qty) - 1
          }
        }
        CommonActions.kq_operation(data);
      }
    }
  },
  componentDidMount: function(){
    var x = $("#keyboard").offset();
    console.log("Top: " + x.top + " Left: " + x.left);
    var newLeft = x.left - 200;
    var newTop = x.top - 50;
     setTimeout(function () {
          $('#keyboard').keyboard({
          layout: 'num',  
          visible: function(e, keyboard, el){
            $(".ui-keyboard").css({"background-color":"grey", "left":newLeft+"px", "top":newTop+"px"});
          }
      }) }.bind(this), 0)
  },
  showNumpad: function(){    
    var kb;
    kb = $('#keyboard').getkeyboard()
  },
  componentWillMount: function(){
  },
  componentWillUnmount: function(){
  },
  onChange: function(){ 
  },
  render: function(data){ 
   
      return (
        <div className="kQableContainer">
             <a className="topArrow" href='#' onClick={this.handleIncrement}>
                 <span className="glyphicon glyphicon-menu-up"></span>
             </a>
             <div id='textbox'  onClick={this.showNumpad}>
                 <input id="keyboard"  value={this.props.scanDetails.current_qty}/> 
              </div> 
              <a className="downArrow" href='#' onClick={this.handleDecrement}>
                 <span className="glyphicon glyphicon-menu-down"></span>
              </a>
              
      </div>
    )
  }
});

module.exports = KQ;