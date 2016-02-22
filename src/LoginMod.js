function LoginMod() {	
}

LoginMod.prototype.clickLoginButton = function(_username, _password) {  
	this.username = _username;
	this.password = _password;
	
    if (this.username === "kerry" && this.password === "gorapj") {	
            return "Pass";
        }else{			
            return "Fail";
        }
}


