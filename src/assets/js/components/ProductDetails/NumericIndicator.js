var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');
var appConstants = require('../../constants/appConstants');
var resourceConstants = require('../../constants/resourceConstants');
var  _updatedQtyGood = 0, _updatedQtyMissing = 0,_updatedQtyDamaged=0,_updatedQtyUnscannble=0, _scanDetails = {},_keypress = false;


var NumericIndicator = React.createClass({
   _appendClassDown : '',
    _appendClassUp : '',
    _qtyComponent : null,
    _appendClassDown: '',
    _appendClassUp: '',
    virtualKeyboard: null,
    _id : 'keyboard',
    _enableIncrement : true,
    _enableDecrement : true,

     changeValueIncrement : function(event){
var qty_entered=_updatedQtyGood+_updatedQtyDamaged;
        if( parseInt(qty_entered) >= parseInt(_scanDetails.total_qty) && (parseInt(_scanDetails.total_qty) != 0 || _scanDetails.total_qty != "0") )
        {
            return false;
        }
            //$("#keyboard").val(_updatedQty);
            if(this.props.props=="good_quntity")
            {
            _updatedQtyGood++;
            event.target.previousSibling.value=_updatedQtyGood;
            }
            else if(this.props.props=="Missing_quntity")
            {
            _updatedQtyMissing++;
            event.target.previousSibling.value=_updatedQtyMissing;
            }



    },
     handleIncrement: function(event, qty) { console.log(_keypress);
  var qty_entered=_updatedQtyGood+_updatedQtyDamaged;
        if (this._enableIncrement === true && _keypress == false) {
          if((parseInt(qty_entered) >= parseInt(_scanDetails.total_qty)) && (parseInt(_scanDetails.total_qty) != 0 || _scanDetails.total_qty != "0")){
          }

            var data = {};
            // if(mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION  || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
            //     CommonActions.updateKQQuantity(parseInt(_updatedQty));
            //     return true;
            // }
            if(mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED || mainstore.getScreenId() == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED ){
                if(this.props.action != undefined){
                    switch(this.props.props){
                        case "good_quntity":
                            CommonActions.updateGoodQuantity(parseInt(_updatedQtyGood));
                        break;
                        case "Missing_quntity":
                            CommonActions.updateMissingQuantity(parseInt(_updatedQtyMissing));
                        break;
                        // case "DAMAGED":
                        //     CommonActions.updateDamagedQuantity(parseInt(_updatedQty));
                        // break;
                        default:
                    }
                }
                return true;
            }

            // if (mainstore.getCurrentSeat() == "audit_front") {

            //     data = {
            //         "event_name": "audit_actions",
            //         "event_data": {
            //             "type": "change_qty",
            //             "quantity": parseInt(_updatedQty)
            //         }
            //     };
            // }
            // else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE) {
            //     data = {
            //         "event_name": "put_back_exception",
            //         "event_data": {
            //             "action": "confirm_quantity_update",
            //             "quantity": parseInt(_updatedQty),
            //             "event":mainstore.getExceptionType()
            //         }
            //     };
            // }
            // else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS || mainstore.getScreenId() === appConstants.PUT_BACK_PHYSICALLY_DAMAGED_ITEMS) {
            //     data = {
            //         "event_name": "put_back_exception",
            //         "event_data": {
            //             "action": "confirm_quantity_update",
            //             "quantity": parseInt(_updatedQty),
            //             "event":mainstore.getExceptionType()
            //         }
            //     };
            // }
            else {
                data = {
                    "event_name": "quantity_update_from_gui",
                    "event_data": {
                        "action": "confirm_quantity_update",
                         "quantity": {
                           "good_quntity": parseInt(_updatedQtyGood),
                           "Missing_quntity":parseInt(_updatedQtyMissing)
                           // "damage_quantity":parseInt(_updatedQty)
                           // "unscannable_quantity":parseInt(_updatedQty)
                         },
                         "event":mainstore.getExceptionType()
                    }
                };
            }
            mainstore.setShowModal(false);
            // CommonActions.postDataToInterface(data);
        }
    },

     openNumpad : function(id){
    var self = this;
    var action = this.props.action;
    if (_scanDetails.kq_allowed == true) {
        var qty = _scanDetails.current_qty;
        var itemUid = this.props.itemUid;
        /**
         * { T2766- Removed disabled attribute when true }
         */
        $('#'+id).removeAttr("disabled");
          setTimeout(function(){ $('#'+id).keyboard({
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
                $(".ui-keyboard").css("width","230px");
                $(".ui-keyboard-preview-wrapper .ui-keyboard-preview").css("font-size","30px");
                $(".ui-keyboard-button").css("width","74px");
                $(".ui-keyboard-accept,.ui-keyboard-cancel").css("width","110px");
                //$(".current-quantity").val("");
                //$(".ui-widget-content").val("");
                $("#"+id).val("");
                $("input.ui-keyboard-preview:visible").val("");
            },
            change : function(e, keypressed, el){
                var data ={}
               if(_scanDetails.kq_allowed == false){
                    $('.ui-keyboard-preview').val("");
                    data["code"] = resourceConstants.CLIENTCODE_013;
                    data["level"] = 'error'
                    CommonActions.generateNotification(data);
                }
                else if(parseInt(keypressed.last.val) > 9999){
                    self.disableIncrement(false);
                    generateExcessNotification();
                    $('.ui-keyboard-preview').val(9999);
               }else if((parseInt(keypressed.last.val) <= 0) &&  (mainstore.getScreenId() != appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED && mainstore.getScreenId() != appConstants.AUDIT_SCAN && mainstore.getScreenId() != appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE &&
                    mainstore.getScreenId() != appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE && mainstore.getScreenId() != appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION  && mainstore.getScreenId() != appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE &&
                      mainstore.getScreenId() != appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION ) ){
                    data["code"] = resourceConstants.CLIENTCODE_009;
                    data["level"] = 'error'
                    CommonActions.generateNotification(data);
                    if(parseInt(keypressed.last.val) <= 9999)
                        $('.ui-keyboard-preview').val(_updatedQty);
                    else
                        $('.ui-keyboard-preview').val(9999);
                }else{
                    data["code"] = null;
                    data["level"] = 'error'
                    CommonActions.generateNotification(data);
                }
            },
            accepted: function(e, keypressed, el) {
                if (e.target.value === '' ) {
                    CommonActions.resetNumpadVal(parseInt(_updatedQty));
                } else  {
                    var data = {};
                     if( mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE ||  mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
                        CommonActions.updateKQQuantity(parseInt(e.target.value));
                         return true;
                    }
                    if(mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED || mainstore.getScreenId() == appConstants.PICK_FRONT_EXCEPTION_GOOD_MISSING_DAMAGED ){
                       if(action != undefined){
                            switch(action){
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
                    else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE) {
                         data = {
                            "event_name": "put_back_exception",
                            "event_data": {
                                "action": "confirm_quantity_update",
                                "quantity": parseInt(e.target.value),
                                "event":mainstore.getExceptionType()
                            }
                        };
                    }
                    else if (mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS || mainstore.getScreenId() == appConstants.PUT_BACK_PHYSICALLY_DAMAGED_ITEMS) {
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
        }); }, 0)
    }else{
        $('#keyboard').attr("disabled","disabled");
    }

  },
  
incrementValue: function(event){
var total_entered= _updatedQtyGood +_updatedQtyMissing + _updatedQtyDamaged +_updatedQtyUnscannble;
       if(parseInt(total_entered)>=9999) {
                generateExcessNotification();
                this.disableIncrement(false);
            }
        else {
            var self = this;
            var interval;
            if (this._enableIncrement === true) {
                _keypress = true;
               if( event.type == "mousedown"){
                    this.changeValueIncrement(event);
                }
                // else if(event.type == 'click'){
                //     _updatedQty++;
                //     console.log(_updatedQty);
                // }

            
                if(interval == undefined){
                   _keypress = false;
                }
                console.log(interval);
                self.handleIncrement();
            }
        }

    },
    render: function(data) {

        return (
            <div className = "indicator-wrapper" >       
            <div>
            <span className="gor-minus-sign" action={this.props.action} onClick={this.incrementValue.bind(this)} onMouseDown = {this.incrementValue} ></span>
            <input id="keyboard" type="text" name="quantity" className="gor-quantity-text" onClick={this.openNumpad.call(null,"keyboard")}/>
            <span className="gor-plus-sign" action={this.props.action} onClick={this.incrementValue} onMouseDown = {this.incrementValue} ></span>
            </div>
            </div>
            )

    }
});

module.exports = NumericIndicator;
