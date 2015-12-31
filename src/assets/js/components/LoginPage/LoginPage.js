var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Router = require('react-router');
var mainstore = require('../../stores/mainstore');
var loginstore = require('../../stores/loginstore');
var CommonActions = require('../../actions/CommonActions');
var Operator = require('../Operator');
var allSvgConstants = require('../../constants/svgConstants')

function getState(){
   return {
      flag: loginstore.getFlag(),
      seatList : loginstore.seatList(),
      username : 'kerry',
      password : 'gorapj'
  }
}

var LoginPage = React.createClass({
 mixins:[LinkedStateMixin],
  getInitialState: function(){
    return getState();
  },
  handleLogin: function(newItem){
      var data = {
        'data_type': 'auth',
        'data': {
              'username': this.state.username,
              'password': this.state.password,
              'seat_name': this.refs.seat_name.value
          }
      }
    CommonActions.login(data);
  },
  componentDidMount: function(){
    mainstore.addChangeListener(this.onChange);
    loginstore.addChangeListener(this.onChange);
    CommonActions.webSocketConnection(); 
    CommonActions.listSeats(); 
 
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
    loginstore.removeChangeListener(this.onChange);
  },
  onChange: function(){
    this.setState({
      flag: loginstore.getFlag(),
      seatList : loginstore.seatList()
    });

  },

	render: function(){
    var d = new Date();
    var n = d.getFullYear();
    var seatData;
      var display = this.state.flag === true ? 'block' : 'none';
      if(this.state.seatList.length > 0){
          seatData = this.state.seatList[0].map(function(data, index){ 
            if(data.hasOwnProperty('seat_type')){
               return (
                  <option key={'pps' + index} value={data.seat_type+'_'+data.pps_id} >PPS {data.seat_type} {data.pps_id}</option>
                )
            }else{console.log(data);
                 return( <option key={index} value={data} >{data}</option>)
            }
          });
      }
      if(this.state.flag === false){
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
              							<select className="selectPPS" ref='seat_name'>
              							   {seatData}
              							</select>


							<div className="form-group">
								<label >User Name :</label>
	    						<input type="text" className="form-control" id="username" placeholder="Enter Username" valueLink={this.linkState('username')}  />
							</div>
							<div className="form-group">
								<label >Password :</label>
	    						<input type="Password" className="form-control" id="username" placeholder="Enter Password" valueLink={this.linkState('password')} />
							</div>
							<select className="selectLang">
								  <option value="volvo">Select Language</option>
								  <option value="saab">English</option>
								  <option value="mercedes">Chinese</option>
								  <option value="audi">German</option>
							</select>
							<input type="button" className="btn btn-default loginButton loginButton"  onClick={this.handleLogin} value="Login" />
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

