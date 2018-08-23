var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');
var appConstants = require('../../constants/appConstants');
var resourceConstants = require('../../constants/resourceConstants');
var  _scanDetails = {},_keypress = false;


var TextBoxEditor = React.createClass({
   _qtyComponent : null,
   virtualKeyboard: null,
   _id : 'keyboard',
   _enableIncrement : true,
   _enableDecrement : true,

   _qty:0,
   getInitialState: function() {
    this._qty=this.props.execType===appConstants.DEFAULT?this.props.scanDetails.current_qty:0;
    return{
        goodQuantity: mainstore.getGoodQuantity(),
        value: this._qty
    }
},
self:this,
generateExcessNotification: function () {
    var data={};
    data["code"] = resourceConstants.CLIENTCODE_008;
    data["level"] = 'error';
    CommonActions.generateNotification(data);
    return;
},




updateStore: function(event, qty) {
    CommonActions.updateKQQuantity(parseInt(this._qty));
    return true;
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
                        self._qty=txtBoxVal;
                        CommonActions.updateKQQuantity(parseInt(self._qty));
                        self.setState({
                        value : self._qty
                            }
                        )
                    
                }
            });
        
        }(this))
        
    },
    componentWillMount:function(){
        var self = this;
        /*Using settimeout to overcome the flux issue of Invariant Violation 
        when there are two simultaneous dispatches*/
       
    },
    render: function(data) {
      
       
            this.checkKqAllowed();  
            return (
                <div className ={this.props.Formattingclass? "indicator-wrapper "+this.props.Formattingclass:"indicator-wrapper"} >       
                    <div>
                        <span  className = {this._appendClassDown}  action={this.props.action} onClick={this.decrementValue} onMouseDown = {this.decrementValue} ></span>
                        <input id="keyboard" value={this.state.value} type="text" name="quantity" className={"gor-quantity-text gor_"+this.props.execType}/>
                        <span  className = {this._appendClassUp}  action={this.props.action} onClick={this.incrementValue} onMouseDown = {this.incrementValue} ></span>
                    </div>
                </div>
                )
            


    }
});

module.exports = TextBoxEditor;
