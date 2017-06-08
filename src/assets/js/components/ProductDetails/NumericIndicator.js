var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');
var appConstants = require('../../constants/appConstants');
var resourceConstants = require('../../constants/resourceConstants');
var  _updatedQtyGood = 0, _updatedQtyMissing = 0,_updatedQtyDamaged=0,_updatedQtyUnscannble=0, _scanDetails = {},_keypress = false;
function generateExcessNotification () {
    var data={};
    data["code"] = resourceConstants.CLIENTCODE_008;
    data["level"] = 'error';
    CommonActions.generateNotification(data);
    return;
};

var NumericIndicator = React.createClass({
 _appendClassUp : 'gor-plus-sign enable',
 _qtyComponent : null,
 _appendClassDown: 'gor-minus-sign enable',
 virtualKeyboard: null,
 _id : 'keyboard',
 _enableIncrement : true,
 _enableDecrement : true,

 getInitialState: function() {
    return {value: 0};
},
self:this,



changeValueIncrement : function(event){
    var qty_entered=_updatedQtyGood+_updatedQtyDamaged;
    if( parseInt(qty_entered) >= parseInt(_scanDetails.total_qty) && (parseInt(_scanDetails.total_qty) != 0 || _scanDetails.total_qty != "0") )
    {
        return false;
    }

    if(this.props.props=="good_quntity")
    {
        _updatedQtyGood++;
        this.setState({
            value : _updatedQtyGood
        })
    }
    else if(this.props.props=="Missing_quntity")
    {
        _updatedQtyMissing++;

        this.setState({
            value : _updatedQtyMissing
        })
    }
    else if(this.props.props=="Unscannable_quntity")
    {
        _updatedQtyUnscannble++;

        this.setState({
            value : _updatedQtyUnscannble
        })
    }
    else if(this.props.props=="Damaged_quntity")
    {
        _updatedQtyDamaged++;

        this.setState({
            value : _updatedQtyDamaged
        })
    }
},

changeValueDecrement : function(event){

    if(this.props.props=="good_quntity")
    {
        _updatedQtyGood--;
        this.setState({
            value : _updatedQtyGood
        })
    }
    else if(this.props.props=="Missing_quntity")
    {
        _updatedQtyMissing--;

        this.setState({
            value : _updatedQtyMissing
        })
    }
    else if(this.props.props=="Unscannable_quntity")
    {
        _updatedQtyUnscannble--;

        this.setState({
            value : _updatedQtyUnscannble
        })
    }
    else if(this.props.props=="Damaged_quntity")
    {
        _updatedQtyDamaged--;

        this.setState({
            value : _updatedQtyDamaged
        })
    }

},

updateStore: function(event, qty) { console.log(_keypress);
 var total_entered= _updatedQtyGood +_updatedQtyMissing + _updatedQtyDamaged +_updatedQtyUnscannble;
 if (this._enableIncrement === true && _keypress == true) {
  if((parseInt(total_entered) >= parseInt(_scanDetails.total_qty)) && (parseInt(_scanDetails.total_qty) != 0 || _scanDetails.total_qty != "0") || parseInt(total_entered) >= 0 ){
  }

  var data = {};
  switch(this.props.props){
    case "good_quntity":
    CommonActions.updateGoodQuantity(parseInt(_updatedQtyGood));
    CommonActions.updateKQQuantity(parseInt(_updatedQtyGood));
    break;
    case "Missing_quntity":
    CommonActions.updateMissingQuantity(parseInt(_updatedQtyMissing));
    break;
    case "Damaged_quntity":
    CommonActions.updateDamagedQuantity(parseInt(_updatedQtyDamaged));
    break;
    case "Unscannable_quntity":
    CommonActions.updateUnscannableQuantity(parseInt(_updatedQtyUnscannble));
    break;
    default:
}
return true;
mainstore.setShowModal(false);

}
},
   incrementValue: function(event){
    var total_entered= parseInt(_updatedQtyGood) +parseInt(_updatedQtyMissing) + parseInt(_updatedQtyDamaged) +parseInt(_updatedQtyUnscannble);
    if(parseInt(total_entered)>=9999) {
        generateExcessNotification();
        this.disableIncrement(false);
    }
    else {
        var self = this;
        if (this._enableIncrement === true) {
            _keypress = true;
            if( event.type == "mousedown"){
                this.changeValueIncrement(event);
            }
         }
         self.updateStore();
     }
 },

  checkKqAllowed : function(){
if(this.state.value==0)
{
  this._appendClassDown = 'gor-minus-sign disable';
                  this._enableDecrement = false;
                }else{
                  this._appendClassDown = 'gor-minus-sign  enable';
                  this._enableDecrement = true;
                }
    
  },
decrementValue: function(event){
    var self = this;
    if (this._enableDecrement === true) {
        _keypress = true;
        if( event.type == "mousedown" ){
            this.changeValueDecrement(event);
        }
        
        self.updateStore();
    }

},  
componentDidMount(){
        //var self = this;
        (function(self){
            $(".xyz_"+self.props.props).keyboard({
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
                    }else{
                        data["code"] = null;
                        data["level"] = 'error'
                        CommonActions.generateNotification(data);

                    }
                },
                accepted: function(e, keypressed, el) {

                    if(self.props.props=="good_quntity")
                    {
                        _updatedQtyGood=e.target.value
                        CommonActions.updateGoodQuantity(parseInt(_updatedQtyGood));
                        self.setState({
                            value : _updatedQtyGood
                        })

                    }
                    else if(self.props.props=="Missing_quntity")
                    {
                        _updatedQtyMissing=e.target.value
                        CommonActions.updateMissingQuantity(parseInt(_updatedQtyMissing));
                        self.setState({
                            value : _updatedQtyMissing
                        })

                    }
                    else if(self.props.props=="Unscannable_quntity")
                    {
                        _updatedQtyUnscannble=e.target.value
                        CommonActions.updateUnscannableQuantity(parseInt(_updatedQtyUnscannble));
                        self.setState({
                            value : _updatedQtyUnscannble
                        })

                    }
                    else if(self.props.props=="Damaged_quntity")
                    {
                        _updatedQtyDamaged=e.target.value
                        CommonActions.updateDamagedQuantity(parseInt(_updatedQtyDamaged));
                        self.setState({
                            value : _updatedQtyDamaged
                        })

                    }                
                }
            });
        }(this))
        
    },
    render: function(data) {
        this.checkKqAllowed();
        return (
            <div className = "indicator-wrapper" >       
            <div>
            <span  className = {this._appendClassDown}  action={this.props.action} onClick={this.decrementValue} onMouseDown = {this.decrementValue} ></span>
            <input id="keyboard" value={this.state.value} type="text" name="quantity" className={"gor-quantity-text xyz_"+this.props.props}/>
            <span  className = {this._appendClassUp}  action={this.props.action} onClick={this.incrementValue} onMouseDown = {this.incrementValue} ></span>
            </div>
            </div>
            )

    }
});

module.exports = NumericIndicator;
