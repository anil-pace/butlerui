describe("LoginMod", function(){
	var loginMod;
	var _scanDetails = {};
	
	beforeEach(function() {	 
		loginMod = new LoginMod();
  	});
	it("check with wrong username and password" , function(){		
		var credentails = loginMod.clickLoginButton("test" , "1234444");
		expect(credentails).toBe("Fail");
	});
	
	it("check with wrong username and correct password" , function(){		
		var credentails = loginMod.clickLoginButton("test" , "gorapj");
		expect(credentails).toBe("Fail");
	});
	
	it("check with correct username and wrong password" , function(){		
		var credentails = loginMod.clickLoginButton("kerry" , "1234444");
		expect(credentails).toBe("Fail");
	});
	
	it("check with empty username and password" , function(){		
		var credentails = loginMod.clickLoginButton("" , "");
		expect(credentails).toBe("Fail");
	});
	
	it("check with empty username and correct password" , function(){		
		var credentails = loginMod.clickLoginButton("" , "gorapj");
		expect(credentails).toBe("Fail");
	});
	
	it("check with correct username and empty password" , function(){		
		var credentails = loginMod.clickLoginButton("kerry" , "");
		expect(credentails).toBe("Fail");
	});
	
	it("check with correct username and password" , function(){		
		var credentails = loginMod.clickLoginButton("kerry" , "gorapj");
		expect(credentails).toBe("Pass");
	});
	
});


