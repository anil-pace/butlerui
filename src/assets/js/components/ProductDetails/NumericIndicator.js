var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');
var appConstants = require('../../constants/appConstants');
var resourceConstants = require('../../constants/resourceConstants');
var  _scanDetails = {},_keypress = false;


var NumericIndicator = React.createClass({
   _appendClassUp : 'gor-plus-sign enable',
   _qtyComponent : null,
   _appendClassDown: 'gor-minus-sign enable',
   virtualKeyboard: null,
   _id : 'keyboard',
   _enableIncrement : true,
   _enableDecrement : true,
   _updatedQtyGood:0,
   _updatedQtyDamaged:0,
   _updatedQtyUnscannble:0,
   _updatedQtyMissing:0,


   getInitialState: function() {
    return {value: 0};
},
self:this,

generateExcessNotification: function () {
    var data={};
    data["code"] = resourceConstants.CLIENTCODE_008;
    data["level"] = 'error';
    CommonActions.generateNotification(data);
    return;
},

changeValueIncrement : function(event){

    if(this.props.execType===appConstants.GOOD_QUANTITY)
    {
        this._updatedQtyGood++;
        this.setState({
            value : this._updatedQtyGood
        })
    }
    else if(this.props.execType===appConstants.MISSING_QUANTITY)
    {
        this._updatedQtyMissing++;

        this.setState({
            value :this. _updatedQtyMissing
        })
    }
    else if(this.props.execType===appConstants.UNSCANNABLE_QUANTITY)
    {
        this._updatedQtyUnscannble++;

        this.setState({
            value : this._updatedQtyUnscannble
        })
    }
    else if(this.props.execType===appConstants.DAMAGED_QUANTITY)
    {
        this._updatedQtyDamaged++;

        this.setState({
            value : this._updatedQtyDamaged
        })
    }
},

changeValueDecrement : function(event){

    if(this.props.execType===appConstants.GOOD_QUANTITY)
    {
        this._updatedQtyGood--;
        this.setState({
            value : this._updatedQtyGood
        })
    }
    else if(this.props.execType===appConstants.MISSING_QUANTITY)
    {
        this._updatedQtyMissing--;

        this.setState({
            value : this._updatedQtyMissing
        })
    }
    else if(this.props.execType===appConstants.UNSCANNABLE_QUANTITY)
    {
        this._updatedQtyUnscannble--;

        this.setState({
            value : this._updatedQtyUnscannble
        })
    }
    else if(this.props.execType===appConstants.DAMAGED_QUANTITY)
    {
        this._updatedQtyDamaged--;

        this.setState({
            value : this._updatedQtyDamaged
        })
    }

},

updateStore: function(event, qty) {
   var total_entered= this._updatedQtyGood +this._updatedQtyMissing + this._updatedQtyDamaged +this._updatedQtyUnscannble;
   if (this._enableIncrement === true && _keypress === true) {

      var data = {};
      switch(this.props.execType){
        case appConstants.GOOD_QUANTITY:
        CommonActions.updateGoodQuantity(parseInt(this._updatedQtyGood));
        break;
        case appConstants.MISSING_QUANTITY:
        CommonActions.updateMissingQuantity(parseInt(this._updatedQtyMissing));
        break;
        case appConstants.DAMAGED_QUANTITY:
        CommonActions.updateDamagedQuantity(parseInt(this._updatedQtyDamaged));
        break;
        case appConstants.UNSCANNABLE_QUANTITY:
        CommonActions.updateUnscannableQuantity(parseInt(this._updatedQtyUnscannble));
        break;
        default:
    }
    return true;

}
},
incrementValue: function(event){
    var total_entered= parseInt(this._updatedQtyGood) +parseInt(this._updatedQtyMissing) + parseInt(this._updatedQtyDamaged) +parseInt(this._updatedQtyUnscannble);
    if(parseInt(total_entered)>=9999) {
        this.generateExcessNotification();
    }
    else {
        var self = this;
        if (this._enableIncrement) {
            _keypress = true;
            if( event.type === "mousedown"){
                this.changeValueIncrement(event);
            }
        }
        self.updateStore();
    }
},

checkKqAllowed : function(){
    if(this.state.value<=0)
    {
      this._appendClassDown = 'gor-minus-sign disable';
      this._enableDecrement = false;
  }else{
      this._appendClassDown = 'gor-minus-sign enable';
      this._enableDecrement = true;
  }

   if(this.state.value>=9999)
    {
      this._appendClassUp = 'gor-plus-sign disable';
      this._enableIncrement = false;
  }else{
      this._appendClassUp = 'gor-plus-sign enable';
      this._enableIncrement = true;
  }

},
decrementValue: function(event){
    var self = this;
    if (this._enableDecrement) {
        _keypress = true;
        if( event.type === "mousedown" ){
            this.changeValueDecrement(event);
        }
        
        self.updateStore();
    }

}, 
componentDidMount(){
        (function(self){
            $(".gor_"+self.props.execType).keyboard({
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
                    if(_scanDetails.kq_allowed === false){
                        $('.ui-keyboard-preview').val("");
                        data["code"] = resourceConstants.CLIENTCODE_013;
                        data["level"] = 'error'
                        CommonActions.generateNotification(data);
                    }
                    else if(parseInt(keypressed.last.val) > 9999){
                        self.generateExcessNotification();
                        $('.ui-keyboard-preview').val(9999);
                    }
                    else{
                        data["code"] = null;
                        data["level"] = 'error'
                        CommonActions.generateNotification(data);

                    }
                },
                accepted: function(e, keypressed, el) {
                   let txtBoxVal = isNaN(parseInt(e.target.value,10))?0:Math.abs(parseInt(e.target.value,10));
                   if(self.props.execType===appConstants.GOOD_QUANTITY)
                    {
                        self._updatedQtyGood=txtBoxVal;
                        CommonActions.updateGoodQuantity(parseInt(self._updatedQtyGood));
                        self.setState({
                            value : self._updatedQtyGood
                        })

                    }
                    else if(self.props.execType===appConstants.MISSING_QUANTITY)
                    {
                        self._updatedQtyMissing=txtBoxVal;
                        CommonActions.updateMissingQuantity(parseInt(self._updatedQtyMissing));
                        self.setState({
                            value : self._updatedQtyMissing
                        })

                    }
                    else if(self.props.execType===appConstants.UNSCANNABLE_QUANTITY)
                    {
                        self._updatedQtyUnscannble=txtBoxVal;
                        CommonActions.updateUnscannableQuantity(parseInt(self._updatedQtyUnscannble));
                        self.setState({
                            value : self._updatedQtyUnscannble
                        })

                    }
                    else if(self.props.execType===appConstants.DAMAGED_QUANTITY)
                    {
                        self._updatedQtyDamaged=txtBoxVal;
                        CommonActions.updateDamagedQuantity(parseInt(self._updatedQtyDamaged));
                        self.setState({
                            value : self._updatedQtyDamaged
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
            <input id="keyboard" value={this.state.value} type="text" name="quantity" className={"gor-quantity-text gor_"+this.props.execType}/>
            <span  className = {this._appendClassUp}  action={this.props.action} onClick={this.incrementValue} onMouseDown = {this.incrementValue} ></span>
            </div>
            </div>
            )

    }
});

module.exports = NumericIndicator;
