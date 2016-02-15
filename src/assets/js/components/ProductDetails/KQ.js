var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');
var appConstants = require('../../constants/appConstants');

var KQ = React.createClass({
  _appendClassDown : '',
  _appendClassUp : '',
  _qtyComponent : null,
  virtualKeyboard : null,
    _appendClassDown: '',
    _appendClassUp: '',
    _qtyComponent: null,
    virtualKeyboard: null,  
    _myVarDown:null,
    _myVarUp:null,
    counter:null,  
    incrementValue: function(event){
        this.props.scanDetails.current_qty = parseInt(this.props.scanDetails.current_qty);
        var self = this;
        _myVarUp = setInterval(function(){
            console.log(self.props.scanDetails.current_qty); 
            if( (parseInt(self.props.scanDetails.current_qty) >= parseInt(self.props.scanDetails.total_qty)) && (mainstore.getScreenId() == appConstants.PUT_BACK_SCAN) ){
               // console.log("if");
            }           
            else if( parseInt(self.props.scanDetails.current_qty) >= parseInt(self.props.scanDetails.total_qty) )
            {
                if(mainstore.getScreenId() == appConstants.AUDIT_SCAN){
                    self.props.scanDetails.current_qty++;
                    $("#keyboard").val(self.props.scanDetails.current_qty);

                }
                //console.log("else");
                return false;

            }    

            self.props.scanDetails.current_qty++;             
            $("#keyboard").val(self.props.scanDetails.current_qty);
        },300);                           
    },        

    decrementValue: function(event){
        this.props.scanDetails.current_qty = parseInt(this.props.scanDetails.current_qty);
        var self = this;
        _myVarDown = setInterval(function(){
            console.log(self.props.scanDetails.current_qty);            
            if(self.props.scanDetails.current_qty <= 1){
                return false;
            }
            self.props.scanDetails.current_qty--;            
            $("#keyboard").val(self.props.scanDetails.current_qty);
        },300);                       
    },
    handleIncrement: function(event) {          
        //alert(mainstore.getScreenId());  
       clearInterval(_myVarUp);        
        if (this.props.scanDetails.kq_allowed === true) {           
          if((parseInt(this.props.scanDetails.current_qty) >= parseInt(this.props.scanDetails.total_qty)) && (parseInt(this.props.scanDetails.total_qty) != 0 || this.props.scanDetails.total_qty != "0")){

          }          
                      
            var data = {};
            if(mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
                CommonActions.updateKQQuantity(parseInt(this.props.scanDetails.current_qty));
                return true;
            }
            if(mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED || mainstore.getScreenId() == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED ){
                if(this.props.action != undefined){
                    switch(this.props.action){
                        case "GOOD":
                            CommonActions.updateGoodQuantity(parseInt(this.props.scanDetails.current_qty));
                        break;
                        case "MISSING":
                            CommonActions.updateMissingQuantity(parseInt(this.props.scanDetails.current_qty));
                        break;
                        case "DAMAGED":
                            CommonActions.updateDamagedQuantity(parseInt(this.props.scanDetails.current_qty));
                        break;
                        default:
                    }
                }
                return true;
            }
            if (mainstore.getCurrentSeat() == "audit_front") {
                data = {
                    "event_name": "audit_actions",
                    "event_data": {
                        "type": "change_qty",
                        "quantity": parseInt(this.props.scanDetails.current_qty)
                    }
                };
            } 
            else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS) {
                data = {
                    "event_name": "put_back_exception",
                    "event_data": {
                        "action": "confirm_quantity_update",
                        "quantity": parseInt(this.props.scanDetails.current_qty),
                        "event":mainstore.getExceptionType()
                    }
                };
            }  
            else {
                data = {
                    "event_name": "quantity_update_from_gui",
                    "event_data": {
                        "item_uid": this.props.itemUid,
                        "quantity_updated": parseInt(this.props.scanDetails.current_qty)
                    }
                };
            }
            mainstore.setShowModal(false);
            CommonActions.postDataToInterface(data);
        }
    },
    handleDecrement: function(event) {
        clearInterval(_myVarDown);
        console.log("current " + this.props.scanDetails.current_qty);
        if (this.props.scanDetails.kq_allowed === true) {
            if (parseInt(this.props.scanDetails.current_qty) >= 1 ) {
                var data = {};
                if((mainstore.getScreenId() == appConstants.PUT_BACK_SCAN || mainstore.getScreenId() == appConstants.PICK_FRONT_MORE_ITEM_SCAN || mainstore.getScreenId() == appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK) && (parseInt(this.props.scanDetails.current_qty) == 1 || this.props.scanDetails.current_qty == "1")){
                    //CommonActions.postDataToInterface(data);
                    //return false;

                }
                 if(mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE || mainstore.getScreenId() ==appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
                    CommonActions.updateKQQuantity(parseInt(this.props.scanDetails.current_qty) );
                     return true;
                }
                if(mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED || mainstore.getScreenId() == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED ){
                if(this.props.action != undefined){
                    switch(this.props.action){
                        case "GOOD":
                            CommonActions.updateGoodQuantity(parseInt(this.props.scanDetails.current_qty) );
                        break;
                        case "MISSING":
                            CommonActions.updateMissingQuantity(parseInt(this.props.scanDetails.current_qty) );
                        break;
                        case "DAMAGED":
                            CommonActions.updateDamagedQuantity(parseInt(this.props.scanDetails.current_qty) );
                        break;
                        default:
                    }
                }
                return true;
                }
                if (mainstore.getCurrentSeat() == "audit_front") {
                    data = {
                        "event_name": "audit_actions",
                        "event_data": {
                            "type": "change_qty",
                            "quantity": parseInt(this.props.scanDetails.current_qty)
                        }
                    };
                }
                else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS) {
                data = {
                    "event_name": "put_back_exception",
                    "event_data": {
                        "action": "confirm_quantity_update",
                        "quantity": parseInt(this.props.scanDetails.current_qty),
                        "event":mainstore.getExceptionType()
                    }
                };
                }   
                else {
                    data = {
                        "event_name": "quantity_update_from_gui",
                        "event_data": {
                            "item_uid": this.props.itemUid,
                            "quantity_updated": parseInt(this.props.scanDetails.current_qty)
                        }
                    };
                }
                CommonActions.postDataToInterface(data);
            }
        }
    },
    componentDidMount: function() {
        if (this.props.scanDetails.kq_allowed === true) {
            var qty = this.props.scanDetails.current_qty;
            var itemUid = this.props.itemUid;
            virtualKeyboard = $('#keyboard').keyboard({
                layout: 'custom',
                customLayout: {
                    'default': ['1 2 3', '4 5 6', '7 8 9', '. 0 {b}', '{a} {c}']
                },
                reposition: true,
                alwaysOpen: false,
                initialFocus: true,
                visible: function(e, keypressed, el) {
                    $(".ui-keyboard-button.ui-keyboard-46").prop('disabled', true);
                    $(".ui-keyboard-button.ui-keyboard-46").css('opacity', "0.6");
                },
                accepted: function(e, keypressed, el) {
                    if (e.target.value === '' || e.target.value === '0') {
                        CommonActions.resetNumpadVal(parseInt(qty));
                    } else {

                        var data = {};
                         if( mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE ||  mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
                            CommonActions.updateKQQuantity(parseInt(e.target.value));
                             return true;
                        }
                        if(mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED || mainstore.getScreenId() == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED ){
                            if(this.props.action != undefined){
                                switch(this.props.action){
                                    case "GOOD":
                                        CommonActions.updateGoodQuantity(parseInt(e.target.value));
                                    break;
                                    case "MISSING":
                                        CommonActions.updateMissingQuantity(parseInt(e.target.value));
                                    break;
                                    case "DAMAGED":
                                        CommonActions.updateDamagedQuantity(parseInt(e.target.value));
                                    break;
                                    default:
                                }
                            }
                            return true;
                        }
                        if (mainstore.getCurrentSeat() == "audit_front") {
                            data = {
                                "event_name": "audit_actions",
                                "event_data": {
                                    "type": "change_qty",
                                    "quantity": parseInt(e.target.value)
                                }
                            };
                        }
                        else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS) {
                             data = {
                                "event_name": "put_back_exception",
                                "event_data": {
                                    "action": "confirm_quantity_update",
                                    "quantity": parseInt(e.target.value),
                                    "event":mainstore.getExceptionType()
                                }
                            };
                         }   
                        else {
                            data = {
                                "event_name": "quantity_update_from_gui",
                                "event_data": {
                                    "item_uid": itemUid,
                                    "quantity_updated": parseInt(e.target.value)
                                }
                            };
                        }
                        CommonActions.postDataToInterface(data);
                    }
                }
            });
        }
    },
  componentWillMount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  componentWillUnmount: function(){    
    mainstore.removeChangeListener(this.onChange);
    if(this.virtualKeyboard != null){
      virtualKeyboard.getkeyboard().close();
    }
  },
  onChange: function(){ 
    this.setState(getState());
  },
  checkKqAllowed : function(){    
    if(this.props.scanDetails.kq_allowed === true){        
      if((parseInt(this.props.scanDetails.current_qty) >= parseInt(this.props.scanDetails.total_qty)) && (parseInt(this.props.scanDetails.total_qty) != 0 || this.props.scanDetails.total_qty != "0") ){          
          console.log("current " + parseInt(this.props.scanDetails.current_qty));
          console.log("total " + parseInt(this.props.scanDetails.total_qty));
          this._appendClassUp = 'topArrow disable';
          this._appendClassDown = 'downArrow enable';          
      }
      else{
          this._appendClassUp = 'topArrow enable';
          if (mainstore.getCurrentSeat() == "audit_front"){
               if(this.props.scanDetails.current_qty == 0){
                  this._appendClassDown = 'downArrow disable';
                }else{
                  this._appendClassDown = 'downArrow enable';
                } 
            }else{
                if(this.props.scanDetails.current_qty == 1 || this.props.scanDetails.current_qty == 0){
                  this._appendClassDown = 'downArrow disable';
                }else{
                  this._appendClassDown = 'downArrow enable';
                }
            }
      }
    }
    else{
        this._appendClassUp = 'topArrow disable';
        this._appendClassDown = 'downArrow disable';
    }    
  },
  handleTotalQty : function(){
    if(this.props.scanDetails.total_qty != 0 ){
        this._qtyComponent = (
          <div id='textbox'>
            <input id="keyboard" className="current-quantity"  value={parseInt(this.props.scanDetails.current_qty)}/>
            <span className="separator">/</span>
            <span className="total-quantity">{parseInt(this.props.scanDetails.total_qty)}</span> 
          </div>
        );
    }else{
      this._qtyComponent = (
          <div id='textbox'>
            <input id="keyboard"  value={parseInt(this.props.scanDetails.current_qty)}/> 
          </div>
      );
        }

    },
    render: function(data) {
        this.checkKqAllowed();
        this.handleTotalQty();
        return ( < div className = "kq-wrapper" >
            < a href = "#" className = {this._appendClassUp} onMouseDown = {this.incrementValue} onMouseUp = {this.handleIncrement} >
            < span className = "glyphicon glyphicon-menu-up" > < /span> < /a> {this._qtyComponent} 
            < a href = "#" className = {this._appendClassDown} onMouseDown = {this.decrementValue} onMouseUp = {this.handleDecrement} >
            < span className = "glyphicon glyphicon-menu-down" > < /span> < /a> 
            < /div>
        )

    }
});

module.exports = KQ;