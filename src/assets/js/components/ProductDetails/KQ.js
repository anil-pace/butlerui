var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');

var KQ = React.createClass({
  _appendClassDown : '',
  _appendClassUp : '',
  _qtyComponent : null,
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
    var itemUid = this.props.itemUid;
     setTimeout(function () {
          $('#keyboard').keyboard({
          layout: 'num',
          reposition   : true,
          alwaysOpen   : false,
          initialFocus : true,
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
              CommonActions.kq_operation(data);

            }
          }
      }) }.bind(this), 0);
  },
  showNumpad: function(){  
    if(this.props.scanDetails.kq_allowed === true){  
      var kb;
      kb = $('#keyboard').getkeyboard()
    }
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
  checkKqAllowed : function(){
    if(this.props.scanDetails.kq_allowed === false){
      this._appendClassUp = 'topArrow disable';
      this._appendClassDown = 'downArrow disable';
    }else{
      this._appendClassUp = 'topArrow enable';
      if(this.props.scanDetails.current_qty == 1){
        this._appendClassDown = 'downArrow disable';
      }else{
        this._appendClassDown = 'downArrow enable';
      }
    }
    
  },
  handleTotalQty : function(){
    if(this.props.scanDetails.total_qty != 0 ){
        this._qtyComponent = (
          <div id='textbox' onClick={this.showNumpad}>
            <input id="keyboard" className="current-quantity"  value={parseInt(this.props.scanDetails.current_qty)}/>
            <span className="separator">/</span>
            <span className="total-quantity">{parseInt(this.props.scanDetails.total_qty)}</span> 
          </div>
        );
    }else{
      this._qtyComponent = (
          <div id='textbox' onClick={this.showNumpad}>
            <input id="keyboard"  value={parseInt(this.props.scanDetails.current_qty)}/> 
          </div>
      );
    }
  },
  render: function(data){ 
    this.checkKqAllowed();
    this.handleTotalQty();
      return (
        <div className="kq-wrapper">
          <a href="#" className={this._appendClassUp} onClick={this.handleIncrement}>
            <span className="glyphicon glyphicon-menu-up"></span>
          </a>
          {this._qtyComponent}
          <a href="#" className={this._appendClassDown} onClick={this.handleDecrement}>
            <span className="glyphicon glyphicon-menu-down"></span>
          </a>
        </div>
    )
  }
});

module.exports = KQ;