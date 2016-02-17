var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');
var appConstants = require('../../constants/appConstants');
var  _updatedQty = 0;

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
    mouseMoveToggle:false,
    changeValueIncrement : function(){

        if( parseInt(_updatedQty) >= parseInt(this.props.scanDetails.total_qty) && (parseInt(this.props.scanDetails.total_qty) != 0 || this.props.scanDetails.total_qty != "0") )
        {
            return false;
        }
        _updatedQty++;               
        $("#keyboard").val(_updatedQty);
    },
    incrementValue: function(event){
       var self = this;
       var interval;
        if (this.props.scanDetails.kq_allowed === true) {  
           if( event.type == "mousedown"){
                interval = setInterval(this.changeValueIncrement, 300);           
            }
            else if(event.type == 'click'){
                _updatedQty++;
            }
            
            $('.topArrow').mouseup(function() {
                clearInterval(interval);
            });
            $('.topArrow').mouseout(function(event) {
                clearInterval(interval);
            });
         

            if(mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE 
                || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE || mainstore.getScreenId() ==appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION
                || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION ){
                  console.log(_updatedQty); 
               
            }
            else if(parseInt(_updatedQty) > parseInt(this.props.scanDetails.total_qty) && (parseInt(this.props.scanDetails.total_qty) != 0 || this.props.scanDetails.total_qty != "0" )) {
               _updatedQty = _updatedQty - 1; 
            }
            self.handleIncrement();
        }
                                  
    },  
    changeValueDecrement : function(){

        if(_updatedQty <= 0 ){
            _updatedQty = 0;
        }else{
            _updatedQty--;
        }
        console.log(_updatedQty);
        if((_updatedQty === 0) && (mainstore.getScreenId() == appConstants.PUT_BACK_SCAN || 
                mainstore.getScreenId() == appConstants.PICK_FRONT_MORE_ITEM_SCAN ||
                mainstore.getScreenId() == appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK)){
            _updatedQty = 1;
        }       
        $("#keyboard").val(_updatedQty);
    },
    decrementValue: function(event){
        console.log(event.type);
        var self = this;
        var interval;
        if (this.props.scanDetails.kq_allowed === true) { 
    
            if( event.type == "mousedown" ){     
                interval = setInterval(this.changeValueDecrement, 300);                
            
            }else if(event.type == 'click') {
               if(_updatedQty <= 0){
                _updatedQty = 0;
                }else{
                _updatedQty--;
                }
    
            }

            $('.downArrow').mouseup(function() {
                clearInterval(interval);
                

            });

            $('.downArrow').mouseout(function(event) {
                clearInterval(interval);
            });
             if((_updatedQty === 0) && (mainstore.getScreenId() == appConstants.PUT_BACK_SCAN || 
                mainstore.getScreenId() == appConstants.PICK_FRONT_MORE_ITEM_SCAN ||
                mainstore.getScreenId() == appConstants.PUT_FRONT_PLACE_ITEMS_IN_RACK)){
                _updatedQty = 1;
            }

          
            self.handleDecrement();
        }
                          
    },                    
    
    handleIncrement: function(event, qty) {     
        console.log(_updatedQty);  
        if (this.props.scanDetails.kq_allowed === true && (parseInt(_updatedQty) != this.props.scanDetails.current_qty)) {           
          if((parseInt(_updatedQty) >= parseInt(this.props.scanDetails.total_qty)) && (parseInt(this.props.scanDetails.total_qty) != 0 || this.props.scanDetails.total_qty != "0")){
          }          
                      
            var data = {};
            if(mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
                CommonActions.updateKQQuantity(parseInt(_updatedQty));
                return true;
            }
            if(mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED || mainstore.getScreenId() == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED ){
                if(this.props.action != undefined){
                    switch(this.props.action){
                        case "GOOD":
                            CommonActions.updateGoodQuantity(parseInt(_updatedQty));
                        break;
                        case "MISSING":
                            CommonActions.updateMissingQuantity(parseInt(_updatedQty));
                        break;
                        case "DAMAGED":
                            CommonActions.updateDamagedQuantity(parseInt(_updatedQty));
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
                        "quantity": parseInt(_updatedQty)
                    }
                };
            } 
            else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS) {
                data = {
                    "event_name": "put_back_exception",
                    "event_data": {
                        "action": "confirm_quantity_update",
                        "quantity": parseInt(_updatedQty),
                        "event":mainstore.getExceptionType()
                    }
                };
            }  
            else {
                data = {
                    "event_name": "quantity_update_from_gui",
                    "event_data": {
                        "item_uid": this.props.itemUid,
                        "quantity_updated": parseInt(_updatedQty)
                    }
                };
            }
            mainstore.setShowModal(false);
            CommonActions.postDataToInterface(data);
        }
    },
    handleDecrement: function(event) {
        
        console.log(_updatedQty);
        if (this.props.scanDetails.kq_allowed === true && (parseInt(_updatedQty) != this.props.scanDetails.current_qty)) {
            if (parseInt(_updatedQty) >= 0 ) {
                var data = {};
                 if(mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE || mainstore.getScreenId() ==appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
                    CommonActions.updateKQQuantity(parseInt(_updatedQty) );
                     return true;
                }
                if(mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED || mainstore.getScreenId() == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED ){
                if(this.props.action != undefined){
                    switch(this.props.action){
                        case "GOOD":
                            CommonActions.updateGoodQuantity(parseInt(_updatedQty) );
                        break;
                        case "MISSING":
                            CommonActions.updateMissingQuantity(parseInt(_updatedQty) );
                        break;
                        case "DAMAGED":
                            CommonActions.updateDamagedQuantity(parseInt(_updatedQty) );
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
                            "quantity": parseInt(_updatedQty)
                        }
                    };
                }
                else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS) {
                data = {
                    "event_name": "put_back_exception",
                    "event_data": {
                        "action": "confirm_quantity_update",
                        "quantity": parseInt(_updatedQty),
                        "event":mainstore.getExceptionType()
                    }
                };
                }   
                else {
                    data = {
                        "event_name": "quantity_update_from_gui",
                        "event_data": {
                            "item_uid": this.props.itemUid,
                            "quantity_updated": parseInt(_updatedQty)
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
      if((parseInt(_updatedQty) >= parseInt(this.props.scanDetails.total_qty)) && (parseInt(this.props.scanDetails.total_qty) != 0 || this.props.scanDetails.total_qty != "0") ){          
          
          this._appendClassUp = 'topArrow disable';
          this._appendClassDown = 'downArrow enable';          
      }
      else{
          this._appendClassUp = 'topArrow enable';
          if (mainstore.getCurrentSeat() == "audit_front"){
               if(_updatedQty== 0){
                  this._appendClassDown = 'downArrow disable';
                }else{
                  this._appendClassDown = 'downArrow enable';
                } 
            }else if(mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE || mainstore.getScreenId() ==appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
                if(_updatedQty == 0){
                  this._appendClassDown = 'downArrow disable';
                }else{
                  this._appendClassDown = 'downArrow enable';
                }   
            }
            else{
                if(_updatedQty == 1){
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
            <input id="keyboard" className="current-quantity"  value={_updatedQty}/>
            <span className="separator">/</span>
            <span className="total-quantity">{parseInt(this.props.scanDetails.total_qty)}</span> 
          </div>
        );
    }else{
      this._qtyComponent = (
          <div id='textbox'>
            <input id="keyboard"  value={_updatedQty}/> 
          </div>
      );
        }

    },
    render: function(data) {
        this.checkKqAllowed();
        this.handleTotalQty();
        _updatedQty = parseInt(this.props.scanDetails.current_qty);
        return ( < div className = "kq-wrapper" >
            < a href = "#" className = {this._appendClassUp} onClick={this.incrementValue} onMouseDown = {this.incrementValue} >
            < span className = "glyphicon glyphicon-menu-up" > < /span> < /a> {this._qtyComponent} 
            < a href = "#" className = {this._appendClassDown} onClick={this.decrementValue}  onMouseDown = {this.decrementValue} >
            < span className = "glyphicon glyphicon-menu-down" > < /span> < /a> 
            < /div>
        )

    }
});

module.exports = KQ;