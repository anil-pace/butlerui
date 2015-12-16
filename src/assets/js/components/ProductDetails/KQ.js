var React = require('react');
var mainstore = require('../../stores/mainstore');
var CommonActions = require('../../actions/CommonActions');

var KQ = React.createClass({
  getInitialState: function(){
    return {
       defValue: 999
    }
    //return {data: []};
  },
  handleIncrement: function(event){    
    this.setState({defValue: this.state.defValue + 1});
    CommonActions.increment();

  },
  handleDecrement: function(event){
    this.setState({defValue: this.state.defValue - 1});
    console.log("value is " + this.state.defValue);
    if(this.state.defValue === 1){
      alert("no further operation allowed");
    }
    CommonActions.decrement();

  },
  postRequest: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
      }) }.bind(this), 0);
     
    mainstore.addChangeListener(this.onChange);
  },
  showNumpad: function(){    
    
    var kb;
    kb = $('#keyboard').getkeyboard()
  },
  componentWillMount: function(){
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
  },
  render: function(data){ 
    
      return (
        
           
            <div className="kQableContainer">
             
              <div className="topArrow" onClick={this.handleIncrement}>
                 <span className="glyphicon glyphicon-menu-up"></span>
              </div>
              <div id='textbox'  onClick={this.showNumpad}>
                 <input id="keyboard" value={this.state.defValue} /> 
              </div> 
              <div className="downArrow" onClick={this.handleDecrement}>
                 <span className="glyphicon glyphicon-menu-down"></span>
              </div>
              
            </div>
        

        
      )
  }
});

module.exports = KQ;