function KQMod() {

}

KQMod.prototype.handleIncrement = function(_enableIncrement, _keypress, _updatedQty, _scanDetails, screenId,  appConstants) {
	
	if (_enableIncrement === true && _keypress == false) {           
          if((parseInt(_updatedQty) >= parseInt(_scanDetails.total_qty)) && (parseInt(_scanDetails.total_qty) != 0 || _scanDetails.total_qty != "0")){
          }else{
          	return "Fail with negative number";
          }          
                      
            var data = {};
            
           /* if(screenId == appConstants.PUT_BACK_EXCEPTION_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_BOX_DAMAGED_BARCODE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_LOOSE_ITEMS_DAMAGED_EXCEPTION || mainstore.getScreenId() == appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE || mainstore.getScreenId() == appConstants.PUT_FRONT_EXCEPTION_SPACE_NOT_AVAILABLE || mainstore.getScreenId() == appConstants.AUDIT_EXCEPTION_ITEM_IN_BOX_EXCEPTION){
                CommonActions.updateKQQuantity(parseInt(_updatedQty));
                _updatedQty = 0;
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
            CommonActions.postDataToInterface(data);*/
            return "Update";
        }else{
        	return "Fail";
        }
}
KQMod.prototype.clickLoginButton = function(username, password) {
	console.log(username, password);
	// body...
}

