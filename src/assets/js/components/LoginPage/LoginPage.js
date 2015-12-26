var React = require('react');
var UserFormLoginPage = require('./userFormLoginPage');

var LoginPage = React.createClass({
	render: function(){
		return (
				<div>
					<div className="headerLoginPage">
		            	<div className="logo">
		            		<img className="imgLogo" src="assets/images/LogoVectorSmartObject.png" />
		            	</div>
		            	<div className="header-actions">
		            	   	<img className="mapImg" src="assets/images/headerbg.png" />
		            	</div>
	      			</div>
	      			<div className="bodyContent">
	      				<div className="bodyLoginPage">
		      				<div className="factoryImage">
		      						<img src ="assets/images/factoryImage.png" />
		      				</div>
		      				<div className="userFormLoginPage">
		      				<UserFormLoginPage />
		      				</div>
	      				</div>
	      			</div>
				</div>
			);
	}
});

module.exports = LoginPage;

