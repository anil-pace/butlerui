describe("KQMod", function(){
	var kQMod;
	var _scanDetails = {}

	beforeEach(function() {
	 
		kQMod = new KQMod();

  	});
  	it("check with enable Increment == false and keypress == false", function(){
		_scanDetails = {
			"current_qty" :  0,
			"total_qty" : 0,
			"kq_allowed" : true
		}
		var result = kQMod.handleIncrement(false, false , -1, _scanDetails, "put_back_scan",  appConstants);

		expect(result).toBe("Fail");
	});
	it("check with enable Increment == true && keypress == true ", function(){
		_scanDetails = {
			"current_qty" :  0,
			"total_qty" : 0,
			"kq_allowed" : true
		}
		var result = kQMod.handleIncrement(true, true , -1, _scanDetails, "put_back_scan",  appConstants);

		expect(result).toBe("Fail");
	});
	it("check with enable Increment == true && keypress == false and updated qty == negative number", function(){
		_scanDetails = {
			"current_qty" :  0,
			"total_qty" : 0,
			"kq_allowed" : true
		}
		var result = kQMod.handleIncrement(true, false , -1, _scanDetails, "put_back_scan",  appConstants);

		expect(result).toBe("Fail with negative number");
	})

	/*it("check with wrong username and password" , function(){
		var credentails = loginMod.clickLoginButton("test" , "1234444");
		expect(credentails).toBe(1);
	});

	it("check with integer values", function(){
		var credentails = loginMod.clickLoginButton(0 , 1);
		expect(credentails).toBe(3);
	})*/
});