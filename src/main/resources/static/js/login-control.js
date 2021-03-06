function checkPass()
{
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('password');
    var pass2 = document.getElementById('RepeatPassword');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ffffd8";
    //Compare the values in the password field
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match.
        //Set the color to the good color and inform
        //the user that they have entered the correct password
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
}

//Not used, for future reference only
function addCustomer() {
	var email = $('#RegisterEmail').val();
	var password = $('#RegisterPassword').val();
	var exist;

	if (email) {
		existCheck(email, function(result) {
			exist = result;
		});

		if (exist == "false") {
			$.ajax(
				{
					type: "POST",
					url: "/customers",
					contentType: "application/json",
					data: JSON.stringify({
						"email": email,
						"password": password
					}),
					complete: function(xhr) {
						if (xhr.readyState == 4) {
							if (xhr.status == 201) {
								alert("Created");
							}
						}
						else {
							alert(JSON.stringfy(xhr));
						}
					}
				});
		}
		else {
			alert("The email address you have entered is already registered");
		}
	}
	else {
		alert("Please use a valid email");
	}
}
//Not used, for future reference only
function existCheck(email, callback) {
	data = { email: email };
	$.ajax(
		{
			type : "POST",
			url  : "/customer/checkExist",
			async: false,
			data : data,
			success : function(result) {
				alert("success");
				$('#status').text(result);
				callback(result);

			},
			error: function (jqXHR, exception) {
				alert("error");
				$('#status').text("Failed to get the status");
			}
		});
}