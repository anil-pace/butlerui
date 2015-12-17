var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');

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
    var qty = this.props.scanDetails.current_qty;
     setTimeout(function () {
          $('#keyboard').keyboard({
          layout: 'num',
          reposition   : true,
          alwaysOpen   : false,
          initialFocus : true,
          accepted: function(e, keypressed, el) {
            if (e.target.value === '' || e.target.value === '0') {console.log(e.target.value);
              CommonActions.resetNumpadVal(parseInt(qty));
            }else{

            }
          }
      }) }.bind(this), 0);
  },
  showNumpad: function(){    
    var kb;
    kb = $('#keyboard').getkeyboard()
  },
  componentWillMount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getState());
  },
  render: function(data){ 

      return (
        <div className="kQableContainer">
             <a className="topArrow" href='#' onClick={this.handleIncrement}>
                 <span className="glyphicon glyphicon-menu-up"></span>
             </a>
             <div id='textbox'  onClick={this.showNumpad}>
                 <input id="keyboard"  value={parseInt(this.props.scanDetails.current_qty)}/> 
              </div> 
              <a className="downArrow" href='#' onClick={this.handleDecrement}>
                 <span className="glyphicon glyphicon-menu-down"></span>
              </a>
              
      </div>
    )
  }
});

module.exports = KQ;