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
var appConstants=require('../../constants/appConstants');

var virtualKeyBoard_login, _seat_name = null;
function getState(){
   return {
      flag: loginstore.getFlag(),
      seatList : loginstore.seatList(),
      username : '',
      password : '',
      showError: loginstore.getErrorMessage(),
      getLang : loginstore.getLang(),
      getCurrentLang : loginstore.getCurrentLang()
  }
}

var LoginPage = React.createClass({
 mixins:[LinkedStateMixin],
  getInitialState: function(){
    return getState();
  },
  handleLogin: function(e){ 
  if(_seat_name == null){
    _seat_name = this.refs.seat_name.value;
  }
    var data = {
        'data_type': 'auth',
        'data': {
              'username': this.refs.username.value,
              'password': this.refs.password.value,
              'seat_name': _seat_name
              
          }
      }
    console.log(data);
    utils.generateSessionId();
    CommonActions.login(data);
  }, 
  componentDidMount: function(){
    mainstore.addChangeListener(this.onChange);
    loginstore.addChangeListener(this.onChange);
    CommonActions.webSocketConnection(); 
    CommonActions.listSeats();
    CommonActions.setLanguage();                 //Dispatch setLanguage action
    if(this.state.getLang){
      CommonActions.changeLanguage(this.state.getLang);
    }
    else if(this.state.getCurrentLang){    
      CommonActions.changeLanguage(this.state.getCurrentLang);
    }
    virtualKeyBoard_login = $('#username, #password').keyboard({
      layout: 'custom',
      customLayout: {
        'default': ['! @ # $ % ^ & * + _', '1 2 3 4 5 6 7 8 9 0 {b}', 'q w e r t y u i o p', 'a s d f g h j k l', '{shift} z x c v b n m . {shift}','{space}', '{a} {c}'],
        'shift':   ['( ) { } [ ] = ~ ` -', '< > | ? / " : ; , \' {b}', 'Q W E R T Y U I O P', 'A S D F G H J K L', '{shift} Z X C V B N M . {shift}','{space}', '{a} {c}']
      },
      css: {
        container: "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad"
      },
      reposition: true,
      alwaysOpen: false,
      initialFocus: true,      
      visible : function(e, keypressed, el){
        el.value = '';
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
   componentWillMount:function(){
    virtualKeyBoard_login = $('#username, #password').keyboard({
      layout: 'custom',
      customLayout: {
        'default': ['! @ # $ % ^ & * + _', '1 2 3 4 5 6 7 8 9 0 {b}', 'q w e r t y u i o p', 'a s d f g h j k l', '{shift} z x c v b n m . {shift}','{space}', '{a} {c}'],
        'shift':   ['( ) { } [ ] = ~ ` -', '< > | ? / " : ; , \' {b}', 'Q W E R T Y U I O P', 'A S D F G H J K L', '{shift} Z X C V B N M . {shift}','{space}', '{a} {c}']
      },
      css: {
        container: "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad"
      },
      reposition: true,
      alwaysOpen: false,
      initialFocus: true,      
      visible : function(e, keypressed, el){
        el.value = '';
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
  onChange: function(){    
    this.setState(getState());

  },
  disableLoginButton:function(){
      $('#loginBtn').prop('disabled', true);
  },
  changeLanguage : function(){
    CommonActions.changeLanguage(this.refs.language.value);
    this.disableLoginButton();    
  },
  removeNotify:function(){
       $('.errorNotify').css('display','none');
  },
  render: function(){
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    if(this.state.seatList.length > 0){
      var parseSeatID;
      seatData = this.state.seatList.map(function(data, index){ 
        if(data.hasOwnProperty('seat_type')){
           parseSeatID = null;
           return (
              <option key={'pps' + index} value={data.seat_name} >PPS {data.seat_name.split("_").join(" ")}</option>
            )
        }else{
          parseSeatID = data.split('_');
          _seat_name = data;
          seat_name = parseSeatID[0] +' '+parseSeatID[1];
          if (seat_name.charAt(seat_name.length - 1) == '#') {
            seat_name = seat_name.substr(0, seat_name.length - 1);
          }
          if (_seat_name.charAt(_seat_name.length - 1) == '#') {
            _seat_name = _seat_name.substr(0, _seat_name.length - 1);
          }
          return (
            <header className="ppsSeat" key={'pps' + index}  >PPS {data.split('_').join(" ")}</header>
          )
        }
      });
      if(parseSeatID != null){
        var ppsOption = seatData;
      }
      else{
        _seat_name = null;
        var ppsOption =  <select className={false?"selectPPS error":"selectPPS"}  ref='seat_name'>{seatData}</select> ;
      }

  }else{

  }
  var _languageDropDown=(
    <div className="selectWrapper">
    <select className="selectLang"  value={this.state.getCurrentLang} ref='language' onChange={this.changeLanguage} >
        <option value="en-US">{"English"}</option>
        <option value="ja-JP">{"日本語"}</option>
        <option value="de-DE">{"Deutsche"}</option>
        <option value="zh-ZH">{"中文"}</option>
        <option value="fr-FR">{"Français"}</option>
        <option value="es-ES">{"Español"}</option>
        <option value="nl">{"Dutch"}</option>
    </select>  
    <span className="tiltButton"></span>
</div>
);
  if(this.state.flag === false){
    if(this.state.showError != null){
        errorClass = 'ErrorMsg showErr';
        this.disableLoginButton();
    } else{
        errorClass = 'ErrorMsg'
    }
  



    return(
    <div className="containerLogin">
        <header className="heading">
        <div className="logo">
        <img className="imgLogo" src={allSvgConstants.logo} />
        </div>
        <div className="languageDropDown">
          <span className="langText">{appConstants.LANGUAGE}</span>
        {this.state.getLang?'':_languageDropDown}
        </div>
        </header>
        <div className="subHeading">
        <div className="langText">{appConstants.LOGINTEXT}</div>
        <div className="selectWrapper">
        {ppsOption}
        <span className="tiltButton"></span>
      </div>
        <div className={errorClass}><span>{_(this.state.showError)}</span></div>
        </div>
       
        <main>

        <div className="keyboardLogin">

<div className="unameContainer">
                <label className="usernmeText">{_(resourceConstants.USERNAME)}</label>
                 <div className={this.state.showError?"textboxContainer error":"textboxContainer"}>
                 <span className="iconPlace"></span>
                  <input type="text" className
                  ="form-control" id="username" placeholder={_('Enter Username')} ref='username' valueLink={this.linkState('username')} />
                 </div> 
</div>
  
<div className="passContainer">
                <label className="usernmeText">{_(resourceConstants.PASSWORD)}</label>
                <div className={this.state.showError?"textboxContainer error":"textboxContainer"}>
                <span className="iconPlace"></span>
                  <input type="password" className="form-control" id="password" placeholder={_('Enter Password')} ref='password' valueLink={this.linkState('password')} />
        </div>
        <div className={errorClass}><span>{_("username/password is invalid.Please try again.")}</span></div>
        </div>

<div className="buttonContainer">
        <input type="button" className="loginButton" id="loginBtn"  onClick={this.handleLogin} value={_('Login')} />
</div>
     
        
        </div>

        <div className="divider">
        <span className="dividerUpper"></span>
        <div className="dividerText">OR</div>
        <span className="dividerBelow"></span>
        </div>

        <div className="scanIdLogin">
        <div className="outerDiv">
        <div className="rightUpper"></div>
        <div className="leftUpper"></div>
        <div className="rightBelow"></div>
        <div className="leftBelow"></div>
        <div className="scanLogo"></div>
        <span> Scan ID card to login.</span>
        
        
        </div>
        </div>
        </main>
        <footer>
        Copyright &copy; {currentYear} GreyOrange Pte Ltd
        </footer>
  </div>
    )
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

