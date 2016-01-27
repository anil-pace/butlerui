var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Router = require('react-router');
var mainstore = require('../../stores/mainstore');
var loginstore = require('../../stores/loginstore');
var CommonActions = require('../../actions/CommonActions');
var Operator = require('../Operator');
var allSvgConstants = require('../../constants/svgConstants');
var resourceConstants = require('../../constants/resourceConstants');
var utils = require('../../utils/utils.js');

var virtualKeyBoard_login;
function getState(){
   return {
      flag: loginstore.getFlag(),
      seatList : loginstore.seatList(),
      username : '',
      password : '',
      showError: loginstore.getErrorMessage()
  }
}

var LoginPage = React.createClass({
 mixins:[LinkedStateMixin],
  getInitialState: function(){
    return getState();
  }, 
  handleLogin: function(e){   
  
    var data = {
        'data_type': 'auth',
        'data': {
              'username': this.refs.username.value,
              'password': this.refs.password.value,
              'seat_name': this.refs.seat_name.value
          }
      }
    utils.generateSessionId();
    CommonActions.login(data);  
  }, 
  componentDidMount: function(){
    mainstore.addChangeListener(this.onChange);
    loginstore.addChangeListener(this.onChange);
    CommonActions.webSocketConnection(); 
    CommonActions.listSeats();
    virtualKeyBoard_login = $('#username, #password').keyboard({
      layout: 'custom',
      customLayout: {
        'default': ['1 2 3 4 5 6 7 8 9 0 {b}', 'q w e r t y u i o p', 'a s d f g h j k l', '{shift} z x c v b n m . {shift}', '{a} {c}'],
        'shift': ['! @ # $ % ^ & * ( ) {b}', 'Q W E R T Y U I O P', 'A S D F G H J K L', '{shift} Z X C V B N M . {shift}', '{a} {c}']
      },
      css: {
        container: "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad"
      },
      reposition: true,
      alwaysOpen: false,
      initialFocus: true,     
      visible : function(e, keypressed, el){
        el.value = '';
        //$(".authNotify").css("display","none"); 
      },
      
      accepted: function(e, keypressed, el) {
        var usernameValue = document.getElementById('username').value;
        var passwordValue = document.getElementById('password').value;
        if(usernameValue != null && usernameValue !=''  && passwordValue != null && passwordValue != '' ){
          $('#loginBtn').prop('disabled', false);
        }else{
          $('#loginBtn').prop('disabled', true); 
        }    
      }
    }); 
  
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
    loginstore.removeChangeListener(this.onChange);
  },
  onChange: function(){    
    this.setState(getState());

  },
  changeLanguage : function(){
    CommonActions.changeLanguage(this.refs.language.value);
  },
  removeNotify:function(){
       $('.errorNotify').css('display','none');
      },
  render: function(){
    var d = new Date();
    var n = d.getFullYear();   
    var seatData;
    var display = this.state.flag === true ? 'block' : 'none';
    console.log("data  " + this.state.seatList.length );
      if(this.state.seatList.length > 0){
          seatData = this.state.seatList.map(function(data, index){ 
            if(data.hasOwnProperty('seat_type')){
               return (
                  <option key={'pps' + index} value={data.seat_name} >PPS {data.seat_type} {data.pps_id}</option>
                )
            }else{
              var parseSeatID = data.split('_');
              seatName = parseSeatID[0] +' '+parseSeatID[1];
              return (
                <header className="ppsSeat" key={'pps' + index} >PPS {seatName}</header>
              )
            }
          });
          if(this.state.seatList.length == 1){
            var ppsOption = seatData;
          }
          else{
            var ppsOption =  <select className="selectPPS" ref='seat_name'>{seatData}</select> ;
          }

      }else{

      }
      if(this.state.flag === false){
        if(this.state.showError != null){
            errorClass = 'ErrorMsg showErr'
        } else{
            errorClass = 'ErrorMsg'
        }
        return (
        <div>
          <div className="headerLoginPage">
                  <div className="logo">
                    <img className="imgLogo" src={allSvgConstants.gorLogo} />
                  </div>
                  <div className="header-actions">
                      <img className="mapImg" src={allSvgConstants.headerbg} />
                  </div>
          </div>
          <div className="bodyContent">
                <div className="bodyLoginPage">
                    <div className="factoryImage">
                        <img src ={allSvgConstants.factoryImg} />
                    </div>
                    <div className="userFormLoginPage">
                        <form>
                            {ppsOption}
              <div className={errorClass}>{this.state.showError}

              </div>
              <div className="form-group">
                <label >{_(resourceConstants.USERNAME)}</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter Username" ref='username' valueLink={this.linkState('username')} />
              </div>

              <div className="form-group">
                <label >{_(resourceConstants.PASSWORD)}</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter Password" ref='password' valueLink={this.linkState('password')} />
              </div>
              <select className="selectLang" ref='language' onChange={this.changeLanguage}>
                  <option value="english">English</option>
                  <option value="chinese">Chinese</option>
              </select>
              <input type="button" className="btn btn-default loginButton loginButton" id="loginBtn" disabled onClick={this.handleLogin} value="Login" />
          </form>
          </div>
                </div>
            </div>
            <div className="copyright">
                Copyright &copy; {n} GreyOrange Pte Ltd
            </div>
        </div>
      );
    }
     else{ 
      return(
         <div className="main">
            <Operator />
          </div>
        
      )
    }

    
  }
});

module.exports = LoginPage;

